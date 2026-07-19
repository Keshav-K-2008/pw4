"use client";

// Configurations and utility types for the Leaflet heatmap density visualization
export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number; // value from 0 to 1
  radius: number; // in meters
}

export const STADIUM_HEATMAP_POINTS: HeatmapPoint[] = [
  { lat: 40.8135, lng: -74.0745, intensity: 0.95, radius: 150 }, // Stadium Center / Pitch area
  { lat: 40.8148, lng: -74.0730, intensity: 0.80, radius: 100 }, // North Concourse queue
  { lat: 40.8122, lng: -74.0752, intensity: 0.90, radius: 120 }, // South Stand fan zone
  { lat: 40.8140, lng: -74.0760, intensity: 0.65, radius: 80 },  // West Stand access
  { lat: 40.8130, lng: -74.0730, intensity: 0.92, radius: 100 }, // East Concourse food court
];

export function getHeatmapColor(intensity: number): string {
  if (intensity >= 0.9) return "rgba(239, 68, 68, 0.4)"; // Red glow for critical congestion
  if (intensity >= 0.75) return "rgba(249, 115, 22, 0.4)"; // Orange glow for high congestion
  if (intensity >= 0.5) return "rgba(234, 179, 8, 0.4)";  // Yellow glow for moderate congestion
  return "rgba(34, 197, 94, 0.4)"; // Green glow for clear
}
