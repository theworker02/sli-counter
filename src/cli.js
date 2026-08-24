#!/usr/bin/env node
const { bump, report } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

const args = process.argv.slice(2);
if (args.includes("-h") || args.includes("--help")) {
  process.stdout.write(HELP);
  process.exit(0);
}
if (args.includes("-v") || args.includes("--version")) {
  process.stdout.write(`${VERSION}\n`);
  process.exit(0);
}

const command = args.find((a) => !a.startsWith("-"));
if (command === "good" || command === "bad") {
  process.stdout.write(`${JSON.stringify(bump(command))}\n`);
  process.exit(0);
}
if (command === "report") {
  process.stdout.write(`${JSON.stringify(report())}\n`);
  process.exit(0);
}
process.stderr.write("usage: sli-counter <good|bad|report>\n");
process.exit(1);
