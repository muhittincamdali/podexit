import { describe, expect, it } from 'vitest';
import { LockfileError, parseLockfile, rootName } from '../../src/core/lockfile.js';

const LOCKFILE = `PODS:
  - Alamofire (5.9.1)
  - Firebase/Analytics (12.4.0):
    - Firebase/Core
  - Firebase/Core (12.4.0):
    - Firebase/CoreOnly
    - FirebaseAnalytics (~> 12.4.0)
  - Firebase/CoreOnly (12.4.0):
    - FirebaseCore (~> 12.4.0)
  - FirebaseAnalytics (12.4.0):
    - FirebaseCore (~> 12.4.0)
  - FirebaseCore (12.4.0)
  - Flutter (1.0.0)
  - "glog (0.3.5)"
  - InternalKit (2.1.0)
  - SnapKit (5.7.1)
  - url_launcher_ios (0.0.1):
    - Flutter

DEPENDENCIES:
  - Alamofire (~> 5.9)
  - Firebase/Analytics
  - Flutter (from \`Flutter\`)
  - glog (from \`../node_modules/react-native/third-party-podspecs/glog.podspec\`)
  - InternalKit
  - SnapKit (from \`https://github.com/SnapKit/SnapKit.git\`, branch \`develop\`)
  - url_launcher_ios (from \`.symlinks/plugins/url_launcher_ios/ios\`)

SPEC REPOS:
  https://github.com/CocoaPods/Specs.git:
    - Alamofire
  https://github.com/acme/private-specs.git:
    - InternalKit
  trunk:
    - Firebase
    - FirebaseAnalytics
    - FirebaseCore

EXTERNAL SOURCES:
  Flutter:
    :path: Flutter
  glog:
    :podspec: "../node_modules/react-native/third-party-podspecs/glog.podspec"
  SnapKit:
    :branch: develop
    :git: https://github.com/SnapKit/SnapKit.git
  url_launcher_ios:
    :path: ".symlinks/plugins/url_launcher_ios/ios"

CHECKOUT OPTIONS:
  SnapKit:
    :commit: 1f3e3c4b2a
    :git: https://github.com/SnapKit/SnapKit.git

SPEC CHECKSUMS:
  Alamofire: f36a35757af4587d8e4f4bfa223ad10be2422b8c

PODFILE CHECKSUM: 4d1a1b2f

COCOAPODS: 1.10
`;

describe('parseLockfile', () => {
  const lockfile = parseLockfile(LOCKFILE);
  const pod = (name: string) => {
    const found = lockfile.pods.find((candidate) => candidate.name === name);
    if (!found) throw new Error(`no pod ${name}`);
    return found;
  };

  it('folds subspecs into the root pod', () => {
    expect(pod('Firebase')).toMatchObject({
      version: '12.4.0',
      subspecs: ['Analytics', 'Core', 'CoreOnly'],
      dependencies: ['FirebaseAnalytics', 'FirebaseCore'],
    });
    expect(lockfile.pods.map(({ name }) => name)).toEqual([
      'Alamofire',
      'Firebase',
      'FirebaseAnalytics',
      'FirebaseCore',
      'Flutter',
      'glog',
      'InternalKit',
      'SnapKit',
      'url_launcher_ios',
    ]);
  });

  it('classifies every kind of source', () => {
    expect(pod('Alamofire').source).toEqual({ kind: 'trunk' });
    expect(pod('FirebaseCore').source).toEqual({ kind: 'trunk' });
    expect(pod('InternalKit').source).toEqual({
      kind: 'spec-repo',
      url: 'https://github.com/acme/private-specs.git',
    });
    expect(pod('Flutter').source).toEqual({ kind: 'path', path: 'Flutter' });
    expect(pod('url_launcher_ios').source).toEqual({
      kind: 'path',
      path: '.symlinks/plugins/url_launcher_ios/ios',
    });
    expect(pod('glog').source).toEqual({
      kind: 'podspec',
      url: '../node_modules/react-native/third-party-podspecs/glog.podspec',
    });
    expect(pod('SnapKit').source).toEqual({
      kind: 'git',
      url: 'https://github.com/SnapKit/SnapKit.git',
      branch: 'develop',
      commit: '1f3e3c4b2a',
    });
  });

  it('separates Podfile dependencies from transitive ones', () => {
    expect(pod('Firebase').direct).toBe(true);
    expect(pod('FirebaseCore').direct).toBe(false);
    expect(pod('FirebaseCore').requiredBy).toEqual(['Firebase', 'FirebaseAnalytics']);
    expect(pod('Flutter').requiredBy).toEqual(['url_launcher_ios']);
  });

  it('keeps scalar values as written', () => {
    expect(lockfile.cocoapodsVersion).toBe('1.10');
    expect(lockfile.podfileChecksum).toBe('4d1a1b2f');
  });

  it('rejects files that are not a Podfile.lock', () => {
    expect(() => parseLockfile('name: my_app\nversion: 1.0.0\n')).toThrow(LockfileError);
    expect(() => parseLockfile('PODS: [unclosed')).toThrow(
      /^This Podfile.lock is not valid YAML: /,
    );
    // Markdown is not YAML; the error should name the real problem, not the YAML parser's.
    expect(() =>
      parseLockfile('# My app\n\nRun it: `flutter run`\nSetup: see\n  docs: here\n'),
    ).toThrow('This file has no PODS section, so it is not a Podfile.lock.');
    expect(() => parseLockfile('PODS:\n  - not an entry\n')).toThrow(/Unexpected PODS entry/);
    expect(() => parseLockfile('PODS: nope\n')).toThrow(/not a list/);
  });

  it('treats pods missing from SPEC REPOS and EXTERNAL SOURCES as unknown', () => {
    const { pods } = parseLockfile('PODS:\n  - Orphan (1.0.0)\n');
    expect(pods[0]?.source).toEqual({ kind: 'unknown' });
    expect(pods[0]?.direct).toBe(false);
  });
});

describe('rootName', () => {
  it('drops the subspec path', () => {
    expect(rootName('Firebase/Analytics')).toBe('Firebase');
    expect(rootName('GoogleUtilities/Environment/Swift')).toBe('GoogleUtilities');
    expect(rootName('Alamofire')).toBe('Alamofire');
  });
});
