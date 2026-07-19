"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { Users, Activity, Brain, TrendingUp, AlertTriangle, RefreshCw, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const predictionData = [
  { time: "Now", actual: 72450, predicted: 72000 },
  { time: "+1h", actual: null, predicted: 78000 },
  { time: "+2h", actual: null, predicted: 81000 },
  { time: "+3h", actual: null, predicted: 75000 },
  { time: "+4h", actual: null, predicted: 55000 },
  { time: "+5h", actual: null, predicted: 28000 },
];

const sectionData = [
  { section: "North", density: 78, capacity: 18000, current: 14040 },
  { section: "South", density: 92, capacity: 22000, current: 20240 },
  { section: "East", density: 85, capacity: 16000, current: 13600 },
  { section: "West", density: 72, capacity: 14000, current: 10080 },
  { section: "VIP Upper", density: 45, capacity: 6000, current: 2700 },
  { section: "General North", density: 88, capacity: 6500, current: 5720 },
];

const radarData = [
  { metric: "North Stand", density: 78 },
  { metric: "South Stand", density: 92 },
  { metric: "East Stand", density: 85 },
  { metric: "West Stand", density: 72 },
  { metric: "VIP", density: 45 },
  { metric: "Concourse", density: 83 },
];

const AI_RECOMMENDATIONS = [
  { action: "Open Gate 10 auxiliary lanes immediately", priority: "high", impact: "Reduce South entry queue by 35%" },
  { action: "Deploy 12 volunteers to South concourse", priority: "high", impact: "Improve crowd flow by 28%" },
  { action: "Send SMS alert for alternative Gate 3 routing", priority: "medium", impact: "Distribute 3,000 fans to less congested areas" },
  { action: "Alert food court F4 to activate overflow counter", priority: "medium", impact: "Reduce food queue wait from 20min to 12min" },
  { action: "Pre-position 2 ambulances near South stand", priority: "low", impact: "Reduce medical response ETA by 4 minutes" },
];

export function CrowdContent() {
  const [isRunningPrediction, setIsRunningPrediction] = useState(false);
  const [predictionRun, setPredictionRun] = useState(false);

  const runPrediction = async () => {
    setIsRunningPrediction(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsRunningPrediction(false);
    setPredictionRun(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-400" />
            Crowd Analysis
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">AI-powered crowd intelligence and prediction</p>
        </div>
        <Button onClick={runPrediction} isLoading={isRunningPrediction} variant="glow">
          <Brain className="w-4 h-4" />
          {isRunningPrediction ? "Running AI..." : "Run Prediction"}
        </Button>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Current Crowd", value: "72,450", sub: "87% capacity", color: "text-blue-400", trend: "up" },
          { label: "Congestion Level", value: "HIGH", sub: "South stand critical", color: "text-orange-400", trend: "down" },
          { label: "Avg Wait Time", value: "12 min", sub: "Entry gates", color: "text-yellow-400", trend: "neutral" },
          { label: "Predicted Peak", value: "81,000", sub: "In ~2 hours", color: "text-red-400", trend: "up" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5"
          >
            <div className="text-slate-400 text-xs mb-1">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-slate-500 text-xs mt-1">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Prediction chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Crowd Prediction — Next 5 Hours
            </h3>
            {predictionRun && (
              <Badge variant="info" className="mt-1">AI Prediction Updated</Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-blue-400" />Actual</div>
            <div className="flex items-center gap-2"><div className="w-3 h-0.5 bg-purple-400 border-dashed" />Predicted</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={predictionData}>
            <defs>
              <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" stroke="rgba(148,163,184,0.5)" tick={{ fill: "rgba(148,163,184,0.7)", fontSize: 11 }} />
            <YAxis stroke="rgba(148,163,184,0.5)" tick={{ fill: "rgba(148,163,184,0.7)", fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: "rgba(10,14,26,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "white" }}
              formatter={(v: any) => [v?.toLocaleString(), ""]}
            />
            <Area type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} fill="url(#actualGrad)" name="Actual" connectNulls={false} />
            <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} fill="url(#predGrad)" strokeDasharray="5 5" name="Predicted" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Section breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-white font-semibold mb-4">Section Density</h3>
          <div className="space-y-4">
            {sectionData.map((section) => (
              <div key={section.section}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-slate-300 text-sm">{section.section}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs">{section.current.toLocaleString()} / {section.capacity.toLocaleString()}</span>
                    <span className={`text-xs font-semibold ${section.density >= 90 ? "text-red-400" : section.density >= 75 ? "text-orange-400" : "text-green-400"}`}>
                      {section.density}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={section.density}
                  indicatorClassName={section.density >= 90 ? "bg-red-500" : section.density >= 75 ? "bg-orange-500" : "bg-blue-500"}
                />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h3 className="text-white font-semibold mb-4">Density Radar</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "rgba(148,163,184,0.8)", fontSize: 11 }} />
              <Radar name="Density" dataKey="density" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Recommendations</h3>
            <p className="text-slate-400 text-xs">Generated by Gemini 2.5 Flash based on current crowd patterns</p>
          </div>
        </div>
        <div className="space-y-3">
          {AI_RECOMMENDATIONS.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                rec.priority === "high" ? "bg-red-500/20 text-red-400" :
                rec.priority === "medium" ? "bg-orange-500/20 text-orange-400" :
                "bg-green-500/20 text-green-400"
              }`}>
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{rec.action}</div>
                <div className="text-slate-400 text-xs mt-1 flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  {rec.impact}
                </div>
              </div>
              <Badge variant={rec.priority === "high" ? "critical" : rec.priority === "medium" ? "warning" : "success"}>
                {rec.priority}
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
