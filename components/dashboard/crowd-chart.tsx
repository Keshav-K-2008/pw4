"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

// Demo crowd data for 24 hours
const crowdData = [
  { time: "08:00", crowd: 8200, capacity: 82500, entry: 1200, exit: 0 },
  { time: "09:00", crowd: 18500, capacity: 82500, entry: 12000, exit: 1700 },
  { time: "10:00", crowd: 31000, capacity: 82500, entry: 15000, exit: 2500 },
  { time: "11:00", crowd: 45000, capacity: 82500, entry: 18000, exit: 4000 },
  { time: "12:00", crowd: 58000, capacity: 82500, entry: 16000, exit: 3000 },
  { time: "13:00", crowd: 67000, capacity: 82500, entry: 12000, exit: 3000 },
  { time: "14:00", crowd: 72000, capacity: 82500, entry: 8000, exit: 3000 },
  { time: "15:00", crowd: 76000, capacity: 82500, entry: 5000, exit: 1000 },
  { time: "16:00", crowd: 79000, capacity: 82500, entry: 4000, exit: 1000 },
  { time: "17:00", crowd: 80500, capacity: 82500, entry: 2000, exit: 500 },
  { time: "18:00", crowd: 81000, capacity: 82500, entry: 1000, exit: 500 },
  { time: "19:00", crowd: 80200, capacity: 82500, entry: 200, exit: 1000 },
  { time: "20:00", crowd: 72000, capacity: 82500, entry: 100, exit: 8300 },
  { time: "21:00", crowd: 55000, capacity: 82500, entry: 50, exit: 17100 },
  { time: "22:00", crowd: 28000, capacity: 82500, entry: 20, exit: 27070 },
  { time: "23:00", crowd: 8000, capacity: 82500, entry: 0, exit: 20020 },
];

const transportData = [
  { name: "Metro", passengers: 18400, capacity: 22000 },
  { name: "Bus", passengers: 12200, capacity: 15000 },
  { name: "Parking", passengers: 28600, capacity: 32000 },
  { name: "Taxi/Ride", passengers: 9800, capacity: 12000 },
  { name: "Walking", passengers: 7200, capacity: 10000 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl">
      <div className="text-slate-400 text-xs mb-2">{label}</div>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">{Number(entry.value).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export function CrowdChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold">Crowd Flow — Match Day</h3>
          <p className="text-slate-400 text-sm mt-0.5">Real-time attendance tracking</p>
        </div>
        <div className="flex items-center gap-2 text-green-400 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Peak at 18:00</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={crowdData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
          <defs>
            <linearGradient id="crowdGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="time"
            stroke="rgba(148,163,184,0.5)"
            tick={{ fill: "rgba(148,163,184,0.7)", fontSize: 11 }}
          />
          <YAxis
            stroke="rgba(148,163,184,0.5)"
            tick={{ fill: "rgba(148,163,184,0.7)", fontSize: 11 }}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="crowd"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#crowdGradient)"
            name="Crowd"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function EntryExitChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold">Entry & Exit Rate</h3>
          <p className="text-slate-400 text-sm mt-0.5">Fans per hour</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={crowdData.slice(0, 12)} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="time"
            stroke="rgba(148,163,184,0.5)"
            tick={{ fill: "rgba(148,163,184,0.7)", fontSize: 11 }}
          />
          <YAxis
            stroke="rgba(148,163,184,0.5)"
            tick={{ fill: "rgba(148,163,184,0.7)", fontSize: 11 }}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ color: "rgba(148,163,184,0.8)", fontSize: "12px" }}
          />
          <Bar dataKey="entry" name="Entry" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="exit" name="Exit" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export function TransportChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-6"
    >
      <div className="mb-6">
        <h3 className="text-white font-semibold">Transport Usage</h3>
        <p className="text-slate-400 text-sm mt-0.5">Current load vs capacity</p>
      </div>
      <div className="space-y-4">
        {transportData.map((item) => {
          const pct = Math.round((item.passengers / item.capacity) * 100);
          return (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-slate-300 text-sm">{item.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-xs">{item.passengers.toLocaleString()} / {item.capacity.toLocaleString()}</span>
                  <span className={`text-xs font-semibold ${pct >= 90 ? "text-red-400" : pct >= 75 ? "text-orange-400" : "text-green-400"}`}>
                    {pct}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className={`h-full rounded-full ${pct >= 90 ? "bg-red-500" : pct >= 75 ? "bg-orange-500" : "bg-blue-500"}`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
