"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function LineMask({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const clipRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(clipRef, { once: true, margin: "-8%" });
  const reduced = useReducedMotion();

  // The observer watches the clip wrapper, never the translated child: a child
  // pushed fully outside an overflow-hidden box stops intersecting, so it would
  // wait forever for a viewport event that can never arrive.
  if (reduced) {
    return <span className={`block ${className ?? ""}`}>{children}</span>;
  }

  return (
    <span ref={clipRef} className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : { y: "110%" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <Reveal className="mb-8 flex items-center gap-4 md:mb-12">
      <span className="label tabular-nums">{index}</span>
      <span className="h-px w-10 bg-bronze-rule" />
      <span className="label">{children}</span>
    </Reveal>
  );
}
