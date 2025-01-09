import { ApiError } from "./apiError";

export interface ApiResponse<T> {
  data: T | null;
  errorrs?: ApiError[];
}
