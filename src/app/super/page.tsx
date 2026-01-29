import * as React from "react";
import { Suspense } from "react";
import SuperClient from "./SuperClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <SuperClient />
    </Suspense>
  );
}
