"use client";

import * as React from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { MessageSquare, Send, X } from "lucide-react";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
};

export default function GovChatDock(props: {
  initialOpen?: boolean;
  thread?: ChatMessage[];
  onThreadChange?: (updater: (prev: ChatMessage[]) => ChatMessage[]) => void;
  onSubmitAction?: (prompt: string) => void;
}) {
  const [open, setOpen] = React.useState(Boolean(props.initialOpen));
  const [val, setVal] = React.useState("");
  const [threadLocal, setThreadLocal] = React.useState<ChatMessage[]>(
    props.thread ?? [],
  );

  const thread = props.thread ?? threadLocal;

  const setThread =
    props.onThreadChange ??
    ((updater: (prev: ChatMessage[]) => ChatMessage[]) =>
      setThreadLocal((prev) => updater(prev)));

  const listRef = React.useRef<HTMLDivElement | null>(null);

  // When opened, scroll to bottom after content is visible.
  React.useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      const el = listRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    }, 220);
    return () => window.clearTimeout(t);
  }, [open, thread.length]);

  const submit = () => {
    const prompt = val.trim();
    if (!prompt) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: prompt,
      createdAt: Date.now(),
    };

    setThread((prev) => [...prev, userMsg]);
    setVal("");

    props.onSubmitAction?.(prompt);

    // Local stub assistant reply (for now)
    const aiMsg: ChatMessage = {
      id: `assistant-${Date.now() + 1}`,
      role: "assistant",
      content: "Stub: assistant reply will be wired later.",
      createdAt: Date.now() + 1,
    };
    window.setTimeout(() => {
      setThread((prev) => [...prev, aiMsg]);
    }, 350);
  };

  return (
    <Box
      sx={{
        // Placed in a flex column; we control vertical claim by state.
        flex: open ? "0 0 50%" : "0 0 auto",
        minHeight: open ? 0 : "auto",

        // Panel styling (less bubble-rounded so it behaves like a dock)
        borderRadius: 2.5,
        border: "1px solid rgba(10,20,35,0.10)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.72))",
        boxShadow: open
          ? "0 18px 34px rgba(10,20,35,0.18)"
          : "0 10px 22px rgba(10,20,35,0.14)",
        backdropFilter: "blur(10px)",

        // Accordion behavior (two states only). Never cap so low that the input gets clipped.
        maxHeight: open ? "calc(100vh - 120px)" : 84,
        transition:
          "max-height 220ms ease, box-shadow 220ms ease, border-radius 220ms ease",
      }}
    >
      {/* Closed state: show ONLY the button */}
      {!open ? (
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            onClick={() => setOpen(true)}
            startIcon={<MessageSquare size={18} />}
            disableElevation
            sx={{
              textTransform: "none",
              borderRadius: 999,
              py: 1.2,
              fontWeight: 850,
              color: "#fff",
              background: "linear-gradient(180deg, #1f6feb, #195fd0)",
              border: "1px solid rgba(10,20,35,0.18)",
              boxShadow:
                "0 12px 26px rgba(10,20,35,0.20), inset 0 1px 0 rgba(255,255,255,0.25)",
              "&:hover": {
                background: "linear-gradient(180deg, #2475ff, #1b64db)",
              },
              "&:active": {
                transform: "translateY(1px)",
                boxShadow:
                  "0 8px 18px rgba(10,20,35,0.18), inset 0 2px 8px rgba(0,0,0,0.22)",
              },
            }}
          >
            Open Chat
          </Button>
        </Box>
      ) : (
        // Open state
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            overflow: "hidden", // important: thread scrolls; prompt stays reachable
          }}
        >
          {/* Header row */}
          <Box sx={{ px: 2.25, pt: 2, pb: 1.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: 999,
                  background: "rgba(31,111,235,0.10)",
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid rgba(31,111,235,0.22)",
                }}
              >
                <MessageSquare size={16} color="rgba(25,95,208,0.95)" />
              </Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  sx={{ fontWeight: 900, color: "rgba(10,20,35,0.86)" }}
                >
                  Chat
                </Typography>
                <Typography sx={{ fontSize: 12, color: "rgba(10,20,35,0.55)" }}>
                  Local stub
                </Typography>
              </Box>

              <Button
                onClick={() => setOpen(false)}
                startIcon={<MessageSquare size={16} />}
                disableElevation
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  px: 1.6,
                  py: 0.9,
                  fontWeight: 850,
                  color: "#fff",
                  background: "linear-gradient(180deg, #1f6feb, #195fd0)",
                  border: "1px solid rgba(10,20,35,0.18)",
                  boxShadow:
                    "0 10px 22px rgba(10,20,35,0.16), inset 0 1px 0 rgba(255,255,255,0.22)",
                  "&:hover": {
                    background: "linear-gradient(180deg, #2475ff, #1b64db)",
                  },
                }}
              >
                Close Chat
              </Button>
            </Box>
          </Box>

          <Divider />

          {/* Content wrapper: delay opacity so thread does NOT peek during expand */}
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
              px: 2,
              pt: 1.75,
              pb: 2,
              opacity: 0,
              animation: "emmaChatFadeIn 160ms ease forwards",
              animationDelay: "200ms",
              "@keyframes emmaChatFadeIn": {
                to: { opacity: 1 },
              },
              overflow: "hidden", // ensure only the thread box scrolls
            }}
          >
            {/* Thread area */}
            <Box
              ref={listRef}
              sx={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                borderRadius: 2.5,
                border: "1px solid rgba(10,20,35,0.10)",
                background: "rgba(255,255,255,0.72)",
                px: 1.5,
                py: 1.25,
              }}
            >
              {thread.length === 0 ? (
                <Box
                  sx={{
                    borderRadius: 2.5,
                    px: 2,
                    py: 1.25,
                    border: "1px dashed rgba(10,20,35,0.18)",
                    background: "rgba(255,255,255,0.60)",
                    color: "rgba(10,20,35,0.55)",
                    lineHeight: 1.35,
                  }}
                >
                  No thread yet. Send a message to start.
                </Box>
              ) : (
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.1 }}
                >
                  {thread.map((m) => {
                    const isUser = m.role === "user";
                    return (
                      <Box
                        key={m.id}
                        sx={{
                          display: "flex",
                          justifyContent: isUser ? "flex-end" : "flex-start",
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: "86%",
                            borderRadius: 2.5,
                            px: 1.4,
                            py: 1,
                            fontSize: 13,
                            lineHeight: 1.35,
                            ...(isUser
                              ? {
                                  color: "#fff",
                                  background: "rgba(31,111,235,0.92)",
                                  borderTopRightRadius: 10,
                                }
                              : {
                                  color: "rgba(10,20,35,0.82)",
                                  background: "rgba(255,255,255,0.78)",
                                  border: "1px solid rgba(10,20,35,0.10)",
                                  borderTopLeftRadius: 10,
                                }),
                          }}
                        >
                          {m.content}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>

            {/* Prompt row */}
            <Box sx={{ mt: 1.5 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 850,
                  color: "rgba(10,20,35,0.70)",
                  mb: 0.75,
                  px: 0.25,
                }}
              >
                Prompt
              </Typography>

              <Box
                sx={{
                  borderRadius: 999,
                  border: "1px solid rgba(10,20,35,0.14)",
                  background: "rgba(255,255,255,0.86)",
                  px: 1,
                  py: 0.6,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <TextField
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  placeholder="What do you need?"
                  variant="standard"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  sx={{
                    px: 1.25,
                    "& input": {
                      fontSize: 14,
                      py: 0.6,
                    },
                  }}
                />

                {val.trim() ? (
                  <IconButton
                    onClick={() => setVal("")}
                    aria-label="Clear"
                    size="small"
                    sx={{ width: 34, height: 34 }}
                  >
                    <X size={16} />
                  </IconButton>
                ) : null}

                <IconButton
                  onClick={submit}
                  aria-label="Send"
                  size="small"
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 999,
                    color: "#fff",
                    background: "linear-gradient(180deg, #1f6feb, #195fd0)",
                    border: "1px solid rgba(10,20,35,0.18)",
                    boxShadow:
                      "0 10px 22px rgba(10,20,35,0.14), inset 0 1px 0 rgba(255,255,255,0.22)",
                    "&:hover": {
                      background: "linear-gradient(180deg, #2475ff, #1b64db)",
                    },
                  }}
                  disabled={!val.trim()}
                >
                  <Send size={16} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
