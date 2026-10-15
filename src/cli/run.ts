import { readFile, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';
import { Command, CommanderError, InvalidArgumentError, Option } from 'commander';
import { analyzeLockfile, buildReport, type LockfileReport } from '../analyze.js';
import { LockfileError } from '../core/lockfile.js';
import { loadPublisherPolicy } from '../data.js';
import { CachedFetcher, defaultCacheDirectory } from '../net/cache.js';
import { type Fetcher, HttpFetcher, OfflineFetcher } from '../net/fetcher.js';
import { replaceControlCharactersExceptNewlines } from '../report/escape.js';
import { FORMATS, type Format, render } from '../report/index.js';
import { REPOSITORY_URL } from '../report/labels.js';
import { VERSION } from '../version.js';
import { DiscoveryError, findLockfiles } from './discover.js';

/** Exit codes; documented in the README and `--help`. */
export const EXIT = { ok: 0, failure: 1, usage: 2 } as const;

/** Everything the CLI touches outside its arguments, so tests can run it in-process. */
export interface CliEnvironment {
  cwd: string;
  env: Record<string, string | undefined>;
  stdout: (text: string) => void;
  stderr: (text: string) => void;
  /** Whether stdout is a terminal; turns colour on for the tty format. */
  stdoutIsTty: boolean;
  /** Whether stderr is a terminal; progress lines go there only when it is. */
  stderrIsTty: boolean;
}

interface Options {
  format: Format;
  output?: string;
  all: boolean;
  offline: boolean;
  refresh: boolean;
  cacheDir?: string;
  color: boolean;
  concurrency: number;
}

const HELP_AFTER = `
Exit codes:
  0  report written
  1  unexpected error
  2  bad arguments, no Podfile.lock found, or a file that is not a Podfile.lock

Environment:
  GITHUB_TOKEN, GH_TOKEN  sent to GitHub only; needed for private upstream repositories
  PODEXIT_CACHE_DIR       cache folder (default: $XDG_CACHE_HOME/podexit or ~/.cache/podexit)
  NO_COLOR, FORCE_COLOR   turn terminal colours off or on

Examples:
  npx @mcamdali/podexit               looks for Podfile.lock, ios/Podfile.lock, example/ios/Podfile.lock
  npx @mcamdali/podexit ios/Podfile.lock --format markdown --output podexit.md
  npx @mcamdali/podexit --format json > podexit.json
  npx @mcamdali/podexit --offline     answers only from the cache

Docs: ${REPOSITORY_URL}#readme`;

function positiveInteger(value: string): number {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1 || number > 64) {
    throw new InvalidArgumentError('Use a whole number from 1 to 64.');
  }
  return number;
}

function program(io: CliEnvironment): Command {
  return new Command('podexit')
    .description(
      'Shows which CocoaPods dependencies stop getting updates when trunk goes read-only on December 2, 2026, and which already ship a Swift package.',
    )
    .version(VERSION, '-v, --version')
    .argument('[paths...]', 'Podfile.lock files or project folders (default: current folder)')
    .addOption(new Option('-f, --format <format>', 'output format').choices(FORMATS).default('tty'))
    .option('-o, --output <file>', 'write the report to a file instead of stdout')
    .option(
      '-a, --all',
      'tty format: also list pods from local paths, git and private specs',
      false,
    )
    .option('--offline', 'use cached answers only; never touch the network', false)
    .option('--refresh', 'ignore cached answers and ask the network again', false)
    .option('--cache-dir <dir>', 'cache folder', io.env.PODEXIT_CACHE_DIR || undefined)
    .option('--no-color', 'plain text even in a terminal')
    .option('--concurrency <n>', 'parallel pod lookups', positiveInteger, 8)
    .addHelpText('after', HELP_AFTER)
    .showHelpAfterError('(add --help for usage)')
    .exitOverride()
    .configureOutput({
      writeOut: io.stdout,
      writeErr: io.stderr,
      outputError: (text, write) => write(text),
    });
}

function useColor(options: Options, io: CliEnvironment): boolean {
  if (options.format !== 'tty' || options.output || !options.color) return false;
  if (io.env.NO_COLOR) return false;
  if (io.env.FORCE_COLOR && io.env.FORCE_COLOR !== '0') return true;
  return io.stdoutIsTty;
}

function fetcherFor(options: Options, io: CliEnvironment): Fetcher {
  const inner = options.offline
    ? new OfflineFetcher()
    : new HttpFetcher({
        userAgent: `@mcamdali/podexit/${VERSION} (+${REPOSITORY_URL})`,
        githubToken: io.env.GITHUB_TOKEN || io.env.GH_TOKEN || undefined,
      });
  const directory = resolve(io.cwd, options.cacheDir ?? defaultCacheDirectory(io.env));
  return new CachedFetcher(inner, { directory, refresh: options.refresh });
}

async function analyzeAll(
  paths: readonly string[],
  options: Options,
  io: CliEnvironment,
): Promise<string> {
  const lockfiles = await findLockfiles(paths, io.cwd);
  const policy = loadPublisherPolicy();
  const fetcher = fetcherFor(options, io);
  const reports: LockfileReport[] = [];
  for (const path of lockfiles) {
    const display = relative(io.cwd, path) || path;
    if (io.stderrIsTty && !options.offline) io.stderr(`Checking ${display}…\n`);
    const text = await readFile(path, 'utf8');
    try {
      reports.push(
        await analyzeLockfile(text, display, {
          fetcher,
          policy,
          concurrency: options.concurrency,
        }),
      );
    } catch (error) {
      if (error instanceof LockfileError) throw new LockfileError(`${display}: ${error.message}`);
      throw error;
    }
  }
  const report = buildReport(reports, { policy, offline: options.offline });
  return render(report, options.format, { color: useColor(options, io), all: options.all });
}

/** Runs the CLI with the given arguments (without `node` and the script) and returns the exit code. */
export async function run(argv: readonly string[], environment: CliEnvironment): Promise<number> {
  // Messages quote paths, arguments and lockfile entries ("Unexpected PODS entry: ..."); an escape
  // sequence in one of them must not reach the terminal, so every write to stderr is cleaned here.
  const io: CliEnvironment = {
    ...environment,
    stderr: (text) => environment.stderr(replaceControlCharactersExceptNewlines(text)),
  };
  const command = program(io);
  try {
    await command.parseAsync([...argv], { from: 'user' });
  } catch (error) {
    if (error instanceof CommanderError) return error.exitCode === 0 ? EXIT.ok : EXIT.usage;
    throw error;
  }
  const options = command.opts<Options>();
  try {
    const output = await analyzeAll(command.processedArgs[0] as string[], options, io);
    if (options.output) {
      await writeFile(resolve(io.cwd, options.output), output);
      io.stderr(`Wrote ${options.output}\n`);
    } else {
      io.stdout(output);
    }
    return EXIT.ok;
  } catch (error) {
    if (error instanceof DiscoveryError || error instanceof LockfileError) {
      io.stderr(`podexit: ${error.message}\n`);
      return EXIT.usage;
    }
    io.stderr(`podexit: ${error instanceof Error ? error.message : String(error)}\n`);
    return EXIT.failure;
  }
}
