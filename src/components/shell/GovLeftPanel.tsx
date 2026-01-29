"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { type EmmaRole } from "@/lib/auth";
import GovChatDock, { type ChatMessage } from "./GovChatDock";

type NavItem = { label: string; href: string; roles: EmmaRole[] };

const NAV: NavItem[] = [
  {
    label: "Distribution",
    href: "/distribution",
    roles: ["distribution", "super"],
  },
  { label: "C&T", href: "/ct", roles: ["ct", "super"] },
  { label: "C&E", href: "/ce", roles: ["ce", "super"] },
  { label: "Super Dashboard", href: "/super", roles: ["super"] },
];

export default function GovLeftPanel(props: {
  role: EmmaRole | null;
  label: string; // kept for later, unused for now
  onLogoutAction: () => void; // kept for later, unused here now
  onNavAction?: () => void;
}) {
  const pathname = usePathname();

  const items = React.useMemo(() => {
    if (!props.role) return [];
    return NAV.filter((n) => n.roles.includes(props.role as EmmaRole));
  }, [props.role]);

  const [thread, setThread] = React.useState<ChatMessage[]>([]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
      }}
    >
      {/* Top nav */}
      <Box sx={{ px: 1.5, pt: 1.25, pb: 1.25 }}>
        <List sx={{ py: 0 }}>
          {items.map((n) => {
            const active = pathname === n.href;
            return (
              <ListItemButton
                key={n.href}
                component={Link}
                href={n.href}
                selected={active}
                onClick={() => props.onNavAction?.()}
                sx={{
                  borderRadius: 3,
                  mb: 0.75,
                  px: 1.75,
                  py: 1.1,
                }}
              >
                <ListItemText
                  primary={n.label}
                  primaryTypographyProps={{
                    fontWeight: active ? 950 : 850,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Divider />

      {/* Spacer that will shrink when chat opens (because chat takes 50%) */}
      <Box sx={{ flex: 1, minHeight: 0 }} />

      {/* Bottom chat dock (2 states only) */}
      <Box sx={{ px: 1.5, pb: 1.5 }}>
        <GovChatDock
          thread={thread}
          onThreadChange={(updater) => setThread((prev) => updater(prev))}
          onSubmitAction={(prompt) => {
            // Hook point for later (open right panel, call backend, etc.)
            console.log("Chat prompt:", prompt);
          }}
        />
      </Box>
    </Box>
  );
}
