"use client";

import * as React from "react";
import {
  User,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  Upload,
  Download,
  Trash2,
  FileText,
} from "lucide-react";
import { adminApi, ApiError } from "@/lib/api-client";
interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  aboutPhotoUrl: string;
  resumeUrl: string;
  availabilityText?: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    youtube: string;
  };
  en: {
    title: string;
    bio: string;
    aboutHeadline: string;
    aboutParagraphs: string[];
  };
  bn: {
    title: string;
    bio: string;
    aboutHeadline: string;
    aboutParagraphs: string[];
  };
  [key: string]: unknown;
}

export default function AdminProfilePage() {
  const [profile, setProfile] = React.useState<ProfileData>({
    name: "Mehedi Hasan",
    email: "contact@mehedi.dev",
    phone: "",
    location: "Dhaka, Bangladesh (UTC+6)",
    avatarUrl: "/images/hero-profile.png",
    aboutPhotoUrl: "/images/about-workspace.png",
    resumeUrl: "/documents/resume-mehedi-hasan.pdf",
    availabilityText: "Available for Senior Roles & Architecture Consulting",
    socialLinks: {
      github: "https://github.com/mehedilabs",
      linkedin: "https://linkedin.com/in/mehedilabs",
      twitter: "https://x.com/mehedilabs",
      youtube: "",
    },
    en: {
      title: "Senior Full-Stack Architect",
      bio: "Passionate software engineer building resilient, high-throughput distributed web systems.",
      aboutHeadline:
        "Engineering robust, scalable software with deep architectural care.",
      aboutParagraphs: [
        "I specialize in architecting end-to-end full-stack web applications, microservices, and reliable cloud infrastructures.",
      ],
    },
    bn: {
      title: "সিনিয়র ফুল-স্ট্যাক আর্কিটেক্ট",
      bio: "স্কেলযোগ্য, উচ্চ ক্ষমতাসম্পন্ন ও সুরক্ষিত ওয়েব অ্যাপ্লিকেশন নির্মাতা ও আর্কিটেক্ট।",
      aboutHeadline:
        "পরিকল্পিত আর্কিটেকচার ও নিখুঁত কোডিংয়ের সমন্বয়ে আধুনিক সফটওয়্যার নির্মাণ।",
      aboutParagraphs: [
        "আমি এন্ড-টু-এন্ড ফুল-স্ট্যাক ওয়েব সিস্টেম, মাইক্রোসার্ভিসেস এবং ক্লাউড সমাধান তৈরিতে পারদর্শী।",
      ],
    },
  });

  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [resumeUploading, setResumeUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    let active = true;
    adminApi
      .getProfile()
      .then((res) => {
        if (!active) return;
        if (res.success && res.data) {
          setProfile((prev) => ({
            ...prev,
            ...res.data,
            en: { ...prev.en, ...res.data.en },
            bn: { ...prev.bn, ...res.data.bn },
            socialLinks: { ...prev.socialLinks, ...res.data.socialLinks },
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
      const res = await adminApi.updateProfile(profile);
      if (res.success) {
        setSuccess("Profile information saved successfully.");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to save profile.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please select a valid PDF file for your Resume/CV.");
      return;
    }

    setResumeUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await adminApi.uploadResumePdf(file);
      if (res.success && res.data) {
        setProfile((prev) => ({
          ...prev,
          resumeUrl: res.data?.url ?? "",
        }));
        setSuccess(
          `Resume PDF uploaded successfully (${file.name}). Public download link updated immediately.`,
        );
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to upload Resume PDF.");
      }
    } finally {
      setResumeUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveResume = async () => {
    if (
      !window.confirm(
        "Remove the current Resume PDF? The download button will be gracefully hidden on the public site.",
      )
    ) {
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await adminApi.removeResumePdf();
      if (res.success) {
        setProfile((prev) => ({ ...prev, resumeUrl: "" }));
        setSuccess(
          "Resume link removed. Download button will be hidden on public site.",
        );
      }
    } catch {
      setError("Failed to remove resume.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-slate-400 font-mono text-xs gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        <span>Loading profile information...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <User className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold font-mono text-white">
              Profile &amp; Resume / CV Management
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Manage your personal identity, professional titles, social channels,
            and direct PC Resume PDF upload.
          </p>
        </div>

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
              <span>Save Profile</span>
            </>
          )}
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

      {/* Resume / CV PDF Dedicated Upload Card */}
      <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
              Resume / CV PDF Direct PC Upload
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Public Download Link
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed font-mono">
          Upload or replace your Resume/CV PDF directly from your PC. When
          updated, the public portfolio download button reflects the new file
          immediately. If removed, the download button is gracefully hidden.
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-white font-semibold block">
                {profile.resumeUrl
                  ? "Active Resume PDF Configured"
                  : "No Resume Configured"}
              </span>
              <span className="text-[11px] font-mono text-slate-500 block truncate max-w-xs sm:max-w-md">
                {profile.resumeUrl ||
                  "Public download link is currently hidden"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              onChange={handleResumeUpload}
              className="hidden"
            />

            <button
              type="button"
              disabled={resumeUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-colors"
            >
              {resumeUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading PDF...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload from PC</span>
                </>
              )}
            </button>

            {profile.resumeUrl && (
              <>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Preview / Download Current PDF"
                >
                  <Download className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={handleRemoveResume}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Remove Current Resume"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Identity */}
        <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold font-mono text-white pb-2 border-b border-slate-800">
            Core Contact &amp; Location
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={profile.name || ""}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Public Email
              </label>
              <input
                type="email"
                required
                value={profile.email || ""}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Location / Timezone
              </label>
              <input
                type="text"
                value={profile.location || ""}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Availability Status Text
              </label>
              <input
                type="text"
                value={profile.availabilityText || ""}
                onChange={(e) =>
                  setProfile({ ...profile, availabilityText: e.target.value })
                }
                placeholder="Available for Senior Roles & Architecture Consulting"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold font-mono text-white pb-2 border-b border-slate-800">
            Social &amp; Platform Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                GitHub URL
              </label>
              <input
                type="url"
                value={profile.socialLinks?.github || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: {
                      ...profile.socialLinks,
                      github: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-mono text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={profile.socialLinks?.linkedin || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: {
                      ...profile.socialLinks,
                      linkedin: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-mono text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Twitter / X URL
              </label>
              <input
                type="url"
                value={profile.socialLinks?.twitter || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: {
                      ...profile.socialLinks,
                      twitter: e.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-mono text-white"
              />
            </div>
          </div>
        </div>

        {/* Localized Professional Titles & Bios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* English */}
          <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold font-mono text-emerald-400 pb-2 border-b border-slate-800">
              English Content (EN)
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Professional Title
              </label>
              <input
                type="text"
                value={profile.en?.title || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    en: { ...profile.en, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Availability Status Text
              </label>
              <input
                type="text"
                value={profile.availabilityText || ""}
                onChange={(e) =>
                  setProfile({ ...profile, availabilityText: e.target.value })
                }
                placeholder="Available for Senior Roles & Architecture Consulting"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Short Biography
              </label>
              <textarea
                rows={3}
                value={profile.en?.bio || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    en: { ...profile.en, bio: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Availability Status Text
              </label>
              <input
                type="text"
                value={profile.availabilityText || ""}
                onChange={(e) =>
                  setProfile({ ...profile, availabilityText: e.target.value })
                }
                placeholder="Available for Senior Roles & Architecture Consulting"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
              />
            </div>
          </div>

          {/* Bangla */}
          <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold font-mono text-emerald-400 pb-2 border-b border-slate-800">
              Bangla Content (BN)
            </h2>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Professional Title
              </label>
              <input
                type="text"
                value={profile.bn?.title || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bn: { ...profile.bn, title: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Short Biography
              </label>
              <textarea
                rows={3}
                value={profile.bn?.bio || ""}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    bn: { ...profile.bn, bio: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white font-serif"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
