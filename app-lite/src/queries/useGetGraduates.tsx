import { useQuery } from "@tanstack/react-query";
import { IGraduate } from "../types/graduate";

// app-lite has no backend/database, so the graduates list is empty.
export const useGetGraduates = () => {
  return useQuery<IGraduate[]>({
    queryKey: ["graduates"],
    queryFn: async () => {
      return [];
    },
  });
};
