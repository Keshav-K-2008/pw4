import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatDateTime,
  formatNumber,
  formatPercent,
  formatCrowdDensity,
  getCrowdDensityColor,
  formatDuration,
  getSeverityColor,
  getStatusColor,
  truncate,
  safeJsonParse,
  generateId
} from "@/lib/utils/format";

describe("Format Utilities", () => {
  describe("formatDate", () => {
    it("should format valid dates correctly", () => {
      expect(formatDate("2026-07-19")).toBe("Jul 19, 2026");
    });

    it("should return Invalid date for malformed input", () => {
      expect(formatDate("invalid-date-string")).toBe("Invalid date");
    });
  });

  describe("formatDateTime", () => {
    it("should format date and time correctly", () => {
      expect(formatDateTime("2026-07-19T11:30:00")).toBe("Jul 19, 2026 11:30");
    });
  });

  describe("formatNumber", () => {
    it("should format numbers with thousands separators", () => {
      expect(formatNumber(1250000)).toBe("1,250,000");
    });
  });

  describe("formatPercent", () => {
    it("should return the correct percentage string", () => {
      expect(formatPercent(40, 80)).toBe("50%");
    });

    it("should return 0% if total is 0", () => {
      expect(formatPercent(40, 0)).toBe("0%");
    });
  });

  describe("formatCrowdDensity", () => {
    it("should return Critical for density >= 90", () => {
      expect(formatCrowdDensity(95)).toBe("Critical");
    });

    it("should return High for density >= 75 and < 90", () => {
      expect(formatCrowdDensity(80)).toBe("High");
    });

    it("should return Moderate for density >= 50 and < 75", () => {
      expect(formatCrowdDensity(60)).toBe("Moderate");
    });

    it("should return Low for density < 50", () => {
      expect(formatCrowdDensity(30)).toBe("Low");
    });
  });

  describe("getCrowdDensityColor", () => {
    it("should return critical text color for density >= 90", () => {
      expect(getCrowdDensityColor(95)).toBe("text-critical");
    });

    it("should return success text color for density < 50", () => {
      expect(getCrowdDensityColor(40)).toBe("text-success");
    });
  });

  describe("formatDuration", () => {
    it("should format minutes below 60 correctly", () => {
      expect(formatDuration(45)).toBe("45m");
    });

    it("should format exact hours correctly", () => {
      expect(formatDuration(120)).toBe("2h");
    });

    it("should format hours and minutes correctly", () => {
      expect(formatDuration(135)).toBe("2h 15m");
    });
  });

  describe("getSeverityColor", () => {
    it("should return critical class style", () => {
      expect(getSeverityColor("critical")).toContain("text-red-400");
    });

    it("should return high class style", () => {
      expect(getSeverityColor("high")).toContain("text-orange-400");
    });

    it("should return medium class style", () => {
      expect(getSeverityColor("medium")).toContain("text-yellow-400");
    });

    it("should return low class style", () => {
      expect(getSeverityColor("low")).toContain("text-green-400");
    });

    it("should return default class style", () => {
      expect(getSeverityColor("unknown")).toContain("text-slate-400");
    });
  });

  describe("getStatusColor", () => {
    it("should return active class style", () => {
      expect(getStatusColor("active")).toContain("text-green-400");
    });

    it("should return resolved class style", () => {
      expect(getStatusColor("resolved")).toContain("text-blue-400");
    });

    it("should return pending class style", () => {
      expect(getStatusColor("pending")).toContain("text-yellow-400");
    });

    it("should return critical class style", () => {
      expect(getStatusColor("critical")).toContain("text-red-400");
    });

    it("should return default class style", () => {
      expect(getStatusColor("unknown")).toContain("text-slate-400");
    });
  });

  describe("truncate", () => {
    it("should truncate long strings and append ellipses", () => {
      expect(truncate("Hello World Test", 5)).toBe("Hello...");
    });

    it("should leave short strings intact", () => {
      expect(truncate("Hello", 10)).toBe("Hello");
    });
  });

  describe("safeJsonParse", () => {
    it("should parse valid JSON correctly", () => {
      expect(safeJsonParse('{"a": 1}', {})).toEqual({ a: 1 });
    });

    it("should return fallback on invalid JSON", () => {
      expect(safeJsonParse("invalid-json", { b: 2 })).toEqual({ b: 2 });
    });
  });

  describe("generateId", () => {
    it("should generate a valid UUID format string", () => {
      const id = generateId();
      expect(id).toBeDefined();
      expect(id).toHaveLength(36);
      expect(id.split("-")).toHaveLength(5);
    });
  });
});
