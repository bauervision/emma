"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0B5CAB" }, // gov blue
    secondary: { main: "#2B7A4B" }, // restrained green
    background: {
      default: "#F6F8FC",
      paper: "#FFFFFF",
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: `"Quicksand", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`,
    h5: { fontWeight: 900 },
    h6: { fontWeight: 800 },
    button: { fontWeight: 800 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(15, 23, 42, 0.10)",
          boxShadow:
            "0 10px 30px rgba(15, 23, 42, 0.08), 0 2px 10px rgba(15, 23, 42, 0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          textTransform: "none",
          fontWeight: 900,
          letterSpacing: 0.2,
          border: "1px solid rgba(15,23,42,0.18)",
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.55))",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(15,23,42,0.12), 0 10px 18px rgba(15,23,42,0.12)",
          transition: "transform 120ms ease, box-shadow 120ms ease",
        },
        contained: {
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.00))",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.20), 0 12px 22px rgba(15,23,42,0.18)",
        },
        outlined: {
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.35))",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -2px 6px rgba(15,23,42,0.08), 0 10px 18px rgba(15,23,42,0.10)",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&:active": {
            transform: "translateY(1px)",
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: { minHeight: 40 },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: { minHeight: 40, fontWeight: 800 },
      },
    },
  },
});
