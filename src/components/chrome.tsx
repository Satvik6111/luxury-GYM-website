"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/trainer", label: "The Trainer" },
  { href: "/results", label: "Results" },
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-bronze-bright"
      style={{ scaleX: x }}
    />
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-[rgba(240,235,227,0.06)] bg-[rgba(11,12,14,0.9)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className="group flex cursor-pointer items-center gap-3"
          aria-label="Limitless Fitness home"
        >
          <span className="flex h-8 w-8 items-center justify-center border border-[rgba(154,139,114,0.5)] text-[0.65rem] font-medium tracking-widest text-bronze-bright transition-colors group-hover:border-bronze-bright">
            LF
          </span>
          <span className="hidden text-[0.68rem] font-medium uppercase tracking-[0.32em] text-parchment-dim sm:block">
            Limitless
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "cursor-pointer text-[0.68rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-bright",
                pathname === l.href
                  ? "text-parchment"
                  : "text-parchment-dim hover:text-parchment"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#consult"
            className="hidden cursor-pointer rounded-full border border-[rgba(154,139,114,0.55)] px-4 py-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-bronze-bright transition-all duration-300 hover:border-bronze-bright hover:bg-[rgba(154,139,114,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-bright sm:inline-block md:px-5 md:py-2.5 md:text-[0.66rem]"
          >
            Request
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[rgba(240,235,227,0.1)] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span
              className={cn(
                "relative block h-px w-5 bg-parchment transition-transform duration-300",
                open && "rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute block h-px w-5 bg-parchment transition-transform duration-300",
                open && "-rotate-45"
              )}
            />
          </button>
        </div>

        <ScrollProgress />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[rgba(240,235,227,0.06)] md:hidden"
          >
            <nav
              className="flex flex-col gap-1 px-5 py-4"
              aria-label="Mobile primary"
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => {
                    setOpen(false);
                  }}
                  className={cn(
                    "cursor-pointer py-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-colors",
                    pathname === l.href
                      ? "text-parchment"
                      : "text-parchment-dim hover:text-parchment"
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/#consult"
                onClick={() => {
                  setOpen(false);
                }}
                className="mt-2 cursor-pointer rounded-full border border-[rgba(154,139,114,0.55)] px-4 py-3 text-center text-[0.66rem] font-medium uppercase tracking-[0.2em] text-bronze-bright"
              >
                Request Consultation
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(240,235,227,0.06)] bg-obsidian">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-8 md:py-16">
        <div>
          <p className="font-display text-3xl text-parchment md:text-4xl">
            Limitless Fitness
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-parchment-dim">
            Private membership. One trainer. Your health, handled.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-[0.68rem] uppercase tracking-[0.2em] text-parchment-dim md:items-end">
          <Link
            href="/trainer"
            className="cursor-pointer transition-colors hover:text-parchment"
          >
            The Trainer
          </Link>
          <Link
            href="/results"
            className="cursor-pointer transition-colors hover:text-parchment"
          >
            Results
          </Link>
          <Link
            href="/#consult"
            className="cursor-pointer transition-colors hover:text-parchment"
          >
            Private Consultation
          </Link>
          <span className="mt-4 text-bronze">By request only</span>
        </div>
      </div>
      <div className="border-t border-[rgba(240,235,227,0.04)] px-5 py-6 text-center text-[0.62rem] uppercase tracking-[0.24em] text-[rgba(196,189,178,0.45)] md:px-8">
        © {new Date().getFullYear()} Limitless Fitness
      </div>
    </footer>
  );
}
