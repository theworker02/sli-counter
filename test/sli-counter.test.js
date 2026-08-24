const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { bump, report } = require("../src/index.js");

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
});
