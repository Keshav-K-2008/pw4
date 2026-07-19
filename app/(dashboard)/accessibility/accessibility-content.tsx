"use client";

import { motion } from "framer-motion";
import { Accessibility, Eye, Ear, Volume2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ACCESSIBLE_ROUTES = [
  { from: "North Parking P1", to: "Section A (Lower)", via: "Elevator E2 → Concourse A", eta: "8 min", status: "clear" },
  { from: "Gate 3 (East)", to: "Accessible Seating Block 1", via: "Ramp R4 → Level 1 Accessible", eta: "5 min", status: "clear" },
  { from: "South Gate", to: "Medical Center South", via: "Priority Lane SP1", eta: "3 min", status: "clear" },
  { from: "Parking Lot C", to: "West Stand Accessible", via: "Shuttle Drop → Ramp R7", eta: "12 min", status: "limited" },
];

const SERVICES = [
  { name: "Wheelchair Rental", count: 24, available: 18, icon: Accessibility },
  { name: "Sign Language Interpreters", count: 8, available: 6, icon: Ear },
  { name: "Audio Description Headsets", count: 150, available: 112, icon: Volume2 },
  { name: "Visual Impairment Guides", count: 12, available: 9, icon: Eye },
];

const NEEDS_REQUESTS = [
  { id: 1, type: "Wheelchair Assistance", location: "Gate 5", name: "Fan #A441", status: "assigned", eta: 4 },
  { id: 2, type: "Audio Guide", location: "Info Desk South", name: "Fan #B892", status: "completed", eta: 0 },
  { id: 3, type: "Sign Language", location: "Section D Upper", name: "Fan #C123", status: "pending", eta: 12 },
];

export function AccessibilityContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Accessibility className="w-6 h-6 text-blue-400" />
          Accessibility Services
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">Inclusive experience management for all fans</p>
      </div>

      {/* Services */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SERVICES.map((s, i) => (
          <motion.div key={s.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <s.icon className="w-5 h-5 text-blue-400 mb-2" />
            <div className="text-white font-bold text-lg">{s.available}<span className="text-slate-400 text-sm font-normal"> / {s.count}</span></div>
            <div className="text-slate-400 text-xs mt-1">{s.name}</div>
            <div className="mt-2 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(s.available / s.count) * 100}%` }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Accessible routes */}
      <div className="glass-card p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-400" />
          AI-Generated Accessible Routes
        </h3>
        <div className="space-y-3">
          {ACCESSIBLE_ROUTES.map((route, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Accessibility className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{route.from} → {route.to}</div>
                <div className="text-slate-400 text-xs mt-0.5">{route.via}</div>
                <div className="text-blue-400 text-xs mt-1">{route.eta} walk</div>
              </div>
              <Badge variant={route.status === "clear" ? "success" : "warning"}>{route.status}</Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active requests */}
      <div className="glass-card p-6">
        <h3 className="text-white font-semibold mb-4">Assistance Requests</h3>
        <div className="space-y-3">
          {NEEDS_REQUESTS.map((req) => (
            <div key={req.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Accessibility className="w-4 h-4 text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{req.type}</div>
                <div className="text-slate-400 text-xs">{req.name} · {req.location}</div>
              </div>
              {req.eta > 0 && <span className="text-blue-400 text-xs">{req.eta} min</span>}
              <Badge variant={req.status === "completed" ? "success" : req.status === "assigned" ? "info" : "warning"}>
                {req.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
