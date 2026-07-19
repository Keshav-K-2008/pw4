import type { Metadata } from "next";
import { AiAssistantContent } from "./ai-content";

export const metadata: Metadata = { title: "AI Assistant" };

export default function AiAssistantPage() {
  return <AiAssistantContent />;
}
