"use client";

import * as React from "react";
import {
  Layers,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { adminApi, SectionConfigItem, ApiError } from "@/lib/api-client";

const DEFAULT_SECTIONS: SectionConfigItem[] = [
  { id: "hero", label: "Hero & Introduction", enabled: true, order: 1 },
  { id: "about", label: "About & Philosophy", enabled: true, order: 2 },
  { id: "skills", label: "Skills & Technologies", enabled: true, order: 3 },
  { id: "videoShowcase", label: "Video Showcase (Laptop Presentation)", enabled: true, order: 4 },
  { id: "experience", label: "Professional Experience", enabled: true, order: 5 },
  { id: "education", label: "Education & Coursework", enabled: true, order: 6 },
  { id: "projects", label: "Featured Projects & Case Studies", enabled: true, order: 7 },
  { id: "blog", label: "Engineering Articles & Blog", enabled: true, order: 8 },
  { id: "contact", label: "Contact & Inquiries Form", enabled: true, order: 9 },
  { id: "assistant", label: "Floating Chat Assistant", enabled: true, order: 10 },
];

export default function AdminSectionsPage() {
  const [sections, setSections] = React.useState<SectionConfigItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  React.useEffect(() => {
    let active = true;
    adminApi
      .getSections()
      .then((res) => {
        if (!active) return;
        if (res.success && res.data && res.data.length > 0) {
          const sorted = [...res.data].sort((a, b) => a.order - b.order);
          setSections(sorted);
        } else {
          setSections(DEFAULT_SECTIONS);
        }
      })
      .catch(() => {
        if (active) setSections(DEFAULT_SECTIONS);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleToggle = (id: string) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, enabled: !sec.enabled } : sec))
    );
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // Re-index orders sequentially
    const updated = newSections.map((sec, idx) => ({
      ...sec,
      order: idx + 1,
    }));

    setSections(updated);
  };

  const handleResetDefaults = () => {
    setSections(DEFAULT_SECTIONS);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await adminApi.updateSections(sections);
      if (res.success) {
        setSuccess(
          "Section visibility and ordering persisted to database. Public site updated immediately."
        );
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to persist section configuration.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-slate-400 font-mono text-xs gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
        <span>Loading section settings...</span>
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
              <Layers className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold font-mono text-white">
              Public Section Visibility & Order
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Toggle visibility or reorder public website sections. Disabled sections cleanly collapse with 0px gap and hide their navigation links. Content remains safely preserved in the database.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

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
                <span>Save Changes</span>
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

      {/* Sections List */}
      <div className="rounded-xl bg-[#0b0f19] border border-slate-800 divide-y divide-slate-800/80 shadow-xl overflow-hidden">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`p-4 flex items-center justify-between gap-4 transition-colors ${
              section.enabled ? "bg-transparent" : "bg-slate-950/40 opacity-70"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 text-center font-mono text-xs font-bold text-slate-500">
                #{section.order}
              </span>

              <button
                type="button"
                onClick={() => handleToggle(section.id)}
                className={`p-2 rounded-lg border transition-colors ${
                  section.enabled
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-slate-900 border-slate-800 text-slate-500"
                }`}
                title={section.enabled ? "Click to Disable" : "Click to Enable"}
              >
                {section.enabled ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold font-mono text-white">
                    {section.label}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider ${
                      section.enabled
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-500 border border-slate-700"
                    }`}
                  >
                    {section.enabled ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  ID: {section.id}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={index === 0}
                onClick={() => handleMove(index, "up")}
                className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 border border-slate-800 text-slate-300 transition-colors"
                title="Move Up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              <button
                type="button"
                disabled={index === sections.length - 1}
                onClick={() => handleMove(index, "down")}
                className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 border border-slate-800 text-slate-300 transition-colors"
                title="Move Down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

