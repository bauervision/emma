//components.shell/PageEntrance.tsx
"use client";

import * as React from "react";
import { Box } from "@mui/material";

export default function PageEntrance(props: {
  children: React.ReactNode;
  animKey?: string;
}) {
  return (
    <Box
      key={props.animKey}
      sx={{
        position: "relative",
        minHeight: 0,

        // background reveal (fade from white)
        opacity: 0,
        animation: "emmaPageReveal 520ms ease-out 1 both",

        // one-time page settle
        transformOrigin: "50% 30%",
        transform: "translate3d(0, 10px, 0) scale(0.992)",
        filter: "blur(1.6px)",
        animationName: "emmaPageReveal, emmaPageSettle",
        animationDuration: "520ms, 980ms",
        animationTimingFunction:
          "cubic-bezier(.16,.84,.24,1), cubic-bezier(.16,.84,.24,1)",
        animationDelay: "0ms, 60ms",
        animationFillMode: "both, both",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "#fff",
          pointerEvents: "none",
          zIndex: 1,
          animation: "emmaWhiteVeil 420ms ease-out both",
        },
        "@keyframes emmaWhiteVeil": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },

        // Optional: animate direct children in a slight stagger (keeps it premium)
        "& > *": {
          opacity: 0,
          transform: "translate3d(0, 6px, 0) scale(0.995)",
          animation: "emmaBlockIn 700ms cubic-bezier(.16,.84,.24,1) both",
        },
        "& > *:nth-of-type(1)": { animationDelay: "120ms" },
        "& > *:nth-of-type(2)": { animationDelay: "160ms" },
        "& > *:nth-of-type(3)": { animationDelay: "200ms" },
        "& > *:nth-of-type(4)": { animationDelay: "240ms" },
        "& > *:nth-of-type(5)": { animationDelay: "280ms" },
        "& > *:nth-of-type(6)": { animationDelay: "320ms" },
        "& > *:nth-of-type(7)": { animationDelay: "360ms" },
        "& > *:nth-of-type(8)": { animationDelay: "400ms" },

        "@keyframes emmaPageReveal": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },

        "@keyframes emmaPageSettle": {
          "0%": {
            transform: "translate3d(0, 10px, 0) scale(0.992)",
            filter: "blur(1.6px)",
          },
          "70%": {
            transform: "translate3d(0, 0px, 0) scale(1)",
            filter: "blur(0px)",
          },
          "100%": {
            transform: "translate3d(0, 0px, 0) scale(1)",
            filter: "blur(0px)",
          },
        },

        "@keyframes emmaBlockIn": {
          from: {
            opacity: 0,
            transform: "translate3d(0, 6px, 0) scale(0.995)",
          },
          to: {
            opacity: 1,
            transform: "translate3d(0, 0px, 0) scale(1)",
          },
        },

        "@media (prefers-reduced-motion: reduce)": {
          opacity: 1,
          animation: "none",
          transform: "none",
          filter: "none",
          "& > *": {
            opacity: 1,
            transform: "none",
            animation: "none",
          },
        },
      }}
    >
      {props.children}
    </Box>
  );
}
