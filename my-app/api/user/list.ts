import { User } from "@/interfaces/user";
import { ApiResponse } from "@/interfaces/api-response";
import { apiClient } from "@/api";
import { AxiosError, isAxiosError } from "axios";
import { Pagination } from "@/interfaces/pagination";

export async function listUsers(): Promise<ApiResponse<Pagination<User>>> {
  const response = await apiClient
    .get<ApiResponse<Pagination<User>>>("/users")
    .catch((error: Error | AxiosError) => {
      if (isAxiosError(error)) {
        return error.response;
      } else {
        throw error;
      }
    });
  return response?.data;
}
