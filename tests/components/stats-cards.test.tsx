import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { DashboardStats } from "@/types";

const mockStats: DashboardStats = {
  total_attendance: 72450,
  crowd_density: 87,
  avg_wait_time: 12,
  active_incidents: 3,
  medical_cases: 7,
  volunteers_active: 342,
  food_queue_avg: 8,
  parking_occupied: 91,
  transport_on_time: 82,
  emergency_alerts: 3,
};

describe("StatsCards Component", () => {
  it("renders all telemetry statistics correctly", () => {
    render(<StatsCards stats={mockStats} />);
    
    // Check main labels
    expect(screen.getByText("Total Attendance")).toBeInTheDocument();
    expect(screen.getByText("Crowd Density")).toBeInTheDocument();
    expect(screen.getByText("Avg Wait Time")).toBeInTheDocument();
    expect(screen.getByText("Emergency Alerts")).toBeInTheDocument();
    expect(screen.getByText("Medical Cases")).toBeInTheDocument();
    expect(screen.getByText("Volunteers Active")).toBeInTheDocument();
    expect(screen.getByText("Food Queue Avg")).toBeInTheDocument();
    expect(screen.getByText("Parking")).toBeInTheDocument();

    // Check parsed values
    expect(screen.getByText("72,450")).toBeInTheDocument();
    expect(screen.getByText("87%")).toBeInTheDocument();
    expect(screen.getByText("12m")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("342")).toBeInTheDocument();
    expect(screen.getByText("8m")).toBeInTheDocument();
    expect(screen.getByText("91%")).toBeInTheDocument();
  });
});
