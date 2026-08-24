#!/usr/bin/env node
const { bump, report } = require("./index.js");

const command = process.argv[2];
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
