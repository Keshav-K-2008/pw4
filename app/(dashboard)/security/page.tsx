import type { Metadata } from "next";
import { SecurityContent } from "./security-content";
export const metadata: Metadata = { title: "Security" };
export default function SecurityPage() { return <SecurityContent />; }
