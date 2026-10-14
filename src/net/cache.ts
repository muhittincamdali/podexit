import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { z } from 'zod';
import type { Fetcher, RequestOptions, Response } from './fetcher.js';

const DAY_MS = 24 * 60 * 60 * 1000;

const CacheEntry = z.object({
  url: z.string(),
  method: z.enum(['GET', 'HEAD']),
  status: z.number().int(),
  fetchedAt: z.string(),
  body: z.string(),
});
type CacheEntry = z.infer<typeof CacheEntry>;

export interface CacheOptions {
  directory: string;
  /** Entries younger than this are used without asking the network. Default: 24 hours. */
  ttlMs?: number;
  /** Ignore cached entries and fetch again (the fresh answers are still stored). */
  refresh?: boolean;
  now?: () => Date;
}

/** `$XDG_CACHE_HOME/podexit`, or `~/.cache/podexit`. */
export function defaultCacheDirectory(env: NodeJS.ProcessEnv = process.env): string {
  const base = env.XDG_CACHE_HOME || join(homedir(), '.cache');
  return join(base, 'podexit');
}

/** Where a URL is stored: one JSON file per request, grouped by host so recordings are readable. */
export function cachePath(directory: string, url: string, method: 'GET' | 'HEAD' = 'GET'): string {
  const host = new URL(url).hostname;
  const key = createHash('sha256').update(`${method} ${url}`).digest('hex').slice(0, 24);
  return join(directory, host, `${key}.json`);
}

// 404 is a real answer ("this repository has no Package.swift"); 5xx and 429 are not.
function isDefinitive(status: number): boolean {
  return (status >= 200 && status < 300) || status === 404 || status === 410;
}

/**
 * Disk cache in front of another fetcher. The same files serve as the recorded responses that
 * make `--offline` and the tests work without a network: with an {@link OfflineFetcher} behind
 * it, every answer comes from disk regardless of age.
 */
export class CachedFetcher implements Fetcher {
  private readonly ttlMs: number;
  private readonly now: () => Date;

  constructor(
    private readonly inner: Fetcher,
    private readonly options: CacheOptions,
  ) {
    this.ttlMs = options.ttlMs ?? DAY_MS;
    this.now = options.now ?? (() => new Date());
  }

  async get(url: string, { method = 'GET' }: RequestOptions = {}): Promise<Response | null> {
    const path = cachePath(this.options.directory, url, method);
    const cached = await this.read(path);
    const age = cached
      ? this.now().getTime() - Date.parse(cached.fetchedAt)
      : Number.POSITIVE_INFINITY;
    if (cached && !this.options.refresh && age < this.ttlMs) return cached;

    const fresh = await this.inner.get(url, { method });
    if (fresh && isDefinitive(fresh.status)) {
      await this.write(path, {
        url,
        method,
        status: fresh.status,
        fetchedAt: this.now().toISOString(),
        body: fresh.body,
      });
      return fresh;
    }
    // Offline, or the server had a bad moment: an old answer is better than none.
    return cached ?? fresh;
  }

  private async read(path: string): Promise<CacheEntry | null> {
    try {
      const parsed = CacheEntry.safeParse(JSON.parse(await readFile(path, 'utf8')));
      return parsed.success ? parsed.data : null;
    } catch {
      return null;
    }
  }

  private async write(path: string, entry: CacheEntry): Promise<void> {
    try {
      await mkdir(join(path, '..'), { recursive: true });
      // Write then rename, so a parallel run never reads half a file.
      const temporary = `${path}.${process.pid}.tmp`;
      await writeFile(temporary, `${JSON.stringify(entry, null, 2)}\n`);
      await rename(temporary, path);
    } catch {
      // A read-only or full disk only costs the cache, not the run.
    }
  }
}
