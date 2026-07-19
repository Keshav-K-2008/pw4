"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RefreshCw,
  Sparkles,
  Globe,
  MapPin,
  Clock,
} from "lucide-react";
import { useAiChat } from "@/lib/hooks/use-ai-chat";
import { Button } from "@/components/ui/button";
import { formatTimeAgo } from "@/lib/utils/format";

const QUICK_PROMPTS = [
  { emoji: "🚪", text: "Where is Gate B?" },
  { emoji: "🚻", text: "Nearest washroom to Section C12?" },
  { emoji: "🏥", text: "Where is the medical center?" },
  { emoji: "🍔", text: "Nearest food court with short queue?" },
  { emoji: "♿", text: "Wheelchair accessible route to my seat?" },
  { emoji: "🅿️", text: "Best parking area still available?" },
  { emoji: "🚇", text: "How do I get to the metro station?" },
  { emoji: "📢", text: "Translate this announcement to Spanish" },
];

const LANGUAGES = [
  "English", "Spanish", "Portuguese", "French", "German",
  "Arabic", "Chinese", "Japanese", "Korean", "Hindi",
];

export function AiAssistantContent() {
  const { messages, sendMessage, isLoading, clearMessages } = useAiChat();
  const [input, setInput] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput("");
    await sendMessage(msg);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickPrompt = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  const toggleVoice = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    if (isVoiceActive && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsVoiceActive(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.lang = selectedLanguage === "Spanish" ? "es-ES" :
                       selectedLanguage === "French" ? "fr-FR" :
                       selectedLanguage === "German" ? "de-DE" : "en-US";
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsVoiceActive(false);
    };
    recognition.onerror = () => setIsVoiceActive(false);
    recognition.onend = () => setIsVoiceActive(false);
    recognition.start();
    setIsVoiceActive(true);
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex gap-4">
      {/* Main chat */}
      <div className="flex-1 flex flex-col glass-card overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
            </div>
            <div>
              <div className="text-white font-semibold">StadiumMind AI</div>
              <div className="text-green-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Online — Gemini 2.5 Flash
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="h-8 px-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs focus:outline-none"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang} className="bg-slate-900">
                  {lang}
                </option>
              ))}
            </select>

            <Button variant="ghost" size="icon" onClick={clearMessages} title="Clear chat">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0 border border-white/10">
                    <span className="text-white text-xs font-semibold">U</span>
                  </div>
                )}

                {/* Bubble */}
                <div className={`max-w-[75%] ${message.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div
                    className={
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-3 text-sm"
                        : "bg-white/5 border border-white/10 text-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 text-sm"
                    }
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>

                    {/* Metadata */}
                    {message.metadata && (
                      <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap gap-2">
                        {message.metadata.eta && (
                          <span className="flex items-center gap-1 text-xs text-blue-300">
                            <Clock className="w-3 h-3" />
                            {message.metadata.eta}
                          </span>
                        )}
                        {message.metadata.location && (
                          <span className="flex items-center gap-1 text-xs text-green-300">
                            <MapPin className="w-3 h-3" />
                            {message.metadata.location}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-[11px]">
                      {formatTimeAgo(message.timestamp)}
                    </span>
                    {message.role === "assistant" && (
                      <button
                        onClick={() => speakText(message.content)}
                        className="text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 focus-within:border-blue-500/40 transition-colors">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about the stadium..."
              className="flex-1 bg-transparent text-white placeholder:text-slate-500 text-sm focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={toggleVoice}
              className={`text-slate-400 hover:text-white transition-colors ${isVoiceActive ? "text-red-400 animate-pulse" : ""}`}
            >
              {isVoiceActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {isVoiceActive && (
            <p className="text-red-400 text-xs text-center mt-2 animate-pulse">
              🎤 Listening... Speak now
            </p>
          )}
        </div>
      </div>

      {/* Sidebar — quick prompts & translation */}
      <div className="w-72 space-y-4 hidden xl:flex flex-col">
        {/* Quick prompts */}
        <div className="glass-card p-4 flex-1">
          <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Quick Questions
          </h3>
          <div className="space-y-1.5">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt.text}
                onClick={() => handleQuickPrompt(prompt.text)}
                className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
              >
                <span className="text-lg">{prompt.emoji}</span>
                <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                  {prompt.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Translation tool */}
        <div className="glass-card p-4">
          <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-green-400" />
            Quick Translate
          </h3>
          <p className="text-slate-400 text-xs mb-3">
            Ask me to translate any announcement or sign
          </p>
          <Button
            variant="glass"
            size="sm"
            className="w-full"
            onClick={() => handleQuickPrompt(`Translate "Please proceed to the nearest exit in an orderly fashion" to ${selectedLanguage}`)}
          >
            Translate Example
          </Button>
        </div>

        {/* AI capabilities */}
        <div className="glass-card p-4">
          <h3 className="text-white font-semibold text-sm mb-3">AI Capabilities</h3>
          <div className="space-y-2">
            {[
              "📍 Turn-by-turn navigation",
              "♿ Wheelchair-accessible routes",
              "🌍 40+ languages",
              "🚨 Emergency guidance",
              "🗺️ Interactive map links",
              "⏱️ Wait time estimates",
            ].map((cap) => (
              <div key={cap} className="text-xs text-slate-400">{cap}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
