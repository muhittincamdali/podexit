import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { type CliEnvironment, EXIT, run } from '../../src/cli/run.js';
import { CachedFetcher } from '../../src/net/cache.js';
import { podspecUrl, trunkPodUrl, versionsIndexUrl } from '../../src/net/cocoapods.js';
import { FakeFetcher, ok } from '../helpers/fake-fetcher.js';

const LOCKFILE = `PODS:
  - Alamofire (5.9.1)
  - Local (0.1.0)

DEPENDENCIES:
  - Alamofire (~> 5.9)
  - Local (from \`../Local\`)

SPEC REPOS:
  trunk:
    - Alamofire

EXTERNAL SOURCES:
  Local:
    :path: "../Local"

COCOAPODS: 1.16.2
`;

let root: string;
let cache: string;

interface Captured {
  code: number;
  stdout: string;
  stderr: string;
}

async function cli(args: string[], io: Partial<CliEnvironment> = {}): Promise<Captured> {
  let stdout = '';
  let stderr = '';
  const code = await run(args, {
    cwd: root,
    env: { PODEXIT_CACHE_DIR: cache },
    stdout: (text) => {
      stdout += text;
    },
    stderr: (text) => {
      stderr += text;
    },
    stdoutIsTty: false,
    stderrIsTty: false,
    ...io,
  });
  return { code, stdout, stderr };
}

