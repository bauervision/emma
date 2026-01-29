"use client";

import RequireSession from "@/components/auth/RequireSession";
import AppShell from "../../components/shell/AppShell";

export default function CtClient() {
  return (
    <RequireSession allowed={["ct", "super"]}>
      <AppShell title="Clothing & Textiles Control Tower">
        <div>C&amp;T dashboard (stub)</div>
      </AppShell>
    </RequireSession>
  );
}
