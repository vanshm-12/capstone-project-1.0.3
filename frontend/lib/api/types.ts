export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  message: string;
  token?: string;
  error?: string;
}

export interface UserProfileResponse {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface BookFilterApiParams {
  category?: string;
  search?: string;
  language?: string;
  format?: string;
  price_range?: string;
  sort_by?: string;
}

export interface ApiErrorPayload {
  error?: string;
  message?: string;
  status?: number;
  timestamp?: string;
}
