"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { readSession, routeForRole, type EmmaRole } from "@/lib/auth";

export default function RequireSession(props: {
  children: React.ReactNode;
  allowed?: EmmaRole[];
}) {
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const go = () => {
      const s = readSession();
      if (!s) {
        router.replace("/login");
        return;
      }
      if (props.allowed && !props.allowed.includes(s.role)) {
        router.replace(routeForRole(s.role));
        return;
      }
    };

    go();
    const onAuth = () => go();
    window.addEventListener("emma:auth", onAuth);
    return () => window.removeEventListener("emma:auth", onAuth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <>{props.children}</>;
}
