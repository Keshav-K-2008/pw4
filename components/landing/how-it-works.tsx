"use client";

import { motion } from "framer-motion";
import { Radio, BrainCircuit, Users, Award } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Sensor Ingestion",
    desc: "We ingest live camera metrics, ticket gates, volunteer location feeds, and parking occupancy telemetry.",
    icon: Radio,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    step: "02",
    title: "AI Analysis",
    desc: "Gemini models process current queues, crowd density matrices, and incident details to score priority levels.",
    icon: BrainCircuit,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    step: "03",
    title: "Role Dispatch",
    desc: "Security controllers, medical staff, and volunteer teams receive tailored alerts with action checklists and ETA routes.",
    icon: Users,
    color: "text-green-400 bg-green-500/10 border-green-500/20",
  },
  {
    step: "04",
    title: "Crisis Resolved",
    desc: "Incident resolution is logged on the blockchain ledger or secure database, feeding back into historical AI training.",
    icon: Award,
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-slate-950 py-20 px-6 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How StadiumMind AI Runs
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            A seamless real-time workflow connecting raw stadium data to immediate operational action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line for Desktop */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2 hidden lg:block z-0" />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative z-10 p-6 rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${step.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-slate-600 font-mono text-xl font-bold">{step.step}</span>
                </div>

                <h3 className="text-white font-bold text-base">{step.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
