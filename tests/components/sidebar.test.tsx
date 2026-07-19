import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Sidebar } from "@/components/layout/sidebar";

const mockUsePathname = vi.fn().mockReturnValue("/dashboard");
const mockUseAuthStore = vi.fn();

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

// Mock Zustand auth store
vi.mock("@/lib/store/use-auth-store", () => ({
  useAuthStore: () => mockUseAuthStore(),
}));

describe("Sidebar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders base items for guest/unrestricted routes", () => {
    mockUseAuthStore.mockReturnValue({
      user: null,
    });

    render(<Sidebar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Live Map")).toBeInTheDocument();
    expect(screen.getByText("AI Assistant")).toBeInTheDocument();
    expect(screen.getByText("Crowd Analysis")).toBeInTheDocument();
    expect(screen.getByText("Emergency")).toBeInTheDocument();
    expect(screen.getByText("Transport")).toBeInTheDocument();
    
    // Admin & Analytics should not show for guests/volunteers without permissions
    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
    expect(screen.queryByText("Analytics")).not.toBeInTheDocument();
  });

  it("renders volunteer specific links when logged in as volunteer", () => {
    mockUseAuthStore.mockReturnValue({
      user: { role: "volunteer" },
    });

    render(<Sidebar />);
    expect(screen.getByText("Volunteers")).toBeInTheDocument();
    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
    expect(screen.queryByText("Security")).not.toBeInTheDocument();
  });

  it("renders all items when logged in as admin", () => {
    mockUseAuthStore.mockReturnValue({
      user: { role: "admin" },
    });

    render(<Sidebar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Volunteers")).toBeInTheDocument();
    expect(screen.getByText("Security")).toBeInTheDocument();
    expect(screen.getByText("Medical")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });
});
