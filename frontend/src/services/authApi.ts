import api from "./api";

import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "../types/auth";

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/login",
    credentials,
  );

  return response.data;
}

export async function register(
  data: RegisterData,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>(
    "/register",
    data,
  );

  return response.data;
}

export async function logout(): Promise<void> {
  await api.post("/logout");
}