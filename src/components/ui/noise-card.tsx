"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NoisePatternCardProps {
  children: React.ReactNode;
  className?: string;
}

export function NoisePatternCard({ children, className }: NoisePatternCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative w-full overflow-hidden rounded-md border border-[rgba(240,235,227,0.08)] bg-[#121417]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "500px 500px",
        }}
      />
      <div className="relative z-10 bg-[#0b0c0e]/40">{children}</div>
    </motion.div>
  );
}

export function NoisePatternCardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 text-left md:p-8", className)} {...props} />;
}
