import type { LockfileReport, PodReport, Report } from '../analyze.js';
import {
  guideUrl,
  orderPods,
  PROJECT_LABELS,
  plural,
  podsHeadline,
  requiredByLabel,
  summaryLines,
  swiftPackageLabel,
  updatesLabel,
} from './labels.js';
import { escapeTableCell, markdownCode, markdownUrl } from './escape.js';

// Names, versions and paths come from the lockfile and the registries, so they go into code spans,
// where Markdown and HTML have no effect. Labels and links are podexit's own text.
const code = (text: string) => escapeTableCell(markdownCode(text));
const DATE = /^\d{4}-\d{2}-\d{2}$/;

function latestCell(pod: PodReport): string {
  const { latestOnTrunk, latestReleasedAt } = pod.updates;
  if (!latestOnTrunk) return '';
  const date = latestReleasedAt?.slice(0, 10) ?? '';
  return DATE.test(date) ? `${code(latestOnTrunk)} (${date})` : code(latestOnTrunk);
}

function swiftPackageCell(pod: PodReport): string {
  const label = swiftPackageLabel(pod);
  const url = pod.swiftPackage.repository ? markdownUrl(pod.swiftPackage.repository) : null;
  return url && pod.swiftPackage.status !== 'not-checked' ? `[${label}](${url})` : label;
}

function podTable(pods: readonly PodReport[]): string[] {
  return [
    '| Pod | Locked | Latest on trunk | Updates | Swift package | Pulled in by |',
    '| --- | --- | --- | --- | --- | --- |',
    ...pods.map((pod) =>
      [
        code(pod.name),
        code(pod.version),
        latestCell(pod),
        updatesLabel(pod),
        swiftPackageCell(pod),
        code(requiredByLabel(pod)),
      ]
        .join(' | ')
        .replace(/^/, '| ')
        .replace(/$/, ' |'),
    ),
  ];
}

function lockfileSection(lockfile: LockfileReport): string[] {
  const ordered = orderPods(lockfile.pods);
  const trunk = ordered.filter((pod) => pod.updates.status !== 'not-affected');
  const other = ordered.filter((pod) => pod.updates.status === 'not-affected');
  const [updates, packages] = summaryLines(lockfile.summary);
  const lines = [
    `## ${markdownCode(lockfile.path)}`,
    '',
    `${PROJECT_LABELS[lockfile.project]}, ${podsHeadline(lockfile.summary)}.`,
    '',
    `- ${updates}`,
    `- ${packages}`,
    `- Guide: [${lockfile.guide.title}](${guideUrl(lockfile.guide.path)})`,
    '',
  ];
  lines.push(...(trunk.length > 0 ? podTable(trunk) : ['No pods from CocoaPods trunk.']), '');
  if (other.length > 0) {
    lines.push(
      '<details>',
      `<summary>${plural(other.length, 'pod')} from local paths, git or private specs (not affected)</summary>`,
      '',
      ...podTable(other),
      '',
      '</details>',
      '',
    );
  }
  return lines;
}

/**
 * GitHub-flavoured Markdown, for pull request comments, issues and MIGRATION notes. Called through
 * `render`, which has already replaced control characters in the report.
 */
export function renderMarkdown(report: Report): string {
  const { timeline } = report;
  const lines = [
    '# podexit report',
    '',
    `CocoaPods trunk goes read-only on **${timeline.readOnly}**, after a trial run from ${timeline.trialRun.from} to ${timeline.trialRun.to} ([announcement](${timeline.source})). ${report.notes.join(' ')}`,
    '',
  ];
  for (const lockfile of report.lockfiles) lines.push(...lockfileSection(lockfile));
  const offline = report.offline ? ', offline' : '';
  lines.push(
    `<sub>podexit ${report.tool.version}, ${report.generatedAt.slice(0, 10)}${offline}, publisher data ${report.policyDataVersion}</sub>`,
  );
  return `${lines.join('\n')}\n`;
}
