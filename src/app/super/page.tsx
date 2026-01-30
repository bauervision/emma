//app/super/page.tsx
import SuperClient from "./SuperClient";

import { withSuspense } from "@/components/shell/withSuspense";

export default withSuspense(SuperClient, {
  label: "Super Admin",
  minMs: 900,
  maxMs: 1700,
});
