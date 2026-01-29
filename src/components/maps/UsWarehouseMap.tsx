"use client";

import * as React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import type { Warehouse } from "@/lib/distribution/warehouses";

type UsWarehouseMapProps = {
  warehouses: Warehouse[];
  selectedId?: string | null;
  onSelectAction?: (id: string) => void;
  height?: number | string;
};

function clampPct(v: number) {
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(100, v));
}

function iconForWarehouse(pct: number, selected: boolean) {
  const v = clampPct(pct);
  const fill = v >= 75 ? "#0b4fa3" : v >= 50 ? "#1565c0" : "#1e88e5";

  const size = selected ? 36 : 28;
  const ring = selected
    ? "box-shadow: 0 0 0 3px rgba(30,136,229,0.22), 0 14px 22px rgba(15,23,42,0.18);"
    : "box-shadow: 0 10px 16px rgba(15,23,42,0.14);";
  const border = selected
    ? "2px solid rgba(10,20,35,0.22)"
    : "1px solid rgba(10,20,35,0.18)";

  const html = `
    <div style="
      width:${size}px;height:${size}px;border-radius:999px;
      background:linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.55));
      ${ring}
      display:grid;place-items:center;
      ${border}
    ">
      <div style="
        width:${Math.round(size * 0.64)}px;height:${Math.round(size * 0.64)}px;border-radius:999px;
        background:${fill};
        border:1px solid rgba(255,255,255,0.55);
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -2px 6px rgba(0,0,0,0.22);
        display:grid;place-items:center;
        font: 800 11px/1 system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
        color: rgba(255,255,255,0.95);
        text-shadow: 0 1px 0 rgba(0,0,0,0.18);
      ">
        ${Math.round(v)}
      </div>
    </div>
  `;

  return L.divIcon({
    className: "",
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function FocusSelectedButton(props: { selected?: Warehouse | null }) {
  const map = useMap();

  if (!props.selected) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 1000,
        display: "flex",
        gap: 8,
      }}
    >
      <button
        type="button"
        onClick={() => {
          map.flyTo([props.selected!.lat, props.selected!.lon], 7, {
            duration: 0.8,
          });
        }}
        style={{
          borderRadius: 999,
          padding: "7px 10px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.65))",
          border: "1px solid rgba(10,20,35,0.18)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.85), 0 10px 16px rgba(15,23,42,0.14)",
          font: "800 12px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
          color: "rgba(10,20,35,0.82)",
          cursor: "pointer",
        }}
      >
        Focus selected
      </button>
    </div>
  );
}

export default function UsWarehouseMap(props: UsWarehouseMapProps) {
  const height = props.height ?? "clamp(520px, 74vh, 820px)";
  const selected = React.useMemo(
    () => props.warehouses.find((w) => w.id === props.selectedId) ?? null,
    [props.warehouses, props.selectedId],
  );

  return (
    <div style={{ height, width: "100%", position: "relative" }}>
      <MapContainer
        center={[39.5, -98.35]}
        zoom={4}
        scrollWheelZoom
        style={{ height: "100%", width: "100%", borderRadius: 22 }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {props.warehouses.map((w) => {
          const isSel = w.id === props.selectedId;
          return (
            <Marker
              key={w.id}
              position={[w.lat, w.lon]}
              icon={iconForWarehouse(w.capacityPct, isSel)}
              eventHandlers={{
                click: () => props.onSelectAction?.(w.id),
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <div style={{ minWidth: 180 }}>
                  <div style={{ fontWeight: 900 }}>{w.name}</div>
                  <div style={{ opacity: 0.75, fontSize: 12 }}>
                    {w.city}, {w.state}
                  </div>
                  <div style={{ marginTop: 6, fontSize: 12 }}>
                    Capacity:{" "}
                    <strong>{Math.round(clampPct(w.capacityPct))}%</strong>
                  </div>
                </div>
              </Tooltip>
            </Marker>
          );
        })}

        <FocusSelectedButton selected={selected} />
      </MapContainer>
    </div>
  );
}
