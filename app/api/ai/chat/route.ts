import { NextRequest, NextResponse } from "next/server";
import { generateChat } from "@/lib/groq/client";
import { SYSTEM_PROMPT } from "@/lib/gemini/prompts";

export const runtime = "edge";
export const maxDuration = 30;

interface ChatHistoryItem {
  role: "user" | "model";
  parts: Array<{ text: string }>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body as {
      message: string;
      history: ChatHistoryItem[];
    };

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const groqMessages = [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...(history ?? []).map((h) => ({
        role: h.role === "model" ? ("assistant" as const) : ("user" as const),
        content: h.parts[0]?.text || "",
      })),
      {
        role: "user",
        content: message,
      },
    ];

    const response = await generateChat(groqMessages);

    // Extract metadata from response if present
    const metadata: Record<string, string> = {};
    const etaMatch = response.match(/(\d+)\s*minutes?\s*walk/i);
    if (etaMatch) {
      metadata.eta = `${etaMatch[1]} min walk`;
    }

    return NextResponse.json({
      response,
      metadata,
    });
  } catch (error) {
    console.error("AI chat error:", error);

    // Fallback response
    return NextResponse.json({
      response: "I apologize, I'm experiencing technical difficulties right now. Please try again in a moment, or contact stadium staff for immediate assistance.",
      metadata: {},
    });
  }
}
