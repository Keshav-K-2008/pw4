"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Plus,
  Phone,
  Clock,
  MapPin,
  Cpu,
  Shield,
  Heart,
  Baby,
  Flame,
  Eye,
  Wind,
  MoreHorizontal,
} from "lucide-react";
import { incidentSchema, IncidentFormData } from "@/lib/validations/incident";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DEMO_INCIDENTS } from "@/components/dashboard/incident-feed";
import { toast } from "sonner";
import { formatTimeAgo } from "@/lib/utils/format";

const INCIDENT_TYPES = [
  { value: "medical_emergency", label: "🏥 Medical Emergency" },
  { value: "lost_child", label: "👶 Lost Child" },
  { value: "fire", label: "🔥 Fire" },
  { value: "suspicious_activity", label: "👁️ Suspicious Activity" },
  { value: "crowd_stampede", label: "🌊 Crowd Surge/Stampede" },
  { value: "security_threat", label: "🚨 Security Threat" },
  { value: "infrastructure", label: "🏗️ Infrastructure Issue" },
  { value: "other", label: "⚠️ Other" },
];

const SEVERITY_OPTIONS = [
  { value: "low", label: "Low — Non-urgent" },
  { value: "medium", label: "Medium — Requires attention" },
  { value: "high", label: "High — Urgent response needed" },
  { value: "critical", label: "Critical — Immediate emergency" },
];

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  medical_emergency: Heart,
  lost_child: Baby,
  fire: Flame,
  suspicious_activity: Eye,
  crowd_stampede: Wind,
  security_threat: Shield,
  infrastructure: MoreHorizontal,
  other: AlertTriangle,
};

