import type { LockfileReport, PodReport, Report } from '../analyze.js';
import {
  guideUrl,
  orderPods,
  PROJECT_LABELS,
  podsHeadline,
  requiredByLabel,
  summaryLines,
  swiftPackageLabel,
  updatesLabel,
} from './labels.js';
import { withoutControlCharacters } from './escape.js';

export interface TtyOptions {
  /** ANSI colours; the CLI turns them on for terminals unless NO_COLOR is set. */
  color: boolean;
  /** Also list pods that come from local paths, git or private specs. */
  all: boolean;
}

type Style = 'bold' | 'dim' | 'blue' | 'cyan' | 'yellow' | 'magenta' | 'green' | 'red';

const CODES: Record<Style, [number, number]> = {
  bold: [1, 22],
  dim: [2, 22],
  blue: [34, 39],
  cyan: [36, 39],
  yellow: [33, 39],
  magenta: [35, 39],
  green: [32, 39],
  red: [31, 39],
};

type Paint = (style: Style, text: string) => string;

function painter(color: boolean): Paint {
  if (!color) return (_style, text) => text;
  return (style, text) => {
    const [open, close] = CODES[style];
    return text ? `\u001b[${open}m${text}\u001b[${close}m` : text;
  };
}

const UPDATE_STYLE: Record<PodReport['updates']['status'], Style> = {
  'frozen-on-trunk': 'yellow',
  capped: 'magenta',
  'not-affected': 'dim',
  unknown: 'dim',
};

const PACKAGE_STYLE: Record<PodReport['swiftPackage']['status'], Style> = {
  'spm-available': 'green',
  'no-spm': 'red',
  unknown: 'dim',
  'not-checked': 'dim',
};

interface Column {
  title: string;
  cell: (pod: PodReport) => string;
  style?: (pod: PodReport) => Style | undefined;
}

const COLUMNS: Column[] = [
  { title: 'POD', cell: (pod) => pod.name, style: (pod) => (pod.direct ? 'bold' : undefined) },
  { title: 'LOCKED', cell: (pod) => pod.version },
  { title: 'LATEST ON TRUNK', cell: (pod) => pod.updates.latestOnTrunk ?? '' },
  {
    title: 'UPDATES',
    cell: updatesLabel,
    style: (pod) => UPDATE_STYLE[pod.updates.status],
  },
  {
    title: 'SWIFT PACKAGE',
    cell: swiftPackageLabel,
    style: (pod) => PACKAGE_STYLE[pod.swiftPackage.status],
  },
  { title: 'PULLED IN BY', cell: requiredByLabel, style: () => 'dim' },
];

function table(pods: readonly PodReport[], paint: Paint): string[] {
  const rows = pods.map((pod) => COLUMNS.map((column) => column.cell(pod)));
  const widths = COLUMNS.map((column, index) =>
    Math.max(column.title.length, ...rows.map((row) => (row[index] ?? '').length)),
  );
  // The last column is not padded and lines are trimmed, so no line ends in spaces.
  const line = (cells: string[], styles: (Style | undefined)[]) =>
    `  ${cells
      .map((cell, index) => {
        // Padding stays outside the colour codes, so coloured and plain lines trim alike.
        const width = index === cells.length - 1 ? 0 : (widths[index] ?? 0);
        const style = styles[index];
        return (style ? paint(style, cell) : cell) + ' '.repeat(Math.max(0, width - cell.length));
      })
      .join('  ')}`.trimEnd();
  return [
    line(
      COLUMNS.map((column) => column.title),
      COLUMNS.map(() => 'dim'),
    ),
    ...pods.map((pod, index) =>
      line(
        rows[index] ?? [],
        COLUMNS.map((column) => column.style?.(pod)),
      ),
    ),
  ];
}

function lockfileSection(lockfile: LockfileReport, options: TtyOptions, paint: Paint): string[] {
  const ordered = orderPods(lockfile.pods);
  const shown = options.all
    ? ordered
    : ordered.filter((pod) => pod.updates.status !== 'not-affected');
  const hidden = ordered.length - shown.length;
  const [updates, packages] = summaryLines(lockfile.summary);
  const lines = [
    `${paint('bold', paint('blue', lockfile.path))}  ${paint('dim', `${PROJECT_LABELS[lockfile.project]} · ${podsHeadline(lockfile.summary)}`)}`,
    '',
  ];
  lines.push(...(shown.length > 0 ? table(shown, paint) : ['  No pods from CocoaPods trunk.']));
  lines.push('', `  ${updates}`, `  ${packages}`);
  if (hidden > 0) {
    lines.push(
      paint(
        'dim',
        `  ${hidden} more from local paths, git or private specs (not affected); --all lists them.`,
      ),
    );
  }
  lines.push(`  Guide: ${paint('cyan', guideUrl(lockfile.guide.path))}`, '');
  return lines;
}

/** Plain-text table for terminals. Colours are optional; the text is the same either way. */
export function renderTty(input: Report, options: TtyOptions): string {
  const report = withoutControlCharacters(input);
  const paint = painter(options.color);
  const { timeline } = report;
  const lines = [
    `${paint('bold', 'podexit')} ${report.tool.version} · CocoaPods trunk goes read-only on ${paint('bold', timeline.readOnly)} (trial run ${timeline.trialRun.from} to ${timeline.trialRun.to})`,
    ...report.notes.map((note) => paint('dim', note)),
    '',
  ];
  for (const lockfile of report.lockfiles) lines.push(...lockfileSection(lockfile, options, paint));
  if (report.offline) {
    lines.push(paint('dim', 'Offline: answers come from the cache; missing ones show as unknown.'));
  }
  return `${lines.join('\n').trimEnd()}\n`;
}
