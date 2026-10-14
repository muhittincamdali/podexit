/** Dates from the CocoaPods announcement. They are the maintainers' plan, not a guarantee. */
export const TIMELINE = {
  /** "I will trigger a test run, giving automation a chance to break early." */
  trialRun: { from: '2026-11-01', to: '2026-11-07' },
  /** "I will switch trunk to not accept new Podspecs permanently." */
  readOnly: '2026-12-02',
  source: 'https://blog.cocoapods.org/CocoaPods-Specs-Repo/',
} as const;

/**
 * Printed with every report, so "frozen" is never read as "broken". From the same announcement:
 * the Specs repo and CDN keep serving, and existing builds keep working.
 */
export const BUILDS_KEEP_WORKING =
  'Builds keep working: pods already on trunk stay installable after December 2, 2026. Trunk only stops accepting new versions.';
