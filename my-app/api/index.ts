import { authTokenProvider } from "@/utils/auth-token-provider";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://template-onboarding-node-944896486321.us-central1.run.app/",
  timeout: 1000,
});

apiClient.interceptors.request.use(async function (config) {
  config.headers.Authorization = await authTokenProvider.getToken();
  return config;
});
