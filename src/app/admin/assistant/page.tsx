"use client";

import * as React from "react";
import {
  HelpCircle,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { adminApi, ApiError } from "@/lib/api-client";
interface AssistantQA {
  _id: string;
  category: string;
  order: number;
  isActive: boolean;
  en: {
    question: string;
    answer: string;
  };
  bn: {
    question: string;
    answer: string;
  };
}

export default function AdminAssistantPage() {
  const [qaList, setQaList] = React.useState<AssistantQA[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    category: "experience",
    order: 1,
    isActive: true,
    en: { question: "", answer: "" },
    bn: { question: "", answer: "" },
  });

  const loadQA = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAssistantQA<AssistantQA>();
      if (res.success) {
        setQaList(res.data || []);
      }
    } catch {
      setError("Failed to load assistant Q&A pairs.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let active = true;

    const fetchQA = async () => {
      try {
        const res = await adminApi.getAssistantQA<AssistantQA>();

        if (active && res.success) {
          setQaList(res.data || []);
        }
      } catch {
        if (active) {
          setError("Failed to load assistant Q&A pairs.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void fetchQA();

    return () => {
      active = false;
    };
  }, []);
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await adminApi.createAssistantQA(formData);
      if (res.success) {
        setSuccess("Q&A pair saved successfully.");
        setIsModalOpen(false);
        setFormData({
          category: "experience",
          order: qaList.length + 1,
          isActive: true,
          en: { question: "", answer: "" },
          bn: { question: "", answer: "" },
        });
        loadQA();
      }
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this Q&A pair?")) return;
    try {
      await adminApi.deleteAssistantQA(id);
      loadQA();
    } catch {
      setError("Failed to delete Q&A pair.");
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white">
              Chat Assistant Predefined Q&amp;A
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage predefined question-and-answer pairs for the public floating
            chat dialog (bilingual EN &amp; BN).
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Q&amp;A Pair</span>
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

      {/* List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 text-slate-400 text-xs gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <span>Loading Q&amp;A pairs...</span>
        </div>
      ) : qaList.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0b0f19] border border-slate-800 text-xs text-slate-500">
          No predefined questions in database yet. Public assistant serves
          default pairs until you add custom questions.
        </div>
      ) : (
        <div className="rounded-xl bg-[#0b0f19] border border-slate-800 divide-y divide-slate-800 shadow-xl overflow-hidden text-xs">
          {qaList.map((qa) => (
            <div
              key={qa._id}
              className="p-4 flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400">
                  {qa.category} &bull; #{qa.order}
                </span>
                <h3 className="text-sm font-bold text-white">
                  Q: {qa.en?.question}
                </h3>
                <p className="text-slate-400 font-sans text-xs">
                  A: {qa.en?.answer}
                </p>
                {qa.bn?.question && (
                  <div className="text-[11px] text-slate-500 pt-1 font-serif">
                    BN: {qa.bn.question}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleDelete(qa._id)}
                className="p-1.5 rounded hover:bg-rose-950/40 text-slate-500 hover:text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0b0f19] border border-slate-800 rounded-xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white">
                Add Predefined Q&amp;A Pair
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                >
                  <option value="experience">Experience</option>
                  <option value="skills">Skills</option>
                  <option value="freelance">Freelance &amp; Work</option>
                  <option value="architecture">Architecture</option>
                  <option value="contact">Contact</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">
                  Question (English)
                </label>
                <input
                  type="text"
                  required
                  value={formData.en.question}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      en: { ...formData.en, question: e.target.value },
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">
                  Answer (English)
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.en.answer}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      en: { ...formData.en, answer: e.target.value },
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-sans text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">
                  Question (Bangla)
                </label>
                <input
                  type="text"
                  value={formData.bn.question}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bn: { ...formData.bn, question: e.target.value },
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-serif"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">
                  Answer (Bangla)
                </label>
                <textarea
                  rows={2}
                  value={formData.bn.answer}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bn: { ...formData.bn, answer: e.target.value },
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-serif text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                >
                  Save Q&amp;A
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
