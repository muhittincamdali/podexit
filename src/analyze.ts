import { classifyLockfile, describeUpdates, type UpdateClassification } from './core/classify.js';
import { type LockedPod, parseLockfile } from './core/lockfile.js';
import type { PublisherPolicy } from './core/policy.js';
import { detectProjectKind, GUIDES } from './core/project.js';
import { BUILDS_KEEP_WORKING, TIMELINE } from './core/timeline.js';
import { compareVersions, latestVersion } from './core/versions.js';
import { fetchPodspec, releaseDates, trunkVersions } from './net/cocoapods.js';
import type { Fetcher } from './net/fetcher.js';
import {
  type GitHubRepository,
  hasPackageManifest,
  parseGitHubUrl,
  repositoryUrl,
} from './net/github.js';
import {
  type LockfileReport,
  type PodReport,
  type Report,
  SCHEMA_VERSION,
  type Summary,
  type SwiftPackageReport,
  type UpdatesReport,
} from './report-model.js';
import { VERSION } from './version.js';

export {
  type LockfileReport,
  type PodReport,
  type Report,
  SCHEMA_VERSION,
  type Summary,
  type SwiftPackageReport,
  type UpdatesReport,
};

export interface AnalyzeOptions {
  fetcher: Fetcher;
  policy: PublisherPolicy;
  /** Parallel pod lookups. Default 8. */
  concurrency?: number;
}

interface TrunkFacts {
  latest: string | null;
  dates: Map<string, string> | null;
  tag: string | null;
  repository: GitHubRepository | null;
  /** Where the podspec says the code comes from, when it is not GitHub. */
  otherSource: string | null;
}

async function trunkFacts(fetcher: Fetcher, pod: LockedPod): Promise<TrunkFacts> {
  const [versions, dates, podspec] = await Promise.all([
    trunkVersions(fetcher, pod.name),
    releaseDates(fetcher, pod.name),
    fetchPodspec(fetcher, pod.name, pod.version),
  ]);
  const repository =
    parseGitHubUrl(podspec?.source?.git) ?? parseGitHubUrl(podspec?.homepage) ?? null;
  return {
    latest: versions ? latestVersion(versions) : null,
    dates,
    tag: podspec?.source?.git ? (podspec.source.tag ?? null) : null,
    repository,
    otherSource: podspec?.source?.http ?? podspec?.source?.git ?? podspec?.homepage ?? null,
  };
}

