import { User } from "@/interfaces/user";
import { ApiResponse } from "@/interfaces/apiResponse";
import { api } from "..";
import { AxiosError, isAxiosError } from "axios";

interface LoginResult {
  token: string;
  user: User;
}

export async function login(
  email: string,
  password: string,
): Promise<ApiResponse<LoginResult>> {
  const response = await api
    .post<ApiResponse<LoginResult>>("/authenticate", {
      email,
      password,
    })
    .catch((error: Error | AxiosError) => {
      if (isAxiosError(error)) {
        return error.response;
      } else {
        throw error;
      }
    });
  return response?.data;
}
