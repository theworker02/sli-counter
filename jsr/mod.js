/* @ts-self-types="./mod.d.ts" */

import fs from "node:fs";
import path from "node:path";

export const PACKAGE = Object.freeze({ name: "@theworker02/sli-counter", version: "1.1.0", runtime: "node", registry: "jsr" });
export const STORE = ".sli-counter.json";

export function storePath(cwd = process.cwd(), file) { return file ? path.resolve(cwd, file) : path.resolve(cwd, STORE); }
export function load(cwd = process.cwd(), file) {
  const dest = storePath(cwd, file);
  if (!fs.existsSync(dest)) return { good: 0, bad: 0 };
  const data = JSON.parse(fs.readFileSync(dest, "utf8"));
  return { good: Number(data.good) || 0, bad: Number(data.bad) || 0 };
}
export function save(state, cwd = process.cwd(), file) {
  const dest = storePath(cwd, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, `${JSON.stringify(state)}\n`);
  return state;
}
export function bump(kind, cwd = process.cwd(), file) {
  const state = load(cwd, file);
  if (kind !== "good" && kind !== "bad") throw new Error("kind must be good or bad");
  state[kind] += 1;
  return save(state, cwd, file);
}
export function reset(cwd = process.cwd(), file) { return save({ good: 0, bad: 0 }, cwd, file); }
export function ratioOf(state) {
  const total = state.good + state.bad;
  return total === 0 ? null : state.good / total;
}
export function report(cwd = process.cwd(), file, options = {}) {
  const state = load(cwd, file);
  const total = state.good + state.bad;
  const ratio = ratioOf(state);
  const slo = options.slo == null ? null : Number(options.slo);
  if (slo != null && (!Number.isFinite(slo) || slo < 0 || slo > 1)) throw new Error("slo must be a number between 0 and 1");
  return { ...state, total, ratio, slo, meetsSlo: slo == null || (ratio != null && ratio >= slo) };
}
export function formatHuman(result) {
  const ratio = result.ratio == null ? "n/a" : result.ratio.toFixed(4);
  const lines = [`good:  ${result.good}`, `bad:   ${result.bad}`, `total: ${result.total}`, `ratio: ${ratio}`];
  if (result.slo != null) lines.push(`slo:   ${result.slo}  ${result.meetsSlo ? "PASS" : "FAIL"}`);
  return `${lines.join("\n")}\n`;
}
