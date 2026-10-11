import { apiClient } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import {
  AuthResponse,
  SignInRequest,
  SignUpRequest,
  UserProfileResponse,
} from "./types";

export type SignUpPayload = SignUpRequest;
export type SignInPayload = SignInRequest;
export type { AuthResponse };

export const signUpApi = async (
  payload: SignUpRequest
): Promise<AuthResponse> => {
  return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGN_UP, payload);
};

export const signInApi = async (
  payload: SignInRequest
): Promise<AuthResponse> => {
  return apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGN_IN, payload);
};

export const getCurrentUserApi = async (
  email: string
): Promise<UserProfileResponse> => {
  return apiClient.get<UserProfileResponse>(API_ENDPOINTS.AUTH.ME, {
    params: { email },
  });
};
