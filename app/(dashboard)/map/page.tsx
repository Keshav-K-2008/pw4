import type { Metadata } from "next";
import { MapContent } from "./map-content";

export const metadata: Metadata = { title: "Live Stadium Map" };

export default function MapPage() {
  return <MapContent />;
}
