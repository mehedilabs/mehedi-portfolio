"use client";

import * as React from "react";
import {
  Video,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  Trash2,
  Info,
  Play,
} from "lucide-react";
import { adminApi, VideoShowcaseData, ApiError } from "@/lib/api-client";

export default function AdminVideoShowcasePage() {
  const [data, setData] = React.useState<VideoShowcaseData>({
    videoSourceType: "native-url",
    googleDriveSharingUrl: "",
    googleDriveFileId: "",
    videoUrl: "/videos/demo-showcase.mp4",
    posterUrl: "",
    aspectRatio: "16:10",
    autoPlay: true,
    loop: true,
    muted: true,
    en: {
      badge: "04. SYSTEM_DEMO",
      headingHighlight: "Full-Stack",
      headingNormal: "Development Solutions",
      subheading: "High-performance architecture in action",
    },
    bn: {
      badge: "০৪. সিস্টেম ডেমো",
      headingHighlight: "সিস্টেম আর্কিটেকচার",
      headingNormal: "ডেভেলপমেন্ট সল্যুশনস",
      subheading: "সিস্টেমের বাস্তব কর্মক্ষমতা",
    },
  });

  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  // Load existing configuration
  React.useEffect(() => {
    let active = true;
    adminApi
      .getVideoShowcase()
      .then((res) => {
        if (!active) return;
        if (res.success && res.data) {
          setData((prev) => ({
            ...prev,
            ...res.data,
            en: { ...prev.en, ...res.data.en },
            bn: { ...prev.bn, ...res.data.bn },
          }));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await adminApi.updateVideoShowcase(data);
      if (res.success && res.data) {
        setData((prev) => ({ ...prev, ...res.data }));
        setSuccess("Video showcase configuration and Google Drive link verified & saved successfully.");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to save video showcase settings.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveVideo = async () => {
    if (!window.confirm("Are you sure you want to remove the current Google Drive video and restore the fallback demo video?")) {
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await adminApi.removeShowcaseVideo();
      if (res.success) {
        setData((prev) => ({
          ...prev,
          videoSourceType: "native-url",
          googleDriveSharingUrl: "",
          googleDriveFileId: "",
          videoUrl: "/videos/demo-showcase.mp4",
        }));
        setSuccess("Google Drive video reference removed. Fallback demo player restored.");
      }
    } catch {
      setError("Failed to remove video.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-slate-400 font-mono text-xs gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        <span>Loading video showcase configuration...</span>
      </div>
    );
  }

  const activeEmbedId = data.googleDriveFileId || "";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Video className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold font-mono text-white">
              Video Showcase Management
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Configure the 3D laptop showcase video using a Google Drive sharing link. No large video uploads needed on your server.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {data.googleDriveSharingUrl && (
            <button
              type="button"
              onClick={handleRemoveVideo}
              disabled={saving}
              className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Video</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Video Settings</span>
              </>
            )}
          </button>
        </div>
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

      {/* Google Drive Step-by-Step Instructions Banner */}
      <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 text-xs font-mono space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <Info className="w-4 h-4" />
          <span>Google Drive Video Workflow</span>
        </div>
        <ol className="list-decimal list-inside space-y-1 text-slate-300">
          <li>Upload your MP4 video to your Google Drive account.</li>
          <li>Right-click the video &rarr; select <strong>Share</strong>.</li>
          <li>Under <em>General access</em>, change to <strong>&quot;Anyone with the link &mdash; Viewer&quot;</strong>.</li>
          <li>Click <strong>Copy link</strong> and paste it into the field below.</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Form Settings */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-5 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold font-mono text-white pb-2 border-b border-slate-800">
              Google Drive Sharing Link
            </h2>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-slate-300">
                Sharing URL
              </label>
              <input
                type="url"
                value={data.googleDriveSharingUrl || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    googleDriveSharingUrl: e.target.value,
                    videoSourceType: e.target.value ? "google-drive" : "native-url",
                  })
                }
                placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[11px] font-mono text-slate-500 block">
                Extracts the unique file ID automatically. Leave empty to use local demo video.
              </span>
            </div>

            {data.googleDriveFileId && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center justify-between">
                <span>Extracted File ID: <strong>{data.googleDriveFileId}</strong></span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20">
                  Ready
                </span>
              </div>
            )}
          </div>

          {/* Bilingual Titles & Headings */}
          <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-5 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold font-mono text-white pb-2 border-b border-slate-800">
              Showcase Titles & Badges
            </h2>

            {/* English Content */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-emerald-400">English (EN)</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400">Highlight Text</label>
                  <input
                    type="text"
                    value={data.en?.headingHighlight || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        en: { ...data.en, headingHighlight: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700/80 rounded text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400">Normal Text</label>
                  <input
                    type="text"
                    value={data.en?.headingNormal || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        en: { ...data.en, headingNormal: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700/80 rounded text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Bangla Content */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono font-bold text-emerald-400">Bangla (BN)</span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400">Highlight Text</label>
                  <input
                    type="text"
                    value={data.bn?.headingHighlight || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        bn: { ...data.bn, headingHighlight: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700/80 rounded text-xs text-white font-serif"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400">Normal Text</label>
                  <input
                    type="text"
                    value={data.bn?.headingNormal || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        bn: { ...data.bn, headingNormal: e.target.value },
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700/80 rounded text-xs text-white font-serif"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Right Column: Live Player Preview */}
        <div className="space-y-4">
          <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold font-mono text-white">Live Showcase Preview</h2>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {activeEmbedId ? "Google Drive Embed" : "Native Video"}
              </span>
            </div>

            {/* Simulated Laptop Frame Preview */}
            <div className="relative aspect-[16/10] bg-black rounded-lg border border-slate-700 overflow-hidden shadow-2xl flex items-center justify-center">
              {activeEmbedId ? (
                <iframe
                  src={`https://drive.google.com/file/d/${activeEmbedId}/preview`}
                  allow="autoplay; encrypted-media; fullscreen"
                  className="w-full h-full border-0"
                  title="Google Drive Showcase Video Preview"
                />
              ) : (
                <video
                  src={data.videoUrl || "/videos/demo-showcase.mp4"}
                  controls
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
              <span className="text-emerald-400 font-semibold block">Player Compatibility Note:</span>
              <p>
                When using a Google Drive sharing link, playback runs via Google&apos;s sandboxed viewer iframe inside the 3D laptop frame. Custom seeking/time APIs are managed natively by Google Drive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

