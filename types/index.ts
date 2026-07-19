// ============================================================
// StadiumMind AI — TypeScript Types
// ============================================================

export type UserRole = "fan" | "volunteer" | "security" | "admin" | "medical" | "operations";

export type IncidentType =
  | "medical_emergency"
  | "lost_child"
  | "fire"
  | "suspicious_activity"
  | "crowd_stampede"
  | "security_threat"
  | "infrastructure"
  | "other";

export type IncidentSeverity = "low" | "medium" | "high" | "critical";
export type IncidentStatus = "open" | "in_progress" | "resolved" | "closed";

export type TransportMode = "metro" | "bus" | "taxi" | "parking" | "walking";
export type TransportStatus = "on_time" | "delayed" | "disrupted" | "cancelled";

export type GateStatus = "open" | "closed" | "restricted";
export type SectionType = "general" | "vip" | "disabled" | "press" | "family";

export type CrowdLevel = "low" | "moderate" | "high" | "critical";

// ─── User & Auth ──────────────────────────────────────────

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  phone: string | null;
  language: string;
  accessibility_needs: string[];
  created_at: string;
  updated_at: string;
}

// ─── Stadium ──────────────────────────────────────────────

export interface Stadium {
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
}

export interface Match {
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
  status: "scheduled" | "live" | "completed" | "postponed";
  created_at: string;
  updated_at: string;
}

export interface Gate {
  id: string;
  stadium_id: string;
  name: string;
  label: string;
  gate_type: "entry" | "exit" | "emergency" | "vip" | "staff";
  status: GateStatus;
  capacity_per_minute: number;
  current_queue: number;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}

export interface Section {
  id: string;
  stadium_id: string;
  name: string;
  label: string;
  type: SectionType;
  capacity: number;
  current_occupancy: number;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}

// ─── Crowd Data ───────────────────────────────────────────

export interface CrowdData {
  id: string;
  stadium_id: string;
  match_id: string | null;
  section_id: string | null;
  gate_id: string | null;
  total_count: number;
  density_percent: number;
  crowd_level: CrowdLevel;
  timestamp: string;
  predicted_next_hour: number;
  ai_recommendation: string | null;
  created_at: string;
}

export interface CrowdPrediction {
  hour: number;
  predicted_count: number;
  confidence: number;
  crowd_level: CrowdLevel;
}

// ─── Incidents ────────────────────────────────────────────

export interface Incident {
  id: string;
  stadium_id: string;
  match_id: string | null;
  type: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
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
}

// ─── Staff ────────────────────────────────────────────────

export interface Volunteer {
  id: string;
  profile_id: string;
  stadium_id: string;
  name: string;
  email: string;
  phone: string;
  zone: string;
  skills: string[];
  assigned_tasks: string[];
  status: "available" | "on_task" | "break" | "off_duty";
  performance_score: number;
  tasks_completed: number;
  shift_start: string;
  shift_end: string;
  created_at: string;
  updated_at: string;
}

export interface SecurityStaff {
  id: string;
  profile_id: string;
  stadium_id: string;
  name: string;
  badge_number: string;
  unit: string;
  patrol_zone: string;
  status: "on_patrol" | "incident_response" | "standby" | "off_duty";
  threat_clearance: "standard" | "enhanced" | "maximum";
  created_at: string;
  updated_at: string;
}

export interface MedicalStaff {
  id: string;
  profile_id: string;
  stadium_id: string;
  name: string;
  specialization: string;
  unit: string;
  location: string;
  status: "available" | "responding" | "at_hospital" | "off_duty";
  cases_handled: number;
  created_at: string;
  updated_at: string;
}

// ─── Transport ────────────────────────────────────────────

export interface Transport {
  id: string;
  stadium_id: string;
  mode: TransportMode;
  route_name: string;
  origin: string;
  destination: string;
  status: TransportStatus;
  frequency_minutes: number;
  capacity: number;
  current_load: number;
  next_departure: string;
  delay_minutes: number;
  ai_suggestion: string | null;
  created_at: string;
  updated_at: string;
}

export interface Parking {
  id: string;
  stadium_id: string;
  zone: string;
  name: string;
  total_spots: number;
  occupied_spots: number;
  ev_spots: number;
  disabled_spots: number;
  price_per_hour: number;
  status: "open" | "full" | "closed";
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}

// ─── Facilities ───────────────────────────────────────────

export interface FoodCourt {
  id: string;
  stadium_id: string;
  name: string;
  location: string;
  section_id: string | null;
  queue_length: number;
  wait_time_minutes: number;
  status: "open" | "closed" | "busy";
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
}

export interface Route {
  id: string;
  stadium_id: string;
  name: string;
  from_location: string;
  to_location: string;
  distance_meters: number;
  estimated_time_minutes: number;
  is_accessible: boolean;
  is_emergency: boolean;
  waypoints: Array<{ lat: number; lng: number }>;
  created_at: string;
  updated_at: string;
}

// ─── Notifications ────────────────────────────────────────

export interface Notification {
  id: string;
  user_id: string | null;
  stadium_id: string | null;
  title: string;
  body: string;
  type: "info" | "warning" | "critical" | "success";
  category: "emergency" | "transport" | "crowd" | "weather" | "general";
  is_read: boolean;
  action_url: string | null;
  created_at: string;
}

// ─── Chat ─────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  language?: string;
  timestamp: string;
  metadata?: {
    location?: string;
    route?: string;
    eta?: string;
    recommendation?: string;
  };
}

export interface ChatSession {
  id: string;
  user_id: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

// ─── Analytics ────────────────────────────────────────────

export interface Analytics {
  id: string;
  stadium_id: string;
  match_id: string | null;
  metric_type: string;
  metric_value: number;
  breakdown: Record<string, number>;
  period_start: string;
  period_end: string;
  created_at: string;
}

export interface Report {
  id: string;
  stadium_id: string;
  match_id: string | null;
  type: "daily" | "match" | "crowd" | "incident" | "volunteer" | "transport";
  title: string;
  summary: string;
  data: Record<string, unknown>;
  generated_by: string;
  created_at: string;
}

// ─── API Responses ────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// ─── Dashboard Stats ──────────────────────────────────────

export interface DashboardStats {
  total_attendance: number;
  crowd_density: number;
  avg_wait_time: number;
  active_incidents: number;
  medical_cases: number;
  volunteers_active: number;
  food_queue_avg: number;
  parking_occupied: number;
  transport_on_time: number;
  emergency_alerts: number;
}

// ─── Map ──────────────────────────────────────────────────

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: "gate" | "section" | "food" | "medical" | "parking" | "washroom" | "security" | "exit" | "vip";
  label: string;
  status?: string;
  data?: Record<string, unknown>;
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}
