// components/shell/LeftInfoTabs.tsx
"use client";

import * as React from "react";
import { Box, Tabs, Tab } from "@mui/material";

export type InfoTabKey = "context" | "audit" | "quick";

export default function LeftInfoTabs(props: {
  value: InfoTabKey;
  onChangeAction: (next: InfoTabKey) => void;
}) {
  return (
    <Box
      sx={{
        border: "1px solid rgba(10,20,35,0.10)",
        background: "rgba(255,255,255,0.65)",
        borderRadius: 2, // no-pill
        overflow: "hidden",
      }}
    >
      <Tabs
        value={props.value}
        onChange={(_e, next) => props.onChangeAction(next)}
        variant="fullWidth"
        sx={{
          minHeight: 38,
          "& .MuiTabs-indicator": {
            height: "100%",
            background: "rgba(31,111,235,0.12)",
            borderRadius: 2, // no-pill indicator
          },
          "& .MuiTab-root": {
            minHeight: 38,
            textTransform: "none",
            fontWeight: 900,
            fontSize: 12,
            px: 1,
            zIndex: 1,
            color: "rgba(10,20,35,0.72)",
            borderRadius: 0,
            "&.Mui-selected": { color: "rgba(25,95,208,0.98)" },
          },
        }}
      >
        <Tab value="context" label="Context" />
        <Tab value="audit" label="Audit" />
        <Tab value="quick" label="Quick" />
      </Tabs>
    </Box>
  );
}
