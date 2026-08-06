import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token";

export interface ITokenResponse {
  data: ITokenData
}

export interface ITokenData {
  access_token: string;
  scope: string;
  token_type: string;
}

export const useGetAccessToken = (onSuccess: (data: any) => void) => {
  return useMutation({
    mutationFn: (code: string) => {
      return axios.get(
        `${GITHUB_ACCESS_TOKEN_URL}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID || "af5dc7b4ebe93a771d92"}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET || ""}&code=${code}`,
        { headers: { Accept: "application/json" } }
      );
    },
    onSuccess,
  });
};
