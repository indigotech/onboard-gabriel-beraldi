import { User } from "@/interfaces/user";
import { ApiResponse } from "@/interfaces/api-response";
import { Pagination } from "@/interfaces/pagination";
import { PaginatedRequest } from "@/interfaces/paginated-request";
import { apiClient } from "@/api";
import { isAxiosError } from "axios";

export async function listUsers(
  params?: PaginatedRequest,
): Promise<ApiResponse<Pagination<User>>> {
  try {
    const response = await apiClient.get<ApiResponse<Pagination<User>>>(
      "/users",
      { params },
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
