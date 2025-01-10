import { ApiError } from "@/interfaces/apiError";

export interface ApiResponse<T> {
  data: T | null;
  errors?: ApiError[];
}
