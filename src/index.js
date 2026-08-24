const fs = require("node:fs");
const path = require("node:path");

const STORE = ".sli-counter.json";

function storePath(cwd = process.cwd()) {
  return path.resolve(cwd, STORE);
}

function load(cwd = process.cwd()) {
  const file = storePath(cwd);
  if (!fs.existsSync(file)) return { good: 0, bad: 0 };
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return { good: Number(data.good) || 0, bad: Number(data.bad) || 0 };
}

function save(state, cwd = process.cwd()) {
  fs.writeFileSync(storePath(cwd), `${JSON.stringify(state)}\n`);
  return state;
}

function bump(kind, cwd = process.cwd()) {
  const state = load(cwd);
  if (kind !== "good" && kind !== "bad") throw new Error("kind must be good or bad");
  state[kind] += 1;
  return save(state, cwd);
}

function report(cwd = process.cwd()) {
  const state = load(cwd);
  const total = state.good + state.bad;
  const ratio = total === 0 ? null : state.good / total;
  return { ...state, total, ratio };
}

module.exports = { STORE, storePath, load, save, bump, report };
