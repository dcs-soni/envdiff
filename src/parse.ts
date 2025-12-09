export function parseEnvKeys(content: string): Set<string> {
  const keys = new Set<string>();

  for (const line of content.split('\n')) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, eqIndex).trim();

    if (key) {
      keys.add(key);
    }
  }

  return keys;
}
