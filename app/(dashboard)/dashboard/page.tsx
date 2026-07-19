import type { Metadata } from "next";
import { motion } from "framer-motion";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { CrowdChart, EntryExitChart, TransportChart } from "@/components/dashboard/crowd-chart";
import { IncidentFeed } from "@/components/dashboard/incident-feed";
import { DashboardContent } from "./dashboard-content";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DEMO_STATS = {
  total_attendance: 72450,
  crowd_density: 87,
  avg_wait_time: 12,
  active_incidents: 3,
  medical_cases: 7,
  volunteers_active: 342,
  food_queue_avg: 8,
  parking_occupied: 91,
  transport_on_time: 82,
  emergency_alerts: 3,
};

export default function DashboardPage() {
  return <DashboardContent stats={DEMO_STATS} />;
}
