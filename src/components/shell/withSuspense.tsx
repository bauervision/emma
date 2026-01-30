// components/shell/withSuspense.tsx
import * as React from "react";
import { Suspense } from "react";
import EmmaSuspenseLoader from "./EmmaSuspenseLoader";

type WithSuspenseOptions = {
  label?: string;
  minMs?: number;
  maxMs?: number;
};

export function withSuspense<P extends object>(
  Component: React.ComponentType<P>,
  options?: WithSuspenseOptions,
) {
  function WrappedWithSuspense(props: P) {
    // Next pages receive { params, searchParams }. Do not forward these into client components.
    const {
      params: _params,
      searchParams: _searchParams,
      ...safeProps
    } = (props as any) ?? {};

    return (
      <Suspense
        fallback={
          <EmmaSuspenseLoader
            label={options?.label}
            minMs={options?.minMs}
            maxMs={options?.maxMs}
          />
        }
      >
        <Component {...(safeProps as P)} />
      </Suspense>
    );
  }

  const name = Component.displayName || Component.name || "Component";
  WrappedWithSuspense.displayName = `withSuspense(${name})`;

  return WrappedWithSuspense;
}
