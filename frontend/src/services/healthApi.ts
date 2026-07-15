import { get } from "../lib/fetcher";

type HealthResponse = {
  success: boolean;
  message: string;
};

export function getHealth(): Promise<HealthResponse> {
  return get<HealthResponse>("/health", {
    authenticated: false,
  });
}