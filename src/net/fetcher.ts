/** The answer to one request; only the status and text body are kept. */
export interface Response {
  status: number;
  body: string;
}

export interface RequestOptions {
  /** `HEAD` for existence checks, where only the status matters. */
  method?: 'GET' | 'HEAD';
}

/**
 * Everything podexit reads from the network goes through a Fetcher, so tests and `--offline`
 * runs can answer from recorded responses. `null` means the answer is not available (no
 * network, a timeout, or nothing recorded); callers report that as "unknown" instead of failing.
 */
export interface Fetcher {
  get(url: string, options?: RequestOptions): Promise<Response | null>;
}

export interface HttpFetcherOptions {
  userAgent: string;
  /** Sent to github.com hosts only; raises the GitHub rate limit and allows private repositories. */
  githubToken?: string | undefined;
  timeoutMs?: number;
}

const GITHUB_HOSTS = new Set(['api.github.com', 'raw.githubusercontent.com']);
const DEFAULT_TIMEOUT_MS = 15_000;

/** Fetcher backed by the platform `fetch`. Redirects are followed (the CDN redirects to jsDelivr). */
export class HttpFetcher implements Fetcher {
  constructor(private readonly options: HttpFetcherOptions) {}

  async get(url: string, { method = 'GET' }: RequestOptions = {}): Promise<Response | null> {
    const headers: Record<string, string> = { 'user-agent': this.options.userAgent };
    if (this.options.githubToken && GITHUB_HOSTS.has(new URL(url).hostname)) {
      headers.authorization = `Bearer ${this.options.githubToken}`;
    }
    try {
      const response = await fetch(url, {
        method,
        headers,
        redirect: 'follow',
        signal: AbortSignal.timeout(this.options.timeoutMs ?? DEFAULT_TIMEOUT_MS),
      });
      const body = method === 'HEAD' ? '' : await response.text();
      return { status: response.status, body };
    } catch {
      return null;
    }
  }
}

/** Fetcher that never touches the network; used with `--offline` behind the cache. */
export class OfflineFetcher implements Fetcher {
  async get(): Promise<Response | null> {
    return null;
  }
}
