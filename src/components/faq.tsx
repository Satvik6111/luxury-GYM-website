"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "How is this different from a personal trainer at my gym?",
    a: "One trainer owns your plan, your sessions, and your briefing. No handoffs. No app-homework. Everything is measured and reported monthly — you never have to manage it yourself.",
  },
  {
    q: "Why are there no prices on this page?",
    a: "We do not sell sessions — we take on members. The conversation comes first. Terms are discussed privately in your consultation, never published as a discount lever.",
  },
  {
    q: "Who trains at Limitless?",
    a: "Founders, partners, physicians, and the next generation of them — people who value privacy and results over a scene. The roster is capped so every member receives undivided attention.",
  },
  {
    q: "I've invested in coaching before and it didn't last. Why would this be different?",
    a: "Most programs fail because nobody owned the outcome. We assess first, track every session, re-assess every six weeks, and brief you monthly — the process is the product. Limitations and history are programmed around from day one.",
  },
  {
    q: "What happens after I send a request?",
    a: "One personal reply within 24 hours — not an autoresponder. A private consultation. If it is not a fit, we will say so.",
  },
  {
    q: "Is it actually private?",
    a: "One-to-one only. No crowds. No cameras on the floor. Identities, schedules, and results are never shared.",
  },
  {
    q: "Do you work with injuries or alongside my doctor?",
    a: "Every member is movement-screened before we load them. We program around injuries and limitations, and we work alongside your physician when needed. Current in CPR/AED.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-y border-[rgba(240,235,227,0.07)]">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="border-b border-[rgba(240,235,227,0.07)] last:border-b-0"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className="group flex w-full cursor-pointer items-start justify-between gap-6 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-bright md:py-7"
            >
              <span className="flex items-start gap-5">
                <span className="label mt-1.5 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl leading-snug text-parchment transition-colors duration-300 group-hover:text-bronze-bright md:text-2xl">
                  {item.q}
                </span>
              </span>
              <span
                aria-hidden
                className={`mt-1.5 shrink-0 text-lg text-bronze transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-0 text-sm leading-relaxed text-parchment-dim md:pl-[calc(0.6875rem+1.25rem)]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
