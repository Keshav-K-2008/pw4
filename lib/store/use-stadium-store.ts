import { create } from "zustand";
import { Stadium, Match, DashboardStats, CrowdData } from "@/types";

interface StadiumState {
  selectedStadium: Stadium | null;
  activeMatch: Match | null;
  dashboardStats: DashboardStats | null;
  latestCrowdData: CrowdData | null;
  isLiveMode: boolean;
  setSelectedStadium: (stadium: Stadium | null) => void;
  setActiveMatch: (match: Match | null) => void;
  setDashboardStats: (stats: DashboardStats | null) => void;
  setLatestCrowdData: (data: CrowdData | null) => void;
  setLiveMode: (live: boolean) => void;
}

const DEFAULT_STADIUM: Stadium = {
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
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const useStadiumStore = create<StadiumState>()((set) => ({
  selectedStadium: DEFAULT_STADIUM,
  activeMatch: null,
  dashboardStats: null,
  latestCrowdData: null,
  isLiveMode: true,
  setSelectedStadium: (selectedStadium) => set({ selectedStadium }),
  setActiveMatch: (activeMatch) => set({ activeMatch }),
  setDashboardStats: (dashboardStats) => set({ dashboardStats }),
  setLatestCrowdData: (latestCrowdData) => set({ latestCrowdData }),
  setLiveMode: (isLiveMode) => set({ isLiveMode }),
}));
