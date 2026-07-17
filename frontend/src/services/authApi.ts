import { post } from "../lib/fetcher";

import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "../types/auth";

export function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  return post<AuthResponse, LoginCredentials>(
    "/login",
    credentials,
    {
      authenticated: false,
    },
  );
}

export function register(
  data: RegisterData,
): Promise<AuthResponse> {
  return post<AuthResponse, RegisterData>(
    "/register",
    data,
    {
      authenticated: false,
    },
  );
}

export function logout(): Promise<void> {
  return post<void>("/logout");
}