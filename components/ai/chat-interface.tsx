"use client";

import { useRef, useEffect, useState } from "react";
import { Bot, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, Clock, MapPin } from "lucide-react";
import { useAiChat } from "@/lib/hooks/use-ai-chat";
import { Button } from "@/components/ui/button";
import { formatTimeAgo } from "@/lib/utils/format";

interface ChatInterfaceProps {
  selectedLanguage: string;
}

export function ChatInterface({ selectedLanguage }: ChatInterfaceProps) {
  const { messages, sendMessage, isLoading } = useAiChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput("");
    await sendMessage(msg);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900/40 rounded-2xl border border-white/5 overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
              message.role === "assistant"
                ? "bg-gradient-to-br from-blue-500 to-purple-600"
                : "bg-slate-600 border border-white/10"
            }`}>
              {message.role === "assistant" ? <Sparkles className="w-4 h-4 text-white" /> : <span className="text-white text-xs font-semibold">U</span>}
            </div>

            <div className={`max-w-[75%] ${message.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
              <div className={`p-3 text-sm rounded-2xl ${
                message.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white/5 border border-white/10 text-slate-200 rounded-bl-sm"
              }`}>
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
              </div>
              <span className="text-[10px] text-slate-500">{formatTimeAgo(message.timestamp)}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/5 bg-slate-950/20">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 focus-within:border-blue-500/40 transition-all">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={`Ask in ${selectedLanguage}...`}
            className="flex-1 bg-transparent text-white placeholder:text-slate-500 text-sm focus:outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-7 h-7 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 flex items-center justify-center transition-all"
          >
            <Send className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
