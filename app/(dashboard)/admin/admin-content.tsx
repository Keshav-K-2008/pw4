"use client";

import { motion } from "framer-motion";
import {
  Settings, Users, Database, Server, Shield, Activity,
  CheckCircle, AlertTriangle, Globe, Cpu, Key, Lock, Trash2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SYSTEM_HEALTH = [
  { name: "API Server", status: "healthy", uptime: "99.9%", latency: "12ms" },
  { name: "Supabase DB", status: "healthy", uptime: "99.97%", latency: "4ms" },
  { name: "Groq AI", status: "healthy", uptime: "99.8%", latency: "280ms" },
  { name: "Realtime WS", status: "healthy", uptime: "99.95%", latency: "8ms" },
  { name: "Storage CDN", status: "healthy", uptime: "100%", latency: "22ms" },
  { name: "Edge Functions", status: "degraded", uptime: "98.2%", latency: "145ms" },
];

const USERS = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@stadiumops.com", role: "admin", status: "active", lastSeen: "2 min ago" },
  { id: 2, name: "Carlos Mendez", email: "c.mendez@stadiumops.com", role: "operations", status: "active", lastSeen: "5 min ago" },
  { id: 3, name: "Priya Sharma", email: "p.sharma@stadiumops.com", role: "medical", status: "active", lastSeen: "12 min ago" },
  { id: 4, name: "Felix Bauer", email: "f.bauer@stadiumops.com", role: "security", status: "inactive", lastSeen: "2h ago" },
];

const roleColors: Record<string, string> = {
  admin: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  operations: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  medical: "bg-red-500/15 text-red-400 border-red-500/20",
  security: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  volunteer: "bg-green-500/15 text-green-400 border-green-500/20",
  fan: "bg-slate-500/15 text-slate-400 border-slate-500/20",
};

export function AdminContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-300" />
          Admin Panel
        </h1>
        <p className="text-slate-400 text-sm mt-0.5">System administration and configuration</p>
      </div>

      {/* System health */}
      <div className="glass-card p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Server className="w-4 h-4 text-green-400" />
          System Health
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SYSTEM_HEALTH.map((svc, i) => (
            <motion.div key={svc.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${svc.status === "healthy" ? "bg-green-400" : svc.status === "degraded" ? "bg-orange-400 animate-pulse" : "bg-red-400 animate-pulse"}`} />
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium">{svc.name}</div>
                <div className="text-slate-400 text-xs">{svc.uptime} uptime · {svc.latency}</div>
              </div>
              <Badge variant={svc.status === "healthy" ? "success" : svc.status === "degraded" ? "warning" : "critical"}>
                {svc.status}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: "1,248", icon: Users, color: "text-blue-400" },
          { label: "AI Calls Today", value: "14,832", icon: Cpu, color: "text-purple-400" },
          { label: "Active Sessions", value: 342, icon: Activity, color: "text-green-400" },
          { label: "Security Events", value: 17, icon: Shield, color: "text-orange-400" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4">
            <s.icon className={`w-4 h-4 ${s.color} mb-2`} />
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-slate-400 text-xs mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* User management */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h3 className="text-white font-semibold">User Management</h3>
          <Button variant="glow" size="sm">
            <Users className="w-3.5 h-3.5" />
            Invite User
          </Button>
        </div>
        <div className="divide-y divide-white/5">
          {USERS.map((user, i) => (
            <motion.div key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
              className="flex items-center gap-4 p-4 hover:bg-white/3 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/10 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium">{user.name}</div>
                <div className="text-slate-400 text-xs mt-0.5">{user.email}</div>
              </div>
              <span className={`hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${roleColors[user.role]}`}>
                {user.role}
              </span>
              <div className="hidden md:flex items-center gap-1 text-slate-500 text-xs">
                {user.status === "active" ? <CheckCircle className="w-3 h-3 text-green-400" /> : <AlertTriangle className="w-3 h-3 text-slate-500" />}
                {user.lastSeen}
              </div>
              <button className="text-slate-500 hover:text-red-400 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Config */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Key className="w-4 h-4 text-yellow-400" />
            API Keys
          </h3>
          <div className="space-y-3">
            {[
              { name: "Groq AI", key: "•••••••••••••••••••••abc3", status: "active" },
              { name: "Supabase Anon", key: "•••••••••••••••••••••xyz9", status: "active" },
              { name: "Supabase Service", key: "•••••••••••••••••••••def5", status: "active" },
            ].map((k) => (
              <div key={k.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <Lock className="w-4 h-4 text-slate-400" />
                <div className="flex-1">
                  <div className="text-white text-sm">{k.name}</div>
                  <div className="text-slate-500 text-xs font-mono">{k.key}</div>
                </div>
                <Badge variant="success">{k.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            Stadium Configuration
          </h3>
          <div className="space-y-3">
            {[
              { label: "Stadium Name", value: "MetLife Stadium" },
              { label: "Capacity", value: "82,500" },
              { label: "Match", value: "BRA vs GER — Group Stage" },
              { label: "Match Date", value: "July 18, 2026" },
              { label: "AI Model", value: "llama-3.3-70b-versatile" },
              { label: "Alert Level", value: "ELEVATED" },
            ].map((cfg) => (
              <div key={cfg.label} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                <span className="text-slate-400 text-sm">{cfg.label}</span>
                <span className="text-white text-sm font-medium">{cfg.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
