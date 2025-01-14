import { User } from "@/interfaces/user";
import { ApiResponse } from "@/interfaces/api-response";
import { Pagination } from "@/interfaces/pagination";
import { PaginatedRequest } from "@/interfaces/paginated-request";
import { apiClient } from "@/api";
import { AxiosError, isAxiosError } from "axios";

export async function listUsers(
  params?: PaginatedRequest,
): Promise<ApiResponse<Pagination<User>>> {
  const response = await apiClient
    .get<ApiResponse<Pagination<User>>>("/users", { params })
    .catch((error: Error | AxiosError) => {
      if (isAxiosError(error)) {
        return error.response;
      } else {
        throw error;
      }
    });
  return response?.data;
}
