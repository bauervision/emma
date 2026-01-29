"use client";

import * as React from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { MessageSquarePlus, Send, X } from "lucide-react";

export type GovChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  ts: number;
};

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default function GovNewChatLauncher(props: {
  chatOpen: boolean;
  onToggleChatAction: () => void;

  messages: GovChatMessage[];
  onMessagesChangeAction: (next: GovChatMessage[]) => void;
}) {
  const [composerOpen, setComposerOpen] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");

  React.useEffect(() => {
    if (!props.chatOpen) {
      setComposerOpen(false);
      setPrompt("");
    }
  }, [props.chatOpen]);

  function submit() {
    const p = prompt.trim();
    if (!p) return;

    const now = Date.now();
    const next: GovChatMessage[] = [
      ...props.messages,
      { id: uid(), role: "user", text: p, ts: now },
      {
        id: uid(),
        role: "assistant",
        text: "Stub: chat thread will render here. Next step is wiring real chat.",
        ts: now + 1,
      },
    ];

    props.onMessagesChangeAction(next);
    setPrompt("");
    setComposerOpen(false);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
      <Button
        fullWidth
        onClick={props.onToggleChatAction}
        startIcon={<MessageSquarePlus size={18} />}
        disableElevation
        sx={{
          textTransform: "none",
          borderRadius: 999,
          py: 1.2,
          fontWeight: 950,

          color: "#fff",
          background: "linear-gradient(180deg, #1f6feb, #195fd0)",
          border: "1px solid rgba(10,20,35,0.18)",
          boxShadow:
            "0 10px 24px rgba(10,20,35,0.18), inset 0 1px 0 rgba(255,255,255,0.25)",

          "&:hover": {
            background: "linear-gradient(180deg, #2475ff, #1b64db)",
          },
          "&:active": { transform: "translateY(1px)" },
        }}
      >
        {props.chatOpen ? "Close Chat" : "Open Chat"}
      </Button>

      {/* Composer toggle only when chat is open */}
      <Collapse in={props.chatOpen} timeout={220} unmountOnExit>
        <Box>
          <Button
            onClick={() => setComposerOpen((v) => !v)}
            disableElevation
            sx={{
              textTransform: "none",
              borderRadius: 999,
              px: 1.4,
              py: 0.8,
              fontWeight: 900,
              alignSelf: "flex-start",
              color: "rgba(10,20,35,0.78)",
              border: "1px solid rgba(10,20,35,0.12)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(245,248,255,0.82))",
              boxShadow:
                "0 10px 22px rgba(10,20,35,0.10), inset 0 1px 0 rgba(255,255,255,0.85)",
              "&:active": { transform: "translateY(1px)" },
            }}
          >
            Start a new thread
          </Button>

          <Collapse in={composerOpen} timeout={220} unmountOnExit>
            <Box
              sx={{
                mt: 1.2,
                p: 1.4,
                borderRadius: 4,
                border: "1px solid rgba(10,20,35,0.10)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.70))",
                boxShadow: "0 14px 28px rgba(10,20,35,0.12)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 0.9,
                  opacity: 0.7,
                  fontWeight: 800,
                }}
              >
                Prompt
              </Typography>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <TextField
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="What do you need?"
                  size="small"
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submit();
                    if (e.key === "Escape") setComposerOpen(false);
                  }}
                />
                <IconButton onClick={submit} aria-label="Send">
                  <Send size={18} />
                </IconButton>
                <IconButton
                  onClick={() => setComposerOpen(false)}
                  aria-label="Close composer"
                >
                  <X size={18} />
                </IconButton>
              </Box>
            </Box>
          </Collapse>
        </Box>
      </Collapse>
    </Box>
  );
}
