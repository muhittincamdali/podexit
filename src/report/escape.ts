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

const BACKTICK_RUNS = /`+/g;

/**
 * Markdown code span for text from the lockfile or the registries. Nothing inside a code span is
 * markup (no HTML, links, autolinks or @mentions), so the text only has to keep the span closed:
 * the fence is one backtick longer than the longest run of backticks in the text, and a space pads
 * text that starts or ends with a backtick or a space (Markdown strips one from each side).
 */
export function markdownCode(text: string): string {
  if (!text) return '';
  const longestRun = Math.max(0, ...(text.match(BACKTICK_RUNS) ?? []).map((run) => run.length));
  const fence = '`'.repeat(longestRun + 1);
  const padding = /^[ `]|[ `]$/.test(text) && text.trim() !== '' ? ' ' : '';
  return `${fence}${padding}${text}${padding}${fence}`;
}

/** GitHub splits table rows on `|` before anything else, code spans included. */
export const escapeTableCell = (text: string) => text.replace(/\|/g, '\\|');

// Characters a link destination may keep. The rest is percent-encoded, so a URL cannot close the
// link with `)`, open a new one, start an HTML tag or bring an entity such as `&#47;`.
const URL_UNSAFE = /[^A-Za-z0-9\-._~:/?#@!$+,;=%]/g;

const percentEncode = (character: string) =>
  [...new TextEncoder().encode(character)]
    .map((byte) => `%${byte.toString(16).toUpperCase().padStart(2, '0')}`)
    .join('');

/** An http(s) URL that is safe as a Markdown link destination, or null for anything else. */
export function markdownUrl(text: string): string | null {
  const url = URL.parse(text);
  if (url?.protocol !== 'https:' && url?.protocol !== 'http:') return null;
  return url.href.replace(URL_UNSAFE, percentEncode);
}
