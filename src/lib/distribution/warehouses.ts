export type Warehouse = {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lon: number;
  capacityPct: number; // 0..100
};

export const US_WAREHOUSES: Warehouse[] = [
  {
    id: "dlc-001",
    name: "DLA Richmond",
    city: "Richmond",
    state: "VA",
    lat: 37.5407,
    lon: -77.436,
    capacityPct: 62,
  },
  {
    id: "dlc-002",
    name: "DLA San Joaquin",
    city: "Stockton",
    state: "CA",
    lat: 37.9577,
    lon: -121.2908,
    capacityPct: 41,
  },
  {
    id: "dlc-003",
    name: "DLA Susquehanna",
    city: "New Cumberland",
    state: "PA",
    lat: 40.2204,
    lon: -76.8678,
    capacityPct: 74,
  },
  {
    id: "dlc-004",
    name: "DLA Red River",
    city: "Texarkana",
    state: "TX",
    lat: 33.4251,
    lon: -94.0477,
    capacityPct: 55,
  },
  {
    id: "dlc-005",
    name: "DLA Oklahoma City",
    city: "Oklahoma City",
    state: "OK",
    lat: 35.4676,
    lon: -97.5164,
    capacityPct: 33,
  },
];
