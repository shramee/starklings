/**
 * Integration tests for the cairo-runner wasm package.
 *
 * Runs with the real wasm runner via Node's built-in test runner:
 *   node --test scripts/test-cairo-runner.mjs
 *
 * jest (CRA/jest 27) cannot load the ESM-only cairo-runner package, so the
 * actual wasm execution is verified here; jest tests in src/ cover the
 * compileCairoCode logic with a mocked runner.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { init, run, test as runTests } from "cairo-runner";

test("wasm runner initializes", async () => {
  await init();
});

test("run() executes a program and returns its output", async () => {
  const res = await run("fn main() -> felt252 { 0x25 }");
  assert.equal(res.success, true);
  assert.match(res.message, /Run completed successfully/);
  assert.match(res.message, /0x25/);
});

test("run() reports a compile error as a failure", async () => {
  const res = await run("fn main() -> felt252 { this is not cairo }");
  assert.equal(res.success, false);
  assert.match(res.message, /error\[/);
});

test("run() reports a runtime error as a failure", async () => {
  const res = await run("fn main() -> felt252 { 1 / 0 }");
  assert.equal(res.success, false);
});

test("test() reports passing tests", async () => {
  const res = await runTests(
    "#[test]\nfn test_pass() { assert(true, 'should pass'); }"
  );
  assert.equal(res.success, true);
  assert.match(res.message, /running 1 test/);
  assert.match(res.message, /test_pass \.\.\. ok/);
});

test("test() reports failing tests with ... fail", async () => {
  const res = await runTests(
    "#[test]\nfn test_fail() { assert(false, 'should fail'); }"
  );
  assert.match(res.message, /test_fail \.\.\. fail/);
});

test("compileCairoCode-style success normalization flags failing tests", async () => {
  const res = await runTests(
    "#[test]\nfn test_fail() { assert(false, 'should fail'); }"
  );
  const success = res.success && !res.message.includes("... fail");
  assert.equal(success, false);
});

test("init() is idempotent across calls", async () => {
  await init();
  await init();
  const res = await run("fn main() -> felt252 { 1 }");
  assert.equal(res.success, true);
});
