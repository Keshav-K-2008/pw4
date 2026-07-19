"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useNotificationStore } from "@/lib/store/use-notification-store";
import { useStadiumStore } from "@/lib/store/use-stadium-store";
import { Notification, Incident, CrowdData } from "@/types";

export function useRealtimeNotifications(userId?: string) {
  const supabase = createClient();
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          addNotification(payload.new as Notification);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, supabase, addNotification]);
}

export function useRealtimeIncidents(stadiumId?: string, onIncident?: (incident: Incident) => void) {
  const supabase = createClient();

  useEffect(() => {
    if (!stadiumId) return;

    const channel = supabase
      .channel(`incidents:${stadiumId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "incidents",
          filter: `stadium_id=eq.${stadiumId}`,
        },
        (payload) => {
          if (onIncident && payload.new) {
            onIncident(payload.new as Incident);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [stadiumId, supabase, onIncident]);
}

export function useRealtimeCrowd(stadiumId?: string) {
  const supabase = createClient();
  const setLatestCrowdData = useStadiumStore((s) => s.setLatestCrowdData);

  useEffect(() => {
    if (!stadiumId) return;

    const channel = supabase
      .channel(`crowd:${stadiumId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "crowd_data",
          filter: `stadium_id=eq.${stadiumId}`,
        },
        (payload) => {
          setLatestCrowdData(payload.new as CrowdData);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [stadiumId, supabase, setLatestCrowdData]);
}
