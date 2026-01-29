import * as React from "react";
import { Suspense } from "react";
import DistributionClient from "./DistributionClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <DistributionClient />
    </Suspense>
  );
}
