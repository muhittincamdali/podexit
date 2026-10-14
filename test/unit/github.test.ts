import { describe, expect, it } from 'vitest';
import { hasPackageManifest, parseGitHubUrl, repositoryUrl } from '../../src/net/github.js';
import { FakeFetcher } from '../helpers/fake-fetcher.js';

describe('parseGitHubUrl', () => {
  it.each([
    'https://github.com/Alamofire/Alamofire.git',
    'https://github.com/Alamofire/Alamofire',
    'https://github.com/Alamofire/Alamofire/',
    'http://www.github.com/Alamofire/Alamofire.git',
    'git@github.com:Alamofire/Alamofire.git',
    'git://github.com/Alamofire/Alamofire.git',
    'ssh://git@github.com/Alamofire/Alamofire.git',
    'git+https://github.com/Alamofire/Alamofire.git',
    'https://github.com/Alamofire/Alamofire.git#5.10.2',
  ])('reads %s', (url) => {
    expect(parseGitHubUrl(url)).toEqual({ owner: 'Alamofire', name: 'Alamofire' });
  });

  it('keeps dots inside repository names', () => {
    expect(parseGitHubUrl('https://github.com/airbnb/lottie-ios.git')).toEqual({
      owner: 'airbnb',
      name: 'lottie-ios',
    });
    expect(parseGitHubUrl('https://github.com/socketio/socket.io-client-swift.git')).toEqual({
      owner: 'socketio',
      name: 'socket.io-client-swift',
    });
  });

  it.each([
    undefined,
    '',
    'https://dl.google.com/firebase/ios/analytics/FirebaseAnalytics-12.4.0.tar.gz',
    'https://gitlab.com/acme/kit.git',
    'https://github.com/only-owner',
  ])('returns null for %s', (url) => {
    expect(parseGitHubUrl(url)).toBeNull();
  });

  it('builds the web URL', () => {
    expect(repositoryUrl({ owner: 'onevcat', name: 'Kingfisher' })).toBe(
      'https://github.com/onevcat/Kingfisher',
    );
  });
});

describe('hasPackageManifest', () => {
  const repository = { owner: 'firebase', name: 'firebase-ios-sdk' };
  const head = 'https://raw.githubusercontent.com/firebase/firebase-ios-sdk/HEAD/Package.swift';
  const tag =
    'https://raw.githubusercontent.com/firebase/firebase-ios-sdk/CocoaPods-12.4.0/Package.swift';

  it('answers true, false or null from the status', async () => {
    expect(
      await hasPackageManifest(new FakeFetcher({ [head]: { status: 200, body: '' } }), repository),
    ).toBe(true);
    expect(await hasPackageManifest(new FakeFetcher({}), repository)).toBe(false);
    expect(
      await hasPackageManifest(new FakeFetcher({ [head]: { status: 503, body: '' } }), repository),
    ).toBeNull();
    expect(await hasPackageManifest(new FakeFetcher({ [head]: null }), repository)).toBeNull();
  });

  it('checks a tag with a HEAD request', async () => {
    const fetcher = new FakeFetcher({ [tag]: { status: 200, body: '' } });
    expect(await hasPackageManifest(fetcher, repository, 'CocoaPods-12.4.0')).toBe(true);
    expect(fetcher.requests).toEqual([`HEAD ${tag}`]);
  });
});
