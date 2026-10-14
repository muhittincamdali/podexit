import { describe, expect, it } from 'vitest';
import { classifyLockfile, classifyUpdates, describeUpdates } from '../../src/core/classify.js';
import type { PodSource } from '../../src/core/lockfile.js';
import { detectProjectKind } from '../../src/core/project.js';
import { lockedPod, POLICY } from '../helpers/pods.js';

describe('classifyUpdates', () => {
  it.each<[string, string, PodSource, string]>([
    ['trunk pod', 'Alamofire', { kind: 'trunk' }, 'frozen-on-trunk'],
    ['trunk pod with a publisher cap', 'FirebaseAnalytics', { kind: 'trunk' }, 'capped'],
    [
      'capped pod from a local path',
      'FirebaseCore',
      { kind: 'path', path: '../vendor/FirebaseCore' },
      'not-affected',
    ],
    [
      'Flutter plugin',
      'url_launcher_ios',
      { kind: 'path', path: '.symlinks/plugins/url_launcher_ios/ios' },
      'not-affected',
    ],
    [
      'git pod',
      'SnapKit',
      { kind: 'git', url: 'https://github.com/SnapKit/SnapKit.git' },
      'not-affected',
    ],
    [
      'podspec file',
      'glog',
      { kind: 'podspec', url: '../node_modules/react-native/glog.podspec' },
      'not-affected',
    ],
    [
      'private specs repo',
      'InternalKit',
      { kind: 'spec-repo', url: 'https://github.com/acme/specs.git' },
      'not-affected',
    ],
    ['pod without a source', 'Orphan', { kind: 'unknown' }, 'unknown'],
  ])('%s -> %s', (_label, name, source, expected) => {
    expect(classifyUpdates(lockedPod(name, source), POLICY).status).toBe(expected);
  });

  it('returns the publisher for capped pods', () => {
    expect(
      classifyUpdates(lockedPod('FirebaseCore', { kind: 'trunk' }), POLICY).publisher?.id,
    ).toBe('firebase');
  });
});

describe('classifyLockfile', () => {
  // FirebaseAnalytics -> GoogleAppMeasurement -> GoogleUtilities; Alamofire stands alone.
  const pods = [
    lockedPod('Alamofire', { kind: 'trunk' }),
    lockedPod('FirebaseAnalytics', { kind: 'trunk' }, { dependencies: ['GoogleAppMeasurement'] }),
    lockedPod('GoogleAppMeasurement', { kind: 'trunk' }, { dependencies: ['GoogleUtilities'] }),
    lockedPod('GoogleUtilities', { kind: 'trunk' }, { direct: false }),
  ];

  it('caps the trunk pods a capped pod depends on, directly or not', () => {
    const result = classifyLockfile(pods, POLICY);
    expect(result.get('FirebaseAnalytics')).toMatchObject({ status: 'capped' });
    expect(result.get('FirebaseAnalytics')?.via).toBeUndefined();
    expect(result.get('GoogleAppMeasurement')).toMatchObject({
      status: 'capped',
      via: 'FirebaseAnalytics',
    });
    expect(result.get('GoogleUtilities')).toMatchObject({
      status: 'capped',
      via: 'FirebaseAnalytics',
    });
    expect(result.get('Alamofire')?.status).toBe('frozen-on-trunk');
  });

  it('names the nearest listed pod as the one that pulls a dependency in', () => {
    const result = classifyLockfile(
      [
        lockedPod('FirebaseAnalytics', { kind: 'trunk' }, { dependencies: ['FirebaseCore'] }),
        lockedPod('FirebaseCore', { kind: 'trunk' }, { dependencies: ['FirebaseCoreInternal'] }),
        lockedPod('FirebaseCoreInternal', { kind: 'trunk' }),
      ],
      POLICY,
    );
    // FirebaseCore is listed itself, so it is capped directly, not as a subdependency.
    expect(result.get('FirebaseCore')?.via).toBeUndefined();
    expect(result.get('FirebaseCoreInternal')?.via).toBe('FirebaseCore');
  });

  it('leaves dependencies from local paths, git and private specs alone', () => {
    const result = classifyLockfile(
      [
        lockedPod('FirebaseAnalytics', { kind: 'trunk' }, { dependencies: ['Vendored'] }),
        lockedPod('Vendored', { kind: 'path', path: '../Vendored' }),
      ],
      POLICY,
    );
    expect(result.get('Vendored')?.status).toBe('not-affected');
  });

  it('does not cap dependencies when the source does not cover them', () => {
    const [firebase] = POLICY.publishers;
    if (!firebase) throw new Error('POLICY has no publisher');
    const policy = { ...POLICY, publishers: [{ ...firebase, includesSubdependencies: false }] };
    expect(classifyLockfile(pods, policy).get('GoogleUtilities')?.status).toBe('frozen-on-trunk');
  });
});

describe('describeUpdates', () => {
  it('never says a frozen pod breaks', () => {
    const text = describeUpdates('frozen-on-trunk', lockedPod('Alamofire', { kind: 'trunk' }));
    expect(text).toContain('no new versions');
    expect(text).not.toMatch(/break|fail/i);
  });

  it('names the cap for capped pods', () => {
    const publisher = POLICY.publishers[0];
    const text = describeUpdates('capped', lockedPod('FirebaseCore', { kind: 'trunk' }), publisher);
    expect(text).toContain('Firebase stopped at 12.x on CocoaPods');
  });

  it('names the listed pod for a capped subdependency', () => {
    const [firebase] = POLICY.publishers;
    const pod = lockedPod('GoogleUtilities', { kind: 'trunk' });
    expect(describeUpdates('capped', pod, firebase, 'FirebaseAnalytics')).toBe(
      'Subdependency of FirebaseAnalytics: Firebase stops publishing its pods and their subdependencies to CocoaPods (2026-10).',
    );
  });

  it('names the source for pods outside trunk', () => {
    const pod = lockedPod('Flutter', { kind: 'path', path: 'Flutter' });
    expect(describeUpdates('not-affected', pod)).toContain('Local path (Flutter)');
  });
});

describe('detectProjectKind', () => {
  const flutter = lockedPod('Flutter', { kind: 'path', path: 'Flutter' });

  it.each([
    ['a Flutter app', [flutter], 'ios/Podfile.lock', 'flutter-app'],
    ['a Flutter plugin example', [flutter], 'my_plugin/example/ios/Podfile.lock', 'flutter-plugin'],
    [
      'an Expo app',
      [
        lockedPod('ExpoModulesCore', { kind: 'path', path: '../node_modules/expo-modules-core' }),
        lockedPod('React-Core', { kind: 'path', path: 'x' }),
      ],
      'ios/Podfile.lock',
      'expo',
    ],
    [
      'a React Native app',
      [lockedPod('React-Core', { kind: 'path', path: 'x' })],
      'ios/Podfile.lock',
      'react-native',
    ],
    ['a native app', [lockedPod('Alamofire', { kind: 'trunk' })], 'Podfile.lock', 'native'],
  ])('recognises %s', (_label, pods, path, expected) => {
    expect(detectProjectKind(pods, path)).toBe(expected);
  });

  it('does not take a trunk pod named Flutter for a Flutter app', () => {
    expect(detectProjectKind([lockedPod('Flutter', { kind: 'trunk' })])).toBe('native');
  });
});
