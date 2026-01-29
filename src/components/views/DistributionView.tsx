"use client";

import dynamic from "next/dynamic";
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
import React from "react";

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
      {/* subtle topo/grid feel */}
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
        {/* Control card */}
        <Paper
          sx={{
            p: 2.25,
            borderRadius: 3,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.78))",
            backdropFilter: "blur(10px)",
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

          {/* Empty-state preview */}
          <Box
            sx={{
              borderRadius: 3,
              border: "1px dashed rgba(15,23,42,0.18)",
              bgcolor: "rgba(15,23,42,0.03)",
              p: 2,
            }}
          >
            <Typography fontWeight={900} sx={{ mb: 0.75 }}>
              No warehouse selected
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.75 }}>
              Click a marker on the map (next step) or pick from the dropdown.
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
          </Box>
        </Paper>

        {/* Map frame */}
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
