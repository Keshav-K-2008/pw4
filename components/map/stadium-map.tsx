"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icons
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const STADIUM_CENTER: [number, number] = [40.8135, -74.0745];
const STADIUM_ZOOM = 16;

// Create colored icons
function createIcon(color: string, emoji: string) {
  return L.divIcon({
    html: `<div style="
      background: ${color};
      width: 32px; height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid rgba(255,255,255,0.8);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    "><span style="transform: rotate(45deg); font-size: 14px;">${emoji}</span></div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

const GATES = [
  { id: "G1", name: "Gate 1 — North Entry", lat: 40.8160, lng: -74.0745, queue: 8, status: "open" },
  { id: "G2", name: "Gate 2 — Northeast", lat: 40.8155, lng: -74.0720, queue: 12, status: "open" },
  { id: "G3", name: "Gate 3 — East Entry", lat: 40.8135, lng: -74.0710, queue: 5, status: "open" },
  { id: "G4", name: "Gate 4 — Southeast", lat: 40.8115, lng: -74.0720, queue: 18, status: "high" },
  { id: "G5", name: "Gate 5 — South Entry", lat: 40.8110, lng: -74.0745, queue: 22, status: "critical" },
  { id: "G6", name: "Gate 6 — Southwest", lat: 40.8115, lng: -74.0770, queue: 15, status: "open" },
  { id: "G7", name: "Gate 7 — West Entry", lat: 40.8135, lng: -74.0780, queue: 7, status: "open" },
  { id: "G8", name: "Gate 8 — Northwest", lat: 40.8155, lng: -74.0770, queue: 9, status: "open" },
  { id: "G9", name: "VIP Gate A", lat: 40.8165, lng: -74.0755, queue: 1, status: "vip" },
  { id: "G10", name: "Staff Gate", lat: 40.8108, lng: -74.0755, queue: 0, status: "staff" },
];

const MEDICAL_STATIONS = [
  { id: "M1", name: "Medical Center North", lat: 40.8152, lng: -74.0742 },
  { id: "M2", name: "Medical Center South", lat: 40.8118, lng: -74.0748 },
  { id: "M3", name: "First Aid — East", lat: 40.8135, lng: -74.0718 },
  { id: "M4", name: "First Aid — West", lat: 40.8135, lng: -74.0772 },
];

const FOOD_COURTS = [
  { id: "F1", name: "Food Court A — North", lat: 40.8148, lng: -74.0735, queue: 8 },
  { id: "F2", name: "Food Court B — East", lat: 40.8130, lng: -74.0715, queue: 14 },
  { id: "F3", name: "Food Court C — South", lat: 40.8120, lng: -74.0750, queue: 6 },
  { id: "F4", name: "Food Court D — West", lat: 40.8140, lng: -74.0775, queue: 20 },
  { id: "F5", name: "VIP Lounge Catering", lat: 40.8145, lng: -74.0758, queue: 2 },
];

const PARKING = [
  { id: "P1", name: "Parking Lot A", lat: 40.8175, lng: -74.0745, pct: 94 },
  { id: "P2", name: "Parking Lot B", lat: 40.8175, lng: -74.0720, pct: 88 },
  { id: "P3", name: "Parking Lot C", lat: 40.8095, lng: -74.0745, pct: 97 },
];

const INCIDENTS = [
  { id: "I1", lat: 40.8132, lng: -74.0740, type: "medical", label: "Medical Emergency" },
  { id: "I2", lat: 40.8150, lng: -74.0710, type: "security", label: "Lost Child" },
  { id: "I3", lat: 40.8130, lng: -74.0718, type: "suspicious", label: "Suspicious Activity" },
];

// Heatmap circles based on density
const DENSITY_ZONES = [
  { lat: 40.8135, lng: -74.0745, density: 90, radius: 150 },
  { lat: 40.8148, lng: -74.0730, density: 75, radius: 100 },
  { lat: 40.8122, lng: -74.0752, density: 85, radius: 120 },
  { lat: 40.8140, lng: -74.0760, density: 60, radius: 80 },
  { lat: 40.8130, lng: -74.0730, density: 95, radius: 100 },
];

// AI recommended routes
const ROUTES = [
  [
    [40.8175, -74.0745] as [number, number],
    [40.8160, -74.0745] as [number, number],
    [40.8150, -74.0742] as [number, number],
  ],
  [
    [40.8095, -74.0745] as [number, number],
    [40.8110, -74.0745] as [number, number],
    [40.8120, -74.0748] as [number, number],
  ],
];

function getDensityColor(density: number): string {
  if (density >= 90) return "#FF2D55";
  if (density >= 75) return "#FF9F0A";
  if (density >= 60) return "#FFCC00";
  return "#30D158";
}

function getQueueColor(queue: number): string {
  if (queue >= 20) return "#FF2D55";
  if (queue >= 15) return "#FF9F0A";
  if (queue >= 10) return "#FFCC00";
  return "#30D158";
}

interface StadiumMapProps {
  showHeatmap?: boolean;
  showIncidents?: boolean;
  showRoutes?: boolean;
}

export function StadiumMap({ showHeatmap = true, showIncidents = true, showRoutes = false }: StadiumMapProps) {
  return (
    <MapContainer
      center={STADIUM_CENTER}
      zoom={STADIUM_ZOOM}
      style={{ height: "100%", width: "100%" }}
      zoomControl={true}
    >
      {/* Dark map tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* Heatmap density circles */}
      {showHeatmap &&
        DENSITY_ZONES.map((zone) => (
          <Circle
            key={zone.lat + zone.lng}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
            pathOptions={{
              color: getDensityColor(zone.density),
              fillColor: getDensityColor(zone.density),
              fillOpacity: 0.25,
              weight: 1,
            }}
          >
            <Popup>
              <div className="text-center p-1">
                <div className="font-semibold">Crowd Density</div>
                <div style={{ color: getDensityColor(zone.density) }}>{zone.density}%</div>
              </div>
            </Popup>
          </Circle>
        ))}

      {/* Gates */}
      {GATES.map((gate) => (
        <Marker
          key={gate.id}
          position={[gate.lat, gate.lng]}
          icon={createIcon(
            gate.status === "critical" ? "#FF2D55" :
            gate.status === "high" ? "#FF9F0A" :
            gate.status === "vip" ? "#C8A951" :
            gate.status === "staff" ? "#8B5CF6" : "#0A84FF",
            gate.status === "vip" ? "⭐" : "🚪"
          )}
        >
          <Popup>
            <div className="p-2 min-w-32">
              <div className="font-bold text-sm">{gate.name}</div>
              <div className="text-xs mt-1 space-y-0.5">
                <div>Status: <span style={{ color: getQueueColor(gate.queue) }}>{gate.status.toUpperCase()}</span></div>
                <div>Queue: <strong>{gate.queue} min</strong></div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Medical stations */}
      {MEDICAL_STATIONS.map((med) => (
        <Marker
          key={med.id}
          position={[med.lat, med.lng]}
          icon={createIcon("#30D158", "🏥")}
        >
          <Popup>
            <div className="p-2">
              <div className="font-bold text-sm">{med.name}</div>
              <div className="text-xs text-green-600">Available</div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Food courts */}
      {FOOD_COURTS.map((food) => (
        <Marker
          key={food.id}
          position={[food.lat, food.lng]}
          icon={createIcon("#FF9F0A", "🍔")}
        >
          <Popup>
            <div className="p-2">
              <div className="font-bold text-sm">{food.name}</div>
              <div className="text-xs mt-1">Queue: <strong>{food.queue} min</strong></div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Parking */}
      {PARKING.map((park) => (
        <Marker
          key={park.id}
          position={[park.lat, park.lng]}
          icon={createIcon(park.pct >= 95 ? "#FF2D55" : "#8B5CF6", "🅿️")}
        >
          <Popup>
            <div className="p-2">
              <div className="font-bold text-sm">{park.name}</div>
              <div className="text-xs mt-1">
                Occupancy: <strong style={{ color: park.pct >= 95 ? "#FF2D55" : "#30D158" }}>{park.pct}%</strong>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Incidents */}
      {showIncidents &&
        INCIDENTS.map((inc) => (
          <Marker
            key={inc.id}
            position={[inc.lat, inc.lng]}
            icon={createIcon("#FF2D55", "🚨")}
          >
            <Popup>
              <div className="p-2">
                <div className="font-bold text-sm text-red-600">⚠️ {inc.label}</div>
                <div className="text-xs mt-1">Response team dispatched</div>
              </div>
            </Popup>
          </Marker>
        ))}

      {/* AI Recommended Routes */}
      {showRoutes &&
        ROUTES.map((route, i) => (
          <Polyline
            key={i}
            positions={route}
            pathOptions={{
              color: "#3b82f6",
              weight: 4,
              opacity: 0.8,
              dashArray: "8, 4",
            }}
          />
        ))}

      {/* Stadium boundary */}
      <Circle
        center={STADIUM_CENTER}
        radius={400}
        pathOptions={{
          color: "rgba(0, 61, 165, 0.4)",
          fillColor: "rgba(0, 61, 165, 0.05)",
          fillOpacity: 1,
          weight: 2,
          dashArray: "6, 4",
        }}
      />
    </MapContainer>
  );
}
