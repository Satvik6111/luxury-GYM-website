import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Grade = "full" | "soft" | "mono" | "deep" | "lift" | "none";
type Scrim = "none" | "bottom" | "top" | "full" | "edge" | "left" | "right";

interface FigureProps {
  src: string;
  alt: string;
  /** Wrapper classes — set the aspect ratio here. */
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  grade?: Grade;
  scrim?: Scrim;
  zoom?: boolean;
  /** Rendered inside the frame, above the scrim (labels, captions). */
  children?: ReactNode;
}

const GRADE: Record<Grade, string> = {
  full: "grade",
  soft: "grade-soft",
  mono: "grade-mono",
  deep: "grade-deep",
  lift: "grade-lift",
  none: "",
};

const SCRIM: Record<Scrim, string> = {
  none: "",
  bottom:
    "bg-[linear-gradient(to_top,rgba(11,12,14,0.92)_0%,rgba(11,12,14,0.45)_35%,transparent_70%)]",
  top: "bg-[linear-gradient(to_bottom,rgba(11,12,14,0.85)_0%,transparent_55%)]",
  full: "bg-[linear-gradient(to_bottom,rgba(11,12,14,0.55),rgba(11,12,14,0.75))]",
  edge: "bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(11,12,14,0.7)_100%)]",
  left: "bg-[linear-gradient(to_right,rgba(11,12,14,0.95)_0%,rgba(11,12,14,0.35)_30%,transparent_65%)]",
  right:
    "bg-[linear-gradient(to_left,rgba(11,12,14,0.95)_0%,rgba(11,12,14,0.35)_30%,transparent_65%)]",
};

/**
 * Every photograph enters the palette through this frame:
 * warm monochrome grade + obsidian scrim + optional hover push-in.
 */
export function Figure({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
  grade = "full",
  scrim = "none",
  zoom = false,
  children,
}: FigureProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-obsidian-raised",
        zoom && "fig-zoom",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", GRADE[grade], imgClassName)}
      />
      {scrim !== "none" && (
        <div aria-hidden className={cn("pointer-events-none absolute inset-0", SCRIM[scrim])} />
      )}
      {children && (
        <div className="absolute inset-0 flex flex-col justify-end">{children}</div>
      )}
    </div>
  );
}
