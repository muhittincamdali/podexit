import { readFileSync } from 'node:fs';
import { type PublisherPolicy, parsePublisherPolicy } from './core/policy.js';

// data/ sits next to src/ and dist/, so this resolves from source and from the published package.
const POLICY_URL = new URL('../data/publisher-policy.json', import.meta.url);

/** Reads and validates the publisher policy shipped in the package's data/ folder. */
export function loadPublisherPolicy(url: URL = POLICY_URL): PublisherPolicy {
  return parsePublisherPolicy(JSON.parse(readFileSync(url, 'utf8')));
}
