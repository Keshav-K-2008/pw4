import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { Profile } from "@/types";

describe("useAuthStore", () => {
  beforeEach(() => {
    // Reset Zustand store state before each test
    useAuthStore.setState({
      user: null,
      session: null,
      isLoading: true,
    });
  });

  it("should initialize with default null user and session", () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.session).toBeNull();
    expect(state.isLoading).toBe(true);
  });

  it("should set user profile", () => {
    const mockUser: Profile = {
      id: "user-123",
      email: "test@example.com",
      full_name: "Test User",
      role: "volunteer",
      phone: null,
      language: "en",
      accessibility_needs: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    useAuthStore.getState().setUser(mockUser);
    expect(useAuthStore.getState().user).toEqual(mockUser);
  });

  it("should set session credentials", () => {
    const mockSession = {
      access_token: "token-abc-123",
      expires_at: 9999999999,
    };

    useAuthStore.getState().setSession(mockSession);
    expect(useAuthStore.getState().session).toEqual(mockSession);
  });

  it("should set loading status", () => {
    useAuthStore.getState().setLoading(false);
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("should clear user and session on signOut", () => {
    const mockUser: Profile = {
      id: "user-123",
      email: "test@example.com",
      full_name: "Test User",
      role: "volunteer",
      phone: null,
      language: "en",
      accessibility_needs: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    const mockSession = {
      access_token: "token-abc-123",
      expires_at: 9999999999,
    };

    useAuthStore.getState().setUser(mockUser);
    useAuthStore.getState().setSession(mockSession);
    expect(useAuthStore.getState().user).toEqual(mockUser);

    useAuthStore.getState().signOut();
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().session).toBeNull();
  });
});
