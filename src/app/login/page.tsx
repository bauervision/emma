"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import {
  ROLE_OPTIONS,
  type EmmaRole,
  routeForRole,
  writeSession,
} from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = React.useState<EmmaRole>("distribution");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        p: 3,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#fff",

        backgroundImage: [
          // ambient wash
          "radial-gradient(1200px 700px at 18% 12%, rgba(21,101,192,0.14), transparent 55%)",
          "radial-gradient(1000px 650px at 82% 22%, rgba(46,125,50,0.10), transparent 60%)",
          "linear-gradient(180deg, rgba(255,255,255,0.0), rgba(0,0,0,0.02))",

          // single diamond grid only
          "repeating-linear-gradient(45deg, rgba(15, 23, 42, 0.055) 0, rgba(15, 23, 42, 0.055) 1px, transparent 1px, transparent 44px)",
          "repeating-linear-gradient(135deg, rgba(15, 23, 42, 0.055) 0, rgba(15, 23, 42, 0.055) 1px, transparent 1px, transparent 44px)",
        ].join(", "),

        // shimmer overlay
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
          animation: "emmaShimmer 10s ease-in-out infinite",
        },

        // subtle vignette
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

        "@keyframes emmaShimmer": {
          "0%": { transform: "translate3d(-6%, -2%, 0) rotate(-6deg)" },
          "50%": { transform: "translate3d(6%, 2%, 0) rotate(-6deg)" },
          "100%": { transform: "translate3d(-6%, -2%, 0) rotate(-6deg)" },
        },
      }}
    >
      <Card
        sx={{
          width: "min(520px, 100%)",
          borderRadius: 3,
          position: "relative",
          zIndex: 1,

          /* “glass” but still very readable */
          backgroundColor: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(15, 23, 42, 0.10)",
          boxShadow:
            "0 18px 50px rgba(15, 23, 42, 0.12), 0 2px 10px rgba(15, 23, 42, 0.06)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight={900} gutterBottom>
            EMMA
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
            Select a control tower view to continue.
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="role-label">User Type</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              label="User Type"
              onChange={(e) => setRole(e.target.value as EmmaRole)}
              sx={{
                borderRadius: 2,
                backgroundColor: "rgba(255,255,255,0.7)",
              }}
            >
              {ROLE_OPTIONS.map((opt) => (
                <MenuItem key={opt.role} value={opt.role}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "0 10px 24px rgba(21,101,192,0.20)",
            }}
            onClick={() => {
              writeSession(role);
              router.push(routeForRole(role));
            }}
          >
            Log in
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
