"use client";

import { motion } from "framer-motion";
import {
  Users,
  Accessibility as AccessIcon,
  AlertTriangle,
  Cpu,
  Map,
  Languages,
} from "lucide-react";

const FEATURES = [
  {
    icon: Users,
    title: "Crowd Management",
    desc: "Monitor crowd flows, density profiles, and gate queues in real time. Prevent surges with predictive scheduling.",
    color: "from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/20",
  },
  {
    icon: Map,
    title: "Interactive Stadium Map",
    desc: "Multi-layered interactive maps rendering gates, parking spaces, food courts, first aid points, and optimal walking routes.",
    color: "from-green-500/20 to-green-600/5 text-green-400 border-green-500/20",
  },
  {
    icon: AccessIcon,
    title: "AI-Powered Accessibility",
    desc: "Generate wheelchair-accessible pathways and request support items (rentals, audio guides, interpreters) in real-time.",
    color: "from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/20",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Dispatch",
    desc: "Immediate logging of medical or security incidents with AI prioritizations, ETA computations, and step-by-step guidance.",
    color: "from-red-500/20 to-red-600/5 text-red-400 border-red-500/20",
  },
  {
    icon: Cpu,
    title: "Gemini Decision Support",
    desc: "Real-time query answers, queue optimizations, and automated situation summaries powered by Gemini 2.5 Flash.",
    color: "from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/20",
  },
  {
    icon: Languages,
    title: "Multilingual Assistance",
    desc: "Instantly translate announcements, signs, and operational warnings into 18+ different languages for international fans.",
    color: "from-orange-500/20 to-orange-600/5 text-orange-400 border-orange-500/20",
  },
];

export function Features() {
  return (
    <section className="bg-slate-950 py-20 px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Designed for World-Class Operations
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            StadiumMind AI equips tournament operations directors, security personnel, medical staff,
            and volunteers with standard-setting tools to manage high-capacity match days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`p-6 rounded-2xl border bg-slate-900/40 backdrop-blur-sm shadow-xl flex flex-col justify-between h-64 relative overflow-hidden`}
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                {/* Background gradient block */}
                <div className={`absolute inset-0 bg-gradient-to-br opacity-[0.03] ${feature.color}`} />

                <div className="space-y-4 relative">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 ${feature.color.split(" ")[2]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>

                <div className="pt-2 relative">
                  <span className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Live telemetry ready</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
