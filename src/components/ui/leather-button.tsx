"use client";

import type React from "react";

interface LeatherButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export function LeatherButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: LeatherButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full px-8 py-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-bright disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={{
        color: "#f0ebe3",
        background: `
          radial-gradient(circle at 20% 30%, rgba(154,139,114,0.22) 1px, transparent 1px),
          radial-gradient(circle at 70% 60%, rgba(154,139,114,0.14) 1px, transparent 1px),
          radial-gradient(circle at 40% 80%, rgba(196,180,154,0.12) 1px, transparent 1px),
          linear-gradient(135deg, #1a1d21 0%, #121417 45%, #0b0c0e 100%)
        `,
        backgroundSize: "16px 16px, 22px 22px, 18px 18px, 100% 100%",
        boxShadow: `
          0 10px 30px rgba(0,0,0,0.45),
          inset 0 1px 0 rgba(240,235,227,0.08),
          inset 0 -1px 0 rgba(0,0,0,0.35)
        `,
      }}
    >
      <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_30%,rgba(196,180,154,0.12)_50%,transparent_70%)] translate-x-[-120%] transition-transform duration-700 group-hover:translate-x-[120%]" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default LeatherButton;
