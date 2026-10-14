import { stripVTControlCharacters } from 'node:util';
import { describe, expect, it } from 'vitest';
import { analyzeLockfile, buildReport, type Report } from '../../src/analyze.js';
import { podspecUrl, trunkPodUrl, versionsIndexUrl } from '../../src/net/cocoapods.js';
import { render } from '../../src/report/index.js';
import { orderPods, requiredByLabel, summaryLines } from '../../src/report/labels.js';
import { FakeFetcher, ok } from '../helpers/fake-fetcher.js';
import { POLICY } from '../helpers/pods.js';

const LOCKFILE = `PODS:
  - Alamofire (5.9.1)
  - FirebaseAnalytics (11.15.0):
    - FirebaseCore (~> 11.15.0)
  - FirebaseCore (11.15.0)
  - Flutter (1.0.0)
  - Pipe|Pod (1.0.0)
  - Stale (0.4.0)

DEPENDENCIES:
  - Alamofire
  - FirebaseAnalytics
  - Flutter (from \`Flutter\`)
  - Pipe|Pod
  - Stale

SPEC REPOS:
  trunk:
    - Alamofire
    - FirebaseAnalytics
    - FirebaseCore
    - Pipe|Pod
    - Stale

EXTERNAL SOURCES:
  Flutter:
    :path: Flutter

COCOAPODS: 1.16.2
`;

const raw = (repo: string, ref = 'HEAD') =>
  `https://raw.githubusercontent.com/${repo}/${ref}/Package.swift`;

async function sampleReport(offline = false): Promise<Report> {
  const fetcher = new FakeFetcher({
    [versionsIndexUrl('Alamofire')]: ok('Alamofire/5.9.1/5.12.2\n'),
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
    [podspecUrl('Stale', '0.4.0')]: ok({
      name: 'Stale',
      version: '0.4.0',
      source: { git: 'https://github.com/acme/Stale.git', tag: '0.4.0' },
    }),
  });
  const lockfile = await analyzeLockfile(LOCKFILE, 'ios/Podfile.lock', {
    fetcher,
    policy: POLICY,
  });
  return buildReport([lockfile], {
    policy: POLICY,
    offline,
    now: new Date('2026-10-14T12:00:00Z'),
  });
}

describe('labels', async () => {
  const report = await sampleReport();
  const pods = report.lockfiles[0]?.pods ?? [];

  it('orders capped, then frozen, then not affected, Podfile pods first', () => {
    expect(orderPods(pods).map((pod) => pod.name)).toEqual([
      'FirebaseAnalytics',
      'FirebaseCore',
      'Alamofire',
      'Pipe|Pod',
      'Stale',
      'Flutter',
    ]);
  });

  it('names the pod that pulled in a transitive dependency', () => {
    const core = pods.find((pod) => pod.name === 'FirebaseCore');
    expect(core && requiredByLabel(core)).toBe('FirebaseAnalytics');
  });

  it('pluralises the summary', () => {
    const summary = report.lockfiles[0]?.summary;
    expect(summary && summaryLines(summary)).toEqual([
      '3 frozen on trunk · 2 capped by the publisher · 1 not affected',
      '3 pods with a Swift package · 1 without · 1 unknown',
    ]);
  });
});

describe('render', async () => {
  const report = await sampleReport();

  it('prints a plain terminal table without colour codes', () => {
    const text = render(report, 'tty', { color: false, all: false });
    expect(text).not.toContain('\u001b[');
    expect(text).toContain('CocoaPods trunk goes read-only on 2026-12-02');
    expect(text).toContain('Builds keep working');
    expect(text).toContain('1 more from local paths, git or private specs');
    expect(text.split('\n').every((line) => line === line.trimEnd())).toBe(true);
    expect(text).toMatchSnapshot();
  });

  it('lists local pods too with --all', () => {
    const text = render(report, 'tty', { color: false, all: true });
    expect(text).toMatch(/^ {2}Flutter +1\.0\.0 +not affected +-$/m);
    expect(text).not.toContain('--all lists them');
  });

  it('colours statuses only when asked', () => {
    const text = render(report, 'tty', { color: true, all: false });
    expect(text).toContain('\u001b[35mcapped at 12.x');
    expect(text).toContain('\u001b[33mfrozen after Dec 2');
    expect(stripVTControlCharacters(text)).toBe(
      render(report, 'tty', { color: false, all: false }),
    );
  });

  it('writes GitHub Markdown with escaped table cells', () => {
    const text = render(report, 'markdown');
    expect(text).toContain('| `Pipe\\|Pod` |');
    expect(text).toContain('[yes](https://github.com/Alamofire/Alamofire) |');
    expect(text).toContain('<summary>1 pod from local paths, git or private specs');
    expect(text).toMatchSnapshot();
  });

  it('writes the report object as JSON', () => {
    const parsed = JSON.parse(render(report, 'json')) as Report;
    expect(parsed).toEqual(JSON.parse(JSON.stringify(report)));
    expect(parsed.schemaVersion).toBe(0);
  });

  it('says when answers came from the cache only', async () => {
    const text = render(await sampleReport(true), 'tty', { color: false, all: false });
    expect(text).toContain('Offline: answers come from the cache');
    expect(render(await sampleReport(true), 'markdown')).toContain('2026-10-14, offline');
  });
});
