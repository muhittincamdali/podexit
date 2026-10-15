import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// The compiled entry point, as `npx @mcamdali/podexit` runs it (test/setup/build.ts builds it first).
const BIN = fileURLToPath(new URL('../../dist/cli/main.js', import.meta.url));
const PACKAGE = fileURLToPath(new URL('../../package.json', import.meta.url));

let root: string;

function podexit(...args: string[]) {
  return spawnSync(process.execPath, [BIN, ...args], {
    cwd: root,
    encoding: 'utf8',
    env: { PATH: process.env.PATH, PODEXIT_CACHE_DIR: join(root, '.cache') },
  });
}

beforeAll(async () => {
  root = await mkdtemp(join(tmpdir(), 'podexit-bin-'));
  await writeFile(
    join(root, 'Podfile.lock'),
    'PODS:\n  - SnapKit (5.7.1)\n\nDEPENDENCIES:\n  - SnapKit\n\nSPEC REPOS:\n  trunk:\n    - SnapKit\n\nCOCOAPODS: 1.16.2\n',
  );
});

afterAll(async () => {
  await rm(root, { recursive: true, force: true });
});

describe('dist/cli/main.js', () => {
  it('starts with a node shebang so npx and Homebrew can run it', async () => {
    expect((await readFile(BIN, 'utf8')).startsWith('#!/usr/bin/env node\n')).toBe(true);
  });

  it('prints the version from package.json', async () => {
    const { version } = JSON.parse(await readFile(PACKAGE, 'utf8'));
    const result = podexit('--version');
    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe(version);
  });

  it('writes a JSON report and exits with 0', () => {
    const result = podexit('--offline', '--format', 'json');
    expect(result.status).toBe(0);
    const report = JSON.parse(result.stdout);
    expect(report.schemaVersion).toBe(0);
    expect(report.lockfiles[0].pods[0].name).toBe('SnapKit');
  });

  it('exits with 2 and a message on stderr for bad input', () => {
    const result = podexit('--offline', 'nowhere');
    expect(result.status).toBe(2);
    expect(result.stdout).toBe('');
    expect(result.stderr).toBe('podexit: nowhere: no such file or folder.\n');
  });
});
