# sli-counter


---

## License & acquisition

This project is **proprietary**. Production use, redistribution, and commercial deployment require a written commercial license or completed acquisition. See [LICENSE](./LICENSE) and [ACQUISITION.md](./ACQUISITION.md). Contact [@theworker02](https://github.com/theworker02).


<img src="docs/logo.svg" alt="sli-counter mark" width="96" height="96">

**Maintain a local good/bad SLI counter, calculate success ratios, and evaluate an optional SLO.**

[![JSR](https://jsr.io/badges/@theworker02/sli-counter)](https://jsr.io/@theworker02/sli-counter)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)

**Package:** [`@theworker02/sli-counter`](https://jsr.io/@theworker02/sli-counter) Ã‚Â· **Site:** [GitHub Pages](https://theworker02.github.io/sli-counter/) Ã‚Â· **Source:** [`theworker02/sli-counter`](https://github.com/theworker02/sli-counter)

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

- `bump(kind, cwd, file)` Ã¢â‚¬â€ increment good/bad counts.
- `report(cwd, file, options)` Ã¢â‚¬â€ calculate ratio and SLO status.
- `ratioOf(state)` Ã¢â‚¬â€ calculate an in-memory ratio.
- `load()`, `save()`, `reset()` Ã¢â‚¬â€ state management.
- `storePath()` and `STORE` Ã¢â‚¬â€ storage metadata.
- `formatHuman()` Ã¢â‚¬â€ terminal output.
- `PACKAGE`, `SliState`, `SliReport` Ã¢â‚¬â€ documented JSR symbols.

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

[MIT](LICENSE) Ã‚Â© 2026 theworker02

## Status

sli-counter is actively packaged for commercial licensing and acquisition diligence. See [ACQUISITION.md](./ACQUISITION.md) and [docs/acquisition/](./docs/acquisition/).
