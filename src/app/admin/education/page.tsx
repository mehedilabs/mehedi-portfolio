"use client";

import * as React from "react";
import {
  GraduationCap,
  Award,
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
import { EducationItem, CertificationItem } from "@/types";

export default function AdminEducationPage() {
  const [activeTab, setActiveTab] = React.useState<"education" | "certifications">("education");
  const [educations, setEducations] = React.useState<EducationItem[]>([]);
  const [certifications, setCertifications] = React.useState<CertificationItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  // Education Modal
  const [isEduModalOpen, setIsEduModalOpen] = React.useState(false);
  const [editingEduId, setEditingEduId] = React.useState<string | null>(null);
  const initialEduForm = {
    period: "2018 — 2022",
    order: 1,
    courses: "Algorithms & Data Structures, Distributed Systems, Database Architecture",
    en: {
      degree: "",
      institution: "",
      location: "",
      description: "",
    },
    bn: {
      degree: "",
      institution: "",
      location: "",
      description: "",
    },
  };
  const [eduForm, setEduForm] = React.useState(initialEduForm);

  // Cert Modal
  const [isCertModalOpen, setIsCertModalOpen] = React.useState(false);
  const [editingCertId, setEditingCertId] = React.useState<string | null>(null);
  const initialCertForm = {
    name: "",
    issuer: "",
    issueDate: "2024",
    credentialUrl: "",
    order: 1,
    en: { title: "", description: "" },
    bn: { title: "", description: "" },
  };
  const [certForm, setCertForm] = React.useState(initialCertForm);

  const loadData = React.useCallback(async () => {
    try {
      const [eduRes, certRes] = await Promise.all([
        adminApi.getEducation<EducationItem>(),
        adminApi.getCertifications<CertificationItem>(),
      ]);
      if (eduRes.success && Array.isArray(eduRes.data)) setEducations(eduRes.data);
      if (certRes.success && Array.isArray(certRes.data)) setCertifications(certRes.data);
    } catch {
      setError("Failed to load education and certification records.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    Promise.all([
      adminApi.getEducation<EducationItem>(),
      adminApi.getCertifications<CertificationItem>(),
    ])
      .then(([eduRes, certRes]) => {
        if (!isMounted) return;
        if (eduRes.success && Array.isArray(eduRes.data)) setEducations(eduRes.data);
        if (certRes.success && Array.isArray(certRes.data)) setCertifications(certRes.data);
      })
      .catch(() => {
        if (isMounted) setError("Failed to load education and certification records.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Education Handlers
  const handleOpenCreateEdu = () => {
    setEditingEduId(null);
    setEduForm({ ...initialEduForm, order: educations.length + 1 });
    setIsEduModalOpen(true);
  };

  const handleOpenEditEdu = (item: EducationItem) => {
    setEditingEduId(item._id || item.id);
    setEduForm({
      period: item.period || "",
      order: item.order || 1,
      courses: Array.isArray(item.en?.courses) ? item.en.courses.join(", ") : "",
      en: {
        degree: item.en?.degree || "",
        institution: item.en?.institution || "",
        location: item.en?.location || "",
        description: item.en?.description || "",
      },
      bn: {
        degree: item.bn?.degree || "",
        institution: item.bn?.institution || "",
        location: item.bn?.location || "",
        description: item.bn?.description || "",
      },
    });
    setIsEduModalOpen(true);
  };

  const handleSubmitEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const courseList = eduForm.courses.split(",").map((c) => c.trim()).filter(Boolean);
    const payload = {
      period: eduForm.period,
      order: Number(eduForm.order) || 1,
      en: {
        degree: eduForm.en.degree,
        institution: eduForm.en.institution,
        location: eduForm.en.location,
        description: eduForm.en.description,
        courses: courseList,
      },
      bn: {
        degree: eduForm.bn.degree || eduForm.en.degree,
        institution: eduForm.bn.institution || eduForm.en.institution,
        location: eduForm.bn.location || eduForm.en.location,
        description: eduForm.bn.description || eduForm.en.description,
        courses: courseList,
      },
    };

    try {
      if (editingEduId) {
        await adminApi.updateEducation(editingEduId, payload);
        setSuccess("Education degree updated successfully.");
      } else {
        await adminApi.createEducation(payload);
        setSuccess("Education degree created successfully.");
      }
      setIsEduModalOpen(false);
      loadData();
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
      else setError("Failed to save education record.");
    }
  };

  const handleDeleteEdu = async (id: string) => {
    if (!window.confirm("Delete this education record?")) return;
    try {
      await adminApi.deleteEducation(id);
      setSuccess("Record deleted.");
      loadData();
    } catch {
      setError("Failed to delete record.");
    }
  };

  // Certification Handlers
  const handleOpenCreateCert = () => {
    setEditingCertId(null);
    setCertForm({ ...initialCertForm, order: certifications.length + 1 });
    setIsCertModalOpen(true);
  };

  const handleSubmitCert = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const payload = {
      name: certForm.name,
      issuer: certForm.issuer,
      issueDate: certForm.issueDate,
      credentialUrl: certForm.credentialUrl,
      order: Number(certForm.order) || 1,
      en: {
        title: certForm.en.title || certForm.name,
        description: certForm.en.description,
      },
      bn: {
        title: certForm.bn.title || certForm.en.title || certForm.name,
        description: certForm.bn.description || certForm.en.description,
      },
    };

    try {
      if (editingCertId) {
        await adminApi.updateCertification(editingCertId, payload);
        setSuccess("Certification updated successfully.");
      } else {
        await adminApi.createCertification(payload);
        setSuccess("Certification created successfully.");
      }
      setIsCertModalOpen(false);
      loadData();
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
      else setError("Failed to save certification.");
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (!window.confirm("Delete this certification?")) return;
    try {
      await adminApi.deleteCertification(id);
      setSuccess("Certification deleted.");
      loadData();
    } catch {
      setError("Failed to delete certification.");
    }
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white">
              Academics &amp; Certifications CMS
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage degrees, institutions, and credentials with real database
            persistence (bilingual EN &amp; BN).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "education" ? (
            <button
              type="button"
              onClick={handleOpenCreateEdu}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Degree</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOpenCreateCert}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Certification</span>
            </button>
          )}
        </div>
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

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("education")}
          className={`px-4 py-2.5 border-b-2 font-bold flex items-center gap-2 transition-colors ${
            activeTab === "education"
              ? "border-emerald-400 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Academic Degrees ({educations.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("certifications")}
          className={`px-4 py-2.5 border-b-2 font-bold flex items-center gap-2 transition-colors ${
            activeTab === "certifications"
              ? "border-cyan-400 text-cyan-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certifications ({certifications.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 text-slate-400 text-xs gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <span>Loading data...</span>
        </div>
      ) : activeTab === "education" ? (
        educations.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs rounded-xl bg-[#0b0f19] border border-dashed border-slate-800">
            No education degrees in database yet. Click &quot;Add Degree&quot; to publish your academic background.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educations.map((item) => {
              const key = item._id || item.id;
              return (
                <div
                  key={key}
                  className="p-5 rounded-xl bg-[#0b0f19] border border-slate-800 shadow-xl flex items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {item.en?.degree}
                    </h3>
                    <p className="text-xs text-cyan-400 font-mono">
                      {item.en?.institution}
                    </p>
                    {item.en?.location && (
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.en.location}
                      </p>
                    )}
                    {item.en?.description && (
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        {item.en.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleOpenEditEdu(item)}
                      className="p-2 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                      title="Edit Degree"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteEdu(key)}
                      className="p-2 rounded hover:bg-rose-950/40 text-slate-500 hover:text-rose-400"
                      title="Delete Degree"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : certifications.length === 0 ? (
        <div className="p-12 text-center text-slate-500 text-xs rounded-xl bg-[#0b0f19] border border-dashed border-slate-800">
          No certifications in database yet. Click &quot;Add Certification&quot; to publish your credentials.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {certifications.map((cert) => {
            const key = cert._id || cert.id || cert.name;
            return (
              <div
                key={key}
                className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{cert.name}</h4>
                  <p className="text-xs text-cyan-400">{cert.issuer}</p>
                  <p className="text-[11px] text-slate-500">Issued: {cert.issueDate}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteCert(cert._id || cert.id || "")}
                  className="p-1.5 rounded hover:bg-rose-950/40 text-slate-500 hover:text-rose-400"
                  title="Delete Certification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Education Modal */}
      {isEduModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-[#0b0f19] border border-slate-800 rounded-xl shadow-2xl p-6 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <span>{editingEduId ? "Edit Degree" : "Add Degree"}</span>
              </h2>
              <button
                type="button"
                onClick={() => setIsEduModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitEdu} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Period</label>
                  <input
                    type="text"
                    required
                    value={eduForm.period}
                    onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                    placeholder="e.g. 2018 — 2022"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Order Index</label>
                  <input
                    type="number"
                    value={eduForm.order}
                    onChange={(e) => setEduForm({ ...eduForm, order: Number(e.target.value) || 1 })}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Courses (comma-separated)</label>
                <input
                  type="text"
                  value={eduForm.courses}
                  onChange={(e) => setEduForm({ ...eduForm, courses: e.target.value })}
                  placeholder="Data Structures, Distributed Systems, Software Engineering"
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                />
              </div>

              {/* English */}
              <div className="p-3.5 rounded-lg border border-slate-800 bg-[#070a13] space-y-3">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  English Degree Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">Degree Name</label>
                    <input
                      type="text"
                      required
                      value={eduForm.en.degree}
                      onChange={(e) =>
                        setEduForm({ ...eduForm, en: { ...eduForm.en, degree: e.target.value } })
                      }
                      placeholder="B.Sc. in Computer Science & Engineering"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">Institution</label>
                    <input
                      type="text"
                      required
                      value={eduForm.en.institution}
                      onChange={(e) =>
                        setEduForm({ ...eduForm, en: { ...eduForm.en, institution: e.target.value } })
                      }
                      placeholder="University of Engineering & Technology"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={eduForm.en.location}
                    onChange={(e) =>
                      setEduForm({ ...eduForm, en: { ...eduForm.en, location: e.target.value } })
                    }
                    placeholder="Dhaka, Bangladesh"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={eduForm.en.description}
                    onChange={(e) =>
                      setEduForm({ ...eduForm, en: { ...eduForm.en, description: e.target.value } })
                    }
                    placeholder="Major in Software Engineering, Algorithms, and Distributed Computing..."
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              {/* Bangla */}
              <div className="p-3.5 rounded-lg border border-slate-800 bg-[#070a13] space-y-3">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Bangla Details (বাংলা)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">ডিগ্রির নাম</label>
                    <input
                      type="text"
                      value={eduForm.bn.degree}
                      onChange={(e) =>
                        setEduForm({ ...eduForm, bn: { ...eduForm.bn, degree: e.target.value } })
                      }
                      placeholder="বি.এসসি ইন কম্পিউটার সায়েন্স"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">শিক্ষা প্রতিষ্ঠান</label>
                    <input
                      type="text"
                      value={eduForm.bn.institution}
                      onChange={(e) =>
                        setEduForm({ ...eduForm, bn: { ...eduForm.bn, institution: e.target.value } })
                      }
                      placeholder="প্রকৌশল ও প্রযুক্তি বিশ্ববিদ্যালয়"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEduModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                >
                  Save Degree
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0b0f19] border border-slate-800 rounded-xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Add Certification</span>
              </h2>
              <button
                type="button"
                onClick={() => setIsCertModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitCert} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Certification Name</label>
                <input
                  type="text"
                  required
                  value={certForm.name}
                  onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Issuer</label>
                  <input
                    type="text"
                    required
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    placeholder="Amazon Web Services"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Issue Date</label>
                  <input
                    type="text"
                    required
                    value={certForm.issueDate}
                    onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                    placeholder="2024"
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Credential URL (optional)</label>
                <input
                  type="url"
                  value={certForm.credentialUrl}
                  onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-4 py-2 rounded bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                >
                  Save Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
