"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, ChevronRight, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatTimeAgo } from "@/lib/utils/format";
import { Incident } from "@/types";

const DEMO_INCIDENTS: Incident[] = [
  {
    id: "inc-001",
    stadium_id: "stad-001",
    match_id: null,
    type: "medical_emergency",
    severity: "high",
    status: "in_progress",
    title: "Fan collapsed near Section C12",
    description: "Fan unresponsive near Row 15, medical team dispatched",
    location_name: "Section C12, Row 15",
    location_lat: 40.8135,
    location_lng: -74.0745,
    reported_by: "Security Staff",
    assigned_team: "Medical Team Alpha",
    response_team_ids: [],
    ai_summary: "Medical emergency: fan collapsed. Medical Team Alpha responding. ETA 3 minutes.",
    ai_priority_score: 8,
    estimated_eta: 3,
    resolved_at: null,
    created_at: new Date(Date.now() - 8 * 60000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "inc-002",
    stadium_id: "stad-001",
    match_id: null,
    type: "lost_child",
    severity: "high",
    status: "in_progress",
    title: "Lost child at Gate 3",
    description: "8-year-old child separated from parents at Gate 3 entry",
    location_name: "Gate 3 — North Entry",
    location_lat: 40.815,
    location_lng: -74.073,
    reported_by: "Gate Staff",
    assigned_team: "Security Team B",
    response_team_ids: [],
    ai_summary: "Child separation incident. Security Team B notified. Reunification protocol active.",
    ai_priority_score: 7,
    estimated_eta: 5,
    resolved_at: null,
    created_at: new Date(Date.now() - 23 * 60000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "inc-003",
    stadium_id: "stad-001",
    match_id: null,
    type: "suspicious_activity",
    severity: "medium",
    status: "open",
    title: "Suspicious package near East Concourse",
    description: "Unattended bag reported near East Concourse food stands",
    location_name: "East Concourse — Level 2",
    location_lat: 40.814,
    location_lng: -74.076,
    reported_by: "Volunteer Martinez",
    assigned_team: "Security Team A",
    response_team_ids: [],
    ai_summary: "Unattended item report. Security protocol initiated. Area being assessed.",
    ai_priority_score: 6,
    estimated_eta: 8,
    resolved_at: null,
    created_at: new Date(Date.now() - 45 * 60000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "inc-004",
    stadium_id: "stad-001",
    match_id: null,
    type: "crowd_stampede",
    severity: "low",
    status: "resolved",
    title: "Minor crowd surge at Gate 7",
    description: "Temporary crowd surge managed by volunteer staff",
    location_name: "Gate 7 — West Entry",
    location_lat: 40.812,
    location_lng: -74.077,
    reported_by: "Volunteer Chen",
    assigned_team: "Volunteer Team C",
    response_team_ids: [],
    ai_summary: "Minor surge resolved by volunteer redirection. No injuries. Gate flow normalized.",
    ai_priority_score: 3,
    estimated_eta: 0,
    resolved_at: new Date(Date.now() - 15 * 60000).toISOString(),
    created_at: new Date(Date.now() - 90 * 60000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const typeIcons: Record<string, string> = {
  medical_emergency: "🏥",
  lost_child: "👶",
  fire: "🔥",
  suspicious_activity: "👁️",
  crowd_stampede: "🌊",
  security_threat: "🚨",
  infrastructure: "🏗️",
  other: "⚠️",
};

interface IncidentFeedProps {
  incidents?: Incident[];
  className?: string;
}

export function IncidentFeed({ incidents = DEMO_INCIDENTS, className }: IncidentFeedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`glass-card ${className ?? ""}`}
    >
      <div className="flex items-center justify-between p-6 pb-0">
        <div>
          <h3 className="text-white font-semibold flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-400" />
            Incident Feed
          </h3>
          <p className="text-slate-400 text-sm mt-0.5">Live emergency updates</p>
        </div>
        <Badge variant={incidents.filter((i) => i.status !== "resolved").length > 0 ? "critical" : "success"}>
          {incidents.filter((i) => i.status !== "resolved").length} Active
        </Badge>
      </div>

      <div className="p-6 space-y-3">
        {incidents.slice(0, 5).map((incident, i) => (
          <motion.div
            key={incident.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all cursor-pointer group"
          >
            <div className="text-xl flex-shrink-0 mt-0.5">{typeIcons[incident.type] ?? "⚠️"}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm text-white font-medium truncate">{incident.title}</span>
                <Badge
                  variant={
                    incident.severity === "critical" ? "critical" :
                    incident.severity === "high" ? "critical" :
                    incident.severity === "medium" ? "warning" : "success"
                  }
                  className="flex-shrink-0"
                >
                  {incident.severity}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {incident.location_name}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(incident.created_at)}
                </span>
              </div>
              {incident.ai_summary && (
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{incident.ai_summary}</p>
              )}
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5 group-hover:text-slate-300 transition-colors" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export { DEMO_INCIDENTS };
