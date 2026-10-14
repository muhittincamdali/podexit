import { describe, expect, it } from 'vitest';
import { analyzeLockfile, buildReport } from '../../src/analyze.js';
import { podspecUrl, trunkPodUrl, versionsIndexUrl } from '../../src/net/cocoapods.js';
import { OfflineFetcher } from '../../src/net/fetcher.js';
import { FakeFetcher, ok } from '../helpers/fake-fetcher.js';
import { POLICY } from '../helpers/pods.js';

const LOCKFILE = `PODS:
  - Alamofire (5.9.1)
  - FirebaseCore (12.4.0)
  - GoogleAppMeasurement (12.4.0)
  - Legacy (1.0.0)
  - SnapKit (5.7.1)
  - Tiny (2.0.0)

DEPENDENCIES:
  - Alamofire (~> 5.9)
  - FirebaseCore
  - Legacy
  - SnapKit (from \`https://github.com/SnapKit/SnapKit.git\`, tag \`5.7.1\`)
  - Tiny

SPEC REPOS:
  trunk:
    - Alamofire
    - FirebaseCore
    - GoogleAppMeasurement
    - Legacy
    - Tiny

EXTERNAL SOURCES:
  SnapKit:
    :git: https://github.com/SnapKit/SnapKit.git
    :tag: 5.7.1

COCOAPODS: 1.16.2
`;

const raw = (repo: string, ref = 'HEAD') =>
  `https://raw.githubusercontent.com/${repo}/${ref}/Package.swift`;

function network(): FakeFetcher {
  return new FakeFetcher({
    [versionsIndexUrl('Alamofire')]: ok('Alamofire/5.9.1/5.10.2/5.12.2\n'),
    [trunkPodUrl('Alamofire')]: ok({
      versions: [
        { name: '5.9.1', created_at: '2024-03-31 01:24:57 UTC' },
        { name: '5.12.2', created_at: '2026-09-10 01:47:20 UTC' },
      ],
    }),
    [podspecUrl('Alamofire', '5.9.1')]: ok({
      name: 'Alamofire',
      version: '5.9.1',
      source: { git: 'https://github.com/Alamofire/Alamofire.git', tag: '5.9.1' },
    }),
    [raw('Alamofire/Alamofire')]: { status: 200, body: '' },
    [raw('Alamofire/Alamofire', '5.9.1')]: { status: 200, body: '' },
    [podspecUrl('GoogleAppMeasurement', '12.4.0')]: ok({
      name: 'GoogleAppMeasurement',
      version: '12.4.0',
      source: {
        http: 'https://dl.google.com/firebase/ios/analytics/GoogleAppMeasurement-12.4.0.tar.gz',
      },
    }),
    [podspecUrl('Legacy', '1.0.0')]: ok({
      name: 'Legacy',
      version: '1.0.0',
      source: { git: 'https://github.com/acme/Legacy.git', tag: 'v1.0.0' },
    }),
    [raw('acme/Legacy')]: { status: 200, body: '' },
    [podspecUrl('Tiny', '2.0.0')]: ok({
      name: 'Tiny',
      version: '2.0.0',
      source: { git: 'https://github.com/acme/Tiny.git', tag: '2.0.0' },
    }),
    [raw('SnapKit/SnapKit')]: { status: 200, body: '' },
    [raw('SnapKit/SnapKit', '5.7.1')]: { status: 200, body: '' },
  });
}

