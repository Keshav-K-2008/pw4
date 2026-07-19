"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { BarChart2, Star, Globe } from "lucide-react";

const REVENUE_DATA = [
  { month: "Jan", food: 245000, merchandise: 89000, parking: 142000 },
  { month: "Feb", food: 312000, merchandise: 125000, parking: 168000 },
  { month: "Mar", food: 428000, merchandise: 198000, parking: 215000 },
  { month: "Apr", food: 389000, merchandise: 164000, parking: 198000 },
  { month: "May", food: 512000, merchandise: 242000, parking: 278000 },
  { month: "Jun", food: 634000, merchandise: 312000, parking: 345000 },
];

const NPS_DATA = [
  { name: "Navigation", score: 78 },
  { name: "Food Quality", score: 82 },
  { name: "Staff Support", score: 91 },
  { name: "Safety", score: 88 },
  { name: "Transport", score: 72 },
  { name: "Accessibility", score: 85 },
];

const NATIONALITY_DATA = [
  { name: "Brazil", value: 24, color: "#3ECF8E" },
  { name: "Germany", value: 18, color: "#3B82F6" },
  { name: "USA", value: 32, color: "#8B5CF6" },
  { name: "UK", value: 8, color: "#F59E0B" },
  { name: "Other", value: 18, color: "#64748B" },
];

export function AnalyticsContent() {
  const totalRevenue = REVENUE_DATA.reduce((acc, r) => acc + r.food + r.merchandise + r.parking, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-purple-400" />
          Analytics & Insights
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">FIFA World Cup 2026 — Operational insights</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: `$${(totalRevenue / 1000000).toFixed(1)}M`, color: "text-green-400" },
          { label: "Avg NPS Score", value: "83", color: "text-blue-400" },
          { label: "Fan Satisfaction", value: "4.2/5", color: "text-yellow-400" },
          { label: "AI Interactions", value: "14,832", color: "text-purple-400" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <div className="text-slate-400 text-xs">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Revenue chart */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card p-6">
        <h3 className="text-white font-semibold mb-6">Revenue by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={REVENUE_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" stroke="rgba(148,163,184,0.5)" tick={{ fill: "rgba(148,163,184,0.7)", fontSize: 11 }} />
            <YAxis stroke="rgba(148,163,184,0.5)" tick={{ fill: "rgba(148,163,184,0.7)", fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ background: "rgba(10,14,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white" }} formatter={(v: number | string) => [`$${Number(v).toLocaleString()}`, ""]} />
            <Legend wrapperStyle={{ color: "rgba(148,163,184,0.8)", fontSize: "12px" }} />
            <Bar dataKey="food" name="Food & Beverage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="merchandise" name="Merchandise" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="parking" name="Parking" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* NPS */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            Net Promoter Scores
          </h3>
          <div className="space-y-3">
            {NPS_DATA.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-300 text-sm">{item.name}</span>
                  <span className={`text-sm font-semibold ${item.score >= 85 ? "text-green-400" : item.score >= 75 ? "text-yellow-400" : "text-orange-400"}`}>{item.score}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full rounded-full ${item.score >= 85 ? "bg-green-500" : item.score >= 75 ? "bg-yellow-500" : "bg-orange-500"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Nationalities */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            Fan Nationalities
          </h3>
          <div className="flex items-center gap-6">
            <PieChart width={160} height={160}>
              <Pie data={NATIONALITY_DATA} cx={75} cy={75} innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                {NATIONALITY_DATA.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="space-y-2 flex-1">
              {NATIONALITY_DATA.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-slate-300 text-sm">{item.name}</span>
                  </div>
                  <span className="text-white text-sm font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
