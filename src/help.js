const HELP = "sli-counter 1.00 (1.0.0)\n\nUsage:\n  sli-counter good\n  sli-counter bad\n  sli-counter report\n  sli-counter --help\n  sli-counter --version\n\nStore: ./.sli-counter.json  {good, bad}\n\nreport.ratio = good / (good + bad), or null when total is 0.\n\nOptions:\n  -h, --help       Show this help\n  -v, --version    Print 1.0.0\n";
const VERSION = "1.0.0";
module.exports = { HELP, VERSION };
