import { describe, expect, it } from 'vitest';
import {
  compareVersions,
  isPrerelease,
  latestVersion,
  majorVersion,
} from '../../src/core/versions.js';

describe('compareVersions', () => {
  it.each([
    ['5.10.2', '5.9.1', 1],
    ['5.9.1', '5.10.2', -1],
    ['1.0', '1.0.0', 0],
    ['1.0.0', '1.0.1', -1],
    ['2024.10.14.00', '2024.01.22.00', 1],
    ['5.0.0-beta.1', '5.0.0', -1],
    ['5.0.0.beta.1', '5.0.0-beta.2', -1],
    ['5.0.0-rc.1', '5.0.0-beta.7', 1],
    ['1.0.0', '1.0.0-rc.1', 1],
    ['12.4.0', '12.19.0', -1],
  ])('%s vs %s -> %i', (left, right, expected) => {
    expect(compareVersions(left, right)).toBe(expected);
  });
});

describe('isPrerelease', () => {
  it.each([
    ['5.10.2', false],
    ['2024.10.14.00', false],
    ['5.0.0-beta.1', true],
    ['5.0.0.beta.1', true],
    ['1.0.0-rc1', true],
  ])('%s -> %s', (version, expected) => {
    expect(isPrerelease(version)).toBe(expected);
  });
});

describe('latestVersion', () => {
  it('sorts numerically, not as text', () => {
    // The CDN index lists versions in text order, where 5.9.1 comes after 5.12.2.
    expect(latestVersion(['5.1.0', '5.10.0', '5.12.2', '5.2.0', '5.9.1'])).toBe('5.12.2');
  });

  it('ignores pre-releases when there is a release', () => {
    expect(latestVersion(['5.10.2', '6.0.0-beta.1'])).toBe('5.10.2');
  });

  it('falls back to pre-releases when that is all there is', () => {
    expect(latestVersion(['1.0.0-beta.1', '1.0.0-beta.2'])).toBe('1.0.0-beta.2');
  });

  it('returns null for an empty list', () => {
    expect(latestVersion([])).toBeNull();
  });
});

describe('majorVersion', () => {
  it('reads the first numeric segment', () => {
    expect(majorVersion('12.4.0')).toBe(12);
    expect(majorVersion('beta')).toBeNull();
  });
});
