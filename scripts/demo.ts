// Records the README and guide demos from the real CLI: each one runs the built podexit in a
// fixture folder with the recorded answers, captures its coloured output and writes a light and a
// dark terminal SVG to docs/media/. Run with `npm run demo` (builds first).
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { type Session, terminalSvg } from './terminal-svg.ts';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
export const MEDIA = `${ROOT}docs/media/`;

export interface Demo {
  name: string;
  fixture: string;
  title: string;
}

export const DEMOS: Demo[] = [
  { name: 'native', fixture: 'native-app', title: 'podexit · native iOS app' },
  { name: 'flutter', fixture: 'flutter-app', title: 'podexit · Flutter app' },
  { name: 'expo', fixture: 'expo-app', title: 'podexit · Expo app' },
];

/** Runs the CLI for one demo and returns what a terminal would have shown. */
export function record(demo: Demo): Session {
  const env: NodeJS.ProcessEnv = { ...process.env, FORCE_COLOR: '1' };
  delete env.NO_COLOR;
  const output = execFileSync(
    process.execPath,
    [`${ROOT}dist/cli/main.js`, '--offline', '--cache-dir', '../responses'],
    { cwd: `${ROOT}fixtures/${demo.fixture}`, env, encoding: 'utf8' },
  );
  return {
    title: demo.title,
    comment: `# fixtures/${demo.fixture}: real lockfile, trunk and GitHub answers recorded 2026-10-14`,
    command: 'npx @mcamdali/podexit --offline --cache-dir ../responses',
    output,
  };
}

export const mediaPath = (demo: Demo, theme: 'light' | 'dark') =>
  `${MEDIA}demo-${demo.name}-${theme}.svg`;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  mkdirSync(MEDIA, { recursive: true });
  for (const demo of DEMOS) {
    const session = record(demo);
    for (const theme of ['light', 'dark'] as const) {
      writeFileSync(mediaPath(demo, theme), terminalSvg(session, theme));
    }
    console.log(`docs/media/demo-${demo.name}-{light,dark}.svg`);
  }
}
