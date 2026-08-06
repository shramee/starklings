import { init, run, test } from "cairo-runner";
import { antiCheatAppend } from "./antiCheat";
import { Append, CairoResponse } from "../types/exercise";

export const compileCairoCode = async (code: string, mode: string, append?: Append): Promise<CairoResponse> => {
  // Prepare the code with any necessary appends
  code = antiCheatAppend(code, append);

  // Load the wasm runner once (idempotent); subsequent calls are cheap
  await init();

  const res: CairoResponse =
    mode === "TEST" || mode === "TEST_CONTRACT"
      ? await test(code)
      : await run(code);

  if (!res.success) {
    res.message = res.message || "error: compilation failed"
  }

  console.log(`Cairo ${mode} response:`, res);

  res.success = res.success && !res.message.includes("... fail");
  return res;
};
