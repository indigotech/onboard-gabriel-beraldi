import axios from "axios";

export const api = axios.create({
  baseURL: "https://template-onboarding-node-944896486321.us-central1.run.app/",
  timeout: 1000,
});
