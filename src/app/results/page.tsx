"use client";

import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/chrome";
import { Reveal, LineMask, SectionLabel } from "@/components/motion";
import { NoisePatternCard, NoisePatternCardBody } from "@/components/ui/noise-card";
import { CustomCursor } from "@/components/cursor";
import { LeatherButton } from "@/components/ui/leather-button";

type Metric = { label: string; from: string; to: string };

type CaseStudy = {
  id: string;
  profile: string;
  duration: string;
  focus: string;
  metrics: Metric[];
  quote: string;
};

const cases: CaseStudy[] = [
  {
    id: "Member A",
    profile: "Founder, 47",
    duration: "90 days",
    focus: "Energy · posture · sustainable strength",
    metrics: [
      { label: "Resting heart rate", from: "78 bpm", to: "64 bpm" },
      { label: "Deadlift (est.)", from: "80 kg", to: "120 kg" },
      { label: "Waist", from: "96 cm", to: "89 cm" },
      { label: "Sessions kept", from: "—", to: "94%" },
    ],
    quote:
      "I stopped deciding what to do. I just showed up. The numbers speak for themselves.",
  },
  {
    id: "Member B",
    profile: "Partner, law, 43",
    duration: "120 days",
    focus: "Mobility · back resilience · travel-proof plan",
    metrics: [
      { label: "FMS score", from: "11 / 21", to: "17 / 21" },
      { label: "Pain days / month", from: "9", to: "1" },
      { label: "Push-ups", from: "6", to: "28" },
      { label: "Body fat (est.)", from: "28%", to: "22%" },
    ],
    quote:
      "Travel used to break me. Now the plan travels with me — without me thinking about it.",
  },
  {
    id: "Member C",
    profile: "Executive, 52",
    duration: "180 days",
    focus: "Longevity markers · strength · clarity",
    metrics: [
      { label: "VO₂ max (est.)", from: "32", to: "41" },
      { label: "Squat", from: "Bodyweight", to: "1.2× BW" },
      { label: "Sleep quality", from: "5 / 10", to: "8 / 10" },
      { label: "Attendance", from: "—", to: "97%" },
    ],
    quote:
      "It feels less like a gym and more like having a chief medical officer for my fitness.",
  },
];

const process = [
  {
    n: "01",
    t: "Baseline assessment",
    b: "Movement screen, strength markers, body composition, lifestyle audit — before any programming begins.",
  },
  {
    n: "02",
    t: "Tracked every session",
    b: "Loads, reps, RPE, and adherence recorded by your trainer. You never open an app to log anything.",
  },
  {
    n: "03",
    t: "Re-assess every 6 weeks",
    b: "What improved. What stalled. What changes. Written into your plan automatically.",
  },
  {
    n: "04",
    t: "Monthly briefing",
    b: "A one-page board-style report: metrics, narrative, next 30 days. Delivered by your trainer.",
  },
];

export default function ResultsPage() {
  return (
    <>
      <CustomCursor />
      <SiteNav />

      <main id="main">
        <section className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(154,139,114,0.1),transparent_55%)]" />
          <div className="relative mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="01">Results</SectionLabel>
            <h1 className="max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] text-parchment">
              <LineMask>Big claims</LineMask>
              <LineMask delay={0.1}>are everywhere.</LineMask>
              <LineMask delay={0.2} className="italic text-bronze-bright">
                Numbers are rare.
              </LineMask>
            </h1>
            <Reveal delay={0.35}>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-parchment-dim md:text-base">
                These members handed it over. Below is what that looks like when
                someone skilled owns the process — anonymized, measured, and
                reported without theatrics.
              </p>
            </Reveal>
          </div>
        </section>

        {/* CASE STUDIES */}
        <section className="border-t border-[rgba(240,235,227,0.06)] py-20 md:py-28">
          <div className="mx-auto max-w-6xl space-y-8 px-5 md:space-y-10 md:px-8">
            {cases.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.06}>
                <NoisePatternCard>
                  <NoisePatternCardBody className="md:p-10">
                    <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="label">{c.id}</span>
                          <span className="h-px w-6 bg-bronze/50" />
                          <span className="text-[0.68rem] uppercase tracking-[0.18em] text-parchment-dim">
                            {c.profile}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-parchment-dim">
                          {c.focus} · {c.duration}
                        </p>
                        <blockquote className="mt-6 max-w-lg font-display text-xl leading-snug text-parchment md:text-2xl">
                          &ldquo;{c.quote}&rdquo;
                        </blockquote>
                      </div>

                      <div className="grid w-full grid-cols-2 gap-px overflow-hidden rounded-md border border-[rgba(240,235,227,0.08)] bg-[rgba(240,235,227,0.08)] md:max-w-md">
                        {c.metrics.map((m) => (
                          <div key={m.label} className="bg-[#0f1114] p-4">
                            <p className="text-[0.58rem] uppercase tracking-[0.14em] text-parchment-dim">
                              {m.label}
                            </p>
                            <div className="mt-2 flex items-baseline gap-2">
                              <span className="text-sm text-parchment-dim/70 line-through decoration-bronze/50">
                                {m.from}
                              </span>
                              <span className="text-bronze-bright">→</span>
                              <span className="font-display text-xl text-parchment">
                                {m.to}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NoisePatternCardBody>
                </NoisePatternCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* HOW WE MEASURE */}
        <section className="border-t border-[rgba(240,235,227,0.06)] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="02">How We Measure</SectionLabel>
            <div className="mb-12 max-w-2xl">
              <h2 className="font-display text-[clamp(1.85rem,4vw,3rem)] leading-tight text-parchment">
                Anyone can promise.
                <span className="block italic text-bronze-bright">
                  This is the system.
                </span>
              </h2>
            </div>

            <div className="grid gap-px overflow-hidden rounded-md border border-[rgba(240,235,227,0.08)] bg-[rgba(240,235,227,0.08)] sm:grid-cols-2 lg:grid-cols-4">
              {process.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.07} className="bg-obsidian-raised">
                  <div className="h-full p-6 transition-colors duration-500 hover:bg-[#1a1d21] md:p-7">
                    <span className="label">{p.n}</span>
                    <h3 className="mt-4 font-display text-xl text-parchment md:text-2xl">
                      {p.t}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-parchment-dim">
                      {p.b}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <p className="mt-10 max-w-2xl text-sm leading-relaxed text-parchment-dim">
                Note: individual results vary with adherence, sleep, and starting
                point. What does not vary is the process — baseline, tracking,
                re-assessment, briefing. Every member. Every month.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="border-t border-[rgba(240,235,227,0.06)] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
            <Reveal>
              <h2 className="font-display text-[clamp(1.85rem,4vw,3rem)] text-parchment">
                Your numbers.
                <span className="italic text-bronze-bright"> Your briefing.</span>
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/#consult" className="cursor-pointer">
                  <LeatherButton>Request a Private Consultation</LeatherButton>
                </Link>
                <Link
                  href="/trainer"
                  className="cursor-pointer self-center text-[0.68rem] uppercase tracking-[0.2em] text-parchment-dim transition-colors hover:text-parchment"
                >
                  Meet the trainer →
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
