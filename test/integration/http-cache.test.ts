import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer, type IncomingMessage, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { CachedFetcher, cachePath, defaultCacheDirectory } from '../../src/net/cache.js';
import { HttpFetcher, OfflineFetcher } from '../../src/net/fetcher.js';
import { FakeFetcher } from '../helpers/fake-fetcher.js';

let server: Server;
let base: string;
const seen: IncomingMessage[] = [];

beforeAll(async () => {
  server = createServer((request, response) => {
    seen.push(request);
    if (request.url === '/redirect') {
      response.writeHead(301, { location: '/text' }).end();
    } else if (request.url === '/text') {
      response.writeHead(200, { 'content-type': 'text/plain' }).end('hello');
    } else if (request.url === '/slow') {
      setTimeout(() => response.writeHead(200).end('late'), 500);
    } else {
      response.writeHead(404).end('missing');
    }
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterAll(() => {
  server.closeAllConnections();
  server.close();
});

beforeEach(() => {
  seen.length = 0;
});

describe('HttpFetcher', () => {
  const fetcher = new HttpFetcher({
    userAgent: 'podexit-test',
    githubToken: 'secret',
    timeoutMs: 200,
  });

  it('follows redirects and returns the body', async () => {
    expect(await fetcher.get(`${base}/redirect`)).toEqual({ status: 200, body: 'hello' });
    expect(seen.map((request) => request.url)).toEqual(['/redirect', '/text']);
  });

  it('sends its user agent, and the GitHub token only to GitHub hosts', async () => {
    await fetcher.get(`${base}/text`);
    expect(seen[0]?.headers['user-agent']).toBe('podexit-test');
    expect(seen[0]?.headers.authorization).toBeUndefined();
  });

  it('skips the body for HEAD requests', async () => {
    expect(await fetcher.get(`${base}/text`, { method: 'HEAD' })).toEqual({
      status: 200,
      body: '',
    });
    expect(seen[0]?.method).toBe('HEAD');
  });

  it('reports 404 as an answer and timeouts as null', async () => {
    expect(await fetcher.get(`${base}/nothing`)).toEqual({ status: 404, body: 'missing' });
    expect(await fetcher.get(`${base}/slow`)).toBeNull();
  });
});

describe('CachedFetcher', () => {
  let directory: string;
  let clock: Date;
  const now = () => clock;

  beforeEach(async () => {
    directory = await mkdtemp(join(tmpdir(), 'podexit-cache-'));
    clock = new Date('2026-10-14T12:00:00Z');
  });

  it('serves a fresh entry without asking the network', async () => {
    const network = new FakeFetcher({ 'https://cdn.example.org/a': { status: 200, body: 'one' } });
    const cached = new CachedFetcher(network, { directory, now });
    expect(await cached.get('https://cdn.example.org/a')).toEqual({ status: 200, body: 'one' });
    expect(await cached.get('https://cdn.example.org/a')).toMatchObject({
      status: 200,
      body: 'one',
    });
    expect(network.requests).toHaveLength(1);
  });

  it('asks again after the time to live', async () => {
    const network = new FakeFetcher({ 'https://cdn.example.org/a': { status: 200, body: 'one' } });
    const cached = new CachedFetcher(network, { directory, now });
    await cached.get('https://cdn.example.org/a');
    clock = new Date('2026-10-15T12:00:01Z');
    await cached.get('https://cdn.example.org/a');
    expect(network.requests).toHaveLength(2);
  });

  it('asks again with refresh', async () => {
    const network = new FakeFetcher({ 'https://cdn.example.org/a': { status: 200, body: 'one' } });
    await new CachedFetcher(network, { directory, now }).get('https://cdn.example.org/a');
    await new CachedFetcher(network, { directory, now, refresh: true }).get(
      'https://cdn.example.org/a',
    );
    expect(network.requests).toHaveLength(2);
  });

  it('stores 404 answers but not server errors', async () => {
    const network = new FakeFetcher({ 'https://cdn.example.org/down': { status: 503, body: '' } });
    const cached = new CachedFetcher(network, { directory, now });
    expect(await cached.get('https://cdn.example.org/gone')).toEqual({ status: 404, body: '' });
    expect(await cached.get('https://cdn.example.org/down')).toEqual({ status: 503, body: '' });
    const offline = new CachedFetcher(new OfflineFetcher(), { directory, now });
    expect(await offline.get('https://cdn.example.org/gone')).toMatchObject({ status: 404 });
    expect(await offline.get('https://cdn.example.org/down')).toBeNull();
  });

  it('answers from stale entries when offline', async () => {
    const network = new FakeFetcher({ 'https://cdn.example.org/a': { status: 200, body: 'one' } });
    await new CachedFetcher(network, { directory, now }).get('https://cdn.example.org/a');
    clock = new Date('2027-01-01T00:00:00Z');
    const offline = new CachedFetcher(new OfflineFetcher(), { directory, now });
    expect(await offline.get('https://cdn.example.org/a')).toMatchObject({
      status: 200,
      body: 'one',
    });
  });

  it('keys GET and HEAD separately', async () => {
    const network = new FakeFetcher({ 'https://cdn.example.org/a': { status: 200, body: 'one' } });
    const cached = new CachedFetcher(network, { directory, now });
    await cached.get('https://cdn.example.org/a', { method: 'HEAD' });
    await cached.get('https://cdn.example.org/a');
    expect(network.requests).toEqual([
      'HEAD https://cdn.example.org/a',
      'GET https://cdn.example.org/a',
    ]);
  });

  it('writes readable files grouped by host', async () => {
    const network = new FakeFetcher({ 'https://cdn.example.org/a': { status: 200, body: 'one' } });
    await new CachedFetcher(network, { directory, now }).get('https://cdn.example.org/a');
    const path = cachePath(directory, 'https://cdn.example.org/a');
    expect(path.startsWith(join(directory, 'cdn.example.org'))).toBe(true);
    expect(JSON.parse(await readFile(path, 'utf8'))).toEqual({
      url: 'https://cdn.example.org/a',
      method: 'GET',
      status: 200,
      fetchedAt: '2026-10-14T12:00:00.000Z',
      body: 'one',
    });
  });

  it('ignores corrupt entries', async () => {
    const path = cachePath(directory, 'https://cdn.example.org/a');
    await mkdir(join(path, '..'), { recursive: true });
    await writeFile(path, '{"url": 1');
    const offline = new CachedFetcher(new OfflineFetcher(), { directory, now });
    expect(await offline.get('https://cdn.example.org/a')).toBeNull();
  });
});

describe('defaultCacheDirectory', () => {
  it('follows XDG_CACHE_HOME', () => {
    expect(defaultCacheDirectory({ XDG_CACHE_HOME: '/var/cache' })).toBe('/var/cache/podexit');
    expect(defaultCacheDirectory({})).toMatch(/\.cache\/podexit$/);
  });
});
