import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

let client: SupabaseClient<Database> | null = null;

export function createClient() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
    client = createBrowserClient<Database>(url, key);
  }
  return client;
}
