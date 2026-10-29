import type {
  ProjectItem,
  SkillItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  BlogPostItem,
  AssistantQAPair,
  ContactMessageItem,
  MediaAssetItem,
  ProfileData,
  SiteSettingsData,
} from "@/types";

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
  count?: number;
  isPublished?: boolean;
  isRead?: boolean;
  isArchived?: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "demo";
  lastLogin?: string;
  createdAt?: string;
}

export interface SectionConfigItem {
  id: string;
  label: string;
  enabled: boolean;
  order: number;
}

export interface VideoShowcaseData {
  videoSourceType: "google-drive" | "native-url";
  googleDriveSharingUrl?: string;
  googleDriveFileId?: string;
  videoUrl: string;
  posterUrl?: string;
  aspectRatio: string;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
  en: {
    badge: string;
    headingHighlight: string;
    headingNormal: string;
    subheading?: string;
  };
  bn: {
    badge: string;
    headingHighlight: string;
    headingNormal: string;
    subheading?: string;
  };
}

export interface PublicProfileData {
  name: string;
  email: string;
  phone?: string;
  location: string;
  avatarUrl: string;
  avatarAlt?: string;
  aboutPhotoUrl: string;
  aboutPhotoAlt?: string;
  resumeUrl: string;
  availabilityText?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  en: {
    title: string;
    greeting?: string;
    bio: string;
    summary?: string;
    aboutTitle?: string;
    aboutHeadline: string;
    aboutParagraphs: string[];
  };
  bn: {
    title: string;
    greeting?: string;
    bio: string;
    summary?: string;
    aboutTitle?: string;
    aboutHeadline: string;
    aboutParagraphs: string[];
  };
}

export interface PublicSiteSettings {
  siteName: string;
  brandTagline: string;
  sections: SectionConfigItem[];
  activeSections: Record<string, boolean>;
  videoShowcase: VideoShowcaseData;
  resumeUrl: string;
  avatarUrl: string;
  avatarAlt?: string;
  aboutPhotoUrl: string;
  aboutPhotoAlt?: string;
  availabilityText?: string;
  profile?: PublicProfileData | null;
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

const TOKEN_STORAGE_KEY = "mehedi_admin_bearer_token";

export function getStoredToken(): string | null {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  }
  return null;
}

export function setStoredToken(token: string): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch {}
  }
}

