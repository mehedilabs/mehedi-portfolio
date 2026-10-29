"use client";

import * as React from "react";
import {
  MessageSquare,
  Search,
  Mail,
  Loader2,
  Trash2,
  Archive,
  Clock,
} from "lucide-react";
import { adminApi } from "@/lib/api-client";
interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType?: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: string;
}

interface MessageQuery {
  isRead?: boolean;
  isArchived?: boolean;
  search?: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = React.useState<ContactMessage[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [filter, setFilter] = React.useState<"all" | "unread" | "archived">(
    "all",
  );
  const [selectedMessage, setSelectedMessage] =
    React.useState<ContactMessage | null>(null);

  const loadMessages = React.useCallback(async () => {
    setLoading(true);
    try {
      const params: MessageQuery = {};
      if (filter === "unread") params.isRead = false;
      if (filter === "archived") params.isArchived = true;
      if (search) params.search = search;

      const res = await adminApi.getMessages<ContactMessage>(params);
      if (res.success) {
        setMessages(res.data || []);
      }
    } catch {
      // Handled
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  React.useEffect(() => {
    let active = true;

    const fetchMessages = async () => {
      try {
        const params: MessageQuery = {};

        if (filter === "unread") params.isRead = false;
        if (filter === "archived") params.isArchived = true;
        if (search) params.search = search;

        const res = await adminApi.getMessages<ContactMessage>(params);

        if (active && res.success) {
          setMessages(res.data || []);
        }
      } catch {
        // Keep the current messages if the request fails.
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void fetchMessages();

    return () => {
      active = false;
    };
  }, [filter, search]);

  const handleToggleRead = async (id: string) => {
    try {
      await adminApi.toggleMessageRead(id);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, isRead: !m.isRead } : m)),
      );
    } catch {}
  };

  const handleToggleArchive = async (id: string) => {
    try {
      await adminApi.toggleMessageArchived(id);
      loadMessages();
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Permanently delete this inquiry?")) return;
    try {
      await adminApi.deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selectedMessage?._id === id) setSelectedMessage(null);
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold font-mono text-white">
              Contact &amp; Freelance Inquiries Inbox
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Protected owner inbox. View client inquiries, toggle read status,
            and manage incoming opportunities.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-[#0b0f19] border border-slate-800 text-xs font-mono">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              filter === "all"
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            All Inquiries
          </button>
          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              filter === "unread"
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Unread Only
          </button>
          <button
            type="button"
            onClick={() => setFilter("archived")}
            className={`px-3 py-1.5 rounded-lg border transition-colors ${
              filter === "archived"
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 font-bold"
                : "border-transparent text-slate-400 hover:text-white"
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 text-slate-400 font-mono text-xs gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <span>Loading messages...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-[#0b0f19] border border-slate-800 font-mono text-xs text-slate-500">
          Inbox is clear. No inquiry messages found.
        </div>
      ) : (
        <div className="rounded-xl bg-[#0b0f19] border border-slate-800 divide-y divide-slate-800/80 shadow-xl overflow-hidden font-mono text-xs">
          {messages.map((msg) => (
            <div
              key={msg._id}
              onClick={() => setSelectedMessage(msg)}
              className={`p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/60 transition-colors ${
                !msg.isRead ? "bg-emerald-500/5 font-semibold" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    !msg.isRead ? "bg-emerald-400" : "bg-transparent"
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{msg.name}</span>
                    <span className="text-slate-500 text-[11px]">
                      &lt;{msg.email}&gt;
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] uppercase font-bold bg-slate-800 text-slate-400">
                      {msg.inquiryType || "job"}
                    </span>
                  </div>
                  <div className="text-slate-300 mt-0.5 line-clamp-1">
                    {msg.subject}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-slate-500 text-[11px]">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>

                <div
                  className="flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => handleToggleRead(msg._id)}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title={msg.isRead ? "Mark Unread" : "Mark Read"}
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleArchive(msg._id)}
                    className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Toggle Archive"
                  >
                    <Archive className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(msg._id)}
                    className="p-1.5 rounded hover:bg-rose-950/40 text-slate-400 hover:text-rose-400"
                    title="Delete Message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#0b0f19] border border-slate-800 rounded-xl shadow-2xl p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs text-emerald-400 uppercase font-bold tracking-wider">
                Inquiry Details
              </span>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="text-slate-400 hover:text-white text-base"
              >
                &times;
              </button>
            </div>

            <div className="space-y-2 text-slate-300">
              <div>
                <span className="text-slate-500">From: </span>
                <strong className="text-white">
                  {selectedMessage.name}
                </strong>{" "}
                &lt;{selectedMessage.email}&gt;
              </div>
              <div>
                <span className="text-slate-500">Subject: </span>
                <strong className="text-white">
                  {selectedMessage.subject}
                </strong>
              </div>
              <div>
                <span className="text-slate-500">Type: </span>
                <span className="uppercase text-emerald-400">
                  {selectedMessage.inquiryType}
                </span>
              </div>
              <div>
                <span className="text-slate-500">Date: </span>
                <span>
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 whitespace-pre-wrap leading-relaxed font-sans text-sm">
              {selectedMessage.message}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Reply via Email</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
