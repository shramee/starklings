import { useQuery } from "@tanstack/react-query";
import { IExercise } from "../types/exercise";

export const useGetExercise = (exerciseName: string | undefined) => {
  return useQuery<IExercise>({
    queryKey: ["exercises", exerciseName],
    enabled: !!exerciseName,
    queryFn: async () => {
      const module = await import(`../data/exercises/${exerciseName}.json`);
      const data: IExercise = module.default;
      if (typeof data.code === "undefined") {
        throw new Error("No code found");
      }
      data.code = data.code.replace(/^\n+/g, "");
      if (!data.description) {
        data.description = "";
      }
      data.description = data.description
        .replaceAll("//", "")
        .replace(/\n/g, "\n\n")
        .replace(/^\n+/g, "");
      return data;
    },
  });
};
