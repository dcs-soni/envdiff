import type { EnvDiff } from './compare.js';

export function formatDiff(diff: EnvDiff, file1: string, file2: string): string {
  const lines: string[] = [];

  if (diff.missing.length === 0 && diff.extra.length === 0) {
    return 'No differences found.';
  }

  if (diff.missing.length > 0) {
    lines.push(`Missing in ${file2}:`);
    for (const key of diff.missing) {
      lines.push(`  - ${key}`);
    }
    lines.push('');
  }

  if (diff.extra.length > 0) {
    lines.push(`Extra in ${file2}:`);
    for (const key of diff.extra) {
      lines.push(`  + ${key}`);
    }
    lines.push('');
  }

  return lines.join('\n').trimEnd();
}
