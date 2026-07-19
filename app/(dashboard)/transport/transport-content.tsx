"use client";

import { motion } from "framer-motion";
import { Bus, Train, Car, Footprints, Clock, Users, TrendingDown, TrendingUp, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const TRANSPORT_DATA = [
  { id: "T1", mode: "Metro", icon: Train, name: "NJ Transit — Line 4", origin: "Penn Station NYC", destination: "MetLife Stadium", status: "delayed", delay: 8, capacity: 2200, load: 1980, nextDep: "19:42", frequency: 15, suggestion: "Take Line 6 as alternative — no delays" },
  { id: "T2", mode: "Metro", icon: Train, name: "NJ Transit — Line 6", origin: "Hoboken Terminal", destination: "MetLife Stadium", status: "on_time", delay: 0, capacity: 1800, load: 1420, nextDep: "19:38", frequency: 12, suggestion: null },
  { id: "T3", mode: "Bus", icon: Bus, name: "Meadowlands Express", origin: "Port Authority", destination: "Stadium Plaza", status: "on_time", delay: 0, capacity: 85, load: 78, nextDep: "19:45", frequency: 20, suggestion: null },
  { id: "T4", mode: "Bus", icon: Bus, name: "Weekend Shuttle A", origin: "Secaucus Junction", destination: "North Gate", status: "disrupted", delay: 22, capacity: 120, load: 110, nextDep: "20:05", frequency: 25, suggestion: "Use Bus B via Route 3 — similar time" },
  { id: "T5", mode: "Parking", icon: Car, name: "Lot A — Premier", origin: "I-95 N", destination: "Stadium North", status: "on_time", delay: 0, capacity: 3200, load: 3008, nextDep: "N/A", frequency: 0, suggestion: "Lot A 94% full — redirect to Lot C" },
  { id: "T6", mode: "Parking", icon: Car, name: "Lot C — General", origin: "NJ-3 E", destination: "Stadium South", status: "on_time", delay: 0, capacity: 4500, load: 3825, nextDep: "N/A", frequency: 0, suggestion: null },
  { id: "T7", mode: "Walking", icon: Footprints, name: "Pedestrian Route 1", origin: "Secaucus Junction", destination: "Gate 1", status: "on_time", delay: 0, capacity: 5000, load: 2800, nextDep: "Always open", frequency: 0, suggestion: "15 min walk — recommended" },
];

const statusColor: Record<string, string> = {
  on_time: "success",
  delayed: "warning",
  disrupted: "critical",
  cancelled: "critical",
};

export function TransportContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bus className="w-6 h-6 text-cyan-400" />
          Transport Management
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">Real-time transport status and AI routing</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Metro On Time", value: "1/2", color: "text-green-400" },
          { label: "Bus On Time", value: "1/2", color: "text-orange-400" },
          { label: "Parking Available", value: "32%", color: "text-yellow-400" },
          { label: "AI Suggestions", value: 3, color: "text-blue-400" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <div className="text-slate-400 text-xs">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Transport list */}
      <div className="space-y-3">
        {TRANSPORT_DATA.map((t, i) => {
          const loadPct = Math.round((t.load / t.capacity) * 100);
          const Icon = t.icon;
          return (
            <motion.div key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              className="glass-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-slate-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{t.origin} → {t.destination}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={statusColor[t.status] as "success" | "warning" | "critical"}>
                        {t.status.replace("_", " ")}
                        {t.delay > 0 && ` +${t.delay}m`}
                      </Badge>
                      {t.nextDep !== "N/A" && (
                        <div className="text-slate-400 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {t.nextDep}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Load bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="flex items-center gap-1 text-slate-400"><Users className="w-3 h-3" />{t.load.toLocaleString()} / {t.capacity.toLocaleString()}</span>
                      <span className={loadPct >= 90 ? "text-red-400 font-medium" : loadPct >= 75 ? "text-orange-400 font-medium" : "text-green-400 font-medium"}>{loadPct}%</span>
                    </div>
                    <Progress value={loadPct} indicatorClassName={loadPct >= 90 ? "bg-red-500" : loadPct >= 75 ? "bg-orange-500" : "bg-blue-500"} />
                  </div>

                  {/* AI Suggestion */}
                  {t.suggestion && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-blue-300">
                      <Cpu className="w-3 h-3 text-blue-400 flex-shrink-0" />
                      {t.suggestion}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
