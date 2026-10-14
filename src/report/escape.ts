// Pod names, versions and paths come from the lockfile, the file system and the registries. The
// helpers here make sure none of them can act on the terminal or on rendered Markdown.

// C0 controls (tab and newline included), DEL and C1 controls. An escape sequence in a pod name
// would otherwise reach the terminal as is and could recolour or rewrite what is on screen.
// biome-ignore lint/suspicious/noControlCharactersInRegex: matching control characters is the point.
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f-\u009f]/g;

/** Replaces control characters with U+FFFD, so they show up instead of acting on the terminal. */
export const replaceControlCharacters = (text: string) =>
  text.replace(CONTROL_CHARACTERS, '\ufffd');

// The same characters except the newline, for messages that may span lines.
// biome-ignore lint/suspicious/noControlCharactersInRegex: matching control characters is the point.
const CONTROL_CHARACTERS_EXCEPT_NEWLINE = /[\u0000-\u0009\u000b-\u001f\u007f-\u009f]/g;

/** For messages on stderr: replaces control characters with U+FFFD and keeps line breaks. */
export const replaceControlCharactersExceptNewlines = (text: string) =>
  text.replace(CONTROL_CHARACTERS_EXCEPT_NEWLINE, '\ufffd');

/** A copy of a report (or any part of one) with every string passed through replaceControlCharacters. */
export function withoutControlCharacters<T>(value: T): T {
  if (typeof value === 'string') return replaceControlCharacters(value) as T;
  if (Array.isArray(value)) return value.map(withoutControlCharacters) as T;
  if (value === null || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, withoutControlCharacters(item)]),
  ) as T;
}
