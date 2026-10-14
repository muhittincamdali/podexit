import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DiscoveryError, findLockfiles } from '../../src/cli/discover.js';

let root: string;

async function touch(relative: string): Promise<string> {
  const path = join(root, relative);
  await mkdir(join(path, '..'), { recursive: true });
  await writeFile(path, 'PODS:\n');
  return path;
}

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'podexit-discover-'));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
});

describe('findLockfiles', () => {
  it('finds the lockfile of a native app in the current folder', async () => {
    const lockfile = await touch('Podfile.lock');
    expect(await findLockfiles([], root)).toEqual([lockfile]);
  });

  it('finds ios/ and macos/ lockfiles of Flutter and React Native apps', async () => {
    const ios = await touch('ios/Podfile.lock');
    const macos = await touch('macos/Podfile.lock');
    expect(await findLockfiles(['.'], root)).toEqual([ios, macos]);
  });

  it("finds a Flutter plugin's example app lockfile", async () => {
    const example = await touch('example/ios/Podfile.lock');
    expect(await findLockfiles([], root)).toEqual([example]);
  });

  it('accepts a file path with any name', async () => {
    const lockfile = await touch('saved/Podfile.lock.backup');
    expect(await findLockfiles(['saved/Podfile.lock.backup'], root)).toEqual([lockfile]);
  });

  it('lists each lockfile once when a file and its folder are both given', async () => {
    const lockfile = await touch('ios/Podfile.lock');
    expect(await findLockfiles(['ios/Podfile.lock', '.', 'ios'], root)).toEqual([lockfile]);
  });

  it('does not search deeper than the known locations', async () => {
    await touch('packages/app/ios/Podfile.lock');
    await expect(findLockfiles([], root)).rejects.toThrow(DiscoveryError);
  });

  it('explains where it looked when a folder has no lockfile', async () => {
    await expect(findLockfiles([], root)).rejects.toThrow(
      /No Podfile\.lock in this folder \(looked for Podfile\.lock, ios\/Podfile\.lock/,
    );
    await expect(findLockfiles([], root)).rejects.toThrow(/Run `pod install` first/);
  });

  it('names a path that does not exist', async () => {
    await expect(findLockfiles(['missing'], root)).rejects.toThrow(
      'missing: no such file or folder.',
    );
  });
});
