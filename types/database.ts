// Auto-generated Supabase database types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          role: string;
          phone: string | null;
          language: string;
          accessibility_needs: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      stadiums: {
        Row: {
          id: string;
          name: string;
          city: string;
          country: string;
          capacity: number;
          latitude: number;
          longitude: number;
          address: string;
          timezone: string;
          facilities: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["stadiums"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["stadiums"]["Insert"]>;
      };
      matches: {
        Row: {
          id: string;
          stadium_id: string;
          home_team: string;
          away_team: string;
          home_flag: string;
          away_flag: string;
          match_date: string;
          kickoff_time: string;
          group_stage: string;
          expected_attendance: number;
          actual_attendance: number | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["matches"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["matches"]["Insert"]>;
      };
      gates: {
        Row: {
          id: string;
          stadium_id: string;
          name: string;
          label: string;
          gate_type: string;
          status: string;
          capacity_per_minute: number;
          current_queue: number;
          latitude: number;
          longitude: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["gates"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["gates"]["Insert"]>;
      };
      sections: {
        Row: {
          id: string;
          stadium_id: string;
          name: string;
          label: string;
          type: string;
          capacity: number;
          current_occupancy: number;
          latitude: number;
          longitude: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["sections"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["sections"]["Insert"]>;
      };
      crowd_data: {
        Row: {
          id: string;
          stadium_id: string;
          match_id: string | null;
          section_id: string | null;
          gate_id: string | null;
          total_count: number;
          density_percent: number;
          crowd_level: string;
          timestamp: string;
          predicted_next_hour: number;
          ai_recommendation: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["crowd_data"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["crowd_data"]["Insert"]>;
      };
      incidents: {
        Row: {
          id: string;
          stadium_id: string;
          match_id: string | null;
          type: string;
          severity: string;
          status: string;
          title: string;
          description: string;
          location_lat: number | null;
          location_lng: number | null;
          location_name: string;
          reported_by: string;
          assigned_team: string | null;
          response_team_ids: string[];
          ai_summary: string | null;
          ai_priority_score: number;
          estimated_eta: number | null;
          resolved_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["incidents"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["incidents"]["Insert"]>;
      };
      volunteers: {
        Row: {
          id: string;
          profile_id: string;
          stadium_id: string;
          name: string;
          email: string;
          phone: string;
          zone: string;
          skills: string[];
          assigned_tasks: string[];
          status: string;
          performance_score: number;
          tasks_completed: number;
          shift_start: string;
          shift_end: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["volunteers"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["volunteers"]["Insert"]>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string | null;
          stadium_id: string | null;
          title: string;
          body: string;
          type: string;
          category: string;
          is_read: boolean;
          action_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["notifications"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
      };
      chat_history: {
        Row: {
          id: string;
          user_id: string;
          messages: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["chat_history"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["chat_history"]["Insert"]>;
      };
      transport: {
        Row: {
          id: string;
          stadium_id: string;
          mode: string;
          route_name: string;
          origin: string;
          destination: string;
          status: string;
          frequency_minutes: number;
          capacity: number;
          current_load: number;
          next_departure: string;
          delay_minutes: number;
          ai_suggestion: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["transport"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["transport"]["Insert"]>;
      };
      parking: {
        Row: {
          id: string;
          stadium_id: string;
          zone: string;
          name: string;
          total_spots: number;
          occupied_spots: number;
          ev_spots: number;
          disabled_spots: number;
          price_per_hour: number;
          status: string;
          latitude: number;
          longitude: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["parking"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["parking"]["Insert"]>;
      };
      food_courts: {
        Row: {
          id: string;
          stadium_id: string;
          name: string;
          location: string;
          section_id: string | null;
          queue_length: number;
          wait_time_minutes: number;
          status: string;
          latitude: number;
          longitude: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["food_courts"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["food_courts"]["Insert"]>;
      };
    };
    Views: {
      dashboard_stats: {
        Row: {
          total_attendance: number;
          crowd_density: number;
          active_incidents: number;
          volunteers_active: number;
        };
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