export function clearStoredToken(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {}
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

  // When running on Next.js server runtime, default to no-store to avoid stale ISR data caches
  const fetchOptions: RequestInit = { ...options };
  if (typeof window === "undefined" && !fetchOptions.cache) {
    fetchOptions.cache = "no-store";
  }

  const isFormData = fetchOptions.body instanceof FormData;
  const storedToken = getStoredToken();
  const authHeader: Record<string, string> = storedToken
    ? { Authorization: `Bearer ${storedToken}` }
    : {};

  const headers: HeadersInit = isFormData
    ? { ...authHeader, ...fetchOptions.headers }
    : {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...authHeader,
        ...fetchOptions.headers,
      };

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      credentials: "include", // Transmit HTTP-only authentication cookies
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    let data: unknown = null;
    if (response.status !== 204) {
      const rawText = await response.text();
      if (rawText && rawText.trim().length > 0) {
        if (isJson) {
          try {
            data = JSON.parse(rawText);
          } catch {
            data = { message: rawText };
          }
        } else {
          data = { message: rawText };
        }
      }
    }

    if (!response.ok) {
      const parsedData =
        typeof data === "object" && data !== null
          ? (data as Record<string, unknown>)
          : {};
      const errorMessage =
        (typeof parsedData.error === "string" && parsedData.error) ||
        (typeof parsedData.message === "string" && parsedData.message) ||
        `Request failed with status ${response.status}`;
      const issues = Array.isArray(parsedData.issues)
        ? (parsedData.issues as Array<{ field: string; message: string }>)
        : undefined;
      throw new ApiError(errorMessage, response.status, issues);
    }

    if (data === null || data === undefined) {
      return { success: true } as unknown as T;
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
// Authentication API
// ------------------------------------------------------------------------------
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse> => {
    const res = await apiRequest<ApiResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (res.token) {
      setStoredToken(res.token);
    }
    return res;
  },

  logout: async (): Promise<ApiResponse> => {
    try {
      return await apiRequest<ApiResponse>("/auth/logout", {
        method: "POST",
      });
    } finally {
      clearStoredToken();
    }
  },

  getMe: async (): Promise<{ success: boolean; user: AuthUser }> => {
    return apiRequest<{ success: boolean; user: AuthUser }>("/auth/me");
  },

  changePassword: async (
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse> => {
    const res = await apiRequest<ApiResponse>("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (res.token) {
      setStoredToken(res.token);
    }
    return res;
  },

  changeEmail: async (
    password: string,
    newEmail: string
  ): Promise<ApiResponse> => {
    const res = await apiRequest<ApiResponse>("/auth/change-email", {
      method: "POST",
      body: JSON.stringify({ password, newEmail }),
    });
    if (res.token) {
      setStoredToken(res.token);
    }
    return res;
  },

  setupInitialAdmin: async (
    name: string,
    email: string,
    password: string
  ): Promise<ApiResponse> => {
    const res = await apiRequest<ApiResponse>("/auth/setup-initial-admin", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    if (res.token) {
      setStoredToken(res.token);
    }
    return res;
  },
};

// ------------------------------------------------------------------------------
// Admin CMS & Management API
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
      mediaAssets: number;
    };
  }> => {
    return apiRequest("/admin/overview");
  },

  getAuditLogs: async (
    limit = 30
  ): Promise<{ success: boolean; count: number; data: unknown[] }> => {
    return apiRequest(`/admin/audit-logs?limit=${limit}`);
  },

  // Section Visibility & Order (Critical Requirement)
  getSections: async (): Promise<{ success: boolean; data: SectionConfigItem[] }> => {
    return apiRequest("/admin/sections");
  },

  updateSections: async (
    sections: SectionConfigItem[]
  ): Promise<ApiResponse<SectionConfigItem[]>> => {
    return apiRequest<ApiResponse<SectionConfigItem[]>>("/admin/sections", {
      method: "PUT",
      body: JSON.stringify({ sections }),
    });
  },

  // Video Showcase (Google Drive Link Management)
  getVideoShowcase: async (): Promise<{ success: boolean; data: VideoShowcaseData }> => {
    return apiRequest("/admin/video-showcase");
  },

  updateVideoShowcase: async (
    data: Partial<VideoShowcaseData>
  ): Promise<ApiResponse<VideoShowcaseData>> => {
    return apiRequest<ApiResponse<VideoShowcaseData>>("/admin/video-showcase", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  removeShowcaseVideo: async (): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/admin/video-showcase/video", {
      method: "DELETE",
    });
  },

  // Profile & Resume
  getProfile: async (): Promise<{ success: boolean; data: ProfileData }> => {
    return apiRequest("/admin/profile");
  },

  updateProfile: async (profile: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/admin/profile", {
      method: "PUT",
      body: JSON.stringify(profile),
    });
  },

  // Settings
  getSettings: async (): Promise<{ success: boolean; data: SiteSettingsData }> => {
    return apiRequest("/admin/settings");
  },

  updateSettings: async (settings: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/admin/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    });
  },

  // Projects CRUD
  getProjects: async <T = ProjectItem>(): Promise<{ success: boolean; count: number; data: T[] }> => {
    return apiRequest("/admin/projects");
  },

  createProject: async (project: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/admin/projects", {
      method: "POST",
      body: JSON.stringify(project),
    });
  },

  updateProject: async (id: string, project: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(project),
    });
  },

  deleteProject: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/projects/${id}`, {
      method: "DELETE",
    });
  },

  toggleProjectPublish: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/projects/${id}/toggle-publish`, {
      method: "PATCH",
    });
  },

  // Skills CRUD
  getSkills: async <T = SkillItem>(): Promise<{ success: boolean; count: number; data: T[] }> => {
    return apiRequest("/admin/skills");
  },

  createSkill: async (skill: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/admin/skills", {
      method: "POST",
      body: JSON.stringify(skill),
    });
  },

  updateSkill: async (id: string, skill: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/skills/${id}`, {
      method: "PUT",
      body: JSON.stringify(skill),
    });
  },

  deleteSkill: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/skills/${id}`, {
      method: "DELETE",
    });
  },

  // Career: Experience, Education, Certifications
  getExperience: async <T = ExperienceItem>(): Promise<{ success: boolean; data: T[] }> => {
    return apiRequest("/admin/experience");
  },

  createExperience: async (exp: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/admin/experience", {
      method: "POST",
      body: JSON.stringify(exp),
    });
  },

  updateExperience: async (id: string, exp: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/experience/${id}`, {
      method: "PUT",
      body: JSON.stringify(exp),
    });
  },

  deleteExperience: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/experience/${id}`, {
      method: "DELETE",
    });
  },

  getEducation: async <T = EducationItem>(): Promise<{ success: boolean; data: T[] }> => {
    return apiRequest("/admin/education");
  },

  createEducation: async (edu: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/admin/education", {
      method: "POST",
      body: JSON.stringify(edu),
    });
  },

  updateEducation: async (id: string, edu: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/education/${id}`, {
      method: "PUT",
      body: JSON.stringify(edu),
    });
  },

  deleteEducation: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/education/${id}`, {
      method: "DELETE",
    });
  },

  getCertifications: async <T = CertificationItem>(): Promise<{ success: boolean; data: T[] }> => {
    return apiRequest("/admin/certifications");
  },

  createCertification: async (cert: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/admin/certifications", {
      method: "POST",
      body: JSON.stringify(cert),
    });
  },

  updateCertification: async (id: string, cert: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/certifications/${id}`, {
      method: "PUT",
      body: JSON.stringify(cert),
    });
  },

  deleteCertification: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/certifications/${id}`, {
      method: "DELETE",
    });
  },

  // Blog CRUD
  getBlogPosts: async <T = BlogPostItem>(): Promise<{ success: boolean; count: number; data: T[] }> => {
    return apiRequest("/admin/blog");
  },

  createBlogPost: async (post: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/admin/blog", {
      method: "POST",
      body: JSON.stringify(post),
    });
  },

  updateBlogPost: async (id: string, post: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/blog/${id}`, {
      method: "PUT",
      body: JSON.stringify(post),
    });
  },

  deleteBlogPost: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/blog/${id}`, {
      method: "DELETE",
    });
  },

  // Contact Messages
  getMessages: async <T = ContactMessageItem>(params?: {
    isRead?: boolean;
    isArchived?: boolean;
    search?: string;
  }): Promise<{ success: boolean; count: number; data: T[] }> => {
    const q = new URLSearchParams();
    if (params?.isRead !== undefined) q.set("isRead", String(params.isRead));
    if (params?.isArchived !== undefined) q.set("isArchived", String(params.isArchived));
    if (params?.search) q.set("search", params.search);
    return apiRequest(`/admin/messages?${q.toString()}`);
  },

  toggleMessageRead: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/messages/${id}/read`, {
      method: "PATCH",
    });
  },

  toggleMessageArchived: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/messages/${id}/archive`, {
      method: "PATCH",
    });
  },

  deleteMessage: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/messages/${id}`, {
      method: "DELETE",
    });
  },

  // Assistant Q&A
  getAssistantQA: async <T = AssistantQAPair>(): Promise<{ success: boolean; count: number; data: T[] }> => {
    return apiRequest("/admin/assistant-qa");
  },

  createAssistantQA: async (qa: Record<string, unknown>): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/admin/assistant-qa", {
      method: "POST",
      body: JSON.stringify(qa),
    });
  },

  deleteAssistantQA: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/admin/assistant-qa/${id}`, {
      method: "DELETE",
    });
  },

  // Media Library & Direct PC Uploads
  getMedia: async <T = MediaAssetItem>(params?: {
    category?: string;
    search?: string;
  }): Promise<{ success: boolean; count: number; data: T[] }> => {
    const q = new URLSearchParams();
    if (params?.category) q.set("category", params.category);
    if (params?.search) q.set("search", params.search);
    return apiRequest(`/media?${q.toString()}`);
  },

  uploadMedia: async (
    file: File,
    category: "avatar" | "project" | "blog" | "video" | "document" | "other" = "other"
  ): Promise<ApiResponse<{ url: string; filename: string; category: string }>> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    return apiRequest<ApiResponse<{ url: string; filename: string; category: string }>>(
      "/media/upload",
      {
        method: "POST",
        body: formData,
      }
    );
  },

  uploadResumePdf: async (
    file: File
  ): Promise<ApiResponse<{ url: string; filename: string }>> => {
    const formData = new FormData();
    formData.append("resume", file);
    return apiRequest<ApiResponse<{ url: string; filename: string }>>(
      "/media/upload-resume",
      {
        method: "POST",
        body: formData,
      }
    );
  },

  removeResumePdf: async (): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>("/media/resume", {
      method: "DELETE",
    });
  },

  deleteMedia: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/media/${id}`, {
      method: "DELETE",
    });
  },
};

// ------------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------------
export const publicApi = {
  getPublicSettings: async (): Promise<{ success: boolean; data: PublicSiteSettings }> => {
    return apiRequest("/public-settings");
  },

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

  getProjects: async (category?: string): Promise<{ success: boolean; data: ProjectItem[] }> => {
    const q = category ? `?category=${category}` : "";
    return apiRequest(`/projects${q}`);
  },

  getProjectBySlug: async (slug: string): Promise<{ success: boolean; data: ProjectItem }> => {
    return apiRequest(`/projects/${slug}`);
  },

  getBlogPosts: async (): Promise<{ success: boolean; data: BlogPostItem[] }> => {
    return apiRequest("/blog");
  },

  getBlogPostBySlug: async (slug: string): Promise<{ success: boolean; data: BlogPostItem }> => {
    return apiRequest(`/blog/${slug}`);
  },

  getAssistantQA: async (): Promise<{ success: boolean; data: AssistantQAPair[] }> => {
    return apiRequest("/assistant-qa");
  },

  getExperience: async (): Promise<{ success: boolean; data: ExperienceItem[] }> => {
    return apiRequest("/experience");
  },

  getEducation: async (): Promise<{ success: boolean; data: EducationItem[] }> => {
    return apiRequest("/education");
  },

  getCertifications: async (): Promise<{ success: boolean; data: CertificationItem[] }> => {
    return apiRequest("/certifications");
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
