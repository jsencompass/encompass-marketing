"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function RouteProgress() {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.width = "80%";
    el.style.opacity = "1";

    const t1 = setTimeout(() => { el.style.width = "100%"; }, 300);
    const t2 = setTimeout(() => { el.style.opacity = "0"; }, 600);
    const t3 = setTimeout(() => { el.style.width = "0%"; }, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[100] h-[3px] bg-accent"
      style={{
        width: "0%",
        opacity: 0,
        transition: "width 300ms ease-out, opacity 200ms ease-out",
        boxShadow: "0 0 12px rgba(108, 92, 231, 0.7)",
      }}
    />
  );
}
