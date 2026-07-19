import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CrowdChart, EntryExitChart, TransportChart, CustomTooltip } from "@/components/dashboard/crowd-chart";

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

describe("CustomTooltip", () => {
  it("renders null when not active", () => {
    const { container } = render(<CustomTooltip active={false} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders details when active with payload", () => {
    render(
      <CustomTooltip
        active={true}
        label="18:00"
        payload={[{ name: "Crowd", value: 81000, color: "#3b82f6" }]}
      />
    );
    expect(screen.getByText("18:00")).toBeInTheDocument();
    expect(screen.getByText("Crowd:")).toBeInTheDocument();
    expect(screen.getByText("81,000")).toBeInTheDocument();
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
