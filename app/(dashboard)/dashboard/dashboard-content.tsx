"use client";

import { motion } from "framer-motion";
import { Cpu, RefreshCw, Zap, Flag } from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { CrowdChart, EntryExitChart, TransportChart } from "@/components/dashboard/crowd-chart";
import { IncidentFeed } from "@/components/dashboard/incident-feed";
import { DashboardStats } from "@/types";

interface DashboardContentProps {
  stats: DashboardStats;
}

export function DashboardContent({ stats }: DashboardContentProps) {
  const now = new Date();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Flag className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-400 text-xs font-medium">FIFA World Cup 2026</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Match Day — Live</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Operations Dashboard
          </h1>
          <p className="text-slate-400 mt-1">
            MetLife Stadium · {now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3"
        >
          <div className="text-right hidden md:block">
            <div className="text-slate-400 text-xs">Last updated</div>
            <div className="text-white text-sm font-medium">
              {now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/8 text-sm transition-all">
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </motion.div>
      </div>

      {/* Match info banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 p-5"
        style={{
          background: "linear-gradient(135deg, rgba(0,61,165,0.2) 0%, rgba(10,14,26,0.8) 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-red-600/5" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl mb-1">🇧🇷</div>
              <div className="text-white font-bold text-lg">Brazil</div>
              <div className="text-slate-400 text-xs">Home</div>
            </div>

            <div className="text-center px-8">
              <div className="text-3xl font-black text-white">1 — 0</div>
              <div className="text-xs text-slate-400 mt-1">67&apos;</div>
              <div className="mt-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30">
                <span className="text-red-400 text-xs font-semibold animate-pulse">LIVE</span>
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-1">🇩🇪</div>
              <div className="text-white font-bold text-lg">Germany</div>
              <div className="text-slate-400 text-xs">Away</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-right">
            <div>
              <div className="text-slate-400 text-xs">Attendance</div>
              <div className="text-white font-bold text-xl">72,450</div>
              <div className="text-slate-400 text-xs">of 82,500</div>
            </div>
            <div>
              <div className="text-slate-400 text-xs">Stadium</div>
              <div className="text-white font-semibold">MetLife</div>
              <div className="text-slate-400 text-xs">East Rutherford, NJ</div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">AI Active</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats cards */}
      <StatsCards stats={stats} />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CrowdChart />
        <EntryExitChart />
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IncidentFeed />
        </div>
        <TransportChart />
      </div>

      {/* AI Operational Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Operational Summary</h3>
            <p className="text-slate-400 text-xs">Generated by Gemini 2.5 Flash</p>
          </div>
          <div className="ml-auto text-xs text-slate-500">Updated 2 min ago</div>
        </div>
        <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            Stadium operations are running at <span className="text-blue-400 font-medium">87% capacity</span> with
            72,450 fans currently inside MetLife Stadium. Three active incidents are being managed —
            a medical response in Section C12 (ETA 3 min), a child separation case at Gate 3, and
            a security assessment on the East Concourse. <span className="text-orange-400 font-medium">Gate 5 and 8 queues exceed 15 minutes</span> —
            recommend opening auxiliary Gate 10. Volunteer deployment in Zones A and B is
            <span className="text-green-400 font-medium"> optimal</span>. Transport connections are operating with minor delays on Metro Line 4.
            Overall threat level: <span className="text-yellow-400 font-medium">ELEVATED</span>.
          </p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "Open Gate 10 auxiliary lanes", priority: "High" },
            { label: "Deploy 12 more volunteers to Zone C", priority: "Medium" },
            { label: "Alert Metro Line 4 operations team", priority: "Low" },
          ].map((rec, i) => (
            <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${rec.priority === "High" ? "bg-red-400" : rec.priority === "Medium" ? "bg-orange-400" : "bg-green-400"}`} />
              <span className="text-slate-300 text-xs">{rec.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
