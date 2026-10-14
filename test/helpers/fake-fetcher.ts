import type { Fetcher, RequestOptions, Response } from '../../src/net/fetcher.js';

/** Answers from a fixed table of URLs and records every request it gets. */
export class FakeFetcher implements Fetcher {
  readonly requests: string[] = [];

  constructor(private readonly routes: Record<string, Response | null> = {}) {}

  async get(url: string, { method = 'GET' }: RequestOptions = {}): Promise<Response | null> {
    this.requests.push(`${method} ${url}`);
    return url in this.routes ? (this.routes[url] ?? null) : { status: 404, body: '' };
  }
}

export const ok = (body: unknown): Response => ({
  status: 200,
  body: typeof body === 'string' ? body : JSON.stringify(body),
});
