"use client";

import * as React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { LogOut, User } from "lucide-react";

export default function GovNavbar(props: {
  title: string;
  onHomeAction?: () => void; // EMMA pill
  onProfileAction?: () => void; // optional for now
  onLogoutAction?: () => void; // new
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}) {
  const bluePillSx = {
    textTransform: "none",
    borderRadius: 999,
    px: 1.6,
    py: 0.8,
    minHeight: 0,
    minWidth: 0,

    color: "#fff",
    background: "linear-gradient(180deg, #1f6feb, #195fd0)",
    border: "1px solid rgba(10,20,35,0.18)",
    boxShadow:
      "0 10px 24px rgba(10,20,35,0.18), inset 0 1px 0 rgba(255,255,255,0.25)",

    "&:hover": {
      background: "linear-gradient(180deg, #2475ff, #1b64db)",
      boxShadow:
        "0 12px 26px rgba(10,20,35,0.20), inset 0 1px 0 rgba(255,255,255,0.28)",
    },
    "&:active": {
      transform: "translateY(1px)",
      boxShadow:
        "0 8px 18px rgba(10,20,35,0.18), inset 0 2px 8px rgba(0,0,0,0.22)",
    },
  } as const;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (t) => t.zIndex.drawer + 1,
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        background: "rgba(255,255,255,0.86)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Toolbar sx={{ gap: 1.5 }}>
        {/* Brand (EMMA becomes Home) */}
        <Button onClick={props.onHomeAction} disableElevation sx={bluePillSx}>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography
              variant="h6"
              fontWeight={950}
              sx={{ letterSpacing: -0.3, color: "#fff", px: 4 }}
            >
              EMMA
            </Typography>
          </Box>
        </Button>

        <Box sx={{ flex: 1 }} />

        {props.leftSlot}

        {/* Center title */}
        <Typography
          variant="h6"
          sx={{
            fontFamily:
              "var(--font-quicksand), system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
            fontWeight: 800,
            letterSpacing: 0.4,
            color: "rgba(10,20,35,0.78)",
            textShadow: "0 1px 0 rgba(255,255,255,0.55)",
            lineHeight: 1.1,
          }}
        >
          {props.title}
        </Typography>

        <Box sx={{ flex: 1 }} />

        {props.rightSlot}

        {/* Profile */}
        <Button
          onClick={props.onProfileAction}
          startIcon={<User size={16} />}
          disableElevation
          sx={bluePillSx}
        >
          Profile
        </Button>

        {/* Logout icon only */}
        <Button
          onClick={props.onLogoutAction}
          disableElevation
          aria-label="Logout"
          sx={{
            ...bluePillSx,
            px: 1.15,
            "& .MuiButton-startIcon": { mr: 0 },
          }}
          startIcon={<LogOut size={16} />}
        >
          {/* no text */}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
