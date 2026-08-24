const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { bump, report, reset } = require("../src/index.js");

const cli = path.join(__dirname, "..", "src", "cli.js");

describe("sli-counter", () => {
  it("stores good/bad counts and reports a ratio", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "sli-"));
    bump("good", cwd);
    bump("good", cwd);
    bump("bad", cwd);
    const result = report(cwd);
    assert.equal(result.good, 2);
    assert.equal(result.bad, 1);
    assert.equal(result.total, 3);
    assert.equal(result.ratio, 2 / 3);
    fs.rmSync(cwd, { recursive: true, force: true });
  });

  it("fails report when ratio is below --slo and reset clears the store", () => {
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "sli-"));
    bump("good", cwd);
    bump("bad", cwd);
    const low = report(cwd, undefined, { slo: 0.99 });
    assert.equal(low.meetsSlo, false);
    reset(cwd);
    assert.equal(report(cwd).total, 0);
    const cliLow = spawnSync(process.execPath, [cli, "report", "--slo", "0.9", "--store", ".sli-counter.json"], {
      encoding: "utf8",
      cwd,
    });
    assert.equal(cliLow.status, 1);
    spawnSync(process.execPath, [cli, "good", "--store", "custom.json"], { encoding: "utf8", cwd });
    const high = spawnSync(process.execPath, [cli, "report", "--slo", "1", "--store", "custom.json", "--json"], {
      encoding: "utf8",
      cwd,
    });
    assert.equal(high.status, 0);
    assert.equal(JSON.parse(high.stdout).ratio, 1);
    fs.rmSync(cwd, { recursive: true, force: true });
  });
});
