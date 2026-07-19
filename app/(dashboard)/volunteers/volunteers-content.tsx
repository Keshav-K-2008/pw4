"use client";

import { motion } from "framer-motion";
import { Users, CheckCircle, Clock, Star, MapPin, Zap } from "lucide-react";

const VOLUNTEERS = [
  { id: "V001", name: "Maria Santos", zone: "South Entry", status: "on_task", task: "Gate crowd control", score: 96, completed: 14, shift: "08:00 - 18:00", phone: "+1-555-0101", skills: ["Crowd Control", "First Aid", "Spanish"] },
  { id: "V002", name: "James Chen", zone: "North Concourse", status: "available", task: null, score: 88, completed: 11, shift: "10:00 - 20:00", phone: "+1-555-0102", skills: ["Navigation", "Mandarin", "Wheelchair Assistance"] },
  { id: "V003", name: "Aisha Mohammed", zone: "Medical Center A", status: "on_task", task: "Medical support assistant", score: 94, completed: 17, shift: "06:00 - 16:00", phone: "+1-555-0103", skills: ["First Aid", "Arabic", "Medical Support"] },
  { id: "V004", name: "Lucas Müller", zone: "Parking Lot A", status: "on_task", task: "Parking direction", score: 82, completed: 9, shift: "12:00 - 22:00", phone: "+1-555-0104", skills: ["Parking", "German", "Traffic Control"] },
  { id: "V005", name: "Sofia Rossi", zone: "Food Court D", status: "break", task: null, score: 91, completed: 13, shift: "09:00 - 19:00", phone: "+1-555-0105", skills: ["Customer Service", "Italian", "Food Safety"] },
  { id: "V006", name: "Ahmed Hassan", zone: "East Gate", status: "available", task: null, score: 87, completed: 8, shift: "11:00 - 21:00", phone: "+1-555-0106", skills: ["Security Support", "Arabic", "Crowd Control"] },
];

const statusColors: Record<string, string> = {
  on_task: "bg-green-500/15 text-green-400 border-green-500/20",
  available: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  break: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  off_duty: "bg-slate-500/15 text-slate-400 border-slate-500/20",
};

export function VolunteersContent() {
  const active = VOLUNTEERS.filter((v) => v.status === "on_task").length;
  const available = VOLUNTEERS.filter((v) => v.status === "available").length;
  const onBreak = VOLUNTEERS.filter((v) => v.status === "break").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-green-400" />
          Volunteer Panel
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">Manage and monitor volunteer operations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Active", value: 342, color: "text-white" },
          { label: "On Task", value: active * 57, color: "text-green-400" },
          { label: "Available", value: available * 57, color: "text-blue-400" },
          { label: "On Break", value: onBreak * 57, color: "text-orange-400" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <div className="text-slate-400 text-xs">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* AI Suggestions */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-blue-400" />
          <h3 className="text-white font-semibold text-sm">AI Volunteer Suggestions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { text: "Send 8 volunteers from Lot A to South Gate — high congestion", priority: "high" },
            { text: "James Chen speaks Mandarin — fan assistance needed at East Gate", priority: "medium" },
            { text: "Schedule break rotation for Zone C volunteers (6 hours active)", priority: "low" },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${s.priority === "high" ? "bg-red-400" : s.priority === "medium" ? "bg-orange-400" : "bg-green-400"}`} />
              <span className="text-slate-300 text-sm">{s.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Volunteer list */}
      <div className="glass-card overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <h3 className="text-white font-semibold">Volunteer Roster</h3>
        </div>
        <div className="divide-y divide-white/5">
          {VOLUNTEERS.map((vol, i) => (
            <motion.div
              key={vol.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-4 p-4 hover:bg-white/3 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {vol.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-white font-medium text-sm">{vol.name}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[vol.status]}`}>
                    {vol.status.replace("_", " ")}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{vol.zone}</span>
                  {vol.task && <span className="text-blue-400">{vol.task}</span>}
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {vol.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400 text-xs">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="hidden md:flex flex-col items-end gap-1 flex-shrink-0">
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-semibold">
                  <Star className="w-3.5 h-3.5" />
                  {vol.score}%
                </div>
                <div className="text-slate-500 text-xs flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  {vol.completed} tasks
                </div>
                <div className="text-slate-500 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {vol.shift}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
