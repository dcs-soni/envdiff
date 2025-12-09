#!/usr/bin/env node

import { readFileSync } from 'fs';
import { parseEnvKeys } from './parse.js';
import { compareEnvKeys } from './compare.js';
import { formatDiff } from './format.js';

function main(): void {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.log('Usage: envdiff <file1> <file2>');
    console.log('');
    console.log('Example: envdiff .env.example .env');
    process.exit(1);
  }

  const [file1, file2] = args;

  try {
    const content1 = readFileSync(file1, 'utf-8');
    const content2 = readFileSync(file2, 'utf-8');

    const keys1 = parseEnvKeys(content1);
    const keys2 = parseEnvKeys(content2);

    const diff = compareEnvKeys(keys1, keys2);
    const output = formatDiff(diff, file1, file2);

    console.log(output);

    const hasChanges = diff.missing.length > 0 || diff.extra.length > 0;
    process.exit(hasChanges ? 1 : 0);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Error: ${message}`);
    process.exit(1);
  }
}

main();
