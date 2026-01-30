// app/ce/page.tsx
import CeClient from "./CeClient";
import { withSuspense } from "@/components/shell/withSuspense";

export default withSuspense(CeClient, {
  label: "C&E",
  minMs: 900,
  maxMs: 1700,
});
