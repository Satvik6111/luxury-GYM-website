"use client";

import React from "react";

interface GlassRadioGroupProps {
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  columns?: number;
  className?: string;
}

export function GlassRadioGroup({
  name,
  options,
  value,
  onChange,
  columns,
  className = "",
}: GlassRadioGroupProps) {
  const count = columns ?? options.length;
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );

  return (
    <div className={className}>
      <div
        className="glass-radio-group relative flex w-full flex-wrap overflow-hidden rounded-2xl"
        style={{
          background: "rgba(240,235,227,0.05)",
          backdropFilter: "blur(14px)",
          boxShadow: `
            inset 1px 1px 4px rgba(240,235,227,0.08),
            inset -1px -1px 6px rgba(0,0,0,0.35),
            0 4px 16px rgba(0,0,0,0.2)
          `,
        }}
      >
        {options.map((opt) => (
          <React.Fragment key={opt.value}>
            <input
              type="radio"
              className="sr-only"
              name={name}
              id={`${name}-${opt.value}`}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange?.(opt.value)}
            />
            <label
              htmlFor={`${name}-${opt.value}`}
              className="relative z-[2] flex min-w-0 flex-1 cursor-pointer items-center justify-center px-4 py-3.5 text-center text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#c4bdb2] transition-colors duration-300 hover:text-[#f0ebe3] sm:px-5 sm:text-[0.72rem]"
            >
              {opt.label}
            </label>
          </React.Fragment>
        ))}
        <div
          aria-hidden
          className="glass-glider pointer-events-none absolute inset-y-0 left-0 z-[1] rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            width: `calc(100% / ${count})`,
            transform: `translateX(${activeIndex * 100}%)`,
            background:
              "linear-gradient(135deg, rgba(154,139,114,0.35), rgba(196,180,154,0.55))",
            boxShadow:
              "0 0 18px rgba(154,139,114,0.35), inset 0 0 10px rgba(240,235,227,0.12)",
            display: value ? undefined : "none",
          }}
        />
      </div>
    </div>
  );
}

export default GlassRadioGroup;
