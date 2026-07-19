import { describe, it, expect, beforeEach } from "vitest";
import { useStadiumStore } from "@/lib/store/use-stadium-store";
import { Stadium, Match, DashboardStats, CrowdData } from "@/types";

describe("useStadiumStore", () => {
  beforeEach(() => {
    // Reset Zustand store state before each test
    useStadiumStore.setState({
      selectedStadium: {
        id: "stad-001",
        name: "MetLife Stadium",
        city: "East Rutherford",
        country: "USA",
        capacity: 82500,
        latitude: 40.8135,
        longitude: -74.0745,
        address: "1 MetLife Stadium Dr, East Rutherford, NJ 07073",
        timezone: "America/New_York",
        facilities: ["medical_center", "food_courts", "parking", "metro_access"],
        created_at: "",
        updated_at: "",
      },
      activeMatch: null,
      dashboardStats: null,
      latestCrowdData: null,
      isLiveMode: true,
    });
  });

  it("should initialize with default selected stadium and live mode true", () => {
    const state = useStadiumStore.getState();
    expect(state.selectedStadium?.id).toBe("stad-001");
    expect(state.selectedStadium?.name).toBe("MetLife Stadium");
    expect(state.isLiveMode).toBe(true);
    expect(state.activeMatch).toBeNull();
  });

  it("should set selected stadium", () => {
    const mockStadium: Stadium = {
      id: "stad-999",
      name: "SoFi Stadium",
      city: "Los Angeles",
      country: "USA",
      capacity: 70000,
      latitude: 33.9534,
      longitude: -118.3387,
      address: "1001 Stadium Dr, Inglewood, CA 90301",
      timezone: "America/Los_Angeles",
      facilities: ["parking"],
      created_at: "",
      updated_at: "",
    };

    useStadiumStore.getState().setSelectedStadium(mockStadium);
    expect(useStadiumStore.getState().selectedStadium).toEqual(mockStadium);
  });

  it("should set active match", () => {
    const mockMatch: Match = {
      id: "match-101",
      stadium_id: "stad-001",
      home_team: "Argentina",
      away_team: "France",
      kickoff_time: "2026-07-19T18:00:00Z",
      status: "scheduled",
      attendance: 0,
      created_at: "",
      updated_at: "",
    };

    useStadiumStore.getState().setActiveMatch(mockMatch);
    expect(useStadiumStore.getState().activeMatch).toEqual(mockMatch);
  });

  it("should set dashboard stats", () => {
    const mockStats: DashboardStats = {
      active_incidents: 4,
      crowd_density: 78,
      gate_queue_time: 15,
      food_wait_time: 8,
      parking_occupancy: 92,
      transit_status: "on_time",
    };

    useStadiumStore.getState().setDashboardStats(mockStats);
    expect(useStadiumStore.getState().dashboardStats).toEqual(mockStats);
  });

  it("should set latest crowd data", () => {
    const mockCrowdData: CrowdData = {
      id: "crowd-111",
      stadium_id: "stad-001",
      section_id: "sec-101",
      occupancy: 450,
      capacity: 500,
      density: 90,
      timestamp: "2026-07-19T12:00:00Z",
    };

    useStadiumStore.getState().setLatestCrowdData(mockCrowdData);
    expect(useStadiumStore.getState().latestCrowdData).toEqual(mockCrowdData);
  });

  it("should toggle live mode", () => {
    useStadiumStore.getState().setLiveMode(false);
    expect(useStadiumStore.getState().isLiveMode).toBe(false);
  });
});
