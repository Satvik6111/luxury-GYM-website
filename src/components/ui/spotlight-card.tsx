"use client";

import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

/**
 * Double-bezel card: a machined outer tray (hairline shell) holding an inner
 * core, with a cursor-driven light that pools along the bezel on hover.
 */
export function SpotlightCard({
  children,
  className,
  innerClassName,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "group relative rounded-bezel border border-hairline bg-hairline-faint p-1.5",
        "shadow-card transition-colors duration-500 hover:border-bronze-veil",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-bezel opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(196,180,154,0.28), transparent 62%)",
        }}
      />
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-panel bg-obsidian-raised",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
