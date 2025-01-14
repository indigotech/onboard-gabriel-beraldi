import { ApiError } from "@/interfaces/api-error";

export interface ApiResponse<T> {
  data: T | null;
  errors?: ApiError[];
}
