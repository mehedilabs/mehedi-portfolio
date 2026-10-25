/**
 * Centralized typed API client for Mehedi Portfolio frontend
 * Connects Next.js application to Express REST API with full credentials support.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  error?: string;
  issues?: Array<{ field: string; message: string }>;
  data?: T;
  token?: string;
  user?: AuthUser;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "demo";
  lastLogin?: string;
  createdAt?: string;
}

export class ApiError extends Error {
  public status: number;
  public issues?: Array<{ field: string; message: string }>;

  constructor(
    message: string,
    status: number,
    issues?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.issues = issues;
  }
}

/**
 * Generic fetch wrapper with automatic credentials and JSON handling
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // Transmit HTTP-only authentication cookies
    });

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const errorMessage =
        data?.error ||
        data?.message ||
        `Request failed with status ${response.status}`;
      throw new ApiError(errorMessage, response.status, data?.issues);
    }

    return data as T;
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError(
      err instanceof Error ? err.message : "Network error connecting to API",
      0
    );
  }
}

// ------------------------------------------------------------------------------
// Authentication & Account API
// ------------------------------------------------------------------------------
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  logout: async (): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/auth/logout", {
      method: "POST",
    });
  },

  getMe: async (): Promise<{ success: boolean; user: AuthUser }> => {
    return apiRequest<{ success: boolean; user: AuthUser }>("/auth/me");
  },

  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  changeEmail: async (
    password: string,
    newEmail: string
  ): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/auth/change-email", {
      method: "POST",
      body: JSON.stringify({ password, newEmail }),
    });
  },

  setupInitialAdmin: async (
    name: string,
    email: string,
    password: string
  ): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/auth/setup-initial-admin", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  },
};

// ------------------------------------------------------------------------------
// Admin API (Protected)
// ------------------------------------------------------------------------------
export const adminApi = {
  getOverview: async (): Promise<{
    success: boolean;
    stats: {
      projects: number;
      skills: number;
      posts: number;
      unreadMessages: number;
      auditLogs: number;
    };
  }> => {
    return apiRequest("/admin/overview");
  },

  getAuditLogs: async (
    limit = 30
  ): Promise<{ success: boolean; count: number; data: unknown[] }> => {
    return apiRequest(`/admin/audit-logs?limit=${limit}`);
  },

  getSettings: async (): Promise<{ success: boolean; data: unknown }> => {
    return apiRequest("/admin/settings");
  },

  updateSettings: async (
    settings: Record<string, unknown>
  ): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/admin/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    });
  },

  getProfile: async (): Promise<{ success: boolean; data: unknown }> => {
    return apiRequest("/admin/profile");
  },

  updateProfile: async (
    profile: Record<string, unknown>
  ): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/admin/profile", {
      method: "PUT",
      body: JSON.stringify(profile),
    });
  },
};

// ------------------------------------------------------------------------------
// Public Portfolio API
// ------------------------------------------------------------------------------
export const publicApi = {
  getHealth: async (): Promise<{
    status: string;
    uptimeSeconds: number;
    timestamp: string;
  }> => {
    return apiRequest("/health");
  },

  getReadiness: async (): Promise<unknown> => {
    return apiRequest("/ready");
  },

  sendMessage: async (data: {
    name: string;
    email: string;
    subject: string;
    inquiryType?: string;
    message: string;
  }): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/messages", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
