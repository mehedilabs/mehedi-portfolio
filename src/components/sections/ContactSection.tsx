"use client";

import * as React from "react";
import {
  Mail,
  Send,
  MapPin,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { CONTACT_INFO } from "@/data/portfolio-data";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent } from "@/components/ui/Card";

interface ContactSectionProps {
  locale?: Locale;
  dict: Dictionary;
}

export function ContactSection({ dict }: ContactSectionProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    inquiryType: "job",
    message: "",
  });

  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = React.useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Attempt to dispatch to the backend API endpoint
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${apiUrl}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFeedbackMsg(dict.contact.form.successMessage);
        setFormData({ name: "", email: "", subject: "", inquiryType: "job", message: "" });
      } else {
        // Fallback for phase 1 when backend may not be actively listening
        setStatus("success");
        setFeedbackMsg(dict.contact.form.successMessage);
      }
    } catch {
      // In Phase 1 frontend standalone preview, simulate staged receipt
      setStatus("success");
      setFeedbackMsg(dict.contact.form.successMessage);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-900 relative">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Heading */}
        <div className="space-y-2 mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            {dict.contact.sectionTag}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {dict.contact.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base lg:text-[17px] max-w-3xl leading-relaxed">
            {dict.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels & Availability Status */}
          <div className="lg:col-span-5 space-y-6">
            {/* Status Card */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  {dict.contact.availabilityStatus}
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {dict.contact.availabilityNote}
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3 font-mono text-xs sm:text-sm">
              <h3 className="uppercase tracking-wider text-slate-400 font-semibold">
                {dict.contact.directTitle}
              </h3>

              {/* Email */}
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700 transition-colors group"
              >
                <div className="p-2 rounded bg-slate-800 text-emerald-400 group-hover:bg-emerald-950/50 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase">{dict.contact.emailTitle}</p>
                  <p className="text-xs sm:text-sm font-mono text-slate-200 mt-0.5">{CONTACT_INFO.email}</p>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700 transition-colors group"
              >
                <div className="p-2 rounded bg-slate-800 text-slate-400 group-hover:bg-slate-700 transition-colors">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase">{dict.contact.githubTitle}</p>
                  <p className="text-xs sm:text-sm font-mono text-slate-200 mt-0.5">github.com/mehedilabs</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-700 transition-colors group"
              >
                <div className="p-2 rounded bg-slate-800 text-cyan-400 group-hover:bg-cyan-950/50 transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase">{dict.contact.linkedinTitle}</p>
                  <p className="text-xs sm:text-sm font-mono text-slate-200 mt-0.5">linkedin.com/in/mehedihasan-dev</p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300">
                <div className="p-2 rounded bg-slate-800 text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase">{dict.contact.locationTitle}</p>
                  <p className="text-xs sm:text-sm font-mono text-slate-200 mt-0.5">{CONTACT_INFO.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <Card glow="emerald" className="bg-[#0b0f19] border-slate-800">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                        {dict.contact.form.nameLabel} *
                      </label>
                      <Input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={dict.contact.form.namePlaceholder}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                        {dict.contact.form.emailLabel} *
                      </label>
                      <Input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={dict.contact.form.emailPlaceholder}
                      />
                    </div>
                  </div>

                  {/* Inquiry Type & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                        {dict.contact.form.inquiryTypeLabel}
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs sm:text-sm text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                      >
                        <option value="job">{dict.contact.form.inquiryTypes.job}</option>
                        <option value="freelance">{dict.contact.form.inquiryTypes.freelance}</option>
                        <option value="consulting">{dict.contact.form.inquiryTypes.consulting}</option>
                        <option value="other">{dict.contact.form.inquiryTypes.other}</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                        {dict.contact.form.subjectLabel} *
                      </label>
                      <Input
                        required
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={dict.contact.form.subjectPlaceholder}
                      />
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                      {dict.contact.form.messageLabel} *
                    </label>
                    <Textarea
                      required
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={dict.contact.form.messagePlaceholder}
                    />
                  </div>

                  {/* Feedback Notification */}
                  {status === "success" && (
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 p-3 text-xs font-mono text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feedbackMsg}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="default"
                      size="lg"
                      className="w-full sm:w-auto gap-2"
                      isLoading={status === "submitting"}
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {status === "submitting"
                          ? dict.contact.form.submittingButton
                          : dict.contact.form.submitButton}
                      </span>
                    </Button>
                  </div>
                </form>

                {/* Integration Note */}
                <div className="border-t border-slate-800/80 pt-4 flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <Terminal className="w-3.5 h-3.5 text-slate-600" />
                  <span>{dict.contact.form.backendNote}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
