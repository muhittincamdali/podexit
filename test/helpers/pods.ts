import type { LockedPod, PodSource } from '../../src/core/lockfile.js';
import type { PublisherPolicy } from '../../src/core/policy.js';

export function lockedPod(
  name: string,
  source: PodSource,
  overrides: Partial<LockedPod> = {},
): LockedPod {
  return {
    name,
    version: '1.0.0',
    subspecs: [],
    dependencies: [],
    requiredBy: [],
    direct: true,
    source,
    ...overrides,
  };
}

export const POLICY: PublisherPolicy = {
  dataVersion: '2026.10.14',
  publishers: [
    {
      id: 'firebase',
      name: 'Firebase',
      pods: ['FirebaseAnalytics', 'FirebaseCore'],
      lastMajorOnCocoaPods: 12,
      stoppedPublishing: '2026-10',
      summary: 'Firebase 12 is the final major version published to CocoaPods.',
      includesSubdependencies: true,
      swiftPackage: {
        url: 'https://github.com/firebase/firebase-ios-sdk',
        note: 'All Firebase libraries are products of the firebase-ios-sdk package.',
      },
      source: 'https://firebase.google.com/docs/ios/cocoapods-deprecation',
      checked: '2026-10-14',
    },
  ],
};
