import { z } from "zod";

export const incidentSchema = z.object({
  stadium_id: z.string(),
  type: z.enum([
    "medical_emergency",
    "lost_child",
    "fire",
    "suspicious_activity",
    "crowd_stampede",
    "security_threat",
    "infrastructure",
    "other",
  ]),
  severity: z.enum(["low", "medium", "high", "critical"]),
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Too long"),
  description: z.string().min(10, "Please describe the incident in detail"),
  location_name: z.string().min(2, "Please provide a location"),
  location_lat: z.number().optional(),
  location_lng: z.number().optional(),
});

export type IncidentFormData = z.infer<typeof incidentSchema>;
