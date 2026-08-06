import { useMutation } from "@tanstack/react-query";

// app-lite has no backend to merge records into; progress is merged
// locally in GitHubLoginButton instead. Kept as a no-op for parity.
export const useMatchUserToGitHubAccount = () => {
  return useMutation({
    mutationFn: async (ghAccount: string) => {
      return { message: "ok" };
    },
  });
};