function updatesReport(
  pod: LockedPod,
  { status, publisher, via }: UpdateClassification,
  facts: TrunkFacts | null,
): UpdatesReport {
  const latest = facts?.latest ?? null;
  const report: UpdatesReport = {
    status,
    summary: describeUpdates(status, pod, publisher, via),
    latestOnTrunk: latest,
    latestReleasedAt: latest ? (facts?.dates?.get(latest) ?? null) : null,
    lockedReleasedAt: facts?.dates?.get(pod.version) ?? null,
    behindTrunk: latest ? compareVersions(pod.version, latest) < 0 : null,
  };
  if (via) report.via = via;
  if (publisher) {
    const { id, name, lastMajorOnCocoaPods, source } = publisher;
    report.publisher = { id, name, lastMajorOnCocoaPods, source };
  }
  return report;
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

async function upstreamPackage(
  fetcher: Fetcher,
  repository: GitHubRepository,
  ref: string | null,
): Promise<SwiftPackageReport> {
  const url = repositoryUrl(repository);
  const head = await hasPackageManifest(fetcher, repository);
  if (head === null) {
    return {
      status: 'unknown',
      summary: `No answer from GitHub for ${url}.`,
      repository: url,
      atLockedVersion: null,
      via: null,
    };
  }
  if (!head) {
    return {
      status: 'no-spm',
      summary: `${url} has no Package.swift on its default branch.`,
      repository: url,
      atLockedVersion: null,
      via: 'upstream',
    };
  }
  const atLocked = ref ? await hasPackageManifest(fetcher, repository, ref) : null;
  const detail =
    atLocked === true
      ? ` It is also there at ${ref}, the version you use.`
      : atLocked === false
        ? ` It is not there at ${ref}, the version you use: the switch needs a newer version.`
        : '';
  return {
    status: 'spm-available',
    summary: `${url} has a Package.swift on its default branch.${detail}`,
    repository: url,
    atLockedVersion: atLocked,
    via: 'upstream',
  };
}

async function swiftPackageReport(
  fetcher: Fetcher,
  pod: LockedPod,
  { publisher, via }: UpdateClassification,
  facts: TrunkFacts | null,
): Promise<SwiftPackageReport> {
  // Subdependencies are separate projects (GoogleUtilities, nanopb), so they are looked up upstream.
  if (publisher?.swiftPackage && !via) {
    return {
      status: 'spm-available',
      summary: `${publisher.swiftPackage.note} (${publisher.source})`,
      repository: publisher.swiftPackage.url,
      atLockedVersion: null,
      via: 'publisher',
    };
  }
  const { source } = pod;
  if (source.kind === 'git') {
    const repository = parseGitHubUrl(source.url);
    if (repository)
      return upstreamPackage(fetcher, repository, source.tag ?? source.commit ?? null);
    return {
      status: 'unknown',
      summary: `Git source is not on GitHub (${source.url}).`,
      repository: null,
      atLockedVersion: null,
      via: null,
    };
  }
  if (source.kind !== 'trunk') {
    return {
      status: 'not-checked',
      summary: 'Local or private source; podexit does not look it up.',
      repository: null,
      atLockedVersion: null,
      via: null,
    };
  }
  if (facts?.repository) return upstreamPackage(fetcher, facts.repository, facts.tag);
  const summary = facts?.otherSource
    ? `The podspec points to ${hostOf(facts.otherSource)}, not a GitHub repository.`
    : 'No podspec answer from the CocoaPods CDN (offline, or nothing recorded).';
  return { status: 'unknown', summary, repository: null, atLockedVersion: null, via: null };
}

async function analyzePod(
  pod: LockedPod,
  classification: UpdateClassification,
  fetcher: Fetcher,
): Promise<PodReport> {
  const facts = pod.source.kind === 'trunk' ? await trunkFacts(fetcher, pod) : null;
  return {
    name: pod.name,
    version: pod.version,
    subspecs: pod.subspecs,
    direct: pod.direct,
    requiredBy: pod.requiredBy,
    source: pod.source,
    updates: updatesReport(pod, classification, facts),
    swiftPackage: await swiftPackageReport(fetcher, pod, classification, facts),
  };
}

async function mapLimit<T, R>(
  items: readonly T[],
  limit: number,
  task: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const worker = async (): Promise<void> => {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await task(items[index] as T);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

export function summarize(pods: readonly PodReport[]): Summary {
  const count = (predicate: (pod: PodReport) => boolean) => pods.filter(predicate).length;
  return {
    pods: pods.length,
    direct: count((pod) => pod.direct),
    frozenOnTrunk: count((pod) => pod.updates.status === 'frozen-on-trunk'),
    capped: count((pod) => pod.updates.status === 'capped'),
    notAffected: count((pod) => pod.updates.status === 'not-affected'),
    unknown: count((pod) => pod.updates.status === 'unknown'),
    spmAvailable: count((pod) => pod.swiftPackage.status === 'spm-available'),
    noSpm: count((pod) => pod.swiftPackage.status === 'no-spm'),
    spmUnknown: count((pod) => pod.swiftPackage.status === 'unknown'),
  };
}

/** Analyzes the text of one Podfile.lock. `path` is only used for display and project detection. */
export async function analyzeLockfile(
  text: string,
  path: string,
  options: AnalyzeOptions,
): Promise<LockfileReport> {
  const lockfile = parseLockfile(text);
  const classifications = classifyLockfile(lockfile.pods, options.policy);
  const pods = await mapLimit(lockfile.pods, options.concurrency ?? 8, (pod) =>
    analyzePod(pod, classifications.get(pod.name) ?? { status: 'unknown' }, options.fetcher),
  );
  const project = detectProjectKind(lockfile.pods, path);
  return {
    path,
    project,
    guide: GUIDES[project],
    cocoapodsVersion: lockfile.cocoapodsVersion,
    summary: summarize(pods),
    pods,
  };
}

export interface ReportContext {
  policy: PublisherPolicy;
  offline: boolean;
  now?: Date;
}

/** Wraps lockfile reports with the metadata every output format shows. */
export function buildReport(lockfiles: LockfileReport[], context: ReportContext): Report {
  return {
    schemaVersion: SCHEMA_VERSION,
    tool: { name: 'podexit', version: VERSION },
    generatedAt: (context.now ?? new Date()).toISOString(),
    offline: context.offline,
    timeline: TIMELINE,
    policyDataVersion: context.policy.dataVersion,
    notes: [BUILDS_KEEP_WORKING],
    lockfiles,
  };
}
