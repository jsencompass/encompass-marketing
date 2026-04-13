"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function RouteProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(80);

    const t1 = setTimeout(() => setProgress(100), 300);
    const t2 = setTimeout(() => setVisible(false), 600);
    const t3 = setTimeout(() => setProgress(0), 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-[3px] bg-accent"
      style={{
        width: `${progress}%`,
        opacity: visible ? 1 : 0,
        transition: progress === 0 ? "none" : "width 300ms ease-out, opacity 200ms ease-out",
        boxShadow: "0 0 12px rgba(108, 92, 231, 0.7)",
      }}
    />
  );
}
