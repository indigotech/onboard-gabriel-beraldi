import { User } from "@/interfaces/user";
import { ApiResponse } from "@/interfaces/api-response";
import { apiClient } from "@/api";
import { isAxiosError } from "axios";

export async function getUserDetails(id: string): Promise<ApiResponse<User>> {
  try {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    } else {
      throw error;
    }
  }
}
