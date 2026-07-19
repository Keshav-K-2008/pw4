"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { Profile } from "@/types";

const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
};

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { setUser, setSession, setLoading } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setSession({
          access_token: session.access_token,
          expires_at: session.expires_at ?? 0,
        });

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          setUser(profile as Profile);
        }
      }

      setLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setSession({
          access_token: session.access_token,
          expires_at: session.expires_at ?? 0,
        });

        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) setUser(profile as Profile);
      } else {
        setUser(null);
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, setUser, setSession, setLoading]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>{children}</AuthInitializer>
    </QueryClientProvider>
  );
}
