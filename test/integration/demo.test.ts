import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DEMOS, mediaPath, record } from '../../scripts/demo.ts';
import { parseAnsi, terminalSvg } from '../../scripts/terminal-svg.ts';

// The version in the first output line changes with each release; the demo stays valid.
const withoutVersion = (svg: string) => svg.replace(/(>podexit<\/tspan><tspan[^>]*>) [\d.]+/, '$1');

describe('parseAnsi', () => {
  it('splits a line into styled spans', () => {
    expect(parseAnsi('\u001b[1m\u001b[34mPodfile.lock\u001b[39m\u001b[22m  plain')).toEqual([
      { text: 'Podfile.lock', bold: true, dim: false, color: 'blue' },
      { text: '  plain', bold: false, dim: false, color: null },
    ]);
  });

  it('resets on code 0 and keeps text without codes', () => {
    expect(parseAnsi('\u001b[2mdim\u001b[0m end')).toEqual([
      { text: 'dim', bold: false, dim: true, color: null },
      { text: ' end', bold: false, dim: false, color: null },
    ]);
    expect(parseAnsi('no codes')).toEqual([
      { text: 'no codes', bold: false, dim: false, color: null },
    ]);
  });
});

describe('terminalSvg', () => {
  const session = { title: 'demo', command: 'npx podexit', output: 'a <b> & c\n' };

  it('escapes text and carries no scripts or external references', () => {
    const svg = terminalSvg(session, 'dark');
    expect(svg).toContain('a &lt;b&gt; &amp; c');
    expect(svg).not.toMatch(/<script|href=|url\(|@import/);
  });

  it('shows everything at once when motion is reduced', () => {
    expect(terminalSvg(session, 'light')).toContain('@media (prefers-reduced-motion:reduce)');
  });
});

describe.each(DEMOS)('docs/media/demo-$name', (demo) => {
  it('matches what the CLI prints today (npm run demo regenerates it)', () => {
    const session = record(demo);
    for (const theme of ['light', 'dark'] as const) {
      const committed = readFileSync(mediaPath(demo, theme), 'utf8');
      expect(withoutVersion(committed)).toBe(withoutVersion(terminalSvg(session, theme)));
    }
  });
});
