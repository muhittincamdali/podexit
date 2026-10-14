// CocoaPods versions look like semver ("5.10.2", "5.0.0-beta.1") but also allow more segments
// ("2024.10.14.00") and dots before a pre-release tag ("5.0.0.beta.1"). Comparison follows the
// rules of RubyGems' Gem::Version, which CocoaPods uses: numeric segments compare as numbers,
// and a segment with letters marks a pre-release that sorts before the release.

type Segment = number | string;

function segments(version: string): Segment[] {
  return version
    .trim()
    .split(/[.-]/)
    .filter((part) => part !== '')
    .flatMap((part) => part.match(/\d+|[a-z]+/gi) ?? [])
    .map((part) => (/^\d+$/.test(part) ? Number(part) : part.toLowerCase()));
}

/** True when the version has a letter segment, e.g. `5.0.0-beta.1` or `2.0.0.rc.1`. */
export function isPrerelease(version: string): boolean {
  return segments(version).some((segment) => typeof segment === 'string');
}

function compareSegment(left: Segment | undefined, right: Segment | undefined): number {
  if (left === right) return 0;
  // A missing segment counts as 0 against a number ("1.0" == "1.0.0") and as a release against a
  // pre-release tag ("1.0" > "1.0.beta").
  if (left === undefined) return typeof right === 'string' ? 1 : compareSegment(0, right);
  if (right === undefined) return -compareSegment(right, left);
  if (typeof left === 'number' && typeof right === 'number') return Math.sign(left - right);
  if (typeof left === 'string' && typeof right === 'string') return left < right ? -1 : 1;
  return typeof left === 'string' ? -1 : 1;
}

/** Orders two CocoaPods versions: negative when `left` is older, positive when newer. */
export function compareVersions(left: string, right: string): number {
  const a = segments(left);
  const b = segments(right);
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    const result = compareSegment(a[index], b[index]);
    if (result !== 0) return result;
  }
  return 0;
}

/**
 * The newest release in a list of versions. Pre-releases count only when the list has nothing
 * else, so a `6.0.0-beta.1` does not hide the `5.10.2` most projects should compare against.
 */
export function latestVersion(versions: readonly string[]): string | null {
  const releases = versions.filter((version) => !isPrerelease(version));
  const pool = releases.length > 0 ? releases : versions;
  return pool.reduce<string | null>(
    (latest, version) =>
      latest === null || compareVersions(version, latest) > 0 ? version : latest,
    null,
  );
}

/** Major version number, e.g. 12 for `12.4.0`; null when the version does not start with one. */
export function majorVersion(version: string): number | null {
  const first = segments(version)[0];
  return typeof first === 'number' ? first : null;
}
