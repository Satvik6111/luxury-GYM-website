import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full cycle. */
  duration?: number;
  className?: string;
  reverse?: boolean;
}

/**
 * Duplicated-track marquee. The seam is closed by padding each copy with the
 * same gutter used between items, so the loop reads as continuous.
 */
export function Marquee({
  children,
  duration = 70,
  className,
  reverse = false,
}: MarqueeProps) {
  return (
    <div
      className={cn("marquee relative overflow-hidden", className)}
      style={
        { "--marquee-duration": `${duration}s` } as CSSProperties
      }
    >
      <div
        className="marquee-track"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <div className="flex shrink-0 gap-6 pr-6 md:gap-10 md:pr-10">{children}</div>
        <div aria-hidden className="flex shrink-0 gap-6 pr-6 md:gap-10 md:pr-10">
          {children}
        </div>
      </div>
    </div>
  );
}
