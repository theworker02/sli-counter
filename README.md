# sli-counter

<img src="docs/logo.svg" alt="sli-counter mark" width="96" height="96">

**Maintain a local good/bad SLI counter, calculate success ratios, and evaluate an optional SLO.**

[![JSR](https://jsr.io/badges/@theworker02/sli-counter)](https://jsr.io/@theworker02/sli-counter)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)

**Package:** [`@theworker02/sli-counter`](https://jsr.io/@theworker02/sli-counter) · **Site:** [GitHub Pages](https://theworker02.github.io/sli-counter/) · **Source:** [`theworker02/sli-counter`](https://github.com/theworker02/sli-counter)

## Add from JSR

```bash
deno add jsr:@theworker02/sli-counter
```

```ts
import { bump, ratioOf, report } from "@theworker02/sli-counter";

bump("good");
console.log(report(undefined, undefined, { slo: 0.99 }));
console.log(ratioOf({ good: 99, bad: 1 }));
```

## Public API

- `bump(kind, cwd, file)` — increment good/bad counts.
- `report(cwd, file, options)` — calculate ratio and SLO status.
- `ratioOf(state)` — calculate an in-memory ratio.
- `load()`, `save()`, `reset()` — state management.
- `storePath()` and `STORE` — storage metadata.
- `formatHuman()` — terminal output.
- `PACKAGE`, `SliState`, `SliReport` — documented JSR symbols.

## CLI from source

```bash
git clone https://github.com/theworker02/sli-counter.git
cd sli-counter
node src/cli.js good
node src/cli.js report
```

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/sli-counter`, published through GitHub Actions trusted publishing.

## License

[MIT](LICENSE) © 2026 theworker02
