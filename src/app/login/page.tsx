// app/login/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";

import {
  ROLE_OPTIONS,
  type EmmaRole,
  routeForRole,
  writeSession,
} from "@/lib/auth";

import EmmaGridBackground from "@/components/shell/EmmaGridBackground";

type LoginMode = "prototype" | "okta";

function TabLabel(props: { title: string; subtitle: string; active: boolean }) {
  return (
    <Box sx={{ textAlign: "left", lineHeight: 1.1 }}>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: props.active ? 900 : 850,
          color: "rgba(10,20,35,0.86)",
        }}
      >
        {props.title}
      </Typography>
      <Typography sx={{ fontSize: 11, color: "rgba(10,20,35,0.52)", mt: 0.25 }}>
        {props.subtitle}
      </Typography>
    </Box>
  );
}

function OktaLaunch(props: { oktaUrl: string; enabled: boolean }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          borderRadius: 2,
          border: "1px solid rgba(10,20,35,0.10)",
          background: "rgba(255,255,255,0.62)",
          p: 2,
        }}
      >
        <Typography sx={{ fontWeight: 900, mb: 0.25 }}>
          DLA Login (Okta)
        </Typography>
        <Typography sx={{ fontSize: 12, color: "rgba(10,20,35,0.62)" }}>
          This will redirect you to the external Okta authentication flow.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Button
          fullWidth
          variant="contained"
          disabled={!props.enabled}
          sx={{
            py: 1.2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 900,
            boxShadow: "0 12px 30px rgba(21,101,192,0.18)",
          }}
          onClick={() => {
            // external redirect (Okta hosted login)
            window.location.assign(props.oktaUrl);
          }}
        >
          Continue to DLA Okta
        </Button>

        <Typography
          sx={{
            mt: 1.25,
            fontSize: 12,
            color: "rgba(10,20,35,0.55)",
          }}
        >
          You’ll return here after successful authentication.
        </Typography>
      </Box>

      <Box
        sx={{
          mt: 1.25,
          px: 0.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{ fontSize: 12, color: "rgba(10,20,35,0.55)" }}>
          Identity provider: Okta
        </Typography>

        {!props.enabled ? (
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 900,
              color: "rgba(10,20,35,0.55)",
              border: "1px solid rgba(10,20,35,0.14)",
              borderRadius: 999,
              px: 1,
              py: 0.25,
              background: "rgba(255,255,255,0.6)",
            }}
          >
            Set NEXT_PUBLIC_EMMA_OKTA_AUTH_URL
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = React.useState<EmmaRole>("distribution");
  const [mode, setMode] = React.useState<LoginMode>("prototype");

  // Put the real Okta authorize URL here when ready.
  // Example shape might be:
  // https://{yourOktaDomain}/oauth2/default/v1/authorize?...etc
  const oktaUrl =
    (process.env.NEXT_PUBLIC_EMMA_OKTA_AUTH_URL || "").trim() ||
    "https://example.okta.com/";

  const oktaEnabled = oktaUrl !== "https://example.okta.com/";

  return (
    <EmmaGridBackground>
      <Card
        sx={{
          width: "min(560px, 100%)",
          borderRadius: 3,
          position: "relative",
          backgroundColor: "rgba(255,255,255,0.76)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(15, 23, 42, 0.10)",
          boxShadow:
            "0 28px 90px rgba(15, 23, 42, 0.10), 0 10px 30px rgba(15, 23, 42, 0.06)",

          transformOrigin: "50% 60%",
          opacity: 0,
          transform: "translate3d(0, 14px, 0) scale(0.985)",
          animation: "emmaCardSettle 1100ms cubic-bezier(.16,.84,.24,1) both",

          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(110deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.38) 16%, rgba(255,255,255,0.05) 34%, rgba(255,255,255,0.00) 62%)",
            mixBlendMode: "overlay",
            opacity: 0,
            transform: "translate3d(-24%, 0, 0) rotate(10deg)",
            animation: "emmaCardSweep 1250ms ease-out 360ms both",
          },

          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: 3,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.70)",
            opacity: 0.8,
          },

          "@keyframes emmaCardSettle": {
            "0%": {
              opacity: 0,
              transform: "translate3d(0, 14px, 0) scale(0.985)",
              filter: "blur(2px)",
            },
            "70%": {
              opacity: 1,
              transform: "translate3d(0, 0px, 0) scale(1.0)",
              filter: "blur(0px)",
            },
            "100%": {
              opacity: 1,
              transform: "translate3d(0, 0px, 0) scale(1.0)",
              filter: "blur(0px)",
            },
          },

          "@keyframes emmaCardSweep": {
            "0%": {
              opacity: 0,
              transform: "translate3d(-24%, 0, 0) rotate(10deg)",
            },
            "35%": { opacity: 0.22 },
            "100%": {
              opacity: 0,
              transform: "translate3d(24%, 0, 0) rotate(10deg)",
            },
          },

          "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
            opacity: 1,
            transform: "none",
            "&::before": { animation: "none" },
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight={900} gutterBottom>
            EMMA
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Select a control tower view to continue.
          </Typography>

          {/* Mode tabs */}
          <Box sx={{ mt: 2 }}>
            <Tabs
              value={mode}
              onChange={(_, v) => setMode(v)}
              variant="fullWidth"
              sx={{
                minHeight: 46,
                "& .MuiTab-root": {
                  alignItems: "flex-start",
                  textTransform: "none",
                  minHeight: 46,
                  px: 1.25,
                },
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: 999,
                },
              }}
            >
              <Tab
                value="prototype"
                label={
                  <TabLabel
                    title="Prototype Login"
                    subtitle="Role selector (demo)"
                    active={mode === "prototype"}
                  />
                }
              />
              <Tab
                value="okta"
                label={
                  <TabLabel
                    title="DLA / Okta"
                    subtitle="External auth launch"
                    active={mode === "okta"}
                  />
                }
              />
            </Tabs>

            <Divider sx={{ mt: 1.25 }} />
          </Box>

          {mode === "prototype" ? (
            <Box sx={{ mt: 2 }}>
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
                  fontWeight: 900,
                  boxShadow: "0 12px 30px rgba(21,101,192,0.22)",
                }}
                onClick={() => {
                  writeSession(role);
                  router.push(routeForRole(role));
                }}
              >
                Log in
              </Button>

              <Typography
                sx={{
                  mt: 1.5,
                  fontSize: 12,
                  color: "rgba(10,20,35,0.55)",
                }}
              >
                This is the demo login used for rapid prototyping.
              </Typography>
            </Box>
          ) : (
            <OktaLaunch oktaUrl={oktaUrl} enabled={oktaEnabled} />
          )}
        </CardContent>
      </Card>
    </EmmaGridBackground>
  );
}
