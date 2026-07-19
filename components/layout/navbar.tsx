"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Globe,
  Wifi,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { useNotificationStore } from "@/lib/store/use-notification-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatTimeAgo } from "@/lib/utils/format";

export function Navbar() {
  const router = useRouter();
  const supabase = createClient();
  const { user, signOut } = useAuthStore();
  const { notifications, unreadCount, markAllAsRead } = useNotificationStore();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    signOut();
    router.push("/login");
    toast.success("Signed out successfully");
  };

  const recentNotifs = notifications.slice(0, 5);

  return (
    <header className="h-16 fixed top-0 right-0 left-64 z-30 flex items-center justify-between px-6 bg-slate-950/60 backdrop-blur-xl border-b border-white/5">
      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search gates, sections, staff..."
            aria-label="Search gates, sections, and staff"
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Live Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
          <Wifi className="w-3.5 h-3.5 text-green-400" />
          <span className="text-green-400 text-xs font-medium">Live</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications dropdown"
            onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
          >
            <Bell className="w-4.5 h-4.5 text-slate-400" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Button>

          <AnimatePresence>
            {showNotifs && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                  <span className="text-white font-semibold text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-blue-400 text-xs hover:text-blue-300"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {recentNotifs.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">
                      No notifications yet
                    </div>
                  ) : (
                    recentNotifs.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${!notif.is_read ? "bg-blue-500/5" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              notif.type === "critical" ? "text-red-400" :
                              notif.type === "warning" ? "text-orange-400" :
                              notif.type === "success" ? "text-green-400" : "text-blue-400"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white font-medium truncate">{notif.title}</div>
                            <div className="text-xs text-slate-400 mt-0.5 line-clamp-2">{notif.body}</div>
                            <div className="text-[11px] text-slate-500 mt-1">{formatTimeAgo(notif.created_at)}</div>
                          </div>
                          {!notif.is_read && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
            aria-label="User profile dropdown"
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
              {user?.full_name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-white text-xs font-medium leading-none">{user?.full_name ?? "User"}</div>
              <div className="text-slate-400 text-[11px] capitalize mt-0.5">{user?.role ?? "fan"}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-48 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="p-3 space-y-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-all"
                    onClick={() => setShowProfile(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-all"
                    onClick={() => setShowProfile(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <Link
                    href="/accessibility"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 text-sm transition-all"
                    onClick={() => setShowProfile(false)}
                  >
                    <Globe className="w-4 h-4" />
                    Accessibility
                  </Link>
                  <div className="border-t border-white/5 my-1" />
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm transition-all w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Close dropdowns on outside click */}
      {(showNotifs || showProfile) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => { setShowNotifs(false); setShowProfile(false); }}
        />
      )}
    </header>
  );
}
