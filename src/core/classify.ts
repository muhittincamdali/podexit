import type { LockedPod, SourceKind } from './lockfile.js';
import { type Publisher, type PublisherPolicy, publisherFor } from './policy.js';

/**
 * What happens to updates for a pod.
 *
 * - `frozen-on-trunk`: published on CocoaPods trunk; after trunk goes read-only no new version
 *   can be published there, including security fixes.
 * - `capped`: the publisher already stopped releasing to CocoaPods (for example Firebase after
 *   version 12), so the last version is reached before trunk closes.
 * - `not-affected`: comes from a local path, a git repository, a podspec file or a private
 *   specs repository; trunk going read-only does not change how it is updated.
 * - `unknown`: the lockfile does not say where the pod comes from.
 */
export type UpdateStatus = 'frozen-on-trunk' | 'capped' | 'not-affected' | 'unknown';

/**
 * Whether the pod's project ships a Swift package.
 *
 * - `spm-available`: the upstream repository has a Package.swift (or the publisher documents one).
 * - `no-spm`: the upstream GitHub repository has no Package.swift on its default branch.
 * - `unknown`: no answer: the source is not on GitHub, or the network was not available.
 * - `not-checked`: local and private sources, which podexit does not look up.
 */
export type SwiftPackageStatus = 'spm-available' | 'no-spm' | 'unknown' | 'not-checked';

export interface UpdateClassification {
  status: UpdateStatus;
  publisher?: Publisher;
  /** For a pod capped as a subdependency: the listed pod that pulls it in. */
  via?: string;
}

const NOT_AFFECTED: ReadonlySet<SourceKind> = new Set(['path', 'git', 'podspec', 'spec-repo']);

/** Update status from the lockfile and the publisher policy alone; needs no network. */
export function classifyUpdates(pod: LockedPod, policy: PublisherPolicy): UpdateClassification {
  if (NOT_AFFECTED.has(pod.source.kind)) return { status: 'not-affected' };
  if (pod.source.kind !== 'trunk') return { status: 'unknown' };
  const publisher = publisherFor(policy, pod.name);
  return publisher ? { status: 'capped', publisher } : { status: 'frozen-on-trunk' };
}

/**
 * Update status of every pod in a lockfile. Pods are classified one by one, then trunk pods that a
 * capped pod depends on (directly or not) are capped too when the publisher's source says its
 * stop covers subdependencies. Breadth-first from the listed pods, so `via` names the nearest one.
 */
export function classifyLockfile(
  pods: readonly LockedPod[],
  policy: PublisherPolicy,
): Map<string, UpdateClassification> {
  const result = new Map(pods.map((pod) => [pod.name, classifyUpdates(pod, policy)]));
  const byName = new Map(pods.map((pod) => [pod.name, pod]));
  const queue = pods
    .filter((pod) => result.get(pod.name)?.publisher?.includesSubdependencies)
    .map((pod) => ({ pod, root: pod.name }));
  for (let next = queue.shift(); next; next = queue.shift()) {
    const { pod, root } = next;
    const publisher = result.get(root)?.publisher;
    if (!publisher) continue;
    for (const name of pod.dependencies) {
      const dependency = byName.get(name);
      if (!dependency || result.get(name)?.status !== 'frozen-on-trunk') continue;
      result.set(name, { status: 'capped', publisher, via: root });
      queue.push({ pod: dependency, root });
    }
  }
  return result;
}

/** One sentence for each update status, used by every report format. */
export function describeUpdates(
  status: UpdateStatus,
  pod: LockedPod,
  publisher?: Publisher,
  via?: string,
): string {
  switch (status) {
    case 'frozen-on-trunk':
      return 'Published on trunk: no new versions after trunk goes read-only on 2026-12-02.';
    case 'capped':
      if (publisher && via) {
        return `Subdependency of ${via}: ${publisher.name} stops publishing its pods and their subdependencies to CocoaPods (${publisher.stoppedPublishing}).`;
      }
      return publisher
        ? `${publisher.name} stopped at ${publisher.lastMajorOnCocoaPods}.x on CocoaPods (${publisher.stoppedPublishing}); newer versions ship through Swift Package Manager.`
        : 'The publisher stopped releasing to CocoaPods.';
    case 'not-affected':
      return describeSource(pod);
    case 'unknown':
      return 'The lockfile does not list a source for this pod.';
  }
}

function describeSource(pod: LockedPod): string {
  const { source } = pod;
  switch (source.kind) {
    case 'path':
      return `Local path (${source.path}); updated with the package that provides it, not through trunk.`;
    case 'git':
      return `Git repository (${source.url}); trunk going read-only does not affect it.`;
    case 'podspec':
      return `Podspec file (${source.url}); trunk going read-only does not affect it.`;
    case 'spec-repo':
      return `Private specs repository (${source.url}); trunk going read-only does not affect it.`;
    default:
      return 'Not published through trunk.';
  }
}
