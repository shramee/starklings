import { compileCairoCode } from "./compileCairoCode";
import { init, run, test } from "cairo-runner";
import { antiCheatAppend } from "./antiCheat";
import { Append } from "../types/exercise";

// cairo-runner is an ESM-only package, which jest 27 cannot load in its CJS
// module system. The real wasm execution is covered by the Node integration
// tests in scripts/test-cairo-runner.mjs; here we mock the runner to verify
// compileCairoCode's logic (mode routing, antiCheat, success normalization).
jest.mock("cairo-runner", () => ({
  init: jest.fn().mockResolvedValue(undefined),
  run: jest.fn(),
  test: jest.fn(),
}));

const mockRun = run as jest.Mock;
const mockTest = test as jest.Mock;
const mockInit = init as jest.Mock;

describe("compileCairoCode", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes the wasm runner", async () => {
    mockRun.mockResolvedValue({ success: true, message: "ok" });
    await compileCairoCode("fn main() {}", "RUN");
    expect(mockInit).toHaveBeenCalled();
  });

  it("routes RUN mode to the run() function", async () => {
    mockRun.mockResolvedValue({ success: true, message: "ok" });
    await compileCairoCode("fn main() {}", "RUN");
    expect(mockRun).toHaveBeenCalledTimes(1);
    expect(mockTest).not.toHaveBeenCalled();
  });

  it("routes TEST and TEST_CONTRACT modes to the test() function", async () => {
    mockTest.mockResolvedValue({ success: true, message: "ok" });
    await compileCairoCode("#[test] fn t() {}", "TEST");
    await compileCairoCode("#[test] fn t() {}", "TEST_CONTRACT");
    expect(mockTest).toHaveBeenCalledTimes(2);
    expect(mockRun).not.toHaveBeenCalled();
  });

  it("appends antiCheat code before running", async () => {
    mockRun.mockResolvedValue({ success: true, message: "ok" });
    const append: Append = { to: "main", code: "let x = 1;" };
    const code = "fn main() -> felt252 { 1 }";
    await compileCairoCode(code, "RUN", append);
    expect(mockRun).toHaveBeenCalledWith(antiCheatAppend(code, append));
  });

  it("marks the result as failed when the message contains '... fail'", async () => {
    mockTest.mockResolvedValue({
      success: true,
      message: "test lib::test_fail ... fail",
    });
    const res = await compileCairoCode("#[test] fn t() {}", "TEST");
    expect(res.success).toBe(false);
  });

  it("keeps the result successful when no test failed", async () => {
    mockTest.mockResolvedValue({
      success: true,
      message: "test lib::test_pass ... ok",
    });
    const res = await compileCairoCode("#[test] fn t() {}", "TEST");
    expect(res.success).toBe(true);
  });
});
