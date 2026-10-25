"use client";

import * as React from "react";
import {
  X,
  Send,
  Terminal,
  Bot,
  User,
} from "lucide-react";
import { Locale } from "@/types";
import { Dictionary } from "@/data/dictionaries";
import { ASSISTANT_QA_DATA } from "@/data/portfolio-data";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface FloatingAssistantProps {
  locale: Locale;
  dict: Dictionary;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export function FloatingAssistant({ locale, dict }: FloatingAssistantProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const messageCounter = React.useRef(1);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "bot",
      text: dict.assistant.welcomeMessage,
      timestamp: "Just now",
    },
  ]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Handle preset question selection
  const handleAskQuestion = (qaId: string) => {
    const qa = ASSISTANT_QA_DATA.find((item) => item.id === qaId);
    if (!qa) return;

    const questionText = locale === "bn" ? qa.bn.question : qa.en.question;
    const answerText = locale === "bn" ? qa.bn.answer : qa.en.answer;

    const uId = `usr-${messageCounter.current++}`;
    const userMsg: ChatMessage = {
      id: uId,
      sender: "user",
      text: questionText,
      timestamp: "Now",
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const bId = `bot-${messageCounter.current++}`;
      const botMsg: ChatMessage = {
        id: bId,
        sender: "bot",
        text: answerText,
        timestamp: "Now",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  // Handle free-form input submit
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput("");

    const uId = `usr-${messageCounter.current++}`;
    const userMsg: ChatMessage = {
      id: uId,
      sender: "user",
      text: userText,
      timestamp: "Now",
    };

    setMessages((prev) => [...prev, userMsg]);

    // Match query against predefined corpus
    setTimeout(() => {
      const query = userText.toLowerCase();
      const matchedQA = ASSISTANT_QA_DATA.find((item) => {
        const qEn = item.en.question.toLowerCase();
        const aEn = item.en.answer.toLowerCase();
        const qBn = item.bn.question.toLowerCase();
        const aBn = item.bn.answer.toLowerCase();
        return (
          qEn.includes(query) ||
          aEn.includes(query) ||
          qBn.includes(query) ||
          aBn.includes(query)
        );
      });

      // Default fallback response if no direct match
      const fallbackText =
        locale === "bn"
          ? "ধন্যবাদ প্রশ্নের জন্য। মেহেদীর সাথে সরাসরি কথা বলতে নিচের 'যোগাযোগ' ফর্মটি ব্যবহার করুন অথবা contact.mehedi.dev@gmail.com ঠিকানায় ইমেইল করুন।"
          : "Thank you for asking! For detailed discussions or specific opportunities, feel free to use the contact form below or reach Mehedi directly at contact.mehedi.dev@gmail.com.";

      const botReply = matchedQA
        ? locale === "bn"
          ? matchedQA.bn.answer
          : matchedQA.en.answer
        : fallbackText;

      const bId = `bot-${messageCounter.current++}`;
      const botMsg: ChatMessage = {
        id: bId,
        sender: "bot",
        text: botReply,
        timestamp: "Now",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  return (
    <aside aria-label="Interactive Portfolio Assistant" className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button with Avatar and Pulse */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 border-2 border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Open Interactive Portfolio Assistant"
        >
          {/* Status Pulse Ring */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950" />
          </span>

          <div className="flex items-center justify-center text-emerald-400 group-hover:text-emerald-300">
            <Terminal className="h-6 w-6" />
          </div>
        </button>
      )}

      {/* Compact Terminal Chat Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={dict.assistant.headerTitle}
          className="relative w-[340px] sm:w-[380px] h-[520px] rounded-2xl border border-slate-800 bg-[#0b0f19] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-3.5 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-mono text-slate-100 flex items-center gap-1.5">
                  <span>{dict.assistant.headerTitle}</span>
                  <Badge variant="terminal" className="text-[9px] px-1 py-0">
                    {dict.assistant.badge}
                  </Badge>
                </h4>
                <p className="text-[10px] text-emerald-400 font-mono">
                  ● {dict.assistant.statusOnline}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-3.5 space-y-3 overflow-y-auto text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2 max-w-[88%]",
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                <div
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px]",
                    msg.sender === "user"
                      ? "bg-slate-800 text-slate-200"
                      : "bg-emerald-950/60 border border-emerald-500/30 text-emerald-400"
                  )}
                >
                  {msg.sender === "user" ? (
                    <User className="h-3 w-3" />
                  ) : (
                    <Terminal className="h-3 w-3" />
                  )}
                </div>
                <div
                  className={cn(
                    "p-2.5 rounded-lg leading-relaxed shadow-sm",
                    msg.sender === "user"
                      ? "bg-emerald-600/20 text-emerald-200 border border-emerald-500/30 rounded-tr-none"
                      : "bg-slate-900/80 text-slate-200 border border-slate-800 rounded-tl-none"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Predefined Questions */}
          <div className="p-2.5 bg-slate-900/50 border-t border-slate-800/80 space-y-1.5">
            <p className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
              {dict.assistant.quickPromptsLabel}
            </p>
            <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
              {ASSISTANT_QA_DATA.map((qa) => {
                const label = locale === "bn" ? qa.bn.question : qa.en.question;
                return (
                  <button
                    key={qa.id}
                    type="button"
                    onClick={() => handleAskQuestion(qa.id)}
                    className="text-left text-[11px] font-mono px-2 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                  >
                    › {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-1.5"
          >
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={dict.assistant.inputPlaceholder}
              className="h-8 text-xs bg-slate-950 border-slate-800"
            />
            <Button
              type="submit"
              size="sm"
              variant="default"
              className="h-8 px-2.5 text-xs"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      )}
    </aside>
  );
}

