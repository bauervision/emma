import * as React from "react";
import { Suspense } from "react";
import CeClient from "./CeClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <CeClient />
    </Suspense>
  );
}
