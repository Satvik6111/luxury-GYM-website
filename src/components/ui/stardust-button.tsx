"use client";

import type React from "react";

interface StardustButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export function StardustButton({
  children = "Request Access",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: StardustButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`stardust-button group relative cursor-pointer overflow-hidden rounded-full border-0 px-9 py-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-[3px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-bright disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={{
        outline: "none",
        backgroundColor: "#121417",
        boxShadow: `
          inset 0 0.25rem 0.75rem rgba(240,235,227,0.08),
          inset 0 -0.1rem 0.25rem rgba(0,0,0,0.55),
          0 1rem 2.5rem rgba(0,0,0,0.35),
          0 0.5rem 1rem -0.4rem rgba(0,0,0,0.7)
        `,
      }}
    >
      <span
        className="stardust-wrap relative z-10 flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.24em]"
        style={{ color: "rgba(196,180,154,0.95)" }}
      >
        <span className="transition-transform duration-300 group-hover:rotate-90">✧</span>
        <span>{children}</span>
        <span className="transition-transform duration-300 group-hover:rotate-90">✦</span>
      </span>
      <span className="stardust-sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </button>
  );
}

export default StardustButton;
