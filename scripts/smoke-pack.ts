// Packs the package as npm would publish it, installs the tarball into a temporary prefix (the way
// `npx` and the Homebrew formula install it) and runs the installed binary against a fixture.
// Run after `npm run build`: `node scripts/smoke-pack.ts`. Needs the network for the three
// runtime dependencies.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const { version } = JSON.parse(readFileSync(`${root}package.json`, 'utf8')) as { version: string };
const work = mkdtempSync(join(tmpdir(), 'podexit-pack-'));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const run = (command: string, args: string[], cwd = root) =>
  execFileSync(command, args, { cwd, encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });

try {
  const [packed] = JSON.parse(
    run(npm, ['pack', '--json', '--ignore-scripts', '--pack-destination', work]),
  ) as { filename: string; files: { path: string }[] }[];
  if (!packed) throw new Error('npm pack wrote nothing');
  const paths = packed.files.map(({ path }) => path);
  for (const required of ['dist/cli/main.js', 'dist/index.d.ts', 'data/publisher-policy.json']) {
    if (!paths.includes(required)) throw new Error(`The package is missing ${required}`);
  }
  const unexpected = paths.filter((path) => /^(src|test|fixtures|scripts|docs)\//.test(path));
  if (unexpected.length > 0) throw new Error(`The package includes ${unexpected.join(', ')}`);

  const prefix = join(work, 'prefix');
  run(npm, [
    'install',
    '--global',
    '--prefix',
    prefix,
    '--no-audit',
    '--no-fund',
    join(work, packed.filename),
  ]);
  const bin = join(prefix, process.platform === 'win32' ? 'podexit.cmd' : 'bin/podexit');
  const reported = run(bin, ['--version']).trim();
  if (reported !== version) throw new Error(`--version printed ${reported}, expected ${version}`);
  const report = run(
    bin,
    ['--offline', '--cache-dir', `${root}fixtures/responses`, `${root}fixtures/native-app`],
    work,
  );
  if (!report.includes('capped at 12.x')) throw new Error(`Unexpected report:\n${report}`);
  console.log(`${packed.filename}: ${paths.length} files, installed binary reports ${reported}.`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
