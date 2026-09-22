# sli-counter


---

## License & acquisition

This project is **proprietary**. Production use, redistribution, and commercial deployment require a written commercial license or completed acquisition. See [LICENSE](./LICENSE) and [ACQUISITION.md](./ACQUISITION.md). Contact [@theworker02](https://github.com/theworker02).


<img src="docs/logo.svg" alt="sli-counter mark" width="96" height="96">

**Maintain a local good/bad SLI counter, calculate success ratios, and evaluate an optional SLO.**

[![JSR](https://jsr.io/badges/@theworker02/sli-counter)](https://jsr.io/@theworker02/sli-counter)
![version 1.1.0](https://img.shields.io/badge/version-1.1.0-C9A227?labelColor=0B1F33)
![license proprietary](https://img.shields.io/badge/license-Proprietary%20(source--available)-0B1F33)

**Package:** [`@theworker02/sli-counter`](https://jsr.io/@theworker02/sli-counter)  ·  **Site:** [GitHub Pages](https://theworker02.github.io/sli-counter/)  ·  **Source:** [`theworker02/sli-counter`](https://github.com/theworker02/sli-counter)

## Purpose

Track good and bad service-level indicator (SLI) events in a small JSON file on disk, compute success ratios, and optionally compare them to a service-level objective (SLO). Useful for local experiments, workshops, and CI steps that need a human-readable SLI tally without standing up metrics infrastructure.

## Highlights

- Persists `{good, bad}` counts in `.sli-counter.json` (override with `--store`).
- Reports ratio `good / (good + bad)` and optional SLO pass/fail exit codes.
- Runtime-neutral ESM API suitable for Deno, Node, and bundlers via JSR.
- No network calls, no external metrics backend.


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

## Development

```bash
node --test
```

## Publishing

The canonical public package is JSR `@theworker02/sli-counter`, published through GitHub Actions trusted publishing.



## CLI examples

Run from a cloned repository (Node 18+):

```bash
git clone https://github.com/theworker02/sli-counter.git
cd sli-counter
node src/cli.js good
node src/cli.js bad --store ./tmp/sli.json
node src/cli.js report --slo 0.99 --json
node src/cli.js reset
```

See `node src/cli.js --help` for flags and exit codes.

## Limitations

- Counts are local to one store file; there is no aggregation across machines.
- SLO checks use a simple ratio threshold; burn-rate alerting is out of scope.
- The CLI and default store path assume a POSIX-friendly working directory.

## Documentation

- [JSR package and generated API docs](https://jsr.io/@theworker02/sli-counter)
- [Project site](https://theworker02.github.io/sli-counter/)
- [Source repository](https://github.com/theworker02/sli-counter)

## License

**Source-available proprietary** — evaluation under [LICENSE](./LICENSE); commercial / production use via [COMMERCIAL.md](./COMMERCIAL.md). See [LICENSE_TRANSITION_NOTICE.md](./LICENSE_TRANSITION_NOTICE.md) and [NOTICE](./NOTICE).


## Status

sli-counter is actively packaged for commercial licensing and acquisition diligence. See [ACQUISITION.md](./ACQUISITION.md) and [docs/acquisition/](./docs/acquisition/).

