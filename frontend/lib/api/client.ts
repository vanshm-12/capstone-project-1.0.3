import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_BASE_URL, DEFAULT_HEADERS } from "./endpoints";
import { ApiErrorPayload } from "./types";

export class ApiError extends Error {
  status: number;
  data?: ApiErrorPayload;

  constructor(message: string, status: number, data?: ApiErrorPayload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_HEADERS,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorPayload>) => {
    const status = error.response?.status || 500;
    const data = error.response?.data;
    const message =
      data?.error ||
      data?.message ||
      error.message ||
      "An unexpected network error occurred";
    return Promise.reject(new ApiError(message, status, data));
  },
);

export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },

  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },
};
