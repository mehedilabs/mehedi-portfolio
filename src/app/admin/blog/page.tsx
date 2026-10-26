"use client";

import * as React from "react";
import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Clock,
} from "lucide-react";
import { adminApi, ApiError } from "@/lib/api-client";

interface BlogPostForm {
  _id?: string;
  slug: string;
  publishedAt: string;
  readTime: string;
  tags: string;
  coverImage: string;
  isPublished: boolean;
  en: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
  };
  bn: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
  };
}

interface BlogPost {
  _id: string;
  slug: string;
  publishedAt?: string;
  createdAt?: string;
  readTime: string;
  tags: string[];
  coverImage: string;
  isPublished: boolean;
  en?: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
  };
  bn?: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
  };
}

const DEFAULT_POST: BlogPostForm = {
  slug: "",
  publishedAt: new Date().toISOString().split("T")[0],
  readTime: "5 min read",
  tags: "Architecture, Next.js, Engineering",
  coverImage: "/images/blog/microservices.png",
  isPublished: false,
  en: {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  },
  bn: {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
  },
};

export default function AdminBlogPage() {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [actionLoading, setActionLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<BlogPostForm>(DEFAULT_POST);
  const [isEditing, setIsEditing] = React.useState(false);

  const loadPosts = React.useCallback(async () => {
    setLoading(true);

    try {
      const res = await adminApi.getBlogPosts();

      if (res.success) {
        setPosts((res.data ?? []) as BlogPost[]);
      }
    } catch {
      setError("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let active = true;

    const fetchPosts = async () => {
      try {
        const res = await adminApi.getBlogPosts();

        if (active && res.success) {
          setPosts((res.data ?? []) as BlogPost[]);
        }
      } catch {
        if (active) {
          setError("Failed to load blog posts.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void fetchPosts();

    return () => {
      active = false;
    };
  }, []);

  const handleOpenAdd = () => {
    setFormData(DEFAULT_POST);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setFormData({
      _id: post._id,
      slug: post.slug || "",
      publishedAt: post.publishedAt ? post.publishedAt.split("T")[0] : "",
      readTime: post.readTime || "5 min read",
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
      coverImage: post.coverImage || "",
      isPublished: post.isPublished !== false,
      en: {
        title: post.en?.title || "",
        slug: post.en?.slug || post.slug || "",
        excerpt: post.en?.excerpt || "",
        content: post.en?.content || "",
      },
      bn: {
        title: post.bn?.title || "",
        slug: post.bn?.slug || post.slug || "",
        excerpt: post.bn?.excerpt || "",
        content: post.bn?.content || "",
      },
    });

    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActionLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      ...formData,
      slug:
        formData.slug ||
        formData.en.slug ||
        formData.en.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      tags: formData.tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (isEditing && formData._id) {
        await adminApi.updateBlogPost(formData._id, payload);
        setSuccess("Article updated successfully.");
      } else {
        await adminApi.createBlogPost(payload);
        setSuccess("New article created and saved.");
      }

      setIsDialogOpen(false);
      await loadPosts();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete article "${title}"?`)) return;

    try {
      await adminApi.deleteBlogPost(id);
      await loadPosts();
    } catch {
      setError("Failed to delete article.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="font-mono text-xl font-bold text-white">
              Blog &amp; Article Authoring CMS
            </h1>
          </div>
          <p className="mt-1 font-mono text-xs text-slate-400">
            Author bilingual engineering posts with markdown content,
            draft/publish workflow, and SEO attributes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-mono text-xs font-bold text-slate-950 transition-all hover:bg-emerald-400"
        >
          <Plus className="h-4 w-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3.5 font-mono text-xs text-rose-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 font-mono text-xs text-emerald-400">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Posts List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 p-16 font-mono text-xs text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
          <span>Loading articles...</span>
        </div>
      ) : posts.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-12 text-center font-mono text-xs text-slate-500">
          No articles in database yet. Click &quot;Write New Article&quot; to
          author one.
        </div>
      ) : (
        <div className="divide-y divide-slate-800/80 overflow-hidden rounded-xl border border-slate-800 bg-[#0b0f19] shadow-xl">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex items-center justify-between gap-4 p-5"
            >
              <div className="max-w-2xl space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                      post.isPublished
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {post.isPublished ? "Published" : "Draft"}
                  </span>

                  <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {post.publishedAt || post.createdAt
                        ? new Date(
                            post.publishedAt || post.createdAt!,
                          ).toLocaleDateString()
                        : "No date"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="font-mono text-sm font-bold text-white">
                  {post.en?.title || "Untitled Article"}
                </h3>

                <p className="line-clamp-1 text-xs text-slate-400">
                  {post.en?.excerpt}
                </p>

                <div className="font-mono text-[11px] text-slate-500">
                  Slug:{" "}
                  <span className="text-slate-300">/blog/{post.slug}</span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(post)}
                  className="rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  title="Edit Post"
                >
                  <Edit3 className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void handleDelete(post._id, post.en?.title || "Article")
                  }
                  className="rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-400 transition-colors hover:bg-rose-950/40 hover:text-rose-400"
                  title="Delete Post"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-2xl space-y-4 rounded-xl border border-slate-800 bg-[#0b0f19] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-mono text-base font-bold text-white">
                {isEditing ? "Edit Article" : "Write Article"}
              </h2>
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
              <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                <span className="font-bold text-emerald-400">
                  English Post Details
                </span>

                <div>
                  <label className="mb-0.5 block text-slate-400">
                    Article Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.en.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        en: {
                          ...formData.en,
                          title: e.target.value,
                          slug:
                            formData.en.slug ||
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-"),
                        },
                        slug:
                          formData.slug ||
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-"),
                      })
                    }
                    className="w-full rounded border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-white"
                  />
                </div>

                <div>
                  <label className="mb-0.5 block text-slate-400">Excerpt</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.en.excerpt}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        en: {
                          ...formData.en,
                          excerpt: e.target.value,
                        },
                      })
                    }
                    className="w-full rounded border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-white"
                  />
                </div>

                <div>
                  <label className="mb-0.5 block text-slate-400">
                    Body Content (Markdown)
                  </label>
                  <textarea
                    rows={6}
                    value={formData.en.content}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        en: {
                          ...formData.en,
                          content: e.target.value,
                        },
                      })
                    }
                    placeholder="# Article Heading..."
                    className="w-full rounded border border-slate-700 bg-slate-900 px-2.5 py-1.5 font-mono text-white"
                  />
                </div>
              </div>

              {/* Bangla */}
              <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                <span className="font-bold text-emerald-400">
                  Bangla Post Details
                </span>

                <div>
                  <label className="mb-0.5 block text-slate-400">
                    Title (BN)
                  </label>
                  <input
                    type="text"
                    value={formData.bn.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bn: {
                          ...formData.bn,
                          title: e.target.value,
                        },
                      })
                    }
                    className="w-full rounded border border-slate-700 bg-slate-900 px-2.5 py-1.5 font-serif text-white"
                  />
                </div>

                <div>
                  <label className="mb-0.5 block text-slate-400">
                    Excerpt (BN)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.bn.excerpt}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bn: {
                          ...formData.bn,
                          excerpt: e.target.value,
                        },
                      })
                    }
                    className="w-full rounded border border-slate-700 bg-slate-900 px-2.5 py-1.5 font-serif text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-slate-300">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tags: e.target.value,
                      })
                    }
                    className="w-full rounded border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-slate-300">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        readTime: e.target.value,
                      })
                    }
                    className="w-full rounded border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-white"
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-2 pt-2 text-slate-300">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isPublished: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded accent-emerald-400"
                />
                <span>Publish Immediately (Draft if unchecked)</span>
              </label>

              <div className="flex items-center justify-end gap-2 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="rounded-lg bg-slate-800 px-4 py-2 text-slate-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="rounded-lg bg-emerald-500 px-4 py-2 font-bold text-slate-950 hover:bg-emerald-400"
                >
                  {actionLoading ? "Saving..." : "Save Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
