const HELP = `sli-counter 1.00 (1.0.0)

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
`;

const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
