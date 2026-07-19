import type { Metadata } from "next";
import { MedicalContent } from "./medical-content";
export const metadata: Metadata = { title: "Medical Panel" };
export default function MedicalPage() { return <MedicalContent />; }
