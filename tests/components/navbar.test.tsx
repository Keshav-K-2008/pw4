import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("should update search input on change", () => {
    render(<Navbar />);
    const input = screen.getByPlaceholderText(/search gates/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Gate 3" } });
    expect(input.value).toBe("Gate 3");
  });

  it("should toggle notifications dropdown on click", async () => {
    render(<Navbar />);
    const notifBtn = screen.getByRole("button", { name: /notifications dropdown/i });
    expect(screen.queryByText("Mark all read")).not.toBeInTheDocument();
    
    // Toggle open
    fireEvent.click(notifBtn);
    expect(screen.getByText("Mark all read")).toBeInTheDocument();
    expect(screen.getByText("Test Alert")).toBeInTheDocument();
  });

  it("should toggle user profile dropdown on click and handle sign out", async () => {
    render(<Navbar />);
    const profileBtn = screen.getByRole("button", { name: /user profile dropdown/i });
    expect(screen.queryByText("Sign Out")).not.toBeInTheDocument();

    // Toggle open
    fireEvent.click(profileBtn);
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();

    // Click sign out
    const signOutBtn = screen.getByText("Sign Out");
    fireEvent.click(signOutBtn);
  });
});
