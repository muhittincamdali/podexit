import { z } from 'zod';

const httpsUrl = z.url({ protocol: /^https$/ });
const isoDate = z.iso.date();

/**
 * A publisher that stopped releasing to CocoaPods before trunk itself goes read-only, with the
 * page that says so. Every entry must cite its source.
 */
export const Publisher = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  pods: z.array(z.string().min(1)).min(1),
  lastMajorOnCocoaPods: z.number().int().nonnegative(),
  /** Month the last CocoaPods release is expected, `YYYY-MM`. */
  stoppedPublishing: z.string().regex(/^\d{4}-\d{2}$/),
  summary: z.string().min(1),
  swiftPackage: z.object({ url: httpsUrl, note: z.string().min(1) }).optional(),
  source: httpsUrl,
  /** Date someone last read the source and confirmed the entry. */
  checked: isoDate,
});
export type Publisher = z.infer<typeof Publisher>;

export const PublisherPolicy = z.object({
  $schema: z.string().optional(),
  /** Version of the data, separate from the package version: `YYYY.MM.DD` of the last change. */
  dataVersion: z.string().regex(/^\d{4}\.\d{2}\.\d{2}$/),
  publishers: z.array(Publisher),
});
export type PublisherPolicy = z.infer<typeof PublisherPolicy>;

/** Validates policy data; throws a zod error naming the offending field. */
export function parsePublisherPolicy(data: unknown): PublisherPolicy {
  return PublisherPolicy.parse(data);
}

/** The publisher whose policy covers a root pod name, if any. */
export function publisherFor(policy: PublisherPolicy, podName: string): Publisher | undefined {
  return policy.publishers.find((publisher) => publisher.pods.includes(podName));
}
