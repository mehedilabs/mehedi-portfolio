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
  Image as ImageIcon,
  Laptop,
  Share2,
  Plus,
  X,
  ExternalLink,
} from "lucide-react";
import { adminApi, ApiError } from "@/lib/api-client";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  avatarAlt?: string;
  aboutPhotoUrl: string;
  aboutPhotoAlt?: string;
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
  [key: string]: unknown;
}

export default function AdminProfilePage() {
  const [activeTab, setActiveTab] = React.useState<"hero" | "about" | "resume" | "contact">("hero");

  const [profile, setProfile] = React.useState<ProfileData>({
    name: "Mehedi Hasan",
    email: "contact@mehedi.dev",
    phone: "",
    location: "Dhaka, Bangladesh (UTC+6)",
    avatarUrl: "/images/hero-profile.png",
    avatarAlt: "Mehedi Hasan — Profile Photo",
    aboutPhotoUrl: "/images/about-workspace.png",
    aboutPhotoAlt: "Mehedi Hasan — Developer Workspace",
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
      greeting: "Hello, World! I am",
      bio: "Passionate software engineer building resilient, high-throughput distributed web systems.",
      summary: "I build clean, accessible, and high-performance web systems with modern React, Next.js, TypeScript, and microservices.",
      aboutTitle: "About Me",
      aboutHeadline: "Building clean, modern, and user-friendly web applications.",
      aboutParagraphs: [
        "I specialize in architecting end-to-end full-stack web applications, microservices, and reliable cloud infrastructures.",
        "My focus is on maintainability, performance benchmarks, and clean developer workflows.",
        "Passionate about developer experience, web performance, and continuous integration pipelines.",
      ],
    },
    bn: {
      title: "সিনিয়র ফুল-স্ট্যাক আর্কিটেক্ট",
      greeting: "হ্যালো, আমি",
      bio: "স্কেলযোগ্য, উচ্চ ক্ষমতাসম্পন্ন ও সুরক্ষিত ওয়েব অ্যাপ্লিকেশন নির্মাতা ও আর্কিটেক্ট।",
      summary: "আমি আধুনিক রিঅ্যাক্ট, নেক্সট.জেএস, টাইপস্ক্রিপ্ট ও মাইক্রোসার্ভিসেস দিয়ে পরিচ্ছন্ন ও উচ্চ-পারফরম্যান্স ওয়েব সিস্টেম তৈরি করি।",
      aboutTitle: "আমার সম্পর্কে",
      aboutHeadline: "পরিচ্ছন্ন, আধুনিক ও ব্যবহারকারী-বান্ধব ওয়েব অ্যাপ্লিকেশন নির্মাণে নিবেদিত।",
      aboutParagraphs: [
        "আমি এন্ড-টু-এন্ড ফুল-স্ট্যাক ওয়েব সিস্টেম, মাইক্রোসার্ভিসেস এবং ক্লাউড সমাধান তৈরিতে পারদর্শী।",
        "কোডের স্থায়িত্ব, পারফরম্যান্স এবং ক্লিন ডেভেলপার এক্সপেরিয়েন্স আমার কাজের মূল ভিত্তি।",
        "উচ্চমানের সফটওয়্যার আর্কিটেকচার ও উন্নত ইউজার এক্সপেরিয়েন্স নিশ্চিত করাই আমার লক্ষ্য।",
      ],
    },
  });

  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [avatarUploading, setAvatarUploading] = React.useState(false);
  const [aboutPhotoUploading, setAboutPhotoUploading] = React.useState(false);
  const [resumeUploading, setResumeUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const aboutPhotoInputRef = React.useRef<HTMLInputElement>(null);
  const resumeInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    let active = true;
    adminApi
      .getProfile()
      .then((res) => {
        if (!active) return;
        if (res.success && res.data) {
          const d = res.data as Partial<ProfileData>;
          setProfile((prev) => ({
            ...prev,
            ...d,
            avatarAlt: d.avatarAlt || prev.avatarAlt,
            aboutPhotoAlt: d.aboutPhotoAlt || prev.aboutPhotoAlt,
            availabilityText: d.availabilityText || prev.availabilityText,
            en: {
              ...prev.en,
              ...d.en,
              greeting: d.en?.greeting || prev.en.greeting,
              summary: d.en?.summary || prev.en.summary,
              aboutTitle: d.en?.aboutTitle || prev.en.aboutTitle,
              aboutParagraphs: d.en?.aboutParagraphs?.length ? d.en.aboutParagraphs : prev.en.aboutParagraphs,
            },
            bn: {
              ...prev.bn,
              ...d.bn,
              greeting: d.bn?.greeting || prev.bn.greeting,
              summary: d.bn?.summary || prev.bn.summary,
              aboutTitle: d.bn?.aboutTitle || prev.bn.aboutTitle,
              aboutParagraphs: d.bn?.aboutParagraphs?.length ? d.bn.aboutParagraphs : prev.bn.aboutParagraphs,
            },
            socialLinks: { ...prev.socialLinks, ...d.socialLinks },
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

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await adminApi.updateProfile(profile);
      if (res.success) {
        setSuccess("Profile information, images, and content saved successfully to MongoDB. Live public site updated.");
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to save profile changes.");
      }
    } finally {
      setSaving(false);
    }
  };

  // ----------------------------------------------------------------------------
  // Hero Avatar Upload
  // ----------------------------------------------------------------------------
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP) for the profile photo.");
      return;
    }

    setAvatarUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await adminApi.uploadMedia(file, "avatar");
      if (res.success && res.data?.url) {
        setProfile((prev) => ({
          ...prev,
          avatarUrl: res.data?.url ?? prev.avatarUrl,
        }));
        setSuccess(`Hero profile photo uploaded successfully (${file.name}). Click "Save All Changes" to persist.`);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to upload profile photo.");
      }
    } finally {
      setAvatarUploading(false);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  // ----------------------------------------------------------------------------
  // About Workspace Photo Upload
  // ----------------------------------------------------------------------------
  const handleAboutPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP) for the about section photo.");
      return;
    }

    setAboutPhotoUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await adminApi.uploadMedia(file, "other");
      if (res.success && res.data?.url) {
        setProfile((prev) => ({
          ...prev,
          aboutPhotoUrl: res.data?.url ?? prev.aboutPhotoUrl,
        }));
        setSuccess(`About section image uploaded successfully (${file.name}). Click "Save All Changes" to persist.`);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to upload about section image.");
      }
    } finally {
      setAboutPhotoUploading(false);
      if (aboutPhotoInputRef.current) aboutPhotoInputRef.current.value = "";
    }
  };

  // ----------------------------------------------------------------------------
  // Resume PDF Upload
  // ----------------------------------------------------------------------------
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
      if (res.success && res.data?.url) {
        setProfile((prev) => ({
          ...prev,
          resumeUrl: res.data?.url ?? "",
        }));
        setSuccess(`Resume PDF uploaded successfully (${file.name}). Public download link updated immediately.`);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to upload Resume PDF.");
      }
    } finally {
      setResumeUploading(false);
      if (resumeInputRef.current) resumeInputRef.current.value = "";
    }
  };

  const handleRemoveResume = async () => {
    if (!window.confirm("Remove the current Resume PDF? The download button will be gracefully hidden on the public site.")) {
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await adminApi.removeResumePdf();
      if (res.success) {
        setProfile((prev) => ({ ...prev, resumeUrl: "" }));
        setSuccess("Resume link removed. Download button will be hidden on public site.");
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
        <span>Loading profile content & media settings...</span>
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
              Home &amp; About Content Management
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Manage your Hero profile photo, About section image, bilingual copy, Resume PDF, and contact links.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleSave()}
          disabled={saving}
          className="px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
        >
          {saving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save All Changes</span>
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

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 font-mono text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium transition-colors ${
            activeTab === "hero"
              ? "border-emerald-400 text-emerald-400 bg-emerald-500/5"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Hero &amp; Home Page</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("about")}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium transition-colors ${
            activeTab === "about"
              ? "border-emerald-400 text-emerald-400 bg-emerald-500/5"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>About Section</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("resume")}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium transition-colors ${
            activeTab === "resume"
              ? "border-emerald-400 text-emerald-400 bg-emerald-500/5"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Resume / CV PDF</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium transition-colors ${
            activeTab === "contact"
              ? "border-emerald-400 text-emerald-400 bg-emerald-500/5"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Contact &amp; Social</span>
        </button>
      </div>

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 1: HERO & HOME PAGE MANAGEMENT                                      */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === "hero" && (
        <div className="space-y-6">
          {/* Main Hero Photo Upload & Preview Card */}
          <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                  Home Page Main Profile Photo
                </h2>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                Direct PC Upload + Live Preview
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono leading-relaxed">
              Upload, preview, and replace your main Home Page profile photo. This photo is displayed in both Light and Dark themes on desktop and mobile viewports.
            </p>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 rounded-xl bg-slate-900 border border-slate-800">
              {/* Preview Window */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden border-2 border-emerald-500/40 bg-slate-950 flex items-center justify-center shrink-0 shadow-lg group">
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatarUrl}
                    alt={profile.avatarAlt || "Hero Preview"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-slate-500 text-center font-mono text-xs gap-2">
                    <User className="w-8 h-8 opacity-50" />
                    <span>No image set</span>
                  </div>
                )}
              </div>

              {/* Upload Controls & Alt Text */}
              <div className="flex-1 space-y-4 w-full">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="file"
                    ref={avatarInputRef}
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    disabled={avatarUploading}
                    onClick={() => avatarInputRef.current?.click()}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-colors"
                  >
                    {avatarUploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading Image...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo from PC</span>
                      </>
                    )}
                  </button>

                  {profile.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => setProfile((prev) => ({ ...prev, avatarUrl: "" }))}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 text-xs font-mono flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Photo</span>
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Image Alternative Text (Accessibility Alt)
                  </label>
                  <input
                    type="text"
                    value={profile.avatarAlt || ""}
                    onChange={(e) => setProfile({ ...profile, avatarAlt: e.target.value })}
                    placeholder="Mehedi Hasan — Senior Full-Stack Architect Profile"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Current Image URL / Path
                  </label>
                  <input
                    type="text"
                    value={profile.avatarUrl || ""}
                    onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                    placeholder="/images/hero-profile.png or Cloudinary URL"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs font-mono text-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hero Content Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Hero */}
            <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 space-y-4 shadow-xl">
              <h2 className="text-sm font-bold font-mono text-emerald-400 pb-2 border-b border-slate-800">
                English Hero Content (EN)
              </h2>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Greeting Line
                </label>
                <input
                  type="text"
                  value={profile.en?.greeting || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      en: { ...profile.en, greeting: e.target.value },
                    })
                  }
                  placeholder="Hello, World! I am"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>

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
                  placeholder="Senior Full-Stack Architect"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Introductory Summary
                </label>
                <textarea
                  rows={3}
                  value={profile.en?.summary || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      en: { ...profile.en, summary: e.target.value },
                    })
                  }
                  placeholder="Short, human introduction displayed directly under title"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>
            </div>

            {/* Bangla Hero */}
            <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 space-y-4 shadow-xl">
              <h2 className="text-sm font-bold font-mono text-emerald-400 pb-2 border-b border-slate-800">
                Bangla Hero Content (বাংলা)
              </h2>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Greeting Line (অভিবাদন)
                </label>
                <input
                  type="text"
                  value={profile.bn?.greeting || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      bn: { ...profile.bn, greeting: e.target.value },
                    })
                  }
                  placeholder="হ্যালো, আমি"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Professional Title (পদবি)
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
                  placeholder="সিনিয়র ফুল-স্ট্যাক আর্কিটেক্ট"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Introductory Summary (সংক্ষিপ্ত বিবরণ)
                </label>
                <textarea
                  rows={3}
                  value={profile.bn?.summary || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      bn: { ...profile.bn, summary: e.target.value },
                    })
                  }
                  placeholder="বাংলায় সংক্ষিপ্ত পরিচিতি"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 2: ABOUT SECTION MANAGEMENT                                         */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === "about" && (
        <div className="space-y-6">
          {/* About Section Workspace Photo Upload & Preview Card */}
          <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
                  <Laptop className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                  About Section Workspace Photo
                </h2>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                Direct PC Upload + Fallback Illustration
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono leading-relaxed">
              Upload your developer workspace photo. If no custom photo is provided, the section automatically displays the interactive developer-at-work illustration.
            </p>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4 rounded-xl bg-slate-900 border border-slate-800">
              {/* Preview Window */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-xl overflow-hidden border-2 border-emerald-500/40 bg-slate-950 flex items-center justify-center shrink-0 shadow-lg">
                {profile.aboutPhotoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.aboutPhotoUrl}
                    alt={profile.aboutPhotoAlt || "About Preview"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-slate-500 text-center font-mono text-xs gap-2">
                    <Laptop className="w-8 h-8 opacity-50" />
                    <span>Using default illustration</span>
                  </div>
                )}
              </div>

              {/* Upload Controls & Alt Text */}
              <div className="flex-1 space-y-4 w-full">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="file"
                    ref={aboutPhotoInputRef}
                    accept="image/*"
                    onChange={handleAboutPhotoUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    disabled={aboutPhotoUploading}
                    onClick={() => aboutPhotoInputRef.current?.click()}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-colors"
                  >
                    {aboutPhotoUploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading Image...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Workspace Photo from PC</span>
                      </>
                    )}
                  </button>

                  {profile.aboutPhotoUrl && (
                    <button
                      type="button"
                      onClick={() => setProfile((prev) => ({ ...prev, aboutPhotoUrl: "" }))}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 text-xs font-mono flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Reset to Illustration</span>
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Image Alternative Text (Accessibility Alt)
                  </label>
                  <input
                    type="text"
                    value={profile.aboutPhotoAlt || ""}
                    onChange={(e) => setProfile({ ...profile, aboutPhotoAlt: e.target.value })}
                    placeholder="Mehedi Hasan — Developer Workspace Setup"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">
                    Workspace Image URL / Path
                  </label>
                  <input
                    type="text"
                    value={profile.aboutPhotoUrl || ""}
                    onChange={(e) => setProfile({ ...profile, aboutPhotoUrl: e.target.value })}
                    placeholder="/images/about-workspace.png or Cloudinary URL"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs font-mono text-slate-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* About Content Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English About */}
            <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 space-y-4 shadow-xl">
              <h2 className="text-sm font-bold font-mono text-emerald-400 pb-2 border-b border-slate-800">
                English About Section (EN)
              </h2>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Section Heading Title
                </label>
                <input
                  type="text"
                  value={profile.en?.aboutTitle || "About Me"}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      en: { ...profile.en, aboutTitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Mission Statement / Subheadline
                </label>
                <input
                  type="text"
                  value={profile.en?.aboutHeadline || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      en: { ...profile.en, aboutHeadline: e.target.value },
                    })
                  }
                  placeholder="Building clean, modern, and user-friendly web applications."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-300">
                  Bio Paragraphs (Displayed in sequence)
                </label>
                {profile.en?.aboutParagraphs?.map((para, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <span className="text-xs font-mono text-slate-500 pt-2 shrink-0">
                      P{idx + 1}:
                    </span>
                    <textarea
                      rows={2}
                      value={para}
                      onChange={(e) => {
                        const newParas = [...profile.en.aboutParagraphs];
                        newParas[idx] = e.target.value;
                        setProfile({
                          ...profile,
                          en: { ...profile.en, aboutParagraphs: newParas },
                        });
                      }}
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                    />
                    {profile.en.aboutParagraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newParas = profile.en.aboutParagraphs.filter((_, i) => i !== idx);
                          setProfile({
                            ...profile,
                            en: { ...profile.en, aboutParagraphs: newParas },
                          });
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove paragraph"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setProfile({
                      ...profile,
                      en: {
                        ...profile.en,
                        aboutParagraphs: [...profile.en.aboutParagraphs, ""],
                      },
                    });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:underline pt-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add another paragraph</span>
                </button>
              </div>
            </div>

            {/* Bangla About */}
            <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 space-y-4 shadow-xl">
              <h2 className="text-sm font-bold font-mono text-emerald-400 pb-2 border-b border-slate-800">
                Bangla About Section (বাংলা)
              </h2>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Section Heading Title (শিরোনাম)
                </label>
                <input
                  type="text"
                  value={profile.bn?.aboutTitle || "আমার সম্পর্কে"}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      bn: { ...profile.bn, aboutTitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Mission Statement / Subheadline (মূল লক্ষ্য)
                </label>
                <input
                  type="text"
                  value={profile.bn?.aboutHeadline || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      bn: { ...profile.bn, aboutHeadline: e.target.value },
                    })
                  }
                  placeholder="পরিচ্ছন্ন, আধুনিক ও ব্যবহারকারী-বান্ধব ওয়েব অ্যাপ্লিকেশন নির্মাণে নিবেদিত।"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-slate-300">
                  Bio Paragraphs (অনুচ্ছেদসমূহ)
                </label>
                {profile.bn?.aboutParagraphs?.map((para, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <span className="text-xs font-mono text-slate-500 pt-2 shrink-0">
                      P{idx + 1}:
                    </span>
                    <textarea
                      rows={2}
                      value={para}
                      onChange={(e) => {
                        const newParas = [...profile.bn.aboutParagraphs];
                        newParas[idx] = e.target.value;
                        setProfile({
                          ...profile,
                          bn: { ...profile.bn, aboutParagraphs: newParas },
                        });
                      }}
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                    />
                    {profile.bn.aboutParagraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newParas = profile.bn.aboutParagraphs.filter((_, i) => i !== idx);
                          setProfile({
                            ...profile,
                            bn: { ...profile.bn, aboutParagraphs: newParas },
                          });
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove paragraph"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setProfile({
                      ...profile,
                      bn: {
                        ...profile.bn,
                        aboutParagraphs: [...profile.bn.aboutParagraphs, ""],
                      },
                    });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:underline pt-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>আরেকটি অনুচ্ছেদ যোগ করুন</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 3: RESUME / CV PDF DIRECT PC MANAGEMENT                              */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === "resume" && (
        <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                Resume / CV PDF Direct PC Upload &amp; Management
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Live Public Document
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            Upload or replace your Resume/CV PDF directly from your computer. When configured, visitors can click to view the PDF in the browser or download it directly. If removed, the button is gracefully hidden across Navbar and Hero sections.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-sm font-mono text-white font-semibold block">
                  {profile.resumeUrl ? "Active Resume PDF Configured" : "No Resume Configured"}
                </span>
                <span className="text-xs font-mono text-slate-400 block truncate max-w-xs sm:max-w-md">
                  {profile.resumeUrl || "Public button is currently hidden"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={resumeInputRef}
                accept="application/pdf"
                onChange={handleResumeUpload}
                className="hidden"
              />

              <button
                type="button"
                disabled={resumeUploading}
                onClick={() => resumeInputRef.current?.click()}
                className="px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600/50 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-colors shadow-md shadow-emerald-500/20"
              >
                {resumeUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading PDF...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Resume from PC</span>
                  </>
                )}
              </button>

              {profile.resumeUrl && (
                <>
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="View PDF in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={profile.resumeUrl}
                    download
                    className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Download current PDF"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={handleRemoveResume}
                    className="p-2.5 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Remove Resume (Hide public action)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------ */}
      {/* TAB 4: CONTACT & SOCIAL CHANNELS                                        */}
      {/* ------------------------------------------------------------------------ */}
      {activeTab === "contact" && (
        <div className="space-y-6">
          <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold font-mono text-white pb-2 border-b border-slate-800">
              Personal Identity &amp; Location
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Full Display Name
                </label>
                <input
                  type="text"
                  required
                  value={profile.name || ""}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Public Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={profile.email || ""}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
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
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Consulting / Availability Badge Text
                </label>
                <input
                  type="text"
                  value={profile.availabilityText || ""}
                  onChange={(e) => setProfile({ ...profile, availabilityText: e.target.value })}
                  placeholder="Available for Senior Roles & Architecture Consulting"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#0b0f19] border border-slate-800 p-6 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold font-mono text-white pb-2 border-b border-slate-800">
              Social &amp; Platform Channels
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={profile.socialLinks?.github || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      socialLinks: { ...profile.socialLinks, github: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={profile.socialLinks?.linkedin || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      socialLinks: { ...profile.socialLinks, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-mono text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Twitter / X Profile URL
                </label>
                <input
                  type="url"
                  value={profile.socialLinks?.twitter || ""}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      socialLinks: { ...profile.socialLinks, twitter: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-mono text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
