"use client";

import { motion } from "framer-motion";
import { Heart, Ambulance, Clock, MapPin, Activity, User, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ACTIVE_CASES = [
  { id: "MC001", patient: "Unknown Male, ~40", condition: "Cardiac event", location: "Section C12", eta: 2, status: "responding", severity: "critical" },
  { id: "MC002", patient: "Child, ~6", condition: "Heat exhaustion", location: "Gate 5 Plaza", eta: 5, status: "en_route", severity: "high" },
  { id: "MC003", patient: "Female, ~65", condition: "Ankle injury", location: "South Concourse L1", eta: 8, status: "on_site", severity: "medium" },
];

const HOSPITALS = [
  { name: "Hackensack University Medical Center", distance: "3.2 km", available_beds: 12, trauma_center: true },
  { name: "Holy Name Medical Center", distance: "5.1 km", available_beds: 8, trauma_center: false },
  { name: "Meadowlands Hospital", distance: "6.8 km", available_beds: 22, trauma_center: false },
];

export function MedicalContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-400" />
          Medical Operations
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">Emergency medical coordination</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Cases", value: 7, color: "text-red-400" },
          { label: "Ambulances", value: "3 / 6", color: "text-orange-400" },
          { label: "Medics Deployed", value: 28, color: "text-green-400" },
          { label: "Cases Resolved", value: 23, color: "text-blue-400" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <div className="text-slate-400 text-xs">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Active cases */}
      <div className="glass-card p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-red-400" />
          Active Medical Cases
        </h3>
        <div className="space-y-4">
          {ACTIVE_CASES.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${c.severity === "critical" ? "bg-red-500/10 border-red-500/20" : c.severity === "high" ? "bg-orange-500/10 border-orange-500/20" : "bg-yellow-500/10 border-yellow-500/20"}`}>
                  <Heart className={`w-4 h-4 ${c.severity === "critical" ? "text-red-400 animate-pulse" : c.severity === "high" ? "text-orange-400" : "text-yellow-400"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-white font-medium">{c.condition}</span>
                    <Badge variant={c.severity === "critical" ? "critical" : c.severity === "high" ? "warning" : "info"}>
                      {c.severity}
                    </Badge>
                  </div>
                  <div className="text-slate-400 text-sm mt-1 flex items-center gap-1.5">
                    <User className="w-3 h-3" />{c.patient}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</span>
                    <span className="flex items-center gap-1 text-blue-400"><Clock className="w-3 h-3" />ETA: {c.eta} min</span>
                    <span className="capitalize text-green-400">{c.status.replace("_", " ")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Nearby hospitals */}
      <div className="glass-card p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Ambulance className="w-4 h-4 text-blue-400" />
          Nearby Hospitals
        </h3>
        <div className="space-y-3">
          {HOSPITALS.map((h) => (
            <div key={h.name} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{h.name}</div>
                <div className="text-slate-400 text-xs mt-0.5">{h.distance} away · {h.available_beds} beds available</div>
              </div>
              {h.trauma_center && <Badge variant="critical">TRAUMA</Badge>}
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
