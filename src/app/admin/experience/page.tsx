"use client";

import * as React from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  MapPin,
} from "lucide-react";
import { adminApi, ApiError } from "@/lib/api-client";
import { ExperienceItem } from "@/types";

export default function AdminExperiencePage() {
  const [items, setItems] = React.useState<ExperienceItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const initialForm = {
    period: "2024 — Present",
    current: true,
    order: 1,
    techStack: "React, Next.js, TypeScript, Node.js",
    en: {
      role: "",
      company: "",
      location: "",
      type: "Full-Time",
      description: "",
      achievements: "",
    },
    bn: {
      role: "",
      company: "",
      location: "",
      type: "ফুল-টাইম",
      description: "",
      achievements: "",
    },
  };

  const [form, setForm] = React.useState(initialForm);

  const loadData = React.useCallback(async () => {
    try {
      const res = await adminApi.getExperience<ExperienceItem>();
      if (res.success && Array.isArray(res.data)) {
        setItems(res.data);
      }
    } catch {
      setError("Failed to load experience records.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    adminApi
      .getExperience<ExperienceItem>()
      .then((res) => {
        if (!isMounted) return;
        if (res.success && Array.isArray(res.data)) {
          setItems(res.data);
        }
      })
      .catch(() => {
        if (isMounted) setError("Failed to load experience records.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      ...initialForm,
      order: items.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ExperienceItem) => {
    setEditingId(item._id || item.id);
    setForm({
      period: item.period || "",
      current: Boolean(item.current),
      order: item.order || 1,
      techStack: Array.isArray(item.techStack) ? item.techStack.join(", ") : "",
      en: {
        role: item.en?.role || "",
        company: item.en?.company || "",
        location: item.en?.location || "",
        type: item.en?.type || "Full-Time",
        description: item.en?.description || "",
        achievements: Array.isArray(item.en?.achievements)
          ? item.en.achievements.join("\n")
          : "",
      },
      bn: {
        role: item.bn?.role || "",
        company: item.bn?.company || "",
        location: item.bn?.location || "",
        type: item.bn?.type || "ফুল-টাইম",
        description: item.bn?.description || "",
        achievements: Array.isArray(item.bn?.achievements)
          ? item.bn.achievements.join("\n")
          : "",
      },
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const payload = {
      period: form.period,
      current: form.current,
      order: Number(form.order) || 1,
      techStack: form.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      en: {
        role: form.en.role,
        company: form.en.company,
        location: form.en.location,
        type: form.en.type,
        description: form.en.description,
        achievements: form.en.achievements
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      },
      bn: {
        role: form.bn.role || form.en.role,
        company: form.bn.company || form.en.company,
        location: form.bn.location || form.en.location,
        type: form.bn.type || form.en.type,
        description: form.bn.description || form.en.description,
        achievements: (form.bn.achievements || form.en.achievements)
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      },
    };

    try {
      if (editingId) {
        await adminApi.updateExperience(editingId, payload);
        setSuccess("Experience record updated successfully.");
      } else {
        await adminApi.createExperience(payload);
        setSuccess("Experience record created successfully.");
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
      else setError("Failed to save experience record.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this experience record?"))
      return;
    try {
      await adminApi.deleteExperience(id);
      setSuccess("Record deleted successfully.");
      loadData();
    } catch {
      setError("Failed to delete record.");
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white">
              Career Trajectory (Experience CMS)
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage professional roles, timelines, achievements, and tech stacks
            (bilingual EN &amp; BN).
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Feedback Alerts */}
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

      {/* Timeline List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 text-slate-400 text-xs gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <span>Loading experience records...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="p-12 text-center text-slate-500 text-xs rounded-xl bg-[#0b0f19] border border-dashed border-slate-800">
          No experience records in database yet. Click &quot;Add Experience&quot; to publish your first career milestone.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const key = item._id || item.id;
            return (
              <div
                key={key}
                className="p-5 rounded-xl bg-[#0b0f19] border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    {item.current && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Present
                      </span>
                    )}
                    <span className="text-xs text-slate-500">Order: #{item.order}</span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {item.en?.role}{" "}
                    <span className="text-emerald-400 font-normal">
                      @ {item.en?.company}
                    </span>
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.en?.location}</span>
                    <span>&bull;</span>
                    <span>{item.en?.type}</span>
                  </div>

                  {item.en?.description && (
                    <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                      {item.en.description}
                    </p>
                  )}

                  {item.techStack && item.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    title="Edit Experience"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(key)}
                    className="p-2 rounded hover:bg-rose-950/40 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Delete Experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0b0f19] border border-slate-800 rounded-xl shadow-2xl p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>
                  {editingId ? "Edit Career Experience" : "Add Career Experience"}
                </span>
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-base"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Period</label>
                  <input
                    type="text"
                    required
                    value={form.period}
                    onChange={(e) => setForm({ ...form, period: e.target.value })}
                    placeholder="e.g. 2024 — Present"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Order Index</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) || 1 })}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="currentRole"
                    checked={form.current}
                    onChange={(e) => setForm({ ...form, current: e.target.checked })}
                    className="rounded bg-slate-900 border-slate-700"
                  />
                  <label htmlFor="currentRole" className="text-slate-300 cursor-pointer">
                    Current Active Role
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">
                  Tech Stack (comma-separated)
                </label>
                <input
                  type="text"
                  required
                  value={form.techStack}
                  onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                  placeholder="React, Next.js, Node.js, MongoDB"
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                />
              </div>

              {/* English Section */}
              <div className="p-3.5 rounded-lg border border-slate-800 bg-[#070a13] space-y-3">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  English Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Role Title</label>
                    <input
                      type="text"
                      required
                      value={form.en.role}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          en: { ...form.en, role: e.target.value },
                        })
                      }
                      placeholder="Senior Full-Stack Engineer"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={form.en.company}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          en: { ...form.en, company: e.target.value },
                        })
                      }
                      placeholder="Tech Corp Ltd."
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Location &amp; Type</label>
                    <input
                      type="text"
                      value={form.en.location}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          en: { ...form.en, location: e.target.value },
                        })
                      }
                      placeholder="Dhaka, Bangladesh / Remote"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={form.en.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        en: { ...form.en, description: e.target.value },
                      })
                    }
                    placeholder="Architected distributed Next.js and Node.js solutions..."
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">
                    Achievements &amp; Responsibilities (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={form.en.achievements}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        en: { ...form.en, achievements: e.target.value },
                      })
                    }
                    placeholder="Led frontend performance refactoring&#10;Decreased build times by 40%"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              {/* Bangla Section */}
              <div className="p-3.5 rounded-lg border border-slate-800 bg-[#070a13] space-y-3">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Bangla Details (বাংলা)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">পদবী (Role)</label>
                    <input
                      type="text"
                      value={form.bn.role}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          bn: { ...form.bn, role: e.target.value },
                        })
                      }
                      placeholder="সিনিয়র ফুল-স্ট্যাক ইঞ্জিনিয়ার"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">প্রতিষ্ঠান (Company)</label>
                    <input
                      type="text"
                      value={form.bn.company}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          bn: { ...form.bn, company: e.target.value },
                        })
                      }
                      placeholder="টেক কর্প লিমিটেড"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">স্থান (Location)</label>
                    <input
                      type="text"
                      value={form.bn.location}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          bn: { ...form.bn, location: e.target.value },
                        })
                      }
                      placeholder="ঢাকা, বাংলাদেশ (রিমোট)"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">বিবরণ (Description)</label>
                  <textarea
                    rows={2}
                    value={form.bn.description}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        bn: { ...form.bn, description: e.target.value },
                      })
                    }
                    placeholder="বিতরণকৃত সিস্টেম ও আধুনিক আর্কিটেকচার পরিচালন..."
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">
                    অর্জন ও দায়িত্ব (প্রতি লাইনে একটি)
                  </label>
                  <textarea
                    rows={3}
                    value={form.bn.achievements}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        bn: { ...form.bn, achievements: e.target.value },
                      })
                    }
                    placeholder="সিস্টেম স্কেলিং ও অপ্টিমাইজেশন পরিচালনা&#10;লোড টাইম ৪০% হ্রাস"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                >
                  {editingId ? "Save Changes" : "Publish Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
