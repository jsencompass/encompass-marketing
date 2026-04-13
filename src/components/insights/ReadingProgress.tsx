"use client";

import { useState, useEffect } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setProgress(Math.min(100, (window.scrollY / totalHeight) * 100));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-30 h-[2px]"
    >
      <div className="h-full bg-border/30" />
      <div
        className="absolute top-0 left-0 h-full bg-accent"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 8px rgba(108, 92, 231, 0.5)",
        }}
      />
    </div>
  );
}
