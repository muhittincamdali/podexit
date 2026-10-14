import { parse as parseYaml } from 'yaml';

/**
 * Where CocoaPods resolved a pod from, read from `SPEC REPOS` and `EXTERNAL SOURCES`.
 *
 * - `trunk`: the public CocoaPods Specs repository (CDN or the old git mirror). These pods are
 *   the ones that stop getting new versions when trunk goes read-only.
 * - `spec-repo`: a private or third-party specs repository.
 * - `path`, `git`, `podspec`: an external source declared in the Podfile, for example a Flutter
 *   plugin under `.symlinks/plugins` or a React Native module under `node_modules`.
 */
export type SourceKind = 'trunk' | 'spec-repo' | 'path' | 'git' | 'podspec' | 'unknown';

export interface PodSource {
  kind: SourceKind;
  /** Specs repository URL (`spec-repo`), git URL (`git`) or podspec location (`podspec`). */
  url?: string;
  /** Local path for `path` sources, as written in the lockfile. */
  path?: string;
  tag?: string;
  branch?: string;
  commit?: string;
}

/** One pod from `PODS`, with its subspecs folded into the root pod. */
export interface LockedPod {
  /** Root pod name: `Firebase` for `Firebase/Analytics`. */
  name: string;
  version: string;
  /** Subspecs in use, e.g. `["Analytics", "CoreOnly"]`. */
  subspecs: string[];
  /** Root names of the pods this pod depends on. */
  dependencies: string[];
  /** Root names of the pods that depend on this pod. */
  requiredBy: string[];
  /** Listed in the Podfile (`DEPENDENCIES`), as opposed to pulled in by another pod. */
  direct: boolean;
  source: PodSource;
}

export interface Lockfile {
  pods: LockedPod[];
  cocoapodsVersion: string | null;
  podfileChecksum: string | null;
}

export class LockfileError extends Error {
  override name = 'LockfileError';
}

const TRUNK_REPOSITORIES = [
  /^trunk$/i,
  /^https?:\/\/(?:www\.)?github\.com\/cocoapods\/specs(?:\.git)?\/?$/i,
];
const ENTRY = /^(?<name>.+?) \((?<version>[^)]+)\)$/;

/** `Firebase/Analytics` -> `Firebase`. */
export function rootName(name: string): string {
  return name.split('/')[0] ?? name;
}

function dependencyName(requirement: string): string {
  // "FirebaseCore (~> 12.4.0)" or "Flutter (from `Flutter`)" or "Alamofire"
  return rootName(requirement.replace(/\s*\(.*\)\s*$/, '').trim());
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function stringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

interface RawPod {
  entry: string;
  dependencies: string[];
}

function rawPods(value: unknown): RawPod[] {
  if (!Array.isArray(value)) throw new LockfileError('PODS is missing or is not a list.');
  return value.map((item) => {
    if (typeof item === 'string') return { entry: item, dependencies: [] };
    if (isRecord(item)) {
      const [entry, dependencies] = Object.entries(item)[0] ?? [];
      if (entry) return { entry, dependencies: stringList(dependencies) };
    }
    throw new LockfileError(`Unexpected PODS entry: ${JSON.stringify(item)}`);
  });
}

function specRepos(value: unknown): Map<string, PodSource> {
  const sources = new Map<string, PodSource>();
  if (!isRecord(value)) return sources;
  for (const [repository, pods] of Object.entries(value)) {
    const trunk = TRUNK_REPOSITORIES.some((pattern) => pattern.test(repository));
    const source: PodSource = trunk ? { kind: 'trunk' } : { kind: 'spec-repo', url: repository };
    for (const pod of stringList(pods)) sources.set(pod, source);
  }
  return sources;
}

function optionalString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  return typeof value === 'string' ? value : undefined;
}

function externalSource(options: Record<string, unknown>): PodSource {
  const path = optionalString(options, ':path');
  if (path !== undefined) return { kind: 'path', path };
  const git = optionalString(options, ':git');
  if (git !== undefined) {
    const source: PodSource = { kind: 'git', url: git };
    for (const key of ['tag', 'branch', 'commit'] as const) {
      const value = optionalString(options, `:${key}`);
      if (value !== undefined) source[key] = value;
    }
    return source;
  }
  const podspec = optionalString(options, ':podspec');
  if (podspec !== undefined) return { kind: 'podspec', url: podspec };
  return { kind: 'unknown' };
}

function externalSources(value: unknown, checkout: unknown): Map<string, PodSource> {
  const sources = new Map<string, PodSource>();
  if (!isRecord(value)) return sources;
  const pinned = isRecord(checkout) ? checkout : {};
  for (const [pod, options] of Object.entries(value)) {
    if (!isRecord(options)) continue;
    const source = externalSource(options);
    // CHECKOUT OPTIONS records the commit a branch or tag resolved to at install time.
    const resolved = pinned[pod];
    if (source.kind === 'git' && isRecord(resolved)) {
      const commit = optionalString(resolved, ':commit');
      if (commit !== undefined) source.commit = commit;
    }
    sources.set(pod, source);
  }
  return sources;
}

function scalar(value: unknown): string | null {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : null;
}

/** Parses the text of a `Podfile.lock`. Throws {@link LockfileError} when it is not one. */
export function parseLockfile(text: string): Lockfile {
  let document: unknown;
  try {
    // The failsafe schema keeps every scalar a string, so `COCOAPODS: 1.10` stays "1.10".
    document = parseYaml(text, { schema: 'failsafe' });
  } catch (error) {
    throw new LockfileError(`Not valid YAML: ${(error as Error).message.split('\n')[0]}`);
  }
  if (!isRecord(document) || !('PODS' in document)) {
    throw new LockfileError('This file has no PODS section, so it is not a Podfile.lock.');
  }

  const repos = specRepos(document['SPEC REPOS']);
  const external = externalSources(document['EXTERNAL SOURCES'], document['CHECKOUT OPTIONS']);
  const direct = new Set(stringList(document.DEPENDENCIES).map(dependencyName));
  const pods = new Map<string, LockedPod>();

  for (const { entry, dependencies } of rawPods(document.PODS)) {
    const match = ENTRY.exec(entry.trim());
    if (!match?.groups) throw new LockfileError(`Unexpected PODS entry: ${entry}`);
    const fullName = match.groups.name ?? '';
    const name = rootName(fullName);
    const pod = pods.get(name) ?? {
      name,
      version: match.groups.version ?? '',
      subspecs: [],
      dependencies: [],
      requiredBy: [],
      direct: direct.has(name),
      source: external.get(name) ?? repos.get(name) ?? { kind: 'unknown' },
    };
    const subspec = fullName.slice(name.length + 1);
    if (subspec && !pod.subspecs.includes(subspec)) pod.subspecs.push(subspec);
    for (const dependency of dependencies.map(dependencyName)) {
      if (dependency !== name && !pod.dependencies.includes(dependency))
        pod.dependencies.push(dependency);
    }
    pods.set(name, pod);
  }

  for (const pod of pods.values()) {
    for (const dependency of pod.dependencies) {
      const target = pods.get(dependency);
      if (target && !target.requiredBy.includes(pod.name)) target.requiredBy.push(pod.name);
    }
  }

  const sorted = [...pods.values()].sort((a, b) => a.name.localeCompare(b.name, 'en'));
  for (const pod of sorted) {
    pod.subspecs.sort();
    pod.dependencies.sort();
    pod.requiredBy.sort();
  }
  return {
    pods: sorted,
    cocoapodsVersion: scalar(document.COCOAPODS),
    podfileChecksum: scalar(document['PODFILE CHECKSUM']),
  };
}
