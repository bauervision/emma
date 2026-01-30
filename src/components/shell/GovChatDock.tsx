// components/shell/GovChatDock.tsx
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
  open?: boolean;
  initialOpen?: boolean;
  thread?: ChatMessage[];
  onThreadChange?: (updater: (prev: ChatMessage[]) => ChatMessage[]) => void;
  onSubmitAction?: (prompt: string) => void;
  onOpenChangeAction?: (open: boolean) => void;

  // NEW: allow parent to inject a draft prompt
  draft?: string;
  onDraftChangeAction?: (next: string) => void;
}) {
  const isControlled = typeof props.open === "boolean";
  const [openLocal, setOpenLocal] = React.useState(Boolean(props.initialOpen));
  const open = isControlled ? Boolean(props.open) : openLocal;

  const isDraftControlled = typeof props.draft === "string";
  const [draftLocal, setDraftLocal] = React.useState("");
  const val = isDraftControlled ? (props.draft as string) : draftLocal;
  const setVal = (next: string) => {
    if (!isDraftControlled) setDraftLocal(next);
    props.onDraftChangeAction?.(next);
  };

  const [threadLocal, setThreadLocal] = React.useState<ChatMessage[]>(
    props.thread ?? [],
  );
  const thread = props.thread ?? threadLocal;

  const setThread =
    props.onThreadChange ??
    ((updater: (prev: ChatMessage[]) => ChatMessage[]) =>
      setThreadLocal((prev) => updater(prev)));

  const listRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const focusInput = React.useCallback(() => {
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    const len = el.value?.length ?? 0;
    try {
      el.setSelectionRange(len, len);
    } catch {
      // ignore
    }
  }, []);

  const scrollToBottom = React.useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  React.useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => requestAnimationFrame(scrollToBottom));
  }, [open, thread.length, scrollToBottom]);

  // When opened, ensure prompt stays accessible and focused (esp. when injected)
  React.useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => requestAnimationFrame(focusInput));
  }, [open, focusInput]);

  const setOpenAndNotify = (next: boolean) => {
    if (!isControlled) setOpenLocal(next);
    props.onOpenChangeAction?.(next);
  };

  const submit = () => {
    const prompt = val.trim();
    if (!prompt) return;

    const now = Date.now();

    const userMsg: ChatMessage = {
      id: `user-${now}`,
      role: "user",
      content: prompt,
      createdAt: now,
    };

    setThread((prev) => [...prev, userMsg]);
    setVal("");
    props.onSubmitAction?.(prompt);

    requestAnimationFrame(() => requestAnimationFrame(scrollToBottom));

    const aiMsg: ChatMessage = {
      id: `assistant-${now + 1}`,
      role: "assistant",
      content: "Stub: assistant reply will be wired later.",
      createdAt: now + 1,
    };

    window.setTimeout(() => {
      setThread((prev) => [...prev, aiMsg]);
      requestAnimationFrame(() => requestAnimationFrame(scrollToBottom));
    }, 250);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: open ? "100%" : "auto",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(180deg, rgba(255,255,255), rgba(255,255,255))",
        boxShadow: open
          ? "0 18px 34px rgba(10,20,35,0.18)"
          : "0 10px 22px rgba(10,20,35,0.14)",
        backdropFilter: "blur(10px)",
        overflow: "hidden",
      }}
    >
      {!open ? (
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            onClick={() => setOpenAndNotify(true)}
            startIcon={<MessageSquare size={18} />}
            disableElevation
            sx={{
              textTransform: "none",
              py: 1.2,
              fontWeight: 850,
              color: "#fff",
              background: "linear-gradient(180deg, #1f6feb, #195fd0)",
              border: "1px solid rgba(10,20,35,0.18)",
              borderRadius: 999,
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
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box sx={{ px: 2.25, pt: 2, pb: 1.5, flex: "0 0 auto" }}>
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
                  flex: "0 0 auto",
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
                onClick={() => setOpenAndNotify(false)}
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

          {/* Thread + pinned prompt */}
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              position: "relative",
              overflow: "hidden",
              px: 2,
              pt: 1.75,
            }}
          >
            <Box
              ref={listRef}
              sx={{
                height: "100%",
                overflowY: "auto",
                background: "rgba(255,255,255,0.72)",
                px: 1.5,
                py: 1.25,
                pb: "140px",
                borderTop: "1px solid rgba(10,20,35,0.06)",
              }}
            >
              <Box
                sx={{
                  minHeight: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: 1.1,
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
                      alignSelf: "stretch",
                    }}
                  >
                    No thread yet. Send a message to start.
                  </Box>
                ) : (
                  thread.map((m) => {
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
                                  borderTopRightRadius: 12,
                                }
                              : {
                                  color: "rgba(10,20,35,0.82)",
                                  background: "rgba(255,255,255,0.78)",
                                  border: "1px solid rgba(10,20,35,0.10)",
                                  borderTopLeftRadius: 12,
                                }),
                          }}
                        >
                          {m.content}
                        </Box>
                      </Box>
                    );
                  })
                )}
              </Box>
            </Box>

            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                pt: 1.25,
                pb: 1.25,
                px: 2,
                background:
                  "linear-gradient(180deg, rgba(255,255,255), rgba(255,255,255) 25%, rgba(255,255,255))",
                backdropFilter: "blur(10px)",
                borderTop: "1px solid rgba(10,20,35,0.08)",
              }}
            >
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
                  inputRef={inputRef}
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
                  sx={{ px: 1.25, "& input": { fontSize: 14, py: 0.6 } }}
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
