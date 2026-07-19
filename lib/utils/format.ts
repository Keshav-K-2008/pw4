import { format, formatDistanceToNow, isValid } from "date-fns";

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (!isValid(d)) return "Invalid date";
  return format(d, "MMM dd, yyyy");
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (!isValid(d)) return "Invalid date";
  return format(d, "MMM dd, yyyy HH:mm");
}

export function formatTimeAgo(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (!isValid(d)) return "Unknown";
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function formatPercent(value: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

export function formatCrowdDensity(density: number): string {
  if (density >= 90) return "Critical";
  if (density >= 75) return "High";
  if (density >= 50) return "Moderate";
  return "Low";
}

export function getCrowdDensityColor(density: number): string {
  if (density >= 90) return "text-critical";
  if (density >= 75) return "text-warning";
  if (density >= 50) return "text-info";
  return "text-success";
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function getSeverityColor(severity: string): string {
  switch (severity?.toLowerCase()) {
    case "critical": return "text-red-400 bg-red-400/10 border-red-400/20";
    case "high": return "text-orange-400 bg-orange-400/10 border-orange-400/20";
    case "medium": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    case "low": return "text-green-400 bg-green-400/10 border-green-400/20";
    default: return "text-slate-400 bg-slate-400/10 border-slate-400/20";
  }
}

export function getStatusColor(status: string): string {
  switch (status?.toLowerCase()) {
    case "active": return "text-green-400 bg-green-400/10";
    case "resolved": return "text-blue-400 bg-blue-400/10";
    case "pending": return "text-yellow-400 bg-yellow-400/10";
    case "critical": return "text-red-400 bg-red-400/10";
    default: return "text-slate-400 bg-slate-400/10";
  }
}

export function truncate(str: string, length: number = 100): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function safeJsonParse<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}
