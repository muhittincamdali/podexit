import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { analyzeLockfile, buildReport, type LockfileReport } from '../../src/analyze.js';
import { loadPublisherPolicy } from '../../src/data.js';
import { CachedFetcher } from '../../src/net/cache.js';
import { OfflineFetcher } from '../../src/net/fetcher.js';
import { render } from '../../src/report/index.js';

// Real lockfiles from projects created with each toolchain, and the network answers recorded for
// them by `npm run fixtures:record`. Nothing here touches the network.
const FIXTURES = fileURLToPath(new URL('../../fixtures/', import.meta.url));
const SNAPSHOTS = '../__snapshots__/fixtures';
const NOW = new Date('2026-10-14T12:00:00Z');

const LOCKFILES = {
  'native-app': 'native-app/Podfile.lock',
  'flutter-app': 'flutter-app/ios/Podfile.lock',
  'flutter-plugin': 'flutter-plugin/example/ios/Podfile.lock',
  'expo-app': 'expo-app/ios/Podfile.lock',
  'rn-app': 'rn-app/ios/Podfile.lock',
} as const;

type Fixture = keyof typeof LOCKFILES;

const policy = loadPublisherPolicy();
const fetcher = new CachedFetcher(new OfflineFetcher(), { directory: `${FIXTURES}responses` });

async function analyze(fixture: Fixture): Promise<LockfileReport> {
  const path = LOCKFILES[fixture];
  return analyzeLockfile(await readFile(`${FIXTURES}${path}`, 'utf8'), path, { fetcher, policy });
}

const pod = (report: LockfileReport, name: string) => {
  const found = report.pods.find((candidate) => candidate.name === name);
  if (!found) throw new Error(`${name} is not in ${report.path}`);
  return found;
};

describe.each(Object.keys(LOCKFILES) as Fixture[])('%s', (fixture) => {
  it('matches the JSON, Markdown and terminal snapshots', async () => {
    const report = buildReport([await analyze(fixture)], { policy, offline: true, now: NOW });
    // The package version changes with every release; the snapshots should not.
    report.tool.version = '0.0.0-snapshot';
    await expect(render(report, 'json')).toMatchFileSnapshot(`${SNAPSHOTS}/${fixture}.json`);
    await expect(render(report, 'markdown')).toMatchFileSnapshot(`${SNAPSHOTS}/${fixture}.md`);
    await expect(render(report, 'tty', { color: false, all: true })).toMatchFileSnapshot(
      `${SNAPSHOTS}/${fixture}.txt`,
    );
  });

  it('has a recorded answer for every trunk lookup', async () => {
    const report = await analyze(fixture);
    for (const { name, source, updates } of report.pods) {
      if (source.kind === 'trunk') expect(updates.latestOnTrunk, name).not.toBeNull();
    }
  });
});

describe('what the fixtures show', () => {
  it('native app: Firebase pods are capped, the rest of trunk is frozen', async () => {
    const report = await analyze('native-app');
    expect(report.project).toBe('native');
    expect(pod(report, 'FirebaseAnalytics').updates).toMatchObject({
      status: 'capped',
      publisher: { lastMajorOnCocoaPods: 12 },
    });
    expect(pod(report, 'GoogleUtilities').updates).toMatchObject({
      status: 'capped',
      via: 'FirebaseAnalytics',
    });
    expect(pod(report, 'Alamofire').updates.status).toBe('frozen-on-trunk');
    expect(pod(report, 'Alamofire').swiftPackage).toMatchObject({
      status: 'spm-available',
      atLockedVersion: true,
    });
    expect(pod(report, 'SwiftyJSON').source).toMatchObject({ kind: 'git', tag: '5.0.2' });
    expect(pod(report, 'AppCore').updates.status).toBe('not-affected');
  });

  it('native app: binary pods from dl.google.com are unknown, with the reason', async () => {
    const report = await analyze('native-app');
    expect(pod(report, 'GoogleAppMeasurement').swiftPackage).toMatchObject({
      status: 'unknown',
      summary: 'The podspec points to dl.google.com, not a GitHub repository.',
    });
  });

  it('Flutter app: plugins are local paths, the SDKs they pull in are on trunk', async () => {
    const report = await analyze('flutter-app');
    expect(report.project).toBe('flutter-app');
    expect(pod(report, 'firebase_core').updates.status).toBe('not-affected');
    expect(pod(report, 'Firebase').requiredBy).toContain('firebase_core');
    expect(pod(report, 'GoogleSignIn').requiredBy).toEqual(['google_sign_in_ios']);
  });

  it('Flutter plugin: the example app is detected and libwebp has no Swift package', async () => {
    const report = await analyze('flutter-plugin');
    expect(report.project).toBe('flutter-plugin');
    expect(pod(report, 'libwebp').swiftPackage.status).toBe('no-spm');
    expect(pod(report, 'SDWebImageWebPCoder').requiredBy).toEqual(['image_cache_plugin']);
  });

  it('Expo app: only the SDKs behind native modules come from trunk', async () => {
    const report = await analyze('expo-app');
    expect(report.project).toBe('expo');
    const trunk = report.pods
      .filter(({ source }) => source.kind === 'trunk')
      .map(({ name }) => name);
    expect(trunk).toEqual(['lottie-ios', 'PurchasesHybridCommon', 'RevenueCat', 'Sentry']);
    expect(pod(report, 'Sentry').updates.behindTrunk).toBe(true);
  });

  it('React Native app: Firebase arrives through Swift Package Manager, not trunk', async () => {
    const report = await analyze('rn-app');
    expect(report.project).toBe('react-native');
    expect(report.pods.some(({ name }) => name.startsWith('Firebase'))).toBe(false);
    expect(pod(report, 'RNFBApp').updates.status).toBe('not-affected');
    expect(pod(report, 'TOCropViewController').updates.status).toBe('frozen-on-trunk');
  });
});
