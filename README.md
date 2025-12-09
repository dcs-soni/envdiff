# envdiff

Compare `.env` files to find missing or extra variables.

**Values are never read** - only key names are compared.

## Security

This tool is designed for trust:

- **Zero runtime dependencies** - no supply chain risk
- **Values never read** - only parses key names, ignores everything after `=`
- **No network calls** - runs entirely offline
- **~70 lines of code** - fully auditable in 2 minutes
- **Open source** - review the code yourself before using

```bash
# Verify zero dependencies
npm ls --prod
# (empty output = no runtime dependencies)
```

## Installation

```bash
npm install
npm run build
```

To use globally:
```bash
npm link
```

## Usage

```bash
envdiff <file1> <file2>
```

### Examples

Compare `.env.example` against your local `.env`:
```bash
envdiff .env.example .env
```

Compare staging vs production:
```bash
envdiff .env.staging .env.production
```

### Output

```
Missing in .env:
  - REDIS_URL
  - API_SECRET

Extra in .env:
  + OLD_UNUSED_VAR
```

## Exit Codes

- `0` - No differences found
- `1` - Differences found or error occurred

## Use in CI/CD

Add to your pipeline to catch missing env vars before deployment:

```yaml
# GitHub Actions
- name: Check env vars
  run: npx envdiff .env.example .env.production
```

```yaml
# GitLab CI
check-env:
  script:
    - npx envdiff .env.example .env.production
```

## Use as a Module

```typescript
import { parseEnvKeys } from './parse.js';
import { compareEnvKeys } from './compare.js';
import { formatDiff } from './format.js';

const keys1 = parseEnvKeys('API_KEY=xxx\nDEBUG=true');
const keys2 = parseEnvKeys('API_KEY=yyy');

const diff = compareEnvKeys(keys1, keys2);
// { missing: [], extra: ['DEBUG'] }

console.log(formatDiff(diff, 'source', 'target'));
```

## License

MIT
