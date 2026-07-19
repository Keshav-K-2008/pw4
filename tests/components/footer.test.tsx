import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/footer";

describe("Footer Component", () => {
  it("renders correctly with logo and key links", () => {
    render(<Footer />);
    expect(screen.getByText("StadiumMind")).toBeInTheDocument();
    expect(screen.getAllByText(/FIFA World Cup 2026/i).length).toBeGreaterThan(0);
    expect(screen.getByText("MetLife Stadium, NJ/NY")).toBeInTheDocument();
    expect(screen.getByText("Operations Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Emergency Dispatch")).toBeInTheDocument();
    expect(screen.getByText("Security Control")).toBeInTheDocument();
    expect(screen.getByText("Medical Coordination")).toBeInTheDocument();
  });
});
