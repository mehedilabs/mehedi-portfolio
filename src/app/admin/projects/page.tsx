"use client";

import * as React from "react";
import {
  Briefcase,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Code2,
  Eye,
  EyeOff,
  Star,
  Search,
  Upload,
} from "lucide-react";
import { adminApi, ApiError } from "@/lib/api-client";
interface ProjectItem {
  _id: string;
  category: ProjectFormState["category"];
  featured: boolean;
  isPublished: boolean;
  order: number;
  thumbnail: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  en: {
    title: string;
    slug: string;
    tagline: string;
    description: string;
  };
  bn: {
    title: string;
    slug: string;
    tagline: string;
    description: string;
  };
}

interface ProjectFormState {
  _id?: string;
  category: "fullstack" | "backend" | "cloud" | "frontend";
  featured: boolean;
  isPublished: boolean;
  order: number;
  thumbnail: string;
  techStack: string;
  githubUrl: string;
  liveUrl: string;
  en: {
    title: string;
    slug: string;
    tagline: string;
    description: string;
  };
  bn: {
    title: string;
    slug: string;
    tagline: string;
    description: string;
  };
}

const DEFAULT_FORM: ProjectFormState = {
  category: "fullstack",
  featured: false,
  isPublished: true,
  order: 1,
  thumbnail: "/images/projects/distributed-cms.png",
  techStack: "Next.js 16, TypeScript, Tailwind CSS, Express, MongoDB",
  githubUrl: "https://github.com/mehedilabs",
  liveUrl: "https://mehedi.dev",
  en: {
    title: "",
    slug: "",
    tagline: "",
    description: "",
  },
  bn: {
    title: "",
    slug: "",
    tagline: "",
    description: "",
  },
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = React.useState<ProjectItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [actionLoading, setActionLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [formData, setFormData] =
    React.useState<ProjectFormState>(DEFAULT_FORM);
  const [isEditing, setIsEditing] = React.useState(false);

  // Search & filter
  const [searchTerm, setSearchTerm] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [dialogError, setDialogError] = React.useState<string | null>(null);

  const loadProjects = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getProjects<ProjectItem>();
      if (res.success) {
        setProjects(res.data || []);
      }
    } catch {
      setError("Failed to load projects from database.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let active = true;

    const fetchProjects = async () => {
      try {
        const res = await adminApi.getProjects<ProjectItem>();

        if (active && res.success) {
          setProjects(res.data || []);
        }
      } catch {
        if (active) {
          setError("Failed to load projects from database.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void fetchProjects();

    return () => {
      active = false;
    };
  }, []);

  const handleOpenAdd = () => {
    setFormData(DEFAULT_FORM);
    setIsEditing(false);
    setIsDialogOpen(true);
    setError(null);
    setDialogError(null);
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setFormData({
      _id: project._id,
      category: project.category || "fullstack",
      featured: project.featured || false,
      isPublished: project.isPublished !== false,
      order: project.order || 1,
      thumbnail: project.thumbnail || "",
      techStack: Array.isArray(project.techStack)
        ? project.techStack.join(", ")
        : "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      en: {
        title: project.en?.title || "",
        slug: project.en?.slug || "",
        tagline: project.en?.tagline || "",
        description: project.en?.description || "",
      },
      bn: {
        title: project.bn?.title || "",
        slug: project.bn?.slug || "",
        tagline: project.bn?.tagline || "",
        description: project.bn?.description || "",
      },
    });
    setIsEditing(true);
    setIsDialogOpen(true);
    setError(null);
    setDialogError(null);
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setError(null);
    setDialogError(null);
    setSuccess(null);

    const enSlug =
      formData.en.slug.trim() ||
      formData.en.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const payload = {
      ...formData,
      en: {
        ...formData.en,
        slug: enSlug,
      },
      bn: {
        title: formData.bn.title.trim() || formData.en.title.trim(),
        slug: formData.bn.slug.trim() || enSlug,
        tagline: formData.bn.tagline.trim() || formData.en.tagline.trim(),
        description:
          formData.bn.description.trim() || formData.en.description.trim(),
      },
      techStack: formData.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (isEditing && formData._id) {
        const res = await adminApi.updateProject(formData._id, payload);
        if (res.success) {
          setSuccess("Project updated successfully.");
        }
      } else {
        const res = await adminApi.createProject(payload);
        if (res.success) {
          setSuccess("New project created and persisted to database.");
        }
      }
      setIsDialogOpen(false);
      loadProjects();
    } catch (err) {
      if (err instanceof ApiError) {
        setDialogError(err.message);
        setError(err.message);
      } else {
        setDialogError("Failed to save project.");
        setError("Failed to save project.");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete project "${title}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await adminApi.deleteProject(id);
      if (res.success) {
        setSuccess(`Project "${title}" deleted successfully.`);
        loadProjects();
      }
    } catch {
      setError("Failed to delete project.");
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      const res = await adminApi.toggleProjectPublish(id);
      const isPublished = res.isPublished;

      if (res.success && typeof isPublished === "boolean") {
        setProjects((prev) =>
          prev.map((p) => (p._id === id ? { ...p, isPublished } : p)),
        );
      }
    } catch (error) {
      console.error("Failed to toggle project publish status:", error);
    }
  };

  // Thumbnail upload from PC helper
  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await adminApi.uploadMedia(file, "project");
      if (res.success && res.data) {
        setFormData((prev) => ({
          ...prev,
          thumbnail: res.data?.url || prev.thumbnail,
        }));
      }
    } catch {
      setError("Failed to upload thumbnail image from PC.");
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      !searchTerm ||
      p.en?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.bn?.title?.includes(searchTerm);
    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold font-mono text-white">
              Projects &amp; Case Studies CMS
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Create, edit, preview, and publish projects. Unpublished projects
            remain drafts and never leak to the public site.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-[#0b0f19] border border-slate-800 text-xs font-mono">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-slate-500">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Categories</option>
            <option value="fullstack">Full-Stack</option>
            <option value="backend">Backend &amp; APIs</option>
            <option value="cloud">Cloud &amp; DevOps</option>
            <option value="frontend">Frontend</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 text-slate-400 font-mono text-xs gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <span>Loading projects...</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0b0f19] border border-slate-800 font-mono text-xs text-slate-500">
          No projects found. Click &quot;Add New Project&quot; to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              className="rounded-xl bg-[#0b0f19] border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between group"
            >
              <div>
                {/* 16:9 Thumbnail Mockup */}
                <div className="relative aspect-video bg-black/80 border-b border-slate-800 overflow-hidden">
                  {project.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.thumbnail}
                      alt={project.en?.title || "Thumbnail"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-xs">
                      No Thumbnail
                    </div>
                  )}

                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider ${
                        project.isPublished !== false
                          ? "bg-emerald-500/90 text-slate-950"
                          : "bg-slate-800/90 text-slate-300"
                      }`}
                    >
                      {project.isPublished !== false ? "Published" : "Draft"}
                    </span>
                    {project.featured && (
                      <span
                        className="p-1 rounded bg-amber-500/90 text-slate-950"
                        title="Featured"
                      >
                        <Star className="w-3 h-3 fill-slate-950" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      Order: #{project.order}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold font-mono text-white line-clamp-1">
                    {project.en?.title || "Untitled Project"}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {project.en?.description || "No description provided."}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {project.techStack?.slice(0, 3).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {(project.techStack?.length || 0) > 3 && (
                      <span className="text-[10px] font-mono text-slate-500 self-center">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3 border-t border-slate-800/80 bg-[#090d16] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(project._id)}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title={
                      project.isPublished !== false
                        ? "Unpublish Project"
                        : "Publish Project"
                    }
                  >
                    {project.isPublished !== false ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEdit(project)}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Edit Project"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(project._id, project.en?.title || "Project")
                    }
                    className="p-1.5 rounded hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b0f19] border border-slate-800 rounded-xl shadow-2xl p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold font-mono text-white">
                {isEditing ? "Edit Project" : "Create New Project"}
              </h2>
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="text-slate-400 hover:text-white font-mono text-sm"
              >
                &times;
              </button>
            </div>

            {dialogError && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{dialogError}</span>
              </div>
            )}

            <form
              onSubmit={handleSaveSubmit}
              className="space-y-4 text-xs font-mono"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target
                          .value as ProjectFormState["category"],
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  >
                    <option value="fullstack">Full-Stack</option>
                    <option value="backend">Backend &amp; APIs</option>
                    <option value="cloud">Cloud &amp; DevOps</option>
                    <option value="frontend">Frontend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">
                    Order Index
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              {/* Direct PC Thumbnail Upload */}
              <div className="space-y-1">
                <label className="block text-slate-300">
                  Thumbnail URL or PC Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.thumbnail}
                    onChange={(e) =>
                      setFormData({ ...formData, thumbnail: e.target.value })
                    }
                    placeholder="/images/projects/preview.png"
                    className="flex-1 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                  <label className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white cursor-pointer flex items-center gap-1.5 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload PC</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* English Fields */}
              <div className="space-y-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-emerald-400">
                  English Details
                </span>
                <div>
                  <label className="block text-slate-400 mb-0.5">
                    Project Title
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
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-0.5">Tagline / Subtitle</label>
                  <input
                    type="text"
                    value={formData.en.tagline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        en: { ...formData.en, tagline: e.target.value },
                      })
                    }
                    placeholder="Short architectural summary..."
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-0.5">Slug</label>
                  <input
                    type="text"
                    required
                    value={formData.en.slug}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        en: { ...formData.en, slug: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-0.5">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.en.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        en: { ...formData.en, description: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              {/* Bangla Fields */}
              <div className="space-y-2 p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-bold text-emerald-400">
                  Bangla Details
                </span>
                <div>
                  <label className="block text-slate-400 mb-0.5">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bn.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bn: {
                          ...formData.bn,
                          title: e.target.value,
                          slug: formData.bn.slug || formData.en.slug,
                        },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-serif"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-0.5">ট্যাগলাইন / সংক্ষিপ্ত পরিচিতি</label>
                  <input
                    type="text"
                    value={formData.bn.tagline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bn: { ...formData.bn, tagline: e.target.value },
                      })
                    }
                    placeholder="প্রজেক্টের সংক্ষিপ্ত পরিচিতি..."
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-serif"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-0.5">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.bn.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bn: { ...formData.bn, description: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-serif"
                  />
                </div>
              </div>

              {/* Tech Stack & Links */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveUrl: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, githubUrl: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) =>
                    setFormData({ ...formData, techStack: e.target.value })
                  }
                  placeholder="Next.js 16, TypeScript, Tailwind CSS, MongoDB"
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="accent-emerald-400 w-4 h-4 rounded"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isPublished: e.target.checked,
                      })
                    }
                    className="accent-emerald-400 w-4 h-4 rounded"
                  />
                  <span>Publish Publicly</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-slate-950 font-bold"
                >
                  {actionLoading
                    ? "Saving..."
                    : isEditing
                      ? "Update Project"
                      : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
