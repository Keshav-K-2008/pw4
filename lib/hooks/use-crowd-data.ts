"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { CrowdData } from "@/types";

export function useCrowdData(stadiumId: string, matchId?: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["crowd-data", stadiumId, matchId],
    queryFn: async (): Promise<CrowdData[]> => {
      let query = supabase
        .from("crowd_data")
        .select("*")
        .eq("stadium_id", stadiumId)
        .order("timestamp", { ascending: false })
        .limit(24);

      if (matchId) {
        query = query.eq("match_id", matchId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 15000,
  });
}

export function useLatestCrowd(stadiumId: string) {
  const supabase = createClient();

  return useQuery({
    queryKey: ["crowd-latest", stadiumId],
    queryFn: async (): Promise<CrowdData | null> => {
      const { data, error } = await supabase
        .from("crowd_data")
        .select("*")
        .eq("stadium_id", stadiumId)
        .order("timestamp", { ascending: false })
        .limit(1)
        .single();

      if (error) return null;
      return data;
    },
    refetchInterval: 15000,
    staleTime: 10000,
  });
}
