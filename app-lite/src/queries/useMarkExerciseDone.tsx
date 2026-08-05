import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../utils/getUser";
import { markCompleted } from "../utils/progress";

export const useMarkExerciseDone = () => {
  const queryClient = useQueryClient();
  const user = getUser();
  return useMutation({
    mutationFn: async (exercise: string) => {
      markCompleted(user, exercise);
      return { message: "ok" };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });
};
