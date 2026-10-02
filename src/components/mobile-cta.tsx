"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "phosphor-react";

/**
 * Persistent thumb-reachable action bar for phones. Appears once the reader is
 * past the hero and retracts permanently once the consultation section is in
 * view, so it never covers the form or the footer.
 */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consult = document.getElementById("consult");

    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      const reachedConsult = consult
        ? consult.getBoundingClientRect().top < window.innerHeight - 64
        : false;
      setShow(pastHero && !reachedConsult);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      className="safe-area-bottom fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden"
      style={{
        transform: show ? "translateY(0)" : "translateY(110%)",
        pointerEvents: show ? "auto" : "none",
      }}
    >
      <div className="border-t border-hairline bg-obsidian-veil/95 backdrop-blur-xl">
        <Link
          href="/#consult"
          tabIndex={show ? 0 : -1}
          className="flex min-h-14 items-center justify-center gap-3 bg-bronze-tint px-5 text-center text-[0.7rem] md:text-[0.68rem] font-medium uppercase tracking-[0.2em] text-bronze-bright transition-colors active:bg-bronze-veil"
        >
          Request a Private Consultation
          <ArrowRight size={14} weight="light" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
