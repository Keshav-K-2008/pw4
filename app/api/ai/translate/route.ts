import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/groq/client";
import { TRANSLATION_PROMPT } from "@/lib/gemini/prompts";

export const runtime = "edge";
export const maxDuration = 30;

const SUPPORTED_LANGUAGES = [
  "Spanish", "Portuguese", "French", "German", "Arabic", "Chinese (Simplified)",
  "Japanese", "Korean", "Italian", "Dutch", "Russian", "Hindi",
  "Turkish", "Polish", "Swedish", "Danish", "Norwegian", "Finnish",
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, targetLanguage } = body as {
      text: string;
      targetLanguage: string;
    };

    if (!text?.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (!SUPPORTED_LANGUAGES.includes(targetLanguage)) {
      return NextResponse.json(
        { error: `Language "${targetLanguage}" not supported` },
        { status: 400 }
      );
    }

    const prompt = TRANSLATION_PROMPT(text, targetLanguage);
    const translation = await generateText(prompt);

    return NextResponse.json({
      original: text,
      translation: translation.trim(),
      language: targetLanguage,
    });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
