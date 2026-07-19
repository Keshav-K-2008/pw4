"use client";

import { motion } from "framer-motion";
import {
  Users,
  Activity,
  Clock,
  AlertTriangle,
  Heart,
  UserCheck,
  Utensils,
  Car,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { DashboardStats } from "@/types";

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "blue" | "green" | "orange" | "red" | "purple" | "cyan";
  index: number;
}

const colorMap = {
  blue: {
    icon: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/20",
    gradient: "from-blue-600/20 to-transparent",
  },
  green: {
    icon: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    glow: "shadow-green-500/20",
    gradient: "from-green-600/20 to-transparent",
  },
  orange: {
    icon: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    glow: "shadow-orange-500/20",
    gradient: "from-orange-600/20 to-transparent",
  },
  red: {
    icon: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    glow: "shadow-red-500/20",
    gradient: "from-red-600/20 to-transparent",
  },
  purple: {
    icon: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    glow: "shadow-purple-500/20",
    gradient: "from-purple-600/20 to-transparent",
  },
  cyan: {
    icon: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/20",
    gradient: "from-cyan-600/20 to-transparent",
  },
};

function StatCard({ label, value, subValue, trend, trendValue, icon: Icon, color, index }: StatCardProps) {
  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-5 border",
        "bg-white/5 backdrop-blur-sm",
        `border-white/10 shadow-lg ${colors.glow}`
      )}
    >
      {/* Background gradient */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30", colors.gradient)} />

      {/* Top bar glow */}
      <div className={cn("absolute top-0 left-0 right-0 h-px bg-gradient-to-r", `from-transparent via-${color}-500/50 to-transparent`)} />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", colors.bg, colors.border)}>
            <Icon className={cn("w-5 h-5", colors.icon)} />
          </div>
          {trend && trendValue && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg",
              trend === "up" ? "text-green-400 bg-green-500/10" :
              trend === "down" ? "text-red-400 bg-red-500/10" :
              "text-slate-400 bg-slate-500/10"
            )}>
              {trend === "up" && <TrendingUp className="w-3 h-3" />}
              {trend === "down" && <TrendingDown className="w-3 h-3" />}
              {trend === "neutral" && <Minus className="w-3 h-3" />}
              {trendValue}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.07 + 0.2 }}
        >
          <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
          <div className="text-slate-400 text-sm mt-1">{label}</div>
          {subValue && <div className="text-slate-500 text-xs mt-0.5">{subValue}</div>}
        </motion.div>
      </div>
    </motion.div>
  );
}

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards: Omit<StatCardProps, "index">[] = [
    {
      label: "Total Attendance",
      value: stats.total_attendance.toLocaleString(),
      subValue: "of 82,500 capacity",
      trend: "up",
      trendValue: "+2.3%",
      icon: Users,
      color: "blue",
    },
    {
      label: "Crowd Density",
      value: `${stats.crowd_density}%`,
      subValue: stats.crowd_density >= 80 ? "High — Monitor closely" : "Moderate",
      trend: stats.crowd_density >= 80 ? "down" : "neutral",
      trendValue: stats.crowd_density >= 80 ? "Critical" : "Normal",
      icon: Activity,
      color: stats.crowd_density >= 80 ? "orange" : "green",
    },
    {
      label: "Avg Wait Time",
      value: `${stats.avg_wait_time}m`,
      subValue: "at entry gates",
      trend: stats.avg_wait_time > 15 ? "down" : "up",
      trendValue: stats.avg_wait_time > 15 ? "High" : "Good",
      icon: Clock,
      color: stats.avg_wait_time > 15 ? "orange" : "cyan",
    },
    {
      label: "Emergency Alerts",
      value: stats.emergency_alerts,
      subValue: `${stats.active_incidents} incidents open`,
      trend: stats.emergency_alerts > 0 ? "down" : "up",
      trendValue: stats.emergency_alerts > 0 ? "Active" : "Clear",
      icon: AlertTriangle,
      color: stats.emergency_alerts > 0 ? "red" : "green",
    },
    {
      label: "Medical Cases",
      value: stats.medical_cases,
      subValue: "Active responses",
      icon: Heart,
      color: "red",
    },
    {
      label: "Volunteers Active",
      value: stats.volunteers_active,
      subValue: "On duty now",
      trend: "up",
      trendValue: "+12",
      icon: UserCheck,
      color: "green",
    },
    {
      label: "Food Queue Avg",
      value: `${stats.food_queue_avg}m`,
      subValue: "Wait time",
      icon: Utensils,
      color: "purple",
    },
    {
      label: "Parking",
      value: `${stats.parking_occupied}%`,
      subValue: "Occupied",
      trend: stats.parking_occupied >= 90 ? "down" : "neutral",
      trendValue: stats.parking_occupied >= 90 ? "Full" : "Available",
      icon: Car,
      color: stats.parking_occupied >= 90 ? "orange" : "cyan",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <StatCard key={card.label} {...card} index={index} />
      ))}
    </div>
  );
}
