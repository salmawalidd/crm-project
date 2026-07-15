const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error(
    "VITE_API_URL is missing. Add it to frontend/.env.",
  );
}

type ValidationErrors = Record<string, string[]>;

type ApiErrorPayload = {
  message?: string;
  error?: {
    message?: string;
    code?: string;
  };
  errors?: ValidationErrors;
};

export class ApiError extends Error {
  status: number;
  code?: string;
  validationErrors?: ValidationErrors;

  constructor(
    message: string,
    status: number,
    options?: {
      code?: string;
      validationErrors?: ValidationErrors;
    },
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.code = options?.code;
    this.validationErrors = options?.validationErrors;
  }
}

type FetcherOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  authenticated?: boolean;
};

async function parseResponseBody(
  response: Response,
): Promise<unknown> {
  if (response.status === 204) {
    return null;
  }

  const contentType =
    response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();

  return text || null;
}

export async function fetcher<T>(
  path: string,
  options: FetcherOptions = {},
): Promise<T> {
  const {
    body,
    headers,
    authenticated = true,
    ...requestOptions
  } = options;

  const token = localStorage.getItem("token");

  const requestHeaders = new Headers(headers);

  requestHeaders.set("Accept", "application/json");

  if (body !== undefined) {
    requestHeaders.set(
      "Content-Type",
      "application/json",
    );
  }

  if (authenticated && token) {
    requestHeaders.set(
      "Authorization",
      `Bearer ${token}`,
    );
  }

  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...requestOptions,
      headers: requestHeaders,
      body:
        body === undefined
          ? undefined
          : JSON.stringify(body),
    },
  );

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    const payload =
      typeof responseBody === "object" &&
      responseBody !== null
        ? (responseBody as ApiErrorPayload)
        : null;

    const message =
      payload?.error?.message ??
      payload?.message ??
      `Request failed with status ${response.status}.`;

    throw new ApiError(message, response.status, {
      code: payload?.error?.code,
      validationErrors: payload?.errors,
    });
  }

  return responseBody as T;
}

export function get<T>(
  path: string,
  options?: Omit<FetcherOptions, "method" | "body">,
): Promise<T> {
  return fetcher<T>(path, {
    ...options,
    method: "GET",
  });
}

export function post<TResponse, TBody = unknown>(
  path: string,
  body?: TBody,
  options?: Omit<FetcherOptions, "method" | "body">,
): Promise<TResponse> {
  return fetcher<TResponse>(path, {
    ...options,
    method: "POST",
    body,
  });
}

export function patch<TResponse, TBody = unknown>(
  path: string,
  body: TBody,
  options?: Omit<FetcherOptions, "method" | "body">,
): Promise<TResponse> {
  return fetcher<TResponse>(path, {
    ...options,
    method: "PATCH",
    body,
  });
}

export function remove<TResponse = void>(
  path: string,
  options?: Omit<FetcherOptions, "method" | "body">,
): Promise<TResponse> {
  return fetcher<TResponse>(path, {
    ...options,
    method: "DELETE",
  });
}