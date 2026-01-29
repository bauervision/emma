//components/shell/AppShell.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Box, Drawer, Toolbar } from "@mui/material";

import {
  clearSession,
  readSession,
  routeForRole,
  type EmmaRole,
} from "@/lib/auth";

import GovNavbar from "./GovNavBar";
import GovFooter from "./GovFooter";
import GovLeftPanel from "./GovLeftPanel";

const DRAWER_W = 260;

export default function AppShell(props: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [role, setRole] = React.useState<EmmaRole | null>(null);
  const [label, setLabel] = React.useState<string>("");

  React.useEffect(() => {
    const sync = () => {
      const s = readSession();
      setRole(s?.role ?? null);
      setLabel(s?.label ?? "");
    };
    sync();
    window.addEventListener("emma:auth", sync);
    return () => window.removeEventListener("emma:auth", sync);
  }, []);

  function doLogout() {
    clearSession();
    router.replace("/login");
  }

  function goHome() {
    if (!role) return;
    router.push(routeForRole(role));
  }

  const left = (
    <GovLeftPanel
      role={role}
      label={label}
      onLogoutAction={doLogout}
      onNavAction={() => setMobileOpen(false)}
    />
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <GovNavbar
        title={props.title}
        onHomeAction={role ? goHome : undefined}
        onLogoutAction={doLogout}
      />

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_W,
            boxSizing: "border-box",
            borderRight: "1px solid rgba(0,0,0,0.08)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.75))",
            backdropFilter: "blur(10px)",

            /* key fix: start under the AppBar */
            pt: "64px",
            height: "100vh",
          },
        }}
        open
      >
        {left}
      </Drawer>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: DRAWER_W },
        }}
      >
        {left}
      </Drawer>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          ml: { xs: 0, md: `${DRAWER_W}px` },
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            px: { xs: 2, md: 3 },
            pt: 2,
            pb: 3,
          }}
        >
          {props.children}
        </Box>

        <Box sx={{ px: { xs: 2, md: 3 }, pb: 2 }}>
          <GovFooter />
        </Box>
      </Box>
    </Box>
  );
}
