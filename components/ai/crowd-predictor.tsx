"use client";

import { useState } from "react";
import { Brain, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CrowdPredictor() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{
    risk_level: string;
    peak_count: number;
    peak_time: string;
    recommendations: string[];
  } | null>(null);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentCount: 72450,
          capacity: 82500,
          matchTime: "67' Live",
          historicalPattern: "FIFA World Cup high-attendance group stage match",
        }),
      });
      const data = await res.json();
      setPrediction(data);
    } catch {
      // Fallback local mock data on failure
      setPrediction({
        risk_level: "high",
        peak_count: 81000,
        peak_time: "Post-match outflow (+1h)",
        recommendations: [
          "Activate auxiliary exit gates 10 and 12",
          "Deploy 15 additional transit guides to Metro Line 4",
          "Push real-time navigation alerts to fan mobile apps",
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-semibold">AI Crowd Predictor Engine</h3>
        </div>
        <Button size="sm" onClick={handlePredict} isLoading={loading} variant="glow">
          Generate Forecast
        </Button>
      </div>

      {!prediction && !loading && (
        <p className="text-slate-400 text-sm">
          Click generate to analyze real-time sensor metrics and model crowd flows for the next 4 hours.
        </p>
      )}

      {loading && (
        <div className="py-6 text-center space-y-2">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 text-xs">Simulating outflow scenarios with Gemini...</p>
        </div>
      )}

      {prediction && !loading && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
            <div>
              <span className="text-slate-400 text-xs">Risk Profile</span>
              <div className="text-white font-bold text-sm capitalize">{prediction.risk_level} congestion risk</div>
            </div>
            <Badge variant={prediction.risk_level === "high" || prediction.risk_level === "critical" ? "critical" : "success"}>
              {prediction.risk_level.toUpperCase()}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-400 text-xs">Peak Forecast</span>
              <div className="text-white font-bold text-sm mt-0.5">{prediction.peak_count.toLocaleString()} fans</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-slate-400 text-xs">Forecast Peak Time</span>
              <div className="text-white font-bold text-sm mt-0.5">{prediction.peak_time}</div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Engine Directives</span>
            {prediction.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/10 text-xs text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
