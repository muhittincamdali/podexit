import type { PodReport, Summary } from '../analyze.js';
import type { UpdateStatus } from '../core/classify.js';

export const REPOSITORY_URL = 'https://github.com/muhittincamdali/podexit';

// C0 controls (tab and newline included), DEL and C1 controls. Pod names, versions and paths come
// from the lockfile, the file system and the registries; an escape sequence in one of them would
// otherwise reach the terminal as is and could recolour or rewrite what is on screen.
// biome-ignore lint/suspicious/noControlCharactersInRegex: matching control characters is the point.
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f-\u009f]/g;

/** Replaces control characters with U+FFFD, so they show up instead of acting on the terminal. */
export const replaceControlCharacters = (text: string) =>
  text.replace(CONTROL_CHARACTERS, '\ufffd');

/** A copy of a report (or any part of one) with every string passed through replaceControlCharacters. */
export function withoutControlCharacters<T>(value: T): T {
  if (typeof value === 'string') return replaceControlCharacters(value) as T;
  if (Array.isArray(value)) return value.map(withoutControlCharacters) as T;
  if (value === null || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, withoutControlCharacters(item)]),
  ) as T;
}

/** Short label for the UPDATES column. */
export function updatesLabel(pod: PodReport): string {
  switch (pod.updates.status) {
    case 'frozen-on-trunk':
      return 'frozen after Dec 2';
    case 'capped':
      if (pod.updates.via) return `capped with ${pod.updates.publisher?.name ?? '?'}`;
      return `capped at ${pod.updates.publisher?.lastMajorOnCocoaPods ?? '?'}.x`;
    case 'not-affected':
      return 'not affected';
    case 'unknown':
      return 'unknown source';
  }
}

/** Short label for the SWIFT PACKAGE column. */
export function swiftPackageLabel(pod: PodReport): string {
  const { status, via, atLockedVersion } = pod.swiftPackage;
  switch (status) {
    case 'spm-available':
      if (via === 'publisher') return `yes (${pod.updates.publisher?.name ?? 'publisher'})`;
      return atLockedVersion === false ? 'yes, newer versions' : 'yes';
    case 'no-spm':
      return 'no';
    case 'unknown':
      return 'unknown';
    case 'not-checked':
      return '-';
  }
}

const STATUS_ORDER: Record<UpdateStatus, number> = {
  capped: 0,
  'frozen-on-trunk': 1,
  unknown: 2,
  'not-affected': 3,
};

/** Display order: capped, frozen, unknown, not affected; Podfile pods before transitive ones. */
export function orderPods(pods: readonly PodReport[]): PodReport[] {
  return [...pods].sort(
    (a, b) =>
      STATUS_ORDER[a.updates.status] - STATUS_ORDER[b.updates.status] ||
      Number(b.direct) - Number(a.direct) ||
      a.name.localeCompare(b.name, 'en'),
  );
}

/** "FirebaseAnalytics" or "FirebaseAnalytics +2" for pods pulled in by others. */
export function requiredByLabel(pod: PodReport): string {
  if (pod.direct || pod.requiredBy.length === 0) return '';
  const [first, ...rest] = pod.requiredBy;
  return rest.length > 0 ? `${first} +${rest.length}` : (first ?? '');
}

export function guideUrl(path: string): string {
  return `${REPOSITORY_URL}/blob/main/${path}`;
}

export const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

/** Two summary lines shared by the terminal and Markdown reports. */
export function summaryLines(summary: Summary): [string, string] {
  return [
    [
      `${summary.frozenOnTrunk} frozen on trunk`,
      `${summary.capped} capped by the publisher`,
      `${summary.notAffected} not affected`,
      ...(summary.unknown ? [`${summary.unknown} without a source`] : []),
    ].join(' · '),
    [
      `${plural(summary.spmAvailable, 'pod')} with a Swift package`,
      `${summary.noSpm} without`,
      `${summary.spmUnknown} unknown`,
    ].join(' · '),
  ];
}

export function podsHeadline(summary: Summary): string {
  return `${plural(summary.pods, 'pod')}, ${summary.direct} in the Podfile`;
}

export const PROJECT_LABELS = {
  native: 'native iOS app',
  'flutter-app': 'Flutter app',
  'flutter-plugin': 'Flutter plugin example app',
  'react-native': 'React Native app',
  expo: 'Expo app',
} as const;
