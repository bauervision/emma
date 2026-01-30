//app/distribution/page.tsx
import DistributionClient from "./DistributionClient";

import { withSuspense } from "@/components/shell/withSuspense";

export default withSuspense(DistributionClient, {
  label: "Distribution",
  minMs: 900,
  maxMs: 1700,
});
