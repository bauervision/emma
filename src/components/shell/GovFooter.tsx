"use client";

import { Box, Typography } from "@mui/material";

export default function GovFooter() {
  return (
    <Box
      sx={{
        pt: 2,
        borderTop: "1px solid rgba(15,23,42,0.10)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: 0.85,
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 800 }}>
        EMMA • Control Towers
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.75 }}>
        Demo build • Local auth
      </Typography>
    </Box>
  );
}
