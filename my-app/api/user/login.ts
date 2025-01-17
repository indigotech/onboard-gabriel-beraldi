import { User } from "@/interfaces/user";
import { ApiResponse } from "@/interfaces/api-response";
import { apiClient } from "@/api";
import { isAxiosError } from "axios";

interface LoginResult {
  token: string;
  user: User;
}

export async function login(
  email: string,
  password: string,
): Promise<ApiResponse<LoginResult>> {
  try {
    const response = await apiClient.post<ApiResponse<LoginResult>>(
      "/authenticate",
      {
        email,
        password,
      },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    } else {
      throw error;
    }
  }
}
