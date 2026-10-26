"use client";

import * as React from "react";
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  ExternalLink,
} from "lucide-react";
import { adminApi, ApiError } from "@/lib/api-client";

type MediaCategory = "project" | "blog" | "avatar" | "document" | "other";
type MediaFilter = "all" | MediaCategory;

interface MediaAsset {
  _id: string;
  filename: string;
  url: string;
  format: string;
  category: MediaCategory;
  bytes: number;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = React.useState<MediaAsset[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [uploading, setUploading] = React.useState(false);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [category, setCategory] = React.useState<MediaFilter>("all");
  const [search, setSearch] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const loadMedia = React.useCallback(async () => {
    try {
      setError(null);

      const res = await adminApi.getMedia({
        category: category !== "all" ? category : undefined,
        search: search.trim() || undefined,
      });

      if (res.success) {
        setMediaList((res.data ?? []) as MediaAsset[]);
      }
    } catch {
      setError("Failed to load media assets.");
    } finally {
      setLoading(false);
    }
  }, [category, search]);

  React.useEffect(() => {
    let active = true;

    const fetchMedia = async () => {
      try {
        setError(null);

        const res = await adminApi.getMedia({
          category: category !== "all" ? category : undefined,
          search: search.trim() || undefined,
        });

        if (active && res.success) {
          setMediaList((res.data ?? []) as MediaAsset[]);
        }
      } catch {
        if (active) {
          setError("Failed to load media assets.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void fetchMedia();

    return () => {
      active = false;
    };
  }, [category, search]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    const targetCategory: MediaCategory =
      file.type === "application/pdf"
        ? "document"
        : category !== "all"
          ? category
          : "project";

    try {
      const res = await adminApi.uploadMedia(file, targetCategory);

      if (res.success) {
        setSuccess(`File "${file.name}" uploaded successfully.`);
        await loadMedia();
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to upload file from PC.");
      }
    } finally {
      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleCopyUrl = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setError("Failed to copy the file URL.");
    }
  };

  const handleDelete = async (id: string, filename: string) => {
    if (!window.confirm(`Delete media asset "${filename}"?`)) return;

    setError(null);
    setSuccess(null);

    try {
      await adminApi.deleteMedia(id);
      setSuccess(`Asset "${filename}" deleted.`);
      await loadMedia();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to delete media asset.");
      }
    }
  };

  const formatBytes = (bytes: number) => {
    if (!bytes || bytes <= 0) return "0 B";

    const sizes = ["B", "KB", "MB", "GB"];
    const index = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      sizes.length - 1,
    );

    return `${parseFloat((bytes / Math.pow(1024, index)).toFixed(1))} ${sizes[index]}`;
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
              <ImageIcon className="h-5 w-5" />
            </div>

            <h1 className="text-xl font-bold text-white">
              Media Library &amp; Direct PC Uploads
            </h1>
          </div>

          <p className="mt-1 text-slate-400">
            Directly upload images and PDF documents from your PC. Cloudinary or
            local persistent storage.
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-bold text-slate-950 transition-all hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-600/50"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Uploading from PC...</span>
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                <span>Upload from PC</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3.5 text-rose-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-emerald-400">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[#0b0f19] p-3 sm:flex-row">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files..."
            className="w-full rounded-lg border border-slate-800 bg-slate-900 py-1.5 pl-8 pr-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <span className="text-slate-500">Filter:</span>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as MediaFilter)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-white focus:border-emerald-500 focus:outline-none sm:w-auto"
          >
            <option value="all">All Files</option>
            <option value="project">Project Images</option>
            <option value="blog">Blog Images</option>
            <option value="avatar">Profile Avatars</option>
            <option value="document">PDF Documents</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 p-16 text-slate-400">
          <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
          <span>Loading assets...</span>
        </div>
      ) : mediaList.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-12 text-center text-slate-500">
          No media files found. Click &quot;Upload from PC&quot; to add images
          or PDFs.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {mediaList.map((asset) => (
            <div
              key={asset._id}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-[#0b0f19] shadow-xl"
            >
              <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-black/80">
                {asset.format.toLowerCase() === "pdf" ? (
                  <div className="flex flex-col items-center justify-center gap-1 text-rose-400">
                    <FileText className="h-8 w-8" />
                    <span className="text-[10px] font-bold uppercase">
                      PDF Document
                    </span>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset.url}
                    alt={asset.filename}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                )}

                <span className="absolute left-1.5 top-1.5 rounded bg-slate-900/90 px-1.5 py-0.5 text-[9px] font-bold uppercase text-slate-300">
                  {asset.category}
                </span>
              </div>

              <div className="space-y-1 p-2.5">
                <span
                  className="block truncate font-semibold text-white"
                  title={asset.filename}
                >
                  {asset.filename}
                </span>

                <span className="block text-[10px] text-slate-500">
                  {formatBytes(asset.bytes)} &bull; {asset.format.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 bg-[#090d16] p-2">
                <button
                  type="button"
                  onClick={() => void handleCopyUrl(asset.url, asset._id)}
                  className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                  title="Copy URL"
                  aria-label={`Copy URL for ${asset.filename}`}
                >
                  {copiedId === asset._id ? (
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>

                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                  title="Open Full File"
                  aria-label={`Open ${asset.filename}`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => void handleDelete(asset._id, asset.filename)}
                  className="rounded p-1 text-slate-400 transition-colors hover:bg-rose-950/40 hover:text-rose-400"
                  title="Delete Asset"
                  aria-label={`Delete ${asset.filename}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
