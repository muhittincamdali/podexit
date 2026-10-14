import type { Fetcher } from './fetcher.js';

export interface GitHubRepository {
  owner: string;
  name: string;
}

const PATTERNS = [
  // https://github.com/Alamofire/Alamofire.git, http://www.github.com/x/y/, git://github.com/x/y
  /^(?:git\+)?(?:https?|git|ssh):\/\/(?:[^@/]+@)?(?:www\.)?github\.com\/([^/\s]+)\/([^/\s#?]+?)(?:\.git)?\/?(?:[#?].*)?$/i,
  // git@github.com:Alamofire/Alamofire.git
  /^[^@\s]+@github\.com:([^/\s]+)\/([^/\s]+?)(?:\.git)?\/?$/i,
];

/** Owner and name from a GitHub URL in any of the forms podspecs use; null for other hosts. */
export function parseGitHubUrl(url: string | undefined): GitHubRepository | null {
  if (!url) return null;
  for (const pattern of PATTERNS) {
    const match = pattern.exec(url.trim());
    if (match?.[1] && match[2]) return { owner: match[1], name: match[2] };
  }
  return null;
}

export function repositoryUrl({ owner, name }: GitHubRepository): string {
  return `https://github.com/${owner}/${name}`;
}

/**
 * Whether `Package.swift` exists at `ref` (a branch, tag or `HEAD` for the default branch).
 * Uses raw.githubusercontent.com, which does not count against the REST API's 60 requests per
 * hour. Null when the answer is not available.
 */
export async function hasPackageManifest(
  fetcher: Fetcher,
  repository: GitHubRepository,
  ref = 'HEAD',
): Promise<boolean | null> {
  // Tags such as `CocoaPods-12.4.0` pass through; a branch name may contain slashes.
  const owner = encodeURIComponent(repository.owner);
  const name = encodeURIComponent(repository.name);
  const path = `${owner}/${name}/${encodeURI(ref)}`;
  const response = await fetcher.get(`https://raw.githubusercontent.com/${path}/Package.swift`, {
    method: 'HEAD',
  });
  if (!response) return null;
  if (response.status === 200) return true;
  if (response.status === 404) return false;
  return null;
}
