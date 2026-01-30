"use client";

import dynamic from "next/dynamic";
import React from "react";
import {
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import { US_WAREHOUSES } from "@/lib/distribution/warehouses";

const UsWarehouseMap = dynamic(
  () => import("@/components/maps/UsWarehouseMap"),
  {
    ssr: false,
    loading: () => (
      <Box
        sx={{
          height: 560,
          borderRadius: 3,
          bgcolor: "rgba(15,23,42,0.04)",
          border: "1px solid rgba(15,23,42,0.10)",
        }}
      />
    ),
  },
);

function GovBackdrop() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: -24,
        pointerEvents: "none",
        background:
          "radial-gradient(900px 420px at 18% 10%, rgba(11,92,171,0.14), transparent 55%), radial-gradient(700px 360px at 78% 22%, rgba(43,122,75,0.10), transparent 60%), linear-gradient(180deg, rgba(2,6,23,0.02), rgba(2,6,23,0.00))",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.25,
          backgroundImage:
            "linear-gradient(rgba(2,6,23,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(2,6,23,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(80% 60% at 50% 30%, #000 40%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(80% 60% at 50% 30%, #000 40%, transparent 70%)",
        }}
      />
    </Box>
  );
}

export default function DistributionView() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const selectedWarehouse = React.useMemo(() => {
    if (!selectedId) return null;
    return US_WAREHOUSES.find((w: any) => w.id === selectedId) ?? null;
  }, [selectedId]);

  const detailsOpen = Boolean(selectedWarehouse);

  return (
    <Box sx={{ position: "relative" }}>
      <GovBackdrop />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "360px 1fr" },
          gap: 2,
          alignItems: "start",
        }}
      >
        {/* LEFT COLUMN: two distinct panels (main + floating behind) */}
        <Box
          sx={{
            position: "relative",
            // Reserve space *outside* the main Paper so the floating panel can exist
            // without making the main panel taller.
            pb: detailsOpen ? "170px" : 0,
          }}
        >
          {/* Panel A: Main Warehouses panel */}
          <Paper
            sx={{
              position: "relative",
              zIndex: 2,
              p: 2.25,
              borderRadius: 3,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78))",
              backdropFilter: "blur(10px)",
              boxShadow: "0 26px 70px rgba(15,23,42,0.12)",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Warehouses</Typography>
              <Chip
                size="small"
                label="Distribution"
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 900 }}
              />
            </Stack>

            <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.75 }}>
              Select a warehouse to view inventory and capacity.
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Selected warehouse preview (this is the only thing inside Panel A) */}
            <Box
              sx={{
                borderRadius: 3,
                border: "1px dashed rgba(15,23,42,0.18)",
                bgcolor: "rgba(15,23,42,0.03)",
                p: 2,
                overflow: "hidden",
              }}
            >
              <AnimatedSwap swapKey={selectedId ?? "none"}>
                {!selectedWarehouse ? (
                  <>
                    <Typography fontWeight={900} sx={{ mb: 0.75 }}>
                      No warehouse selected
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.75 }}>
                      Click a marker on the map (next step) or pick from the
                      dropdown.
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        Capacity (example)
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={62}
                        sx={{
                          mt: 0.75,
                          height: 10,
                          borderRadius: 999,
                          bgcolor: "rgba(15,23,42,0.10)",
                          "& .MuiLinearProgress-bar": { borderRadius: 999 },
                        }}
                      />
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        62% full
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Box sx={{ display: "grid", gap: 1.25 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography fontWeight={950}>
                        {selectedWarehouse.name}
                      </Typography>
                      <Chip
                        size="small"
                        label={selectedWarehouse.id}
                        variant="outlined"
                        sx={{ fontWeight: 900 }}
                      />
                    </Stack>

                    <Typography variant="body2" sx={{ opacity: 0.75 }}>
                      {selectedWarehouse.city}, {selectedWarehouse.state}
                    </Typography>

                    <Divider sx={{ my: 0.75 }} />

                    <Box sx={{ mt: 0.25 }}>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        Capacity
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.round(selectedWarehouse.capacityPct)}
                        sx={{
                          mt: 0.75,
                          height: 10,
                          borderRadius: 999,
                          bgcolor: "rgba(15,23,42,0.10)",
                          "& .MuiLinearProgress-bar": { borderRadius: 999 },
                        }}
                      />
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {Math.round(selectedWarehouse.capacityPct)}% full
                      </Typography>
                    </Box>
                  </Box>
                )}
              </AnimatedSwap>
            </Box>
          </Paper>

          {/* Panel B: Floating details panel behind Panel A */}
          {detailsOpen ? (
            <Box
              key={`details:${selectedId ?? "none"}`}
              sx={{
                position: "absolute",
                left: 16,
                right: 16,

                // Your tuned position
                top: "calc(100% - 160px)",
                zIndex: 1,

                // Important: no clipPath (it causes the edge halo)
                pointerEvents: "none",
              }}
            >
              {/* Reveal wrapper: clips content cleanly without clipPath artifacts */}
              <Box
                sx={{
                  pointerEvents: "none",
                  overflow: "hidden",
                  borderRadius: 3,

                  // Start hidden, then reveal down
                  maxHeight: 0,
                  opacity: 0,
                  transform: "translate3d(0, -10px, 0)",

                  "@keyframes emmaBehindReveal": {
                    "0%": {
                      maxHeight: 0,
                      opacity: 0,
                      transform: "translate3d(0, -10px, 0)",
                    },
                    "60%": {
                      maxHeight: 260,
                      opacity: 1,
                      transform: "translate3d(0, 10px, 0)",
                    },
                    "100%": {
                      maxHeight: 260,
                      opacity: 1,
                      transform: "translate3d(0, 0px, 0)",
                    },
                  },

                  animation:
                    "emmaBehindReveal 520ms cubic-bezier(.16,.84,.24,1) 170ms both",

                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                    maxHeight: "none",
                    opacity: 1,
                    transform: "none",
                  },
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    pointerEvents: "auto",
                    position: "relative",
                    p: 1.75,
                    pt: 2.25,
                    borderRadius: 3,
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.86), rgba(255,255,255,0.72))",
                    border: "1px solid rgba(15,23,42,0.08)",

                    // Keep this subtle; no big halo shadow
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.65), 0 10px 22px rgba(15,23,42,0.08)",
                  }}
                >
                  <Stack spacing={1}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography sx={{ fontWeight: 950, fontSize: 13.5 }}>
                        Warehouse details
                      </Typography>
                      <Chip
                        size="small"
                        label="Live soon"
                        variant="outlined"
                        sx={{ fontWeight: 900, opacity: 0.75 }}
                      />
                    </Stack>

                    <Divider />

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Chip
                        size="small"
                        label={`Region: ${(selectedWarehouse as any).region ?? "—"}`}
                        sx={{ fontWeight: 850 }}
                      />
                      <Chip
                        size="small"
                        label={`Manager: ${(selectedWarehouse as any).manager ?? "—"}`}
                        sx={{ fontWeight: 850 }}
                      />
                      <Chip
                        size="small"
                        label={`Dock doors: ${(selectedWarehouse as any).dockDoors ?? "—"}`}
                        sx={{ fontWeight: 850 }}
                      />
                      <Chip
                        size="small"
                        label={`Alerts: ${(selectedWarehouse as any).alertCount ?? "0"}`}
                        sx={{ fontWeight: 850 }}
                      />
                    </Stack>

                    <Typography variant="caption" sx={{ opacity: 0.65 }}>
                      Next: swap these stubs for real metrics and inventory
                      rows.
                    </Typography>
                  </Stack>
                </Paper>
              </Box>
            </Box>
          ) : null}
        </Box>

        {/* RIGHT COLUMN: Map frame */}
        <Paper
          sx={{
            p: 1.25,
            borderRadius: 3,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78))",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 1,
              pb: 1,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                size="small"
                label="US Map"
                variant="outlined"
                sx={{ fontWeight: 900 }}
              />
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Warehouse coverage &amp; inventory visibility
              </Typography>
            </Stack>

            <Chip
              size="small"
              label="Live tiles"
              sx={{
                fontWeight: 900,
                bgcolor: "rgba(11,92,171,0.10)",
                border: "1px solid rgba(11,92,171,0.18)",
              }}
            />
          </Box>

          <Box
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid rgba(15,23,42,0.14)",
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.35), 0 18px 40px rgba(15,23,42,0.10)",
            }}
          >
            <UsWarehouseMap
              height="clamp(520px, 74vh, 820px)"
              warehouses={US_WAREHOUSES}
              selectedId={selectedId}
              onSelectAction={setSelectedId}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

function AnimatedSwap(props: { swapKey: string; children: React.ReactNode }) {
  return (
    <Box
      key={props.swapKey}
      sx={{
        "@keyframes emmaPreviewIn": {
          from: {
            opacity: 0,
            transform: "translate3d(0, 8px, 0)",
            filter: "blur(1.2px)",
          },
          to: {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
            filter: "blur(0px)",
          },
        },
        animation: "emmaPreviewIn 260ms ease-out both",
        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
        },
      }}
    >
      {props.children}
    </Box>
  );
}
