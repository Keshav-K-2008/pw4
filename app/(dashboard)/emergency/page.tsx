import type { Metadata } from "next";
import { EmergencyContent } from "./emergency-content";

export const metadata: Metadata = { title: "Emergency Center" };

export default function EmergencyPage() {
  return <EmergencyContent />;
}
