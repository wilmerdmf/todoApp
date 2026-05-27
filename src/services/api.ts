import axios, { AxiosError } from "axios";
import { API_CONFIG } from "@/config";
import { parseAPIError, logError } from "@/utils/errorHandler";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(null);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const appError = parseAPIError(error);
    logError(appError, `API ${error.config?.method?.toUpperCase()} ${error.config?.url}`);

    const isAuthRoute = error.config?.url?.includes("/auth/");
    const is401 = error.response?.status === 401;

    if (!is401 || isAuthRoute) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => api.request(error.config!));
    }

    isRefreshing = true;

    try {
      await api.post("/auth/refresh");
      processQueue(null);
      return api.request(error.config!);
    } catch (refreshError) {
      processQueue(refreshError);
      api.post("/auth/logout").finally(() => {
        window.location.href = "/";
      });
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