describe('analyzeLockfile', async () => {
  const fetcher = network();
  const report = await analyzeLockfile(LOCKFILE, 'ios/Podfile.lock', { fetcher, policy: POLICY });
  const pod = (name: string) => {
    const found = report.pods.find((candidate) => candidate.name === name);
    if (!found) throw new Error(`no pod ${name}`);
    return found;
  };

  it('reports how far a trunk pod is behind and where its package is', () => {
    expect(pod('Alamofire')).toMatchObject({
      updates: {
        status: 'frozen-on-trunk',
        latestOnTrunk: '5.12.2',
        latestReleasedAt: '2026-09-10T01:47:20.000Z',
        lockedReleasedAt: '2024-03-31T01:24:57.000Z',
        behindTrunk: true,
      },
      swiftPackage: {
        status: 'spm-available',
        repository: 'https://github.com/Alamofire/Alamofire',
        atLockedVersion: true,
        via: 'upstream',
      },
    });
  });

  it('takes the Swift package of capped pods from the publisher policy', () => {
    expect(pod('FirebaseCore')).toMatchObject({
      updates: { status: 'capped', publisher: { id: 'firebase', lastMajorOnCocoaPods: 12 } },
      swiftPackage: {
        status: 'spm-available',
        via: 'publisher',
        repository: 'https://github.com/firebase/firebase-ios-sdk',
      },
    });
  });

  it('says why a binary pod has no answer', () => {
    expect(pod('GoogleAppMeasurement').swiftPackage).toMatchObject({
      status: 'unknown',
      summary: 'The podspec points to dl.google.com, not a GitHub repository.',
    });
  });

  it('flags a package that exists only after the locked version', () => {
    expect(pod('Legacy').swiftPackage).toMatchObject({
      status: 'spm-available',
      atLockedVersion: false,
    });
    expect(pod('Legacy').swiftPackage.summary).toContain('the switch needs a newer version');
  });

  it('reports no-spm when the repository has no Package.swift', () => {
    expect(pod('Tiny').swiftPackage).toMatchObject({
      status: 'no-spm',
      repository: 'https://github.com/acme/Tiny',
    });
  });

  it('checks git sources at their tag', () => {
    expect(pod('SnapKit')).toMatchObject({
      updates: { status: 'not-affected', latestOnTrunk: null },
      swiftPackage: { status: 'spm-available', atLockedVersion: true },
    });
  });

  it('summarizes the counts', () => {
    expect(report.summary).toEqual({
      pods: 6,
      direct: 5,
      frozenOnTrunk: 4,
      capped: 1,
      notAffected: 1,
      unknown: 0,
      spmAvailable: 4,
      noSpm: 1,
      spmUnknown: 1,
    });
    expect(report.project).toBe('native');
  });

  it('does not ask GitHub twice for a repository without Package.swift', () => {
    expect(fetcher.requests.filter((request) => request.includes('acme/Tiny'))).toHaveLength(1);
  });
});

describe('analyzeLockfile without a network', () => {
  it('still classifies from the lockfile and marks the rest unknown', async () => {
    const report = await analyzeLockfile(LOCKFILE, 'Podfile.lock', {
      fetcher: new OfflineFetcher(),
      policy: POLICY,
      concurrency: 2,
    });
    const alamofire = report.pods.find(({ name }) => name === 'Alamofire');
    expect(alamofire?.updates).toMatchObject({
      status: 'frozen-on-trunk',
      latestOnTrunk: null,
      behindTrunk: null,
    });
    expect(alamofire?.swiftPackage).toMatchObject({
      status: 'unknown',
      summary: 'No podspec answer from the CocoaPods CDN (offline, or nothing recorded).',
    });
  });
});

describe('capped subdependencies', () => {
  const lockfile = `PODS:
  - FirebaseCore (12.4.0):
    - GoogleUtilities/Environment (~> 8.1)
  - GoogleUtilities/Environment (8.1.4)

DEPENDENCIES:
  - FirebaseCore

SPEC REPOS:
  trunk:
    - FirebaseCore
    - GoogleUtilities
`;

  it('caps them and looks up their own Swift package upstream', async () => {
    const fetcher = new FakeFetcher({
      [podspecUrl('GoogleUtilities', '8.1.4')]: ok({
        name: 'GoogleUtilities',
        version: '8.1.4',
        source: { git: 'https://github.com/google/GoogleUtilities.git', tag: '8.1.4' },
      }),
      [raw('google/GoogleUtilities')]: { status: 200, body: '' },
      [raw('google/GoogleUtilities', '8.1.4')]: { status: 200, body: '' },
    });
    const report = await analyzeLockfile(lockfile, 'Podfile.lock', { fetcher, policy: POLICY });
    const utilities = report.pods.find(({ name }) => name === 'GoogleUtilities');
    expect(utilities?.updates).toMatchObject({
      status: 'capped',
      via: 'FirebaseCore',
      publisher: { id: 'firebase' },
    });
    expect(utilities?.swiftPackage).toMatchObject({
      status: 'spm-available',
      via: 'upstream',
      repository: 'https://github.com/google/GoogleUtilities',
      atLockedVersion: true,
    });
    expect(report.summary).toMatchObject({ capped: 2, frozenOnTrunk: 0 });
  });
});

describe('buildReport', () => {
  it('always carries the builds-keep-working note and the timeline', () => {
    const report = buildReport([], {
      policy: POLICY,
      offline: true,
      now: new Date('2026-10-14T00:00:00Z'),
    });
    expect(report).toMatchObject({
      schemaVersion: 0,
      generatedAt: '2026-10-14T00:00:00.000Z',
      offline: true,
      policyDataVersion: '2026.10.14',
      timeline: { readOnly: '2026-12-02' },
    });
    expect(report.notes[0]).toMatch(/^Builds keep working/);
  });
});
