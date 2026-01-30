"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";

export default function EmmaSuspenseLoader(props: {
  label?: string; // e.g. "C&E Dashboard"
  minMs?: number; // simulate backend wait
  maxMs?: number; // simulate backend wait
}) {
  const label = (props.label || "Page").trim();
  const minMs = Number.isFinite(props.minMs) ? Number(props.minMs) : 700;
  const maxMs = Number.isFinite(props.maxMs) ? Number(props.maxMs) : 1400;

  const [phase, setPhase] = React.useState<
    "initializing" | "fetching" | "hydrating" | "rendering"
  >("initializing");

  React.useEffect(() => {
    const span = Math.max(0, maxMs - minMs);
    const total = minMs + Math.floor(Math.random() * (span + 1));

    const t1 = window.setTimeout(
      () => setPhase("fetching"),
      Math.min(260, total),
    );
    const t2 = window.setTimeout(
      () => setPhase("hydrating"),
      Math.min(640, total),
    );
    const t3 = window.setTimeout(
      () => setPhase("rendering"),
      Math.min(920, total),
    );

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [minMs, maxMs]);

  const phaseText =
    phase === "initializing"
      ? "Initializing shell…"
      : phase === "fetching"
        ? "Waiting on backend…"
        : phase === "hydrating"
          ? "Hydrating UI…"
          : "Rendering…";

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "grid",
        placeItems: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#fff",

        opacity: 0,
        animation: "emmaLoaderReveal 520ms ease-out both",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: "-30%",
          pointerEvents: "none",
          background:
            "radial-gradient(800px 480px at 30% 20%, rgba(21,101,192,0.10), transparent 60%), radial-gradient(900px 520px at 70% 30%, rgba(46,125,50,0.08), transparent 62%), linear-gradient(115deg, rgba(21,101,192,0.00) 0%, rgba(21,101,192,0.08) 18%, rgba(46,125,50,0.08) 38%, rgba(21,101,192,0.06) 58%, rgba(46,125,50,0.00) 78%)",
          filter: "blur(18px)",
          opacity: 0.75,
          transform: "rotate(-6deg)",
          animation: "emmaLoaderShimmer 10s ease-in-out infinite",
        },

        "@keyframes emmaLoaderReveal": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "@keyframes emmaLoaderShimmer": {
          "0%": { transform: "translate3d(-6%, -2%, 0) rotate(-6deg)" },
          "50%": { transform: "translate3d(6%, 2%, 0) rotate(-6deg)" },
          "100%": { transform: "translate3d(-6%, -2%, 0) rotate(-6deg)" },
        },

        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
          opacity: 1,
          "&::before": { animation: "none" },
        },
      }}
    >
      <Box
        sx={{
          width: "min(520px, 100%)",
          px: 3,
          py: 2.75,
          borderRadius: 3,
          backgroundColor: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(15, 23, 42, 0.10)",
          boxShadow:
            "0 28px 90px rgba(15, 23, 42, 0.10), 0 10px 30px rgba(15, 23, 42, 0.06)",

          transformOrigin: "50% 60%",
          opacity: 0,
          transform: "translate3d(0, 10px, 0) scale(0.992)",
          filter: "blur(1.6px)",
          animation:
            "emmaLoaderCard 980ms cubic-bezier(.16,.84,.24,1) 90ms both",

          "@keyframes emmaLoaderCard": {
            "0%": {
              opacity: 0,
              transform: "translate3d(0, 10px, 0) scale(0.992)",
              filter: "blur(1.6px)",
            },
            "70%": {
              opacity: 1,
              transform: "translate3d(0, 0px, 0) scale(1)",
              filter: "blur(0px)",
            },
            "100%": {
              opacity: 1,
              transform: "translate3d(0, 0px, 0) scale(1)",
              filter: "blur(0px)",
            },
          },

          "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
            opacity: 1,
            transform: "none",
            filter: "none",
          },
        }}
      >
        <Typography sx={{ fontWeight: 950, letterSpacing: 0.2 }}>
          EMMA{" "}
          <Box
            component="span"
            sx={{ color: "rgba(10,20,35,0.55)", fontWeight: 850 }}
          >
            Loading —
          </Box>{" "}
          {label}
        </Typography>

        <Typography
          sx={{ mt: 0.75, fontSize: 12.5, color: "rgba(10,20,35,0.62)" }}
        >
          {phaseText}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              height: 8,
              borderRadius: 999,
              background: "rgba(10,20,35,0.08)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                width: "42%",
                borderRadius: 999,
                background:
                  "linear-gradient(90deg, rgba(31,111,235,0.15), rgba(31,111,235,0.55), rgba(46,125,50,0.35), rgba(31,111,235,0.15))",
                transform: "translate3d(-60%,0,0)",
                animation: "emmaBar 1.15s ease-in-out infinite",
                "@keyframes emmaBar": {
                  "0%": { transform: "translate3d(-60%,0,0)" },
                  "50%": { transform: "translate3d(120%,0,0)" },
                  "100%": { transform: "translate3d(-60%,0,0)" },
                },
                "@media (prefers-reduced-motion: reduce)": {
                  animation: "none",
                  transform: "none",
                  width: "100%",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
