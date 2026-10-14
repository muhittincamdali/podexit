import { stat } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

/**
 * Where a Podfile.lock lives in each kind of project, relative to the folder podexit runs in:
 * a native app keeps it next to the Podfile, Flutter and React Native apps under `ios/` (and
 * `macos/` for Flutter desktop), and a Flutter plugin under its example app.
 */
export const LOCKFILE_LOCATIONS = [
  'Podfile.lock',
  'ios/Podfile.lock',
  'macos/Podfile.lock',
  'example/ios/Podfile.lock',
  'example/macos/Podfile.lock',
] as const;

export class DiscoveryError extends Error {
  override name = 'DiscoveryError';
}

async function kind(path: string): Promise<'file' | 'directory' | null> {
  try {
    const info = await stat(path);
    if (info.isFile()) return 'file';
    return info.isDirectory() ? 'directory' : null;
  } catch {
    return null;
  }
}

async function lockfilesIn(directory: string): Promise<string[]> {
  const found: string[] = [];
  for (const location of LOCKFILE_LOCATIONS) {
    const candidate = join(directory, location);
    if ((await kind(candidate)) === 'file') found.push(candidate);
  }
  return found;
}

/**
 * Turns the paths given on the command line (files or folders; the current folder when none)
 * into absolute lockfile paths, without duplicates. Throws {@link DiscoveryError} for a path that
 * does not exist or a folder without a lockfile in any of the {@link LOCKFILE_LOCATIONS}.
 */
export async function findLockfiles(paths: readonly string[], cwd: string): Promise<string[]> {
  const inputs = paths.length > 0 ? paths : ['.'];
  const found = new Set<string>();
  for (const input of inputs) {
    const absolute = resolve(cwd, input);
    const type = await kind(absolute);
    if (type === 'file') {
      found.add(absolute);
      continue;
    }
    if (type === null) throw new DiscoveryError(`${input}: no such file or folder.`);
    const lockfiles = await lockfilesIn(absolute);
    if (lockfiles.length === 0) {
      const where = relative(cwd, absolute) || 'this folder';
      throw new DiscoveryError(
        `No Podfile.lock in ${where} (looked for ${LOCKFILE_LOCATIONS.join(', ')}). Run \`pod install\` first, or pass the path to a Podfile.lock.`,
      );
    }
    for (const lockfile of lockfiles) found.add(lockfile);
  }
  return [...found];
}
