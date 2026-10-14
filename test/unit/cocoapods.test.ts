import { describe, expect, it } from 'vitest';
import {
  fetchPodspec,
  podspecUrl,
  releaseDates,
  shard,
  trunkPodUrl,
  trunkVersions,
  versionsIndexUrl,
} from '../../src/net/cocoapods.js';
import { FakeFetcher, ok } from '../helpers/fake-fetcher.js';

describe('CDN paths', () => {
  it('shards by the MD5 of the pod name', () => {
    // md5("Alamofire") = da2...
    expect(shard('Alamofire')).toEqual(['d', 'a', '2']);
    expect(versionsIndexUrl('Alamofire')).toBe(
      'https://cdn.cocoapods.org/all_pods_versions_d_a_2.txt',
    );
    expect(podspecUrl('Alamofire', '5.10.2')).toBe(
      'https://cdn.cocoapods.org/Specs/d/a/2/Alamofire/5.10.2/Alamofire.podspec.json',
    );
    expect(trunkPodUrl('Alamofire')).toBe('https://trunk.cocoapods.org/api/v1/pods/Alamofire');
  });
});

describe('trunkVersions', () => {
  const index = versionsIndexUrl('Alamofire');

  it('reads the pod line from the shard index', async () => {
    const fetcher = new FakeFetcher({
      [index]: ok(
        'AlamofireImage/4.3.0\nAlamofire/5.9.1/5.10.0/5.10.2\nAlamofireNetworkActivityIndicator/3.1.0\n',
      ),
    });
    expect(await trunkVersions(fetcher, 'Alamofire')).toEqual(['5.9.1', '5.10.0', '5.10.2']);
  });

  it('returns an empty list for a pod trunk does not know', async () => {
    const fetcher = new FakeFetcher({ [index]: ok('AlamofireImage/4.3.0\n') });
    expect(await trunkVersions(fetcher, 'Alamofire')).toEqual([]);
  });

  it('returns null when the CDN is not reachable', async () => {
    expect(await trunkVersions(new FakeFetcher({ [index]: null }), 'Alamofire')).toBeNull();
    expect(
      await trunkVersions(new FakeFetcher({ [index]: { status: 502, body: '' } }), 'Alamofire'),
    ).toBeNull();
  });
});

describe('fetchPodspec', () => {
  const url = podspecUrl('Alamofire', '5.10.2');

  it('keeps the fields podexit uses', async () => {
    const fetcher = new FakeFetcher({
      [url]: ok({
        name: 'Alamofire',
        version: '5.10.2',
        homepage: 'https://github.com/Alamofire/Alamofire',
        source: { git: 'https://github.com/Alamofire/Alamofire.git', tag: '5.10.2' },
        platforms: { ios: '10.0' },
      }),
    });
    expect(await fetchPodspec(fetcher, 'Alamofire', '5.10.2')).toMatchObject({
      source: { git: 'https://github.com/Alamofire/Alamofire.git', tag: '5.10.2' },
    });
  });

  it('returns null for missing or malformed podspecs', async () => {
    expect(await fetchPodspec(new FakeFetcher(), 'Alamofire', '5.10.2')).toBeNull();
    expect(
      await fetchPodspec(new FakeFetcher({ [url]: ok('{not json') }), 'Alamofire', '5.10.2'),
    ).toBeNull();
    expect(
      await fetchPodspec(new FakeFetcher({ [url]: ok({ name: 1 }) }), 'Alamofire', '5.10.2'),
    ).toBeNull();
  });
});

describe('releaseDates', () => {
  const url = trunkPodUrl('Alamofire');

  it('converts trunk timestamps to ISO dates', async () => {
    const fetcher = new FakeFetcher({
      [url]: ok({
        versions: [
          { name: '5.10.2', created_at: '2024-11-25 15:15:33 UTC' },
          { name: '5.12.2', created_at: '2026-09-10 01:47:20 UTC' },
        ],
        owners: [],
      }),
    });
    const dates = await releaseDates(fetcher, 'Alamofire');
    expect(dates?.get('5.10.2')).toBe('2024-11-25T15:15:33.000Z');
    expect(dates?.get('5.12.2')).toBe('2026-09-10T01:47:20.000Z');
  });

  it('returns null when the API answer is unusable', async () => {
    expect(await releaseDates(new FakeFetcher({ [url]: null }), 'Alamofire')).toBeNull();
    expect(
      await releaseDates(new FakeFetcher({ [url]: ok({ versions: 'x' }) }), 'Alamofire'),
    ).toBeNull();
    expect(await releaseDates(new FakeFetcher({ [url]: ok('<html>') }), 'Alamofire')).toBeNull();
  });
});
