import type { Metadata } from "next";
import { TransportContent } from "./transport-content";
export const metadata: Metadata = { title: "Transport" };
export default function TransportPage() { return <TransportContent />; }
