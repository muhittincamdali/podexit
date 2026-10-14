import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));

describe('examples/api/summary.mjs', () => {
  it('imports the built package by name and summarises the five fixtures offline', () => {
    const output = execFileSync(process.execPath, ['examples/api/summary.mjs'], {
      cwd: ROOT,
      encoding: 'utf8',
    });
    expect(output.trim().split('\n')).toEqual([
      'fixtures/native-app/Podfile.lock: native, 28 pods, 11 frozen, 15 capped, 25 with a Swift package',
      'fixtures/flutter-app/ios/Podfile.lock: flutter-app, 29 pods, 7 frozen, 12 capped, 17 with a Swift package',
      'fixtures/flutter-plugin/example/ios/Podfile.lock: flutter-plugin, 6 pods, 3 frozen, 0 capped, 2 with a Swift package',
      'fixtures/expo-app/ios/Podfile.lock: expo, 100 pods, 4 frozen, 0 capped, 4 with a Swift package',
      'fixtures/rn-app/ios/Podfile.lock: react-native, 105 pods, 11 frozen, 0 capped, 11 with a Swift package',
    ]);
  });
});
