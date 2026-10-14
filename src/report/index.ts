import type { Report } from '../analyze.js';
import { withoutControlCharacters } from './escape.js';
import { renderMarkdown } from './markdown.js';
import { renderTty, type TtyOptions } from './tty.js';

export const FORMATS = ['tty', 'json', 'markdown'] as const;
export type Format = (typeof FORMATS)[number];

/**
 * Renders a report in one of the supported formats. This is the one way out for a report: every
 * string in it has its control characters replaced here, whatever the format, before anything
 * reaches a terminal, a file or a pull request comment.
 */
export function render(
  input: Report,
  format: Format,
  tty: TtyOptions = { color: false, all: false },
): string {
  const report = withoutControlCharacters(input);
  switch (format) {
    case 'json':
      return `${JSON.stringify(report, null, 2)}\n`;
    case 'markdown':
      return renderMarkdown(report);
    case 'tty':
      return renderTty(report, tty);
  }
}

export type { TtyOptions };
