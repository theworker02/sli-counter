const fs = require("node:fs");
const path = require("node:path");

const STORE = ".sli-counter.json";

function storePath(cwd = process.cwd(), file) {
  if (file) return path.resolve(cwd, file);
  return path.resolve(cwd, STORE);
}

function load(cwd = process.cwd(), file) {
  const dest = storePath(cwd, file);
  if (!fs.existsSync(dest)) return { good: 0, bad: 0 };
  const data = JSON.parse(fs.readFileSync(dest, "utf8"));
  return { good: Number(data.good) || 0, bad: Number(data.bad) || 0 };
}

function save(state, cwd = process.cwd(), file) {
  const dest = storePath(cwd, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, `${JSON.stringify(state)}\n`);
  return state;
}

function bump(kind, cwd = process.cwd(), file) {
  const state = load(cwd, file);
  if (kind !== "good" && kind !== "bad") throw new Error("kind must be good or bad");
  state[kind] += 1;
  return save(state, cwd, file);
}

function reset(cwd = process.cwd(), file) {
  return save({ good: 0, bad: 0 }, cwd, file);
}

function report(cwd = process.cwd(), file, options = {}) {
  const state = load(cwd, file);
  const total = state.good + state.bad;
  const ratio = total === 0 ? null : state.good / total;
  const slo = options.slo == null ? null : Number(options.slo);
  if (slo != null && (!Number.isFinite(slo) || slo < 0 || slo > 1)) {
    throw new Error("--slo must be a number between 0 and 1");
  }
  const meetsSlo = slo == null || (ratio != null && ratio >= slo);
  return { ...state, total, ratio, slo, meetsSlo };
}

function formatHuman(result) {
  const ratio = result.ratio == null ? "n/a" : result.ratio.toFixed(4);
  const lines = [
    `good:  ${result.good}`,
    `bad:   ${result.bad}`,
    `total: ${result.total}`,
    `ratio: ${ratio}`,
  ];
  if (result.slo != null) {
    lines.push(`slo:   ${result.slo}  ${result.meetsSlo ? "PASS" : "FAIL"}`);
  }
  return `${lines.join("\n")}\n`;
}

module.exports = { STORE, storePath, load, save, bump, report, reset, formatHuman };
