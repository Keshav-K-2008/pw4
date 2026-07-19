"use client";

import { motion } from "framer-motion";
import { Shield, Clock, Users, Zap } from "lucide-react";

const STATS = [
  { label: "Matches Powered", value: "104", sub: "Across Canada, Mexico, USA", icon: Zap, color: "text-blue-400" },
  { label: "Host Cities", value: "16", sub: "Federated operations centers", icon: Users, color: "text-green-400" },
  { label: "AI Response Target", value: "< 2.5s", sub: "Gemini 2.5 latency standard", icon: Clock, color: "text-purple-400" },
  { label: "Safety Critical Level", value: "Level 1", sub: "High availability architecture", icon: Shield, color: "text-red-400" },
];

export function Stats() {
  return (
    <section className="bg-slate-950 border-t border-b border-white/5 py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5 opacity-30" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-6 flex flex-col justify-between text-center sm:text-left h-44 relative"
            >
              <div className="flex justify-center sm:justify-between items-center mb-4">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className={`text-4xl font-extrabold text-white tracking-tight ${stat.color}`}>{stat.value}</div>
                <div className="text-slate-500 text-xs mt-1.5 leading-snug">{stat.sub}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
