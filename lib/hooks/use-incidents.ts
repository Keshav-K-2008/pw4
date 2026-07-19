"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { Incident } from "@/types";
import { toast } from "sonner";

export function useIncidents(stadiumId: string, status?: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["incidents", stadiumId, status],
    queryFn: async (): Promise<Incident[]> => {
      let query = supabase
        .from("incidents")
        .select("*")
        .eq("stadium_id", stadiumId)
        .order("created_at", { ascending: false });

      if (status) {
        query = query.eq("status", status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    refetchInterval: 10000,
  });
}

export function useCreateIncident() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (incident: Omit<Incident, "id" | "created_at" | "updated_at">) => {
      // Get AI summary first
      const aiResponse = await fetch("/api/ai/incident", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incident),
      });
      const aiData = await aiResponse.json();

      const { data, error } = await (supabase as any)
        .from("incidents")
        .insert({
          ...incident,
          ai_summary: aiData.summary ?? null,
          ai_priority_score: aiData.priority_score ?? 5,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      toast.success("Incident reported successfully", {
        description: `Priority score: ${data.ai_priority_score}/10`,
      });
    },
    onError: (error) => {
      toast.error("Failed to report incident", {
        description: error.message,
      });
    },
  });
}

export function useUpdateIncident() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Incident> & { id: string }) => {
      const { data, error } = await (supabase as any)
        .from("incidents")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
      toast.success("Incident updated");
    },
  });
}