/** Writes recorded answers for Alamofire 5.9.1 into the cache, as an earlier online run would. */
async function record(): Promise<void> {
  const fake = new FakeFetcher({
    [versionsIndexUrl('Alamofire')]: ok('Alamofire/5.9.0/5.9.1/5.10.2\n'),
    [trunkPodUrl('Alamofire')]: ok({
      versions: [
        { name: '5.9.1', created_at: '2024-03-27 18:00:00 UTC' },
        { name: '5.10.2', created_at: '2024-11-25 15:15:33 UTC' },
      ],
    }),
    [podspecUrl('Alamofire', '5.9.1')]: ok({
      name: 'Alamofire',
      version: '5.9.1',
      source: { git: 'https://github.com/Alamofire/Alamofire.git', tag: '5.9.1' },
    }),
    'https://raw.githubusercontent.com/Alamofire/Alamofire/HEAD/Package.swift': ok(''),
    'https://raw.githubusercontent.com/Alamofire/Alamofire/5.9.1/Package.swift': ok(''),
  });
  const fetcher = new CachedFetcher(fake, { directory: cache });
  for (const url of [
    versionsIndexUrl('Alamofire'),
    trunkPodUrl('Alamofire'),
    podspecUrl('Alamofire', '5.9.1'),
  ]) {
    await fetcher.get(url);
  }
  for (const ref of ['HEAD', '5.9.1']) {
    await fetcher.get(
      `https://raw.githubusercontent.com/Alamofire/Alamofire/${ref}/Package.swift`,
      {
        method: 'HEAD',
      },
    );
  }
}

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'podexit-cli-'));
  cache = join(root, '.cache');
  await mkdir(join(root, 'ios'));
  await writeFile(join(root, 'ios', 'Podfile.lock'), LOCKFILE);
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe('podexit', () => {
  it('reports from recorded answers with --offline', async () => {
    await record();
    const { code, stdout, stderr } = await cli(['--offline']);
    expect(code).toBe(EXIT.ok);
    expect(stderr).toBe('');
    expect(stdout).toContain('ios/Podfile.lock  native iOS app · 2 pods, 2 in the Podfile');
    expect(stdout).toMatch(/Alamofire\s+5\.9\.1\s+5\.10\.2\s+frozen after Dec 2\s+yes/);
    expect(stdout).toContain('1 more from local paths, git or private specs');
    expect(stdout).not.toContain('\u001b[');
  });

  it('shows unknown instead of failing when nothing is recorded', async () => {
    const { code, stdout } = await cli(['--offline', '--format', 'json']);
    expect(code).toBe(EXIT.ok);
    const report = JSON.parse(stdout);
    const [alamofire] = report.lockfiles[0].pods;
    expect(report.offline).toBe(true);
    expect(alamofire.updates.status).toBe('frozen-on-trunk');
    expect(alamofire.updates.latestOnTrunk).toBeNull();
    expect(alamofire.swiftPackage.status).toBe('unknown');
  });

  it('lists local pods with --all', async () => {
    const { stdout } = await cli(['--offline', '--all']);
    expect(stdout).toMatch(/Local\s+0\.1\.0\s+not affected/);
  });

  it('writes Markdown to a file with --output', async () => {
    await record();
    const { code, stdout, stderr } = await cli(['--offline', '-f', 'markdown', '-o', 'out.md']);
    expect(code).toBe(EXIT.ok);
    expect(stdout).toBe('');
    expect(stderr).toBe('Wrote out.md\n');
    const markdown = await readFile(join(root, 'out.md'), 'utf8');
    expect(markdown).toContain(
      '| `Alamofire` | `5.9.1` | `5.10.2` (2024-11-25) | frozen after Dec 2 |',
    );
  });

  it('colours the terminal table only for a terminal', async () => {
    const plain = await cli(['--offline'], { stdoutIsTty: true, env: { NO_COLOR: '1' } });
    expect(plain.stdout).not.toContain('\u001b[');
    const coloured = await cli(['--offline'], { stdoutIsTty: true });
    expect(coloured.stdout).toContain('\u001b[1m');
    const forced = await cli(['--offline'], { env: { FORCE_COLOR: '1' } });
    expect(forced.stdout).toContain('\u001b[1m');
  });

  it('prints progress on a terminal stderr when online', async () => {
    // A cache entry for every URL keeps this run off the network.
    await record();
    const { stderr } = await cli([], { stderrIsTty: true });
    expect(stderr).toBe('Checking ios/Podfile.lock…\n');
  });

  it('exits with 2 when no lockfile is found', async () => {
    const { code, stderr } = await cli(['--offline', 'missing']);
    expect(code).toBe(EXIT.usage);
    expect(stderr).toBe('podexit: missing: no such file or folder.\n');
  });

  it('exits with 2 for a file that is not a Podfile.lock', async () => {
    await writeFile(join(root, 'package.json'), '{"name": "app"}\n');
    const { code, stderr } = await cli(['--offline', 'package.json']);
    expect(code).toBe(EXIT.usage);
    expect(stderr).toBe(
      'podexit: package.json: This file has no PODS section, so it is not a Podfile.lock.\n',
    );
  });

  it('exits with 2 for a Markdown file that does not parse as YAML', async () => {
    await writeFile(
      join(root, 'README.md'),
      '# App\n\nRun: `pod install`\nThen: open\n  it: now\n',
    );
    const { code, stderr } = await cli(['--offline', 'README.md']);
    expect(code).toBe(EXIT.usage);
    expect(stderr).toBe(
      'podexit: README.md: This file has no PODS section, so it is not a Podfile.lock.\n',
    );
  });

  it('replaces control characters in a lockfile entry quoted on stderr', async () => {
    // OSC 52 (write the clipboard), CSI 2J (clear the screen), an OSC 8 link and an 8-bit CSI.
    await writeFile(
      join(root, 'ios', 'Podfile.lock'),
      'PODS:\n  - "\\e]52;c;cm0gLXJmIH4K\\a\\e[2J\\e]8;;https://evil.example/\\aClick\\e]8;;\\a\\x9b31m"\n',
    );
    const { code, stderr } = await cli(['--offline']);
    expect(code).toBe(EXIT.usage);
    // biome-ignore lint/suspicious/noControlCharactersInRegex: looking for raw control characters.
    expect(stderr).not.toMatch(/[\u0000-\u0009\u000b-\u001f\u007f-\u009f]/);
    expect(stderr).toBe(
      'podexit: ios/Podfile.lock: Unexpected PODS entry: \ufffd]52;c;cm0gLXJmIH4K\ufffd\ufffd[2J\ufffd]8;;https://evil.example/\ufffdClick\ufffd]8;;\ufffd\ufffd31m\n',
    );
  });

  it('replaces control characters in a folder name in the progress line', async () => {
    await record();
    const folder = 'app\u001b[2J\u009b31m';
    await mkdir(join(root, folder, 'ios'), { recursive: true });
    await writeFile(join(root, folder, 'ios', 'Podfile.lock'), LOCKFILE);
    const { stderr } = await cli([folder], { stderrIsTty: true });
    expect(stderr).toBe('Checking app\ufffd[2J\ufffd31m/ios/Podfile.lock…\n');
  });

  it('exits with 2 for an unknown format or option', async () => {
    const format = await cli(['--format', 'xml']);
    expect(format.code).toBe(EXIT.usage);
    expect(format.stderr).toContain("argument 'xml' is invalid");
    const concurrency = await cli(['--concurrency', '0']);
    expect(concurrency.code).toBe(EXIT.usage);
    expect(concurrency.stderr).toContain('Use a whole number from 1 to 64.');
  });

  it('prints help and the version with exit code 0', async () => {
    const help = await cli(['--help']);
    expect(help.code).toBe(EXIT.ok);
    expect(help.stdout).toContain('Exit codes:');
    const version = await cli(['--version']);
    expect(version.code).toBe(EXIT.ok);
    expect(version.stdout).toMatch(/^\d+\.\d+\.\d+/);
  });
});
