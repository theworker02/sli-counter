# sli-counter

<img src="docs/logo.svg" alt="sli-counter mark" width="96" height="96">

**Maintain a {good,bad} file store and report the success ratio.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/sli-counter?display_name=release)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

**Docs:** [GitHub Pages](https://theworker02.github.io/sli-counter/) · **Source:** [`theworker02/sli-counter`](https://github.com/theworker02/sli-counter) · **Release 1.00:** [`v1.0.0`](https://github.com/theworker02/sli-counter/releases/tag/v1.0.0)

## Why it exists

A local SLI does not need Prometheus. sli-counter is a two-bucket counter you can bump from scripts and report from cron.

## Who it is for

People tracking flaky jobs, workshop pass rates, or homelab probes without standing up metrics infra.

## Install

Requires Node.js 18 or newer. No extra npm dependencies.

### Global install from GitHub

```bash
npm install -g git+https://github.com/theworker02/sli-counter.git
sli-counter --help
```

### Clone and link locally

```bash
git clone https://github.com/theworker02/sli-counter.git
cd sli-counter
npm install -g .
```

### Run without installing (npx / node)

```bash
npx --yes git+https://github.com/theworker02/sli-counter.git --help
node src/cli.js --help
```

## Quick start

```bash
sli-counter good
sli-counter good
sli-counter bad
sli-counter report
```

## CLI reference

```text
sli-counter 1.00 (1.0.0)

Usage:
  sli-counter good [options]
  sli-counter bad [options]
  sli-counter report [options]
  sli-counter reset [options]

Maintain a {good,bad} store and report the success ratio.
Default store: ./.sli-counter.json

Subcommands:
  good               Increment the success count
  bad                Increment the failure count
  report             Print good, bad, total, and ratio
  reset              Set both counters back to 0

Options:
  -h, --help         Show this help and exit 0
  -V, -v, --version  Print 1.0.0 and exit 0
  --json             JSON output
  --store <path>     Store file (relative to cwd unless absolute)
  --slo <ratio>      With report: exit 1 when ratio is below this 0..1 value
                     (also fails when total is 0)

ratio = good / (good + bad), or null when total is 0.

Exit codes:
  0  bump/reset succeeded, or report meets SLO / has no SLO
  1  ratio below --slo, unknown command, or bad --slo

Examples:
  sli-counter good
  sli-counter bad --store ./tmp/sli.json
  sli-counter report --slo 0.99 --json
  sli-counter reset
```

Print the same text locally:

```bash
sli-counter --help
sli-counter -h
sli-counter --version
sli-counter -V
```

Expected version output:

```text
1.0.0
```

## Configuration

Default store is `.sli-counter.json`. Override with `--store`.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | bump/reset succeeded, or report meets SLO / has no SLO. |
| `1` | Ratio below --slo, unknown command, or bad --slo. |

## Examples

### Success path

Record events and report a ratio that meets the SLO.

```bash
sli-counter good
sli-counter report --slo 0.99
```

```text
good -> good 1, bad 0
good:  1
bad:   0
ratio: 1.0000
slo:   0.99  PASS
```

### Failure path

A ratio below --slo exits 1.

```bash
sli-counter bad
sli-counter report --slo 0.99
```

```text
slo:   0.99  FAIL
```

Exit code is 1.

## How to run tests

No extra packages. From the repository root:

```bash
npm test
# same as:
node --test
```

All tests must pass before you open a pull request against `main`.

## GitHub Pages

This repository ships a product site in `/docs`.

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Branch: **`main`**.
4. Folder: **`/docs`**.
5. Save, then wait for the Pages deployment.
6. Open [https://theworker02.github.io/sli-counter/](https://theworker02.github.io/sli-counter/).

Do not point Pages at `master`. The default branch is `main`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Open pull requests against **`main`**.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.

## License

[MIT](LICENSE) © 2026 theworker02

## Funding

- GitHub Sponsors: [theworker02](https://github.com/sponsors/theworker02)
- thanks.dev: [https://thanks.dev/u/gh/theworker02](https://thanks.dev/u/gh/theworker02)