function ReportForm({ onClose }: { onClose: () => void }) {
  const [aiSummary, setAiSummary] = useState<{
    summary: string;
    immediate_actions: string[];
    priority_score: number;
    recommended_team: string;
    communication_message: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<IncidentFormData>({
    resolver: zodResolver(incidentSchema),
    defaultValues: {
      severity: "medium",
      stadium_id: "stad-001",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchSeverity = watch("severity");

  const onSubmit = async (data: IncidentFormData) => {
    setIsGenerating(true);

    // Get AI summary
    try {
      const res = await fetch("/api/ai/incident", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const summary = await res.json();
      setAiSummary(summary);
    } catch {
      toast.error("Could not generate AI summary");
    } finally {
      setIsGenerating(false);
    }

    toast.success("Incident reported!", {
      description: `Priority score: ${aiSummary?.priority_score ?? "N/A"}/10 — ${data.title}`,
    });
  };

  if (aiSummary) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
          <Cpu className="w-5 h-5 text-green-400 flex-shrink-0" />
          <div>
            <div className="text-green-400 font-semibold text-sm">Incident Reported — AI Analysis Complete</div>
            <div className="text-green-300 text-xs mt-0.5">Priority Score: {aiSummary.priority_score}/10</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
          <div>
            <div className="text-slate-400 text-xs mb-1">AI Summary</div>
            <p className="text-white text-sm">{aiSummary.summary}</p>
          </div>
          <div>
            <div className="text-slate-400 text-xs mb-1">Recommended Team</div>
            <Badge variant="info">{aiSummary.recommended_team}</Badge>
          </div>
          <div>
            <div className="text-slate-400 text-xs mb-1">Immediate Actions</div>
            <ul className="space-y-1">
              {aiSummary.immediate_actions.map((action, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-blue-400 mt-0.5">•</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-slate-400 text-xs mb-1">Public Communication</div>
            <p className="text-slate-300 text-sm italic">&ldquo;{aiSummary.communication_message}&rdquo;</p>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Select
        label="Incident Type"
        options={INCIDENT_TYPES}
        placeholder="Select incident type"
        error={errors.type?.message}
        {...register("type")}
      />

      <Select
        label="Severity"
        options={SEVERITY_OPTIONS}
        error={errors.severity?.message}
        {...register("severity")}
      />

      <Input
        label="Title"
        placeholder="Brief incident title..."
        error={errors.title?.message}
        {...register("title")}
      />

      <Textarea
        label="Description"
        placeholder="Describe what happened, who is involved, current situation..."
        error={errors.description?.message}
        className="min-h-[100px]"
        {...register("description")}
      />

      <Input
        label="Location"
        placeholder="Gate number, Section, Level..."
        error={errors.location_name?.message}
        {...register("location_name")}
      />

      {watchSeverity === "critical" && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span className="text-red-300 text-sm">CRITICAL: All emergency teams will be notified immediately</span>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant={watchSeverity === "critical" ? "destructive" : "glow"}
          className="flex-1"
          isLoading={isSubmitting || isGenerating}
        >
          {isGenerating ? "AI Processing..." : "Report Incident"}
        </Button>
      </div>
    </form>
  );
}

export function EmergencyContent() {
  const [open, setOpen] = useState(false);
  const activeIncidents = DEMO_INCIDENTS.filter((i) => i.status !== "resolved");
  const resolvedIncidents = DEMO_INCIDENTS.filter((i) => i.status === "resolved");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            Emergency Center
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">Real-time incident management</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" className="gap-2">
              <Plus className="w-4 h-4" />
              Report Incident
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Report New Incident
              </DialogTitle>
            </DialogHeader>
            <ReportForm onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Emergency contacts bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        {[
          { label: "Medical Emergency", number: "911 / Ext 2200", color: "text-red-400 border-red-500/20 bg-red-500/5" },
          { label: "Security Control", number: "Ext 2100", color: "text-orange-400 border-orange-500/20 bg-orange-500/5" },
          { label: "Fire Department", number: "911 / Ext 2300", color: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5" },
          { label: "Operations HQ", number: "Ext 2000", color: "text-blue-400 border-blue-500/20 bg-blue-500/5" },
        ].map((contact) => (
          <div key={contact.label} className={`p-3 rounded-xl border ${contact.color}`}>
            <div className="flex items-center gap-2 mb-1">
              <Phone className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{contact.label}</span>
            </div>
            <div className="text-white font-bold text-sm">{contact.number}</div>
          </div>
        ))}
      </motion.div>

      {/* Active incidents */}
      <div>
        <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          Active Incidents ({activeIncidents.length})
        </h2>
        <div className="space-y-3">
          <AnimatePresence>
            {activeIncidents.map((incident, i) => {
              const Icon = typeIcons[incident.type] ?? AlertTriangle;
              return (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                      incident.severity === "critical" || incident.severity === "high"
                        ? "bg-red-500/10 border-red-500/20 text-red-400"
                        : incident.severity === "medium"
                        ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                        : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 flex-wrap">
                        <h3 className="text-white font-semibold flex-1">{incident.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              incident.severity === "critical" || incident.severity === "high"
                                ? "critical"
                                : incident.severity === "medium"
                                ? "warning"
                                : "success"
                            }
                          >
                            {incident.severity.toUpperCase()}
                          </Badge>
                          <Badge variant={incident.status === "in_progress" ? "info" : "warning"}>
                            {incident.status.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-slate-400 text-sm mt-1">{incident.description}</p>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          {incident.location_name}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(incident.created_at)}
                        </span>
                        {incident.assigned_team && (
                          <span className="flex items-center gap-1.5">
                            <Shield className="w-3 h-3" />
                            {incident.assigned_team}
                          </span>
                        )}
                        {incident.estimated_eta && incident.estimated_eta > 0 && (
                          <span className="text-blue-400">ETA: {incident.estimated_eta} min</span>
                        )}
                        <span className="text-orange-400">
                          AI Priority: {incident.ai_priority_score}/10
                        </span>
                      </div>

                      {incident.ai_summary && (
                        <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                          <Cpu className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <p className="text-slate-300 text-xs">{incident.ai_summary}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Resolved incidents */}
      {resolvedIncidents.length > 0 && (
        <div>
          <h2 className="text-slate-400 font-semibold mb-3">
            Resolved Today ({resolvedIncidents.length})
          </h2>
          <div className="space-y-2">
            {resolvedIncidents.map((incident) => (
              <div key={incident.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 opacity-60">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="text-slate-300 text-sm">{incident.title}</div>
                  <div className="text-slate-500 text-xs mt-0.5 flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {incident.location_name}
                    <span>•</span>
                    {incident.resolved_at && formatTimeAgo(incident.resolved_at)}
                  </div>
                </div>
                <Badge variant="success">Resolved</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
