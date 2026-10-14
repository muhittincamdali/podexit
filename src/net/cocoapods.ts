import { createHash } from 'node:crypto';
import { z } from 'zod';
import type { Fetcher } from './fetcher.js';

export const CDN = 'https://cdn.cocoapods.org';
export const TRUNK_API = 'https://trunk.cocoapods.org/api/v1';

/** The CDN shards pods by the first three hex digits of the MD5 of the pod name. */
export function shard(name: string): [string, string, string] {
  const hash = createHash('md5').update(name).digest('hex');
  return [hash.charAt(0), hash.charAt(1), hash.charAt(2)];
}

/** URL of the CDN index file that lists every published version of `name`. */
export function versionsIndexUrl(name: string): string {
  return `${CDN}/all_pods_versions_${shard(name).join('_')}.txt`;
}

export function podspecUrl(name: string, version: string): string {
  const path = [...shard(name), name, version, `${name}.podspec.json`].map(encodeURIComponent);
  return `${CDN}/Specs/${path.join('/')}`;
}

export function trunkPodUrl(name: string): string {
  return `${TRUNK_API}/pods/${encodeURIComponent(name)}`;
}

/**
 * Published versions of a pod on trunk, in CDN order (not sorted). Empty when trunk has never
 * heard of the pod; null when the CDN could not be reached.
 */
export async function trunkVersions(fetcher: Fetcher, name: string): Promise<string[] | null> {
  const response = await fetcher.get(versionsIndexUrl(name));
  if (response?.status !== 200) return null;
  // Each line is "Name/1.0.0/1.0.1/...".
  const line = response.body.split('\n').find((candidate) => candidate.startsWith(`${name}/`));
  return line ? line.trim().split('/').slice(1).filter(Boolean) : [];
}

const Podspec = z.looseObject({
  name: z.string(),
  version: z.string(),
  homepage: z.string().optional(),
  source: z
    .looseObject({
      git: z.string().optional(),
      tag: z.string().optional(),
      http: z.string().optional(),
    })
    .optional(),
});
export type Podspec = z.infer<typeof Podspec>;

/** The published podspec of one version, or null when it is not available. */
export async function fetchPodspec(
  fetcher: Fetcher,
  name: string,
  version: string,
): Promise<Podspec | null> {
  const response = await fetcher.get(podspecUrl(name, version));
  if (response?.status !== 200) return null;
  try {
    const parsed = Podspec.safeParse(JSON.parse(response.body));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

const TrunkPod = z.object({
  versions: z.array(z.object({ name: z.string(), created_at: z.string() })),
});

/**
 * Publication date of each version, from the trunk API (the CDN has no dates). Keys are versions,
 * values ISO dates. Null when the API could not be reached.
 */
export async function releaseDates(
  fetcher: Fetcher,
  name: string,
): Promise<Map<string, string> | null> {
  const response = await fetcher.get(trunkPodUrl(name));
  if (response?.status !== 200) return null;
  try {
    const parsed = TrunkPod.safeParse(JSON.parse(response.body));
    if (!parsed.success) return null;
    // "2024-11-25 15:15:33 UTC" -> "2024-11-25T15:15:33Z"
    return new Map(
      parsed.data.versions.map(({ name: version, created_at }) => [
        version,
        new Date(created_at.replace(' UTC', 'Z').replace(' ', 'T')).toISOString(),
      ]),
    );
  } catch {
    return null;
  }
}
