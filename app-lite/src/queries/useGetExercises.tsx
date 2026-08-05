import { useQuery } from "@tanstack/react-query";
import exercisesIndex from "../data/exercises.json";
import { IExercise } from "../types/exercise";
import { getUser } from "../utils/getUser";
import { getCompleted } from "../utils/progress";

export const useGetExercises = (user = getUser()) => {
  return useQuery<IExercise[]>({
    queryKey: ["exercises", user],
    queryFn: async () => {
      const completedExercises = getCompleted(user);
      return exercisesIndex.map((exercise) => {
        return {
          ...exercise,
          mode: exercise.mode as IExercise["mode"],
          completed: completedExercises.includes(exercise.id),
          disabled: false,
        };
      });
    },
    enabled: !!user, // Only run the query if user is provided
  });
};
