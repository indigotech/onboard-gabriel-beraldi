import { User } from "@/interfaces/user";
import { ApiResponse } from "@/interfaces/api-response";
import { apiClient } from "@/api";
import { AxiosError, isAxiosError } from "axios";
import { Pagination } from "@/interfaces/pagination";

interface ListUserParams {
  offset?: number;
  limit?: number;
}

export async function listUsers(
  params?: ListUserParams,
): Promise<ApiResponse<Pagination<User>>> {
  const response = await apiClient
    .get<ApiResponse<Pagination<User>>>("/users", { params: params })
    .catch((error: Error | AxiosError) => {
      if (isAxiosError(error)) {
        return error.response;
      } else {
        throw error;
      }
    });
  return response?.data;
}
