import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IncidentFeed, DEMO_INCIDENTS } from "@/components/dashboard/incident-feed";

describe("IncidentFeed Component", () => {
  it("renders with header and demo incidents correctly", () => {
    render(<IncidentFeed />);
    expect(screen.getByText("Incident Feed")).toBeInTheDocument();
    expect(screen.getByText("Live emergency updates")).toBeInTheDocument();

    // Check that at least some titles/descriptions are rendered
    expect(screen.getByText("Fan collapsed near Section C12")).toBeInTheDocument();
    expect(screen.getByText("Lost child at Gate 3")).toBeInTheDocument();
    expect(screen.getByText("Suspicious package near East Concourse")).toBeInTheDocument();
  });

  it("filters and shows custom incidents count in the badge", () => {
    const customIncidents = [
      {
        ...DEMO_INCIDENTS[0],
        id: "custom-1",
        status: "open" as const,
        severity: "medium" as const,
      },
      {
        ...DEMO_INCIDENTS[0],
        id: "custom-2",
        status: "resolved" as const,
        severity: "low" as const,
      }
    ];

    render(<IncidentFeed incidents={customIncidents} />);
    // There should be 1 Active badge count since one is open and one is resolved
    expect(screen.getByText("1 Active")).toBeInTheDocument();
  });
});
