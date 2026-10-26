"use client";

import * as React from "react";
import {
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { adminApi, ApiError } from "@/lib/api-client";
interface Skill {
  _id: string;
  name: string;
  category: string;
  level: number;
  order: number;
}

interface Experience {
  _id: string;
  period: string;
  en?: {
    role?: string;
    company?: string;
    description?: string;
  };
}

interface Education {
  _id: string;
  period: string;
  en?: {
    degree?: string;
    institution?: string;
  };
}

interface Certification {
  _id: string;
  name: string;
  issuer: string;
  issueDate: string;
}

type Tab = "skills" | "experience" | "education" | "certifications";

export default function AdminSkillsCareerPage() {
  const [activeTab, setActiveTab] = React.useState<Tab>("skills");
  const [skills, setSkills] = React.useState<Skill[]>([]);
  const [experiences, setExperiences] = React.useState<Experience[]>([]);
  const [educations, setEducations] = React.useState<Education[]>([]);
  const [certifications, setCertifications] = React.useState<Certification[]>(
    [],
  );

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  // Form modals state
  const [isSkillModalOpen, setIsSkillModalOpen] = React.useState(false);
  const [skillForm, setSkillForm] = React.useState({
    name: "",
    category: "backend",
    level: 90,
    iconName: "server",
    highlight: true,
    order: 1,
  });

  const loadData = React.useCallback(async () => {
    setLoading(true);
    try {
      const [skillsRes, expRes, eduRes, certRes] = await Promise.all([
        adminApi.getSkills(),
        adminApi.getExperience(),
        adminApi.getEducation(),
        adminApi.getCertifications(),
      ]);

      if (skillsRes.success) setSkills(skillsRes.data || []);
      if (expRes.success) setExperiences(expRes.data || []);
      if (eduRes.success) setEducations(eduRes.data || []);
      if (certRes.success) setCertifications(certRes.data || []);
    } catch {
      setError("Failed to load skills and career data.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [skillsRes, expRes, eduRes, certRes] = await Promise.all([
          adminApi.getSkills(),
          adminApi.getExperience(),
          adminApi.getEducation(),
          adminApi.getCertifications(),
        ]);

        if (!isMounted) return;

        if (skillsRes.success) setSkills(skillsRes.data || []);
        if (expRes.success) setExperiences(expRes.data || []);
        if (eduRes.success) setEducations(eduRes.data || []);
        if (certRes.success) setCertifications(certRes.data || []);
      } catch {
        if (isMounted) {
          setError("Failed to load skills and career data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Skill Handlers
  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await adminApi.createSkill(skillForm);
      if (res.success) {
        setSuccess(`Skill "${skillForm.name}" created successfully.`);
        setIsSkillModalOpen(false);
        setSkillForm({
          name: "",
          category: "backend",
          level: 90,
          iconName: "server",
          highlight: true,
          order: 1,
        });
        loadData();
      }
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
    }
  };

  const handleDeleteSkill = async (id: string, name: string) => {
    if (!window.confirm(`Delete skill "${name}"?`)) return;
    try {
      const res = await adminApi.deleteSkill(id);
      if (res.success) {
        setSuccess(`Skill "${name}" deleted.`);
        loadData();
      }
    } catch {
      setError("Failed to delete skill.");
    }
  };

  // Delete Experience
  const handleDeleteExperience = async (id: string) => {
    if (!window.confirm("Delete experience record?")) return;
    try {
      await adminApi.deleteExperience(id);
      loadData();
    } catch {
      setError("Failed to delete experience.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold font-mono text-white">
              Skills &amp; Career Management
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Manage competencies, career experience timeline, education, and
            credentials with real database persistence.
          </p>
        </div>

        {activeTab === "skills" && (
          <button
            type="button"
            onClick={() => setIsSkillModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        )}
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-xs font-mono">
        <button
          type="button"
          onClick={() => setActiveTab("skills")}
          className={`px-4 py-2.5 border-b-2 font-bold flex items-center gap-2 transition-colors ${
            activeTab === "skills"
              ? "border-emerald-400 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Skills ({skills.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("experience")}
          className={`px-4 py-2.5 border-b-2 font-bold flex items-center gap-2 transition-colors ${
            activeTab === "experience"
              ? "border-emerald-400 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Experience ({experiences.length})</span>
        </button>

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
          <span>Education ({educations.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("certifications")}
          className={`px-4 py-2.5 border-b-2 font-bold flex items-center gap-2 transition-colors ${
            activeTab === "certifications"
              ? "border-emerald-400 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certifications ({certifications.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 text-slate-400 font-mono text-xs gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <span>Loading data...</span>
        </div>
      ) : activeTab === "skills" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.length === 0 ? (
            <div className="col-span-full p-8 text-center text-slate-500 font-mono text-xs">
              No skills added to database yet. Click &quot;Add Skill&quot; to
              create one.
            </div>
          ) : (
            skills.map((skill) => (
              <div
                key={skill._id}
                className="p-3.5 rounded-xl bg-[#0b0f19] border border-slate-800 flex items-center justify-between shadow-xl"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold block">
                    {skill.category}
                  </span>
                  <span className="text-sm font-bold font-mono text-white block mt-0.5">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Order: #{skill.order} &bull; Level: {skill.level}%
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteSkill(skill._id, skill.name)}
                  className="p-1.5 rounded hover:bg-rose-950/40 text-slate-500 hover:text-rose-400 transition-colors"
                  title="Delete Skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      ) : activeTab === "experience" ? (
        <div className="space-y-4">
          {experiences.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs rounded-xl bg-[#0b0f19] border border-slate-800">
              No experience records in database. Existing public timeline serves
              fallback data safely.
            </div>
          ) : (
            experiences.map((exp) => (
              <div
                key={exp._id}
                className="p-5 rounded-xl bg-[#0b0f19] border border-slate-800 shadow-xl flex items-start justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">
                    {exp.period}
                  </span>
                  <h3 className="text-sm font-bold font-mono text-white mt-0.5">
                    {exp.en?.role} &mdash;{" "}
                    <span className="text-slate-400">{exp.en?.company}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                    {exp.en?.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteExperience(exp._id)}
                  className="p-1.5 rounded hover:bg-rose-950/40 text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      ) : activeTab === "education" ? (
        <div className="space-y-4">
          {educations.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs rounded-xl bg-[#0b0f19] border border-slate-800">
              No education records in database.
            </div>
          ) : (
            educations.map((edu) => (
              <div
                key={edu._id}
                className="p-5 rounded-xl bg-[#0b0f19] border border-slate-800 shadow-xl flex items-start justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-emerald-400">
                    {edu.period}
                  </span>
                  <h3 className="text-sm font-bold font-mono text-white mt-0.5">
                    {edu.en?.degree}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {edu.en?.institution}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-mono text-xs rounded-xl bg-[#0b0f19] border border-slate-800">
              No certifications in database.
            </div>
          ) : (
            certifications.map((cert) => (
              <div
                key={cert._id}
                className="p-4 rounded-xl bg-[#0b0f19] border border-slate-800 flex items-center justify-between"
              >
                <div>
                  <span className="text-sm font-bold font-mono text-white">
                    {cert.name}
                  </span>
                  <span className="text-xs text-slate-400 block">
                    {cert.issuer} &bull; {cert.issueDate}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add Skill Modal */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0b0f19] border border-slate-800 rounded-xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold font-mono text-white">
                Add New Skill
              </h2>
              <button
                type="button"
                onClick={() => setIsSkillModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={handleCreateSkill}
              className="space-y-3.5 text-xs font-mono"
            >
              <div>
                <label className="block text-slate-300 mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={skillForm.name}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, name: e.target.value })
                  }
                  placeholder="e.g. Next.js 16"
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Category</label>
                <select
                  value={skillForm.category}
                  onChange={(e) =>
                    setSkillForm({ ...skillForm, category: e.target.value })
                  }
                  className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="database">Database</option>
                  <option value="cloud">Cloud &amp; DevOps</option>
                  <option value="tools">Tools &amp; Platforms</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">
                    Proficiency Level (0-100)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={100}
                    value={skillForm.level}
                    onChange={(e) =>
                      setSkillForm({
                        ...skillForm,
                        level: parseInt(e.target.value) || 80,
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Order</label>
                  <input
                    type="number"
                    value={skillForm.order}
                    onChange={(e) =>
                      setSkillForm({
                        ...skillForm,
                        order: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                >
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
