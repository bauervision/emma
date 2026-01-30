// components/shell/GovLeftPanel.tsx
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
import LeftInfoTabs, { type InfoTabKey } from "./LeftInfoTabs";
import {
  InfoAuditPanel,
  InfoContextPanel,
  InfoQuickPanel,
} from "./LeftInfoPanels";

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
  label: string;
  onLogoutAction: () => void;
  onNavAction?: () => void;
}) {
  const pathname = usePathname();

  const items = React.useMemo(() => {
    if (!props.role) return [];
    return NAV.filter((n) => n.roles.includes(props.role as EmmaRole));
  }, [props.role]);

  const [thread, setThread] = React.useState<ChatMessage[]>([]);
  const [chatOpen, setChatOpen] = React.useState(false);
  const [tab, setTab] = React.useState<InfoTabKey>("context");

  const [draft, setDraft] = React.useState("");

  const handleTabChangeAction = (next: InfoTabKey) => {
    setTab(next);
    if (chatOpen) setChatOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      {/* Top nav */}
      <Box sx={{ px: 1.5, pt: 1.25, pb: 1.25, flex: "0 0 auto" }}>
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
                sx={{ borderRadius: 2, mb: 0.75, px: 1.75, py: 1.1 }}
              >
                <ListItemText
                  primary={n.label}
                  primaryTypographyProps={{ fontWeight: active ? 950 : 850 }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Divider />

      {/* Tabs (always visible) */}
      <Box sx={{ px: 1.5, pt: 1.1, pb: 1.1, flex: "0 0 auto" }}>
        <LeftInfoTabs value={tab} onChangeAction={handleTabChangeAction} />
      </Box>

      {/* Above-dock region */}
      <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden", px: 1.5, pb: 1.5 }}>
        {chatOpen ? (
          <Box sx={{ height: "100%" }} />
        ) : (
          <Box sx={{ height: "100%", overflowY: "auto" }}>
            {tab === "context" ? (
              <InfoContextPanel role={props.role} pathname={pathname} />
            ) : null}
            {tab === "audit" ? <InfoAuditPanel /> : null}
            {tab === "quick" ? (
              <InfoQuickPanel
                onPickAction={(p) => {
                  setDraft(p);
                  setChatOpen(true);
                }}
              />
            ) : null}
          </Box>
        )}
      </Box>

      {/* Chat dock wrapper (bounded when open) */}
      <Box
        sx={{
          px: 1.5,
          pb: 1.5,
          flex: "0 0 auto",
          height: chatOpen ? "calc(100% - 148px)" : "auto",
          minHeight: chatOpen ? 0 : "auto",
          overflow: "hidden",
        }}
      >
        <GovChatDock
          open={chatOpen}
          onOpenChangeAction={setChatOpen}
          thread={thread}
          onThreadChange={(updater) => setThread((prev) => updater(prev))}
          onSubmitAction={(prompt) => {
            // eslint-disable-next-line no-console
            console.log("Chat prompt:", prompt);
          }}
          draft={draft}
          onDraftChangeAction={setDraft}
        />
      </Box>
    </Box>
  );
}
