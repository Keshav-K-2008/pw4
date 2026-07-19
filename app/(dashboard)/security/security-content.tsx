"use client";

import { motion } from "framer-motion";
import { Shield, Radio, Eye, AlertTriangle, MapPin, Clock, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatTimeAgo } from "@/lib/utils/format";

const SECURITY_ALERTS = [
  { id: 1, type: "Suspicious Package", location: "East Concourse L2", time: new Date(Date.now() - 45 * 60000).toISOString(), severity: "medium", status: "investigating" },
  { id: 2, type: "Unauthorized Access Attempt", location: "VIP Entrance Gate A", time: new Date(Date.now() - 12 * 60000).toISOString(), severity: "high", status: "resolved" },
  { id: 3, type: "Perimeter Breach Sensor", location: "North Field Access", time: new Date(Date.now() - 5 * 60000).toISOString(), severity: "low", status: "monitoring" },
];

const PATROL_UNITS = [
  { id: "S-01", name: "Alpha Team", zone: "North Stand", status: "on_patrol", officers: 4 },
  { id: "S-02", name: "Bravo Team", zone: "South Entry", status: "incident_response", officers: 6 },
  { id: "S-03", name: "Charlie Team", zone: "East Concourse", status: "on_patrol", officers: 3 },
  { id: "S-04", name: "Delta Team", zone: "VIP Zone", status: "standby", officers: 5 },
  { id: "S-05", name: "Echo Team", zone: "Parking Perimeter", status: "on_patrol", officers: 4 },
];

export function SecurityContent() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Shield className="w-6 h-6 text-orange-400" />
            Security Operations Center
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">Real-time security monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <div className="text-yellow-400 text-xs font-medium">Threat Level</div>
            <div className="text-yellow-300 font-bold">ELEVATED</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Units Deployed", value: 22, icon: Shield, color: "text-blue-400" },
          { label: "Active Alerts", value: 3, icon: AlertTriangle, color: "text-orange-400" },
          { label: "CCTV Active", value: "248/250", icon: Eye, color: "text-green-400" },
          { label: "Radio Channels", value: 8, icon: Radio, color: "text-purple-400" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-slate-400 text-xs mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Security alerts */}
      <div className="glass-card p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-red-400" />
          Security Alerts
        </h3>
        <div className="space-y-3">
          {SECURITY_ALERTS.map((alert, i) => (
            <motion.div key={alert.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${alert.severity === "high" ? "bg-red-400 animate-pulse" : alert.severity === "medium" ? "bg-orange-400" : "bg-yellow-400"}`} />
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{alert.type}</div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{alert.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatTimeAgo(alert.time)}</span>
                </div>
              </div>
              <Badge variant={alert.severity === "high" ? "critical" : alert.severity === "medium" ? "warning" : "success"}>
                {alert.status}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Patrol units */}
      <div className="glass-card p-6">
        <h3 className="text-white font-semibold mb-4">Patrol Units</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PATROL_UNITS.map((unit, i) => (
            <motion.div key={unit.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold text-sm">{unit.name}</span>
                <Badge variant={unit.status === "incident_response" ? "critical" : unit.status === "on_patrol" ? "success" : "info"}>
                  {unit.status.replace("_", " ")}
                </Badge>
              </div>
              <div className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
                <MapPin className="w-3 h-3" />{unit.zone}
              </div>
              <div className="text-slate-400 text-xs flex items-center gap-1.5">
                <Shield className="w-3 h-3" />{unit.officers} officers
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
