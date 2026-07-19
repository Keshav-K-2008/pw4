"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Map,
  Bot,
  BarChart3,
  AlertTriangle,
  Users,
  Shield,
  Heart,
  Bus,
  PieChart,
  Settings,
  ChevronRight,
  Zap,
  Radio,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { UserRole } from "@/types";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: UserRole[];
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Live Map", href: "/map", icon: Map },
  { label: "AI Assistant", href: "/ai-assistant", icon: Bot },
  { label: "Crowd Analysis", href: "/crowd-analysis", icon: BarChart3 },
  { label: "Emergency", href: "/emergency", icon: AlertTriangle, badge: "Live" },
  { label: "Volunteers", href: "/volunteers", icon: Users, roles: ["admin", "operations", "volunteer"] },
  { label: "Security", href: "/security", icon: Shield, roles: ["admin", "operations", "security"] },
  { label: "Medical", href: "/medical", icon: Heart, roles: ["admin", "operations", "medical"] },
  { label: "Transport", href: "/transport", icon: Bus },
  { label: "Analytics", href: "/analytics", icon: PieChart, roles: ["admin", "operations"] },
  { label: "Admin", href: "/admin", icon: Settings, roles: ["admin"] },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const visibleItems = navItems.filter((item) => {
    if (!item.roles) return true;
    if (!user) return false;
    return item.roles.includes(user.role as UserRole);
  });

  return (
    <aside
      className={cn(
        "w-64 h-screen fixed left-0 top-0 z-40 flex flex-col",
        "bg-slate-950/80 backdrop-blur-xl border-r border-white/5",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-slate-950" />
        </div>
        <div>
          <div className="text-white font-bold text-sm leading-none">StadiumMind</div>
          <div className="text-slate-400 text-xs mt-0.5">AI Operations</div>
        </div>
      </div>

      {/* Live indicator */}
      <div className="mx-4 my-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
          <Radio className="w-3.5 h-3.5 text-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-medium">LIVE — Match Day Operations</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        <div className="text-xs font-medium text-slate-500 px-3 py-2 uppercase tracking-wider">
          Navigation
        </div>
        {visibleItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-blue-600/20 text-white border border-blue-500/30"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon
                  className={cn(
                    "w-4.5 h-4.5 flex-shrink-0 transition-colors",
                    isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
                  )}
                />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/20">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User info */}
      {user && (
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
              {user.full_name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-medium truncate">{user.full_name}</div>
              <div className="text-slate-400 text-[11px] capitalize truncate">{user.role}</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
