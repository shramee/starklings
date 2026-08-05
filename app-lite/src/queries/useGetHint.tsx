import { useMutation } from "@tanstack/react-query";
import { IHint } from "../types/hint";

export const useGetHint = (
  exerciseName: string,
  onSuccess: (data: any) => void
) => {
  return useMutation({
    mutationFn: async () => {
      const module = await import(`../data/exercises/${exerciseName}.json`);
      return { data: { hints: module.default.hint } as IHint };
    },
    onSuccess,
  });
};
