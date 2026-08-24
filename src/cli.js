#!/usr/bin/env node
const { bump, report, reset, formatHuman } = require("./index.js");
const { HELP, VERSION } = require("./help.js");

function parseArgv(argv) {
  const flags = {};
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") flags.help = true;
    else if (arg === "-V" || arg === "-v" || arg === "--version") flags.version = true;
    else if (arg === "--json") flags.json = true;
    else if (arg === "--store") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) throw new Error("option --store requires a path");
      flags.store = next;
      i += 1;
    } else if (arg.startsWith("--store=")) flags.store = arg.slice("--store=".length);
    else if (arg === "--slo") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) throw new Error("option --slo requires a value");
      flags.slo = next;
      i += 1;
    } else if (arg.startsWith("--slo=")) flags.slo = arg.slice("--slo=".length);
    else if (arg.startsWith("-")) throw new Error(`unknown option: ${arg}`);
    else positional.push(arg);
  }
  return { flags, positional };
}

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

try {
  const { flags, positional } = parseArgv(process.argv.slice(2));
  if (flags.help) {
    process.stdout.write(HELP);
    process.exit(0);
  }
  if (flags.version) {
    process.stdout.write(`${VERSION}\n`);
    process.exit(0);
  }

  const command = positional[0];
  const file = flags.store;
  const cwd = process.cwd();

  if (command === "good" || command === "bad") {
    const state = bump(command, cwd, file);
    const result = report(cwd, file);
    if (flags.json) process.stdout.write(`${JSON.stringify({ ...state, ...result })}\n`);
    else process.stdout.write(`${command} -> good ${state.good}, bad ${state.bad}\n`);
    process.exit(0);
  }

  if (command === "reset") {
    const state = reset(cwd, file);
    if (flags.json) process.stdout.write(`${JSON.stringify(state)}\n`);
    else process.stdout.write("reset to good 0, bad 0\n");
    process.exit(0);
  }

  if (command === "report") {
    const result = report(cwd, file, { slo: flags.slo });
    if (flags.json) process.stdout.write(`${JSON.stringify(result)}\n`);
    else process.stdout.write(formatHuman(result));
    process.exit(result.meetsSlo ? 0 : 1);
  }

  fail("usage: sli-counter <good|bad|report|reset>");
} catch (err) {
  fail(err.message);
}
