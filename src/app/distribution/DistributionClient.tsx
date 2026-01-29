"use client";

import RequireSession from "@/components/auth/RequireSession";
import AppShell from "@/components/shell/AppShell";
import DistributionView from "@/components/views/DistributionView";

export default function DistributionClient() {
  return (
    <RequireSession allowed={["distribution", "super"]}>
      <AppShell title="Distribution Control Tower">
        <DistributionView />
      </AppShell>
    </RequireSession>
  );
}
