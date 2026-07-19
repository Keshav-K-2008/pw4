import type { Metadata } from "next";
import { CrowdContent } from "./crowd-content";

export const metadata: Metadata = { title: "Crowd Analysis" };

export default function CrowdAnalysisPage() {
  return <CrowdContent />;
}
