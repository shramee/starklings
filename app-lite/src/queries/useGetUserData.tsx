import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const GITHUB_USER_API = "https://api.github.com/user";

export interface IUserDataResponse {
  data: IUserData
}

interface IUserData {
  login: string,
  avatar_url: string
}

export const useGetUserData = (onSuccess: (data: any) => void) => {
  return useMutation({
    mutationFn: (accessToken: string) => {
      return axios.get(GITHUB_USER_API, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
    },
    onSuccess,
  });
};
