import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CrowdChart, EntryExitChart, TransportChart } from "@/components/dashboard/crowd-chart";

// Mock ResponsiveContainer to bypass its zero-width/height SSR check in jsdom
vi.mock("recharts", async () => {
  const original = await vi.importActual<typeof import("recharts")>("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 800, height: 400 }}>{children}</div>
    ),
  };
});

describe("CrowdChart Component", () => {
  it("renders crowd chart title and metrics", () => {
    render(<CrowdChart />);
    expect(screen.getByText("Crowd Flow — Match Day")).toBeInTheDocument();
    expect(screen.getByText("Peak at 18:00")).toBeInTheDocument();
  });
});

describe("EntryExitChart Component", () => {
  it("renders entry and exit chart titles", () => {
    render(<EntryExitChart />);
    expect(screen.getByText("Entry & Exit Rate")).toBeInTheDocument();
  });
});

describe("TransportChart Component", () => {
  it("renders current transport statistics and usage percent", () => {
    render(<TransportChart />);
    expect(screen.getByText("Transport Usage")).toBeInTheDocument();
    expect(screen.getByText("Metro")).toBeInTheDocument();
    expect(screen.getByText("Bus")).toBeInTheDocument();
    expect(screen.getByText("Parking")).toBeInTheDocument();
  });
});
