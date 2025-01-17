import { User } from "@/interfaces/user";
import { ApiResponse } from "@/interfaces/api-response";
import { apiClient } from "@/api";
import { isAxiosError } from "axios";
import { PossibleRolesEn } from "@/utils";

interface AddUserRequest {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  password: string;
  role: PossibleRolesEn;
}

export async function addUser(
  request: AddUserRequest,
): Promise<ApiResponse<User>> {
  try {
    const response = await apiClient.post<ApiResponse<User>>("/users", request);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    } else {
      throw error;
    }
  }
}
