import type { Metadata } from "next";

export const metadata: Metadata = { title: "Volunteer Panel" };

export default function VolunteersPage() {
  return <VolunteersContent />;
}

import { VolunteersContent } from "./volunteers-content";
