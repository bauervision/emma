//app/ct/page.tsx
import CtClient from "./CtClient";

import { withSuspense } from "@/components/shell/withSuspense";

export default withSuspense(CtClient, {
  label: "C&T",
  minMs: 900,
  maxMs: 1700,
});
