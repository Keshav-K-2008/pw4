import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/navbar";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock Supabase client
vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      signOut: vi.fn().mockResolvedValue({}),
    },
  }),
}));

// Mock Zustand auth store
vi.mock("@/lib/store/use-auth-store", () => ({
  useAuthStore: () => ({
    user: { full_name: "John Doe", role: "admin" },
    signOut: vi.fn(),
  }),
}));

// Mock Zustand notification store
vi.mock("@/lib/store/use-notification-store", () => ({
  useNotificationStore: () => ({
    notifications: [
      {
        id: "1",
        title: "Test Alert",
        body: "Something happened",
        type: "warning",
        created_at: new Date().toISOString(),
        is_read: false,
      },
    ],
    unreadCount: 1,
    markAllAsRead: vi.fn(),
  }),
}));

describe("Navbar Component", () => {
  it("should render search input and user profile", () => {
    render(<Navbar />);
    expect(screen.getByPlaceholderText(/search gates/i)).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
  });
});
