import { User } from "@/interfaces/user";
import { ApiResponse } from "@/interfaces/api-response";
import { apiClient } from "@/api";
import { AxiosError, isAxiosError } from "axios";
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
  const response = await apiClient
    .post<ApiResponse<User>>("/users", request)
    .catch((error: Error | AxiosError) => {
      if (isAxiosError(error)) {
        return error.response;
      } else {
        throw error;
      }
    });
  return response?.data;
}
