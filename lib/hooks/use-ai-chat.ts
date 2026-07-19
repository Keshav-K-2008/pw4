"use client";

import { useState, useCallback } from "react";
import { ChatMessage } from "@/types";
import { generateId } from "@/lib/utils/format";

export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: generateId(),
      role: "assistant",
      content:
        "Hello! I'm StadiumMind AI, your intelligent assistant for FIFA World Cup 2026. I can help you navigate the stadium, find facilities, get crowd updates, translate announcements, and much more. How can I assist you today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          history: messages.slice(-10).map((m) => ({
            role: m.role,
            parts: [{ text: m.content }],
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content: data.response,
        timestamp: new Date().toISOString(),
        metadata: data.metadata,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get response");
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: "assistant",
        content:
          "I'm sorry, I'm having trouble connecting right now. Please try again or contact stadium staff for assistance.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: generateId(),
        role: "assistant",
        content:
          "Hello! I'm StadiumMind AI. How can I help you today?",
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  return { messages, sendMessage, isLoading, error, clearMessages };
}
