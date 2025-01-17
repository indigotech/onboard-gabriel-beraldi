import { User } from "@/interfaces/user";
import { ApiResponse } from "@/interfaces/api-response";
import { apiClient } from "@/api";
import { AxiosError, isAxiosError } from "axios";

export async function getUserDetails(id: string): Promise<ApiResponse<User>> {
  const response = await apiClient
    .get<ApiResponse<User>>(`/users/${id}`)
    .catch((error: Error | AxiosError) => {
      if (isAxiosError(error)) {
        return error.response;
      } else {
        throw error;
      }
    });
  return response?.data;
}
