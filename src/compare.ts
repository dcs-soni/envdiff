export interface EnvDiff {
  missing: string[];
  extra: string[];
}

export function compareEnvKeys(source: Set<string>, target: Set<string>): EnvDiff {
  const missing: string[] = [];
  const extra: string[] = [];

  for (const key of source) {
    if (!target.has(key)) {
      missing.push(key);
    }
  }

  for (const key of target) {
    if (!source.has(key)) {
      extra.push(key);
    }
  }

  return { missing, extra };
}
