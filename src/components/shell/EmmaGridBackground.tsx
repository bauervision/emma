// components/shell/EmmaGridBackground.tsx
"use client";

import * as React from "react";
import { Box } from "@mui/material";

export default function EmmaGridBackground(props: {
  children: React.ReactNode;
  sx?: any;
  contentSx?: any;
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#fff",

        // Fade the whole background layer in from white (subtle reveal)
        opacity: 0,
        animation: "emmaBgReveal 900ms ease-out 1 both",

        backgroundImage: [
          "radial-gradient(1200px 700px at 18% 12%, rgba(21,101,192,0.14), transparent 55%)",
          "radial-gradient(1000px 650px at 82% 22%, rgba(46,125,50,0.10), transparent 60%)",
          "linear-gradient(180deg, rgba(255,255,255,0.0), rgba(0,0,0,0.02))",
          "repeating-linear-gradient(45deg, rgba(15, 23, 42, 0.055) 0, rgba(15, 23, 42, 0.055) 1px, transparent 1px, transparent 44px)",
          "repeating-linear-gradient(135deg, rgba(15, 23, 42, 0.055) 0, rgba(15, 23, 42, 0.055) 1px, transparent 1px, transparent 44px)",
        ].join(", "),

        "&::before": {
          content: '""',
          position: "absolute",
          inset: "-40%",
          pointerEvents: "none",
          background:
            "linear-gradient(115deg, rgba(21,101,192,0.00) 0%, rgba(21,101,192,0.10) 18%, rgba(46,125,50,0.10) 38%, rgba(21,101,192,0.08) 58%, rgba(46,125,50,0.00) 78%)",
          filter: "blur(12px)",
          opacity: 0.75,
          transform: "rotate(-6deg)",
          animation: "emmaBgShimmer 10s ease-in-out infinite",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(900px 520px at 50% 30%, rgba(255,255,255,0.0), rgba(0,0,0,0.06) 70%, rgba(0,0,0,0.10) 100%)",
          opacity: 0.22,
          mixBlendMode: "multiply",
        },

        "@keyframes emmaBgReveal": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },

        "@keyframes emmaBgShimmer": {
          "0%": { transform: "translate3d(-6%, -2%, 0) rotate(-6deg)" },
          "50%": { transform: "translate3d(6%, 2%, 0) rotate(-6deg)" },
          "100%": { transform: "translate3d(-6%, -2%, 0) rotate(-6deg)" },
        },

        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
          opacity: 1,
          "&::before": { animation: "none" },
        },

        ...(props.sx ?? {}),
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          p: 3,
          ...(props.contentSx ?? {}),
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}
