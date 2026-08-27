/** Maintain a small good/bad SLI counter and evaluate it against an optional SLO. @module */
export interface SliState { good: number; bad: number; }
export interface SliReport extends SliState { total: number; ratio: number | null; slo: number | null; meetsSlo: boolean; }
/** Package identity and release metadata. */
export const PACKAGE: Readonly<{ name: "@theworker02/sli-counter"; version: "1.1.0"; runtime: "node"; registry: "jsr" }>;
/** Default counter store filename. */
export const STORE: ".sli-counter.json";
/** Resolve a counter store path. */
export function storePath(cwd?: string, file?: string): string;
/** Load a counter state from disk. */
export function load(cwd?: string, file?: string): SliState;
/** Persist a counter state. */
export function save(state: SliState, cwd?: string, file?: string): SliState;
/** Increment the good or bad counter. */
export function bump(kind: "good" | "bad", cwd?: string, file?: string): SliState;
/** Reset both counters to zero. */
export function reset(cwd?: string, file?: string): SliState;
/** Calculate the success ratio of an in-memory counter state. */
export function ratioOf(state: SliState): number | null;
/** Load and report SLI/SLO status. */
export function report(cwd?: string, file?: string, options?: { slo?: number }): SliReport;
/** Format a report for terminal output. */
export function formatHuman(result: SliReport): string;
