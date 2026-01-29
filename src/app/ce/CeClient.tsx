"use client";

import RequireSession from "@/components/auth/RequireSession";
import AppShell from "@/components/shell/AppShell";

export default function CeClient() {
  return (
    <RequireSession allowed={["ce", "super"]}>
      <AppShell title="Construction & Equipment Control Tower">
        <div>C&amp;E dashboard (stub)</div>
      </AppShell>
    </RequireSession>
  );
}
