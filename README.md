# sli-counter

<img src="docs/logo.svg" alt="sli-counter mark" width="88" height="88">

**Maintain a {good,bad} file store and report the success ratio.**

![version 1.00](https://img.shields.io/badge/version-1.00-C9A227?labelColor=0B1F33)
![branch main](https://img.shields.io/badge/branch-main-0B1F33?labelColor=C9A227)
![license MIT](https://img.shields.io/badge/license-MIT-0B1F33)
![node >=18](https://img.shields.io/badge/node-%3E%3D18-C9A227?labelColor=0B1F33)
![release 1.00](https://img.shields.io/github/v/release/theworker02/sli-counter?display_name=release)

Package version **1.00** (`1.0.0`). Default branch is **`main`** — never `master`.

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

Synopsis:

```text
sli-counter <good|bad|report>
```

| Flag / argument | Meaning |
| --- | --- |
| `-h, --help` | Print detailed usage and exit 0. |
| `-v, --version` | Print 1.0.0 and exit 0. |
| `good` | Increment good by 1 and persist. |
| `bad` | Increment bad by 1 and persist. |
| `report` | Print {good,bad,total,ratio}. ratio is null when total is 0. |

Print the same text locally:

```bash
sli-counter --help
sli-counter --version
```

Expected version output:

```text
1.0.0
```

## Configuration

State file is `.sli-counter.json` in the current working directory: {"good":0,"bad":0}. Created on first bump.

## Exit codes

| Code | Meaning |
| --- | --- |
| `0` | good, bad, or report succeeded. |
| `1` | Unknown or missing subcommand. |

## Examples

### Success path

```bash
sli-counter report
```

```json
{"good":2,"bad":1,"total":3,"ratio":0.6666666666666666}
```

### Failure path

```bash
sli-counter
```

```text
usage: sli-counter <good|bad|report>
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
