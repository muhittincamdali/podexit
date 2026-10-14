import { readFileSync, writeFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { parsePublisherPolicy, PublisherPolicy, publisherFor } from '../../src/core/policy.js';
import { loadPublisherPolicy } from '../../src/data.js';

const SCHEMA_URL = new URL('../../data/publisher-policy.schema.json', import.meta.url);

describe('data/publisher-policy.json', () => {
  const policy = loadPublisherPolicy();

  it('validates against the schema', () => {
    expect(policy.publishers.length).toBeGreaterThan(0);
  });

  it('cites an https source and a check date for every publisher', () => {
    for (const publisher of policy.publishers) {
      expect(publisher.source).toMatch(/^https:\/\//);
      expect(publisher.checked).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('lists each pod under one publisher only', () => {
    const pods = policy.publishers.flatMap(({ pods }) => pods);
    expect(new Set(pods).size).toBe(pods.length);
  });

  it('caps Firebase at 12 with the Firebase migration page as the source', () => {
    expect(publisherFor(policy, 'FirebaseAnalytics')).toMatchObject({
      name: 'Firebase',
      lastMajorOnCocoaPods: 12,
      source: 'https://firebase.google.com/docs/ios/cocoapods-deprecation',
      // "These changes impact all of the following pods and their subdependencies"
      includesSubdependencies: true,
    });
    expect(publisherFor(policy, 'GoogleAppMeasurement')).toBeUndefined();
  });
});

describe('parsePublisherPolicy', () => {
  const valid = {
    dataVersion: '2026.10.14',
    publishers: [
      {
        id: 'acme',
        name: 'Acme',
        pods: ['AcmeKit'],
        lastMajorOnCocoaPods: 3,
        stoppedPublishing: '2026-11',
        summary: 'Acme stops.',
        source: 'https://acme.example.com/cocoapods',
        checked: '2026-10-14',
      },
    ],
  };

  it('accepts a complete entry', () => {
    expect(parsePublisherPolicy(valid).publishers[0]?.id).toBe('acme');
  });

  it.each([
    ['an http source', { source: 'http://acme.example.com' }],
    ['a missing source', { source: undefined }],
    ['an empty pod list', { pods: [] }],
    ['a malformed month', { stoppedPublishing: 'November' }],
    ['a malformed check date', { checked: '14.10.2026' }],
  ])('rejects %s', (_label, change) => {
    const publisher = { ...valid.publishers[0], ...change };
    expect(() => parsePublisherPolicy({ ...valid, publishers: [publisher] })).toThrow();
  });
});

describe('data/publisher-policy.schema.json', () => {
  it('matches the zod schema (UPDATE_SCHEMA=1 rewrites it)', () => {
    const generated = `${JSON.stringify(z.toJSONSchema(PublisherPolicy), null, 2)}\n`;
    if (process.env.UPDATE_SCHEMA === '1') writeFileSync(SCHEMA_URL, generated);
    expect(readFileSync(SCHEMA_URL, 'utf8')).toBe(generated);
  });
});
