import type { Report } from '../analyze.js';
import { renderMarkdown } from './markdown.js';
import { renderTty, type TtyOptions } from './tty.js';

export const FORMATS = ['tty', 'json', 'markdown'] as const;
export type Format = (typeof FORMATS)[number];

/** Renders a report in one of the supported formats. */
export function render(
  report: Report,
  format: Format,
  tty: TtyOptions = { color: false, all: false },
): string {
  switch (format) {
    case 'json':
      return `${JSON.stringify(report, null, 2)}\n`;
    case 'markdown':
      return renderMarkdown(report);
    case 'tty':
      return renderTty(report, tty);
  }
}

export { renderMarkdown, renderTty };
export type { TtyOptions };
