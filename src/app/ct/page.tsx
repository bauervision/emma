import * as React from "react";
import { Suspense } from "react";
import CtClient from "./CtClient";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <CtClient />
    </Suspense>
  );
}
