import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { GUIDES } from '../../src/core/project.js';

describe('GUIDES', () => {
  it.each(Object.entries(GUIDES))('links %s projects to a guide in the repository', (_, guide) => {
    const file = new URL(`../../${guide.path}`, import.meta.url);
    expect(existsSync(file), guide.path).toBe(true);
    expect(readFileSync(file, 'utf8')).toMatch(/^# \S/);
  });
});
