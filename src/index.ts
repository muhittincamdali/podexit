/**
 * Programmatic API. The CLI is a thin layer over these functions; the JSON report format is
 * `schemaVersion` 0 and may change before 1.0.
 *
 * ```ts
 * import { analyzeLockfile, buildReport, CachedFetcher, HttpFetcher, loadPublisherPolicy, render } from 'podexit';
 *
 * const policy = loadPublisherPolicy();
 * const fetcher = new CachedFetcher(new HttpFetcher({ userAgent: 'my-tool' }), { directory: '.cache' });
 * const lockfile = await analyzeLockfile(text, 'ios/Podfile.lock', { fetcher, policy });
 * console.log(render(buildReport([lockfile], { policy, offline: false }), 'markdown'));
 * ```
 *
 * @packageDocumentation
 */
export {
  type AnalyzeOptions,
  analyzeLockfile,
  buildReport,
  type LockfileReport,
  type PodReport,
  type Report,
  type ReportContext,
  SCHEMA_VERSION,
  type Summary,
  type SwiftPackageReport,
  summarize,
  type UpdatesReport,
} from './analyze.js';
export {
  classifyLockfile,
  classifyUpdates,
  describeUpdates,
  type SwiftPackageStatus,
  type UpdateClassification,
  type UpdateStatus,
} from './core/classify.js';
export {
  type LockedPod,
  type Lockfile,
  LockfileError,
  type PodSource,
  parseLockfile,
  rootName,
  type SourceKind,
} from './core/lockfile.js';
export { parsePublisherPolicy, Publisher, PublisherPolicy, publisherFor } from './core/policy.js';
export { detectProjectKind, GUIDES, type ProjectKind } from './core/project.js';
export { BUILDS_KEEP_WORKING, TIMELINE } from './core/timeline.js';
export { compareVersions, isPrerelease, latestVersion, majorVersion } from './core/versions.js';
export { loadPublisherPolicy } from './data.js';
export { type CacheOptions, CachedFetcher, defaultCacheDirectory } from './net/cache.js';
export {
  type Fetcher,
  HttpFetcher,
  type HttpFetcherOptions,
  OfflineFetcher,
  type RequestOptions,
  type Response,
} from './net/fetcher.js';
export { FORMATS, type Format, render, type TtyOptions } from './report/index.js';
export { VERSION } from './version.js';
