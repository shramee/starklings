import { antiCheatAppend, antiCheatShouldContain } from "./antiCheat";
import { Append, CairoResponse } from "../types/exercise";
import { RUNNER_API_URL } from "../constants/api";

export const compileCairoCode = async (code: string, mode: string, append?: Append): Promise<CairoResponse> => {
  // Prepare the code with any necessary appends
  code = antiCheatAppend(code, append);

  let endpoint: string;

  if (mode === "TEST" || mode === "TEST_CONTRACT") {
    endpoint = `${RUNNER_API_URL}/test`;
  } else {
    endpoint = `${RUNNER_API_URL}/run`;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const res: CairoResponse = await response.json();
  res.success = res.success && !res.message.includes("... fail");
  return res;
};
