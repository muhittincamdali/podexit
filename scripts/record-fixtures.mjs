#!/usr/bin/env node
// Records the CocoaPods CDN, trunk API and GitHub answers for every fixture into
// fixtures/responses, the cache the tests and `--offline` demos replay. Run after `npm run build`:
//
//   npm run fixtures:record
//
// The folder is replaced, so it holds exactly the answers the current fixtures need. Review the
// snapshot changes (`npm test -- -u`) before committing: they show what changed upstream.
import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const fixtures = ['native-app', 'flutter-app', 'flutter-plugin', 'expo-app', 'rn-app'];

rmSync(`${root}fixtures/responses`, { recursive: true, force: true });
execFileSync(
  process.execPath,
  [
    'dist/cli/main.js',
    ...fixtures.map((name) => `fixtures/${name}`),
    '--cache-dir',
    'fixtures/responses',
    '--refresh',
    '--format',
    'json',
  ],
  // The report itself is not needed, only the cache entries written while making it.
  { cwd: root, stdio: ['ignore', 'ignore', 'inherit'] },
);
console.log('Recorded answers in fixtures/responses.');
