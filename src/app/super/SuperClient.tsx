"use client";

import RequireSession from "@/components/auth/RequireSession";
import AppShell from "@/components/shell/AppShell";

export default function SuperClient() {
  return (
    <RequireSession allowed={["super"]}>
      <AppShell title="Super User Dashboard">
        <div>Super User dashboard (stub)</div>
      </AppShell>
    </RequireSession>
  );
}
