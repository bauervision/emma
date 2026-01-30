// components/shell/LeftInfoPanels.tsx
"use client";

import * as React from "react";
import { Box, Divider, Typography, Stack, Chip, Button } from "@mui/material";
import type { EmmaRole } from "@/lib/auth";

export function InfoContextPanel(props: {
  role: EmmaRole | null;
  pathname: string;
}) {
  return (
    <Box
      sx={{
        borderRadius: 2, // no-pill
        border: "1px solid rgba(10,20,35,0.10)",
        background: "rgba(255,255,255,0.75)",
        p: 1.5,
      }}
    >
      <Typography sx={{ fontWeight: 950, color: "rgba(10,20,35,0.84)" }}>
        Context
      </Typography>
      <Typography sx={{ fontSize: 12, color: "rgba(10,20,35,0.60)", mt: 0.25 }}>
        Quick orientation and system state.
      </Typography>

      <Divider sx={{ my: 1.25 }} />

      <Stack spacing={1.1}>
        <Box>
          <Typography
            sx={{ fontSize: 12, fontWeight: 850, color: "rgba(10,20,35,0.70)" }}
          >
            Role
          </Typography>
          <Typography sx={{ fontSize: 13, color: "rgba(10,20,35,0.82)" }}>
            {humanRole(props.role)}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{ fontSize: 12, fontWeight: 850, color: "rgba(10,20,35,0.70)" }}
          >
            View
          </Typography>
          <Typography sx={{ fontSize: 13, color: "rgba(10,20,35,0.82)" }}>
            {routeLabel(props.pathname)}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 850,
              color: "rgba(10,20,35,0.70)",
              mb: 0.75,
            }}
          >
            Status
          </Typography>

          <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
            <Chip
              size="small"
              label="Data fresh"
              sx={{
                fontWeight: 850,
                background: "rgba(16,179,163,0.14)",
                color: "rgba(7,59,55,0.95)",
                border: "1px solid rgba(16,179,163,0.28)",
                borderRadius: 2,
              }}
            />
            <Chip
              size="small"
              label="Alerts: 0"
              sx={{
                fontWeight: 850,
                background: "rgba(31,111,235,0.10)",
                color: "rgba(25,95,208,0.95)",
                border: "1px solid rgba(31,111,235,0.20)",
                borderRadius: 2,
              }}
            />
            <Chip
              size="small"
              label="Sync OK"
              sx={{
                fontWeight: 850,
                background: "rgba(10,20,35,0.06)",
                color: "rgba(10,20,35,0.72)",
                border: "1px solid rgba(10,20,35,0.10)",
                borderRadius: 2,
              }}
            />
          </Stack>
        </Box>

        <Box>
          <Typography
            sx={{ fontSize: 12, fontWeight: 850, color: "rgba(10,20,35,0.70)" }}
          >
            Selected entity
          </Typography>
          <Typography sx={{ fontSize: 13, color: "rgba(10,20,35,0.55)" }}>
            None selected (placeholder)
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export function InfoAuditPanel() {
  const items = [
    { what: "Opened C&T view", when: "Just now" },
    { what: "Viewed shipment S-1029", when: "3m ago" },
    { what: "Requested anomaly scan", when: "9m ago" },
    { what: "Assigned task to Ops", when: "15m ago" },
    { what: "Signed in", when: "22m ago" },
  ];

  return (
    <Box
      sx={{
        borderRadius: 2, // no-pill
        border: "1px solid rgba(10,20,35,0.10)",
        background: "rgba(255,255,255,0.75)",
        p: 1.5,
      }}
    >
      <Typography sx={{ fontWeight: 950, color: "rgba(10,20,35,0.84)" }}>
        Audit
      </Typography>
      <Typography sx={{ fontSize: 12, color: "rgba(10,20,35,0.60)", mt: 0.25 }}>
        Recent actions (placeholder).
      </Typography>

      <Divider sx={{ my: 1.25 }} />

      <Stack spacing={1}>
        {items.map((it, idx) => (
          <Box
            key={idx}
            sx={{
              borderRadius: 2,
              border: "1px solid rgba(10,20,35,0.08)",
              background: "rgba(255,255,255,0.72)",
              px: 1.25,
              py: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 850,
                color: "rgba(10,20,35,0.80)",
              }}
            >
              {it.what}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "rgba(10,20,35,0.55)" }}>
              {it.when}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export function InfoQuickPanel(props: {
  onPickAction: (prompt: string) => void;
}) {
  const prompts = [
    "Summarize this view.",
    "What should I check next?",
    "Any anomalies in the last hour?",
    "Draft a response for leadership.",
    "List the highest-risk items.",
    "What changed since yesterday?",
    "Show pending approvals.",
    "Where are we blocked?",
  ];

  return (
    <Box
      sx={{
        borderRadius: 2, // no-pill
        border: "1px solid rgba(10,20,35,0.10)",
        background: "rgba(255,255,255,0.75)",
        p: 1.5,
      }}
    >
      <Typography sx={{ fontWeight: 950, color: "rgba(10,20,35,0.84)" }}>
        Quick Prompts
      </Typography>
      <Typography sx={{ fontSize: 12, color: "rgba(10,20,35,0.60)", mt: 0.25 }}>
        Tap to switch focus.
      </Typography>

      <Divider sx={{ my: 1.25 }} />

      <Stack spacing={0.9}>
        {prompts.map((p) => (
          <Button
            key={p}
            onClick={() => props.onPickAction(p)}
            disableElevation
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              borderRadius: 2, // no-pill
              px: 1.25,
              py: 1,
              fontWeight: 850,
              color: "rgba(10,20,35,0.78)",
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(10,20,35,0.10)",
              "&:hover": { background: "rgba(255,255,255,0.86)" },
            }}
          >
            {p}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}

function humanRole(role: EmmaRole | null) {
  switch (role) {
    case "distribution":
      return "Distribution";
    case "ct":
      return "C&T";
    case "ce":
      return "C&E";
    case "super":
      return "Super";
    default:
      return "—";
  }
}

function routeLabel(pathname: string) {
  if (pathname === "/") return "Home";
  const hit = NAV_LABELS[pathname];
  if (hit) return hit;
  return pathname.replace("/", "").toUpperCase() || "Home";
}

const NAV_LABELS: Record<string, string> = {
  "/distribution": "Distribution",
  "/ct": "C&T",
  "/ce": "C&E",
  "/super": "Super Dashboard",
};
