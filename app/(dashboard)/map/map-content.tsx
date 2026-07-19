"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Map,
  Layers,
  Thermometer,
  AlertTriangle,
  Navigation,
  ZoomIn,
  ZoomOut,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Dynamic import to avoid SSR issues with Leaflet
const StadiumMap = dynamic(
  () => import("@/components/map/stadium-map").then((m) => m.StadiumMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-slate-900/50 rounded-2xl">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Loading stadium map...</p>
        </div>
      </div>
    ),
  }
);

const LEGEND_ITEMS = [
  { color: "bg-blue-400", label: "Entry Gates" },
  { color: "bg-green-400", label: "Medical Centers" },
  { color: "bg-orange-400", label: "Food Courts" },
  { color: "bg-purple-400", label: "Parking" },
  { color: "bg-red-400", label: "Incidents" },
  { color: "bg-cyan-400", label: "Washrooms" },
  { color: "bg-yellow-400", label: "Security" },
];

export function MapContent() {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [showRoutes, setShowRoutes] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col gap-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between flex-shrink-0"
      >
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Map className="w-6 h-6 text-blue-400" />
            Live Stadium Map
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">MetLife Stadium — Real-time Operations View</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mr-1.5" />
            Live
          </Badge>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 flex-wrap flex-shrink-0"
      >
        <button
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
            showHeatmap
              ? "bg-orange-500/20 border-orange-500/30 text-orange-300"
              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
          }`}
        >
          <Thermometer className="w-3.5 h-3.5" />
          Heatmap
        </button>

        <button
          onClick={() => setShowIncidents(!showIncidents)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
            showIncidents
              ? "bg-red-500/20 border-red-500/30 text-red-300"
              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Incidents
        </button>

        <button
          onClick={() => setShowRoutes(!showRoutes)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
            showRoutes
              ? "bg-blue-500/20 border-blue-500/30 text-blue-300"
              : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          AI Routes
        </button>

        <div className="flex items-center gap-1 ml-auto">
          {LEGEND_ITEMS.slice(0, 4).map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-slate-400 text-xs">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Map container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 rounded-2xl overflow-hidden border border-white/10 relative min-h-0"
      >
        <StadiumMap
          showHeatmap={showHeatmap}
          showIncidents={showIncidents}
          showRoutes={showRoutes}
        />

        {/* Map overlay info panel */}
        <div className="absolute top-4 right-4 z-[1000] glass-card p-4 max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-blue-400" />
            <span className="text-white text-sm font-semibold">Stadium Info</span>
          </div>
          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Total Capacity</span>
              <span className="text-white">82,500</span>
            </div>
            <div className="flex justify-between">
              <span>Current Occupancy</span>
              <span className="text-orange-400">72,450 (87%)</span>
            </div>
            <div className="flex justify-between">
              <span>Active Gates</span>
              <span className="text-green-400">9 / 10</span>
            </div>
            <div className="flex justify-between">
              <span>Medical Centers</span>
              <span className="text-white">6</span>
            </div>
            <div className="flex justify-between">
              <span>Food Courts</span>
              <span className="text-white">24</span>
            </div>
            <div className="flex justify-between">
              <span>Active Incidents</span>
              <span className="text-red-400">3</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
