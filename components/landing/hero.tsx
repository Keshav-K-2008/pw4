"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Shield, Globe, Cpu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background gradients and glows */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-mesh opacity-20" />
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative max-w-5xl mx-auto px-6 text-center space-y-8">
        {/* Animated Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold tracking-wide uppercase"
        >
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          FIFA World Cup 2026 Operations Platform
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none"
        >
          AI Operating System for <br />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
            Smart Stadiums & Tournaments
          </span>
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed"
        >
          StadiumMind AI streamlines crowd management, real-time navigation, accessibility assistance,
          and emergency response coordination utilizing Gemini 2.5 Flash and real-time operations telemetry.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link href="/login">
            <Button size="lg" variant="glow" className="h-12 px-8 text-sm font-semibold gap-2">
              Access Dashboard
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="glass" className="h-12 px-8 text-sm font-semibold">
              Create Account
            </Button>
          </Link>
        </motion.div>

        {/* Animated Mockup Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-12"
        >
          <div className="relative mx-auto max-w-4xl rounded-2xl border border-white/10 bg-slate-900/40 p-2 shadow-2xl backdrop-blur-md overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

            {/* Dashboard Mock Window Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-slate-950/40">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/55" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/55" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/55" />
              </div>
              <span className="text-[11px] text-slate-500 font-mono">metlife-stadium-ops.stadiumind.ai</span>
              <div className="w-12" />
            </div>

            {/* Mock Image / Preview */}
            <div className="aspect-[16/9] bg-slate-950/60 flex flex-col p-6 space-y-4 text-left">
              {/* Header inside mockup */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div>
                  <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Live Venue Status</div>
                  <div className="text-white text-lg font-bold">MetLife Stadium Operations</div>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-[10px] font-semibold">Match Day Live</span>
                </div>
              </div>

              {/* Grid of cards inside mockup */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Attendance", val: "72,450 / 82,500", pct: "87%", color: "text-blue-400" },
                  { label: "Active Emergency Alerts", val: "3 Cases Open", pct: "Critical", color: "text-red-400" },
                  { label: "AI Prediction Status", val: "Peak in ~2 hours", pct: "Optimized", color: "text-purple-400" },
                ].map((card, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between h-24">
                    <span className="text-[11px] text-slate-400 font-medium">{card.label}</span>
                    <div>
                      <div className="text-white text-sm font-bold mt-1">{card.val}</div>
                      <span className={`text-[10px] font-semibold ${card.color}`}>{card.pct}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom detail in mockup */}
              <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  Gemini Operational Log
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-2">
                  &ldquo;Stadium occupancy is at 87%. Heavy flow detected at Gates 5 and 8. Recommending dispatch of 10 volunteer monitors to redirect incoming fans to Gate 10. Medical Team Alpha is currently on site at Section C12.&rdquo;
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[9px] font-bold">Gate redirection active</span>
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[9px] font-bold">Medical responding</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
