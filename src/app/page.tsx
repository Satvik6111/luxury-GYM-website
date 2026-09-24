"use client";

import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/chrome";
import { Reveal, LineMask, SectionLabel } from "@/components/motion";
import { ConsultationForm } from "@/components/consultation-form";
import { Faq } from "@/components/faq";
import { NoisePatternCard, NoisePatternCardBody } from "@/components/ui/noise-card";
import { LeatherButton } from "@/components/ui/leather-button";
import { StardustButton } from "@/components/ui/stardust-button";
import { CustomCursor } from "@/components/cursor";
import { Magnetic } from "@/components/magnetic";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(
  () => import("@/components/hero-canvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

const standards = [
  {
    k: "01",
    title: "Answered in 24 hours",
    body: "Every consultation request receives a personal reply — not an autoresponder, not a sales sequence.",
  },
  {
    k: "02",
    title: "Sessions begin on time",
    body: "Your hour is your hour. Your trainer is ready before you arrive. Every single time.",
  },
  {
    k: "03",
    title: "Monthly health briefing",
    body: "Numbers, progress, and adjustments — delivered the way you receive a board update. Clear. Brief. Actioned.",
  },
  {
    k: "04",
    title: "Program changes without asking",
    body: "When something shifts — travel, sleep, a stiff shoulder — the plan updates before you notice.",
  },
];

const promises = [
  "Answered in 24 hours",
  "Sessions begin on time",
  "No lock-in",
  "Handled personally",
];

const experience = [
  {
    step: "I",
    title: "Private assessment",
    body: "Movement, history, lifestyle, and goals — taken seriously, in private. No clipboard on a crowded floor.",
  },
  {
    step: "II",
    title: "Program built for you",
    body: "Your trainer designs everything. You do not research, compare, or second-guess.",
  },
  {
    step: "III",
    title: "Sessions handled",
    body: "You arrive. Everything else — warm-up, load, form, recovery — is owned for you.",
  },
  {
    step: "IV",
    title: "Monthly briefing",
    body: "What improved. What changed. What comes next. You leave with clarity, not homework.",
  },
];

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <SiteNav />

      <main id="main">
        {/* HERO */}
        <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(154,139,114,0.12),transparent_65%)]" />
            <div className="absolute left-1/2 top-1/2 h-[48vmin] w-[48vmin] -translate-x-1/2 -translate-y-1/2 opacity-60">
              <HeroCanvas />
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
            <Reveal delay={0.1}>
              <p className="label mb-8">Private Membership · By Request</p>
            </Reveal>

            <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.02em] text-parchment">
              <LineMask delay={0.25}>You&apos;ve been told</LineMask>
              <LineMask delay={0.4}>to work harder.</LineMask>
              <LineMask delay={0.55} className="italic text-bronze-bright">
                You&apos;ve never been handled.
              </LineMask>
            </h1>

            <Reveal delay={0.75}>
              <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-parchment-dim md:text-base">
                Limitless is a private fitness membership where one trainer owns your
                plan, your sessions, and your results. You do not learn. You do not
                manage. You arrive — and leave healthier.
              </p>
            </Reveal>

            <Reveal delay={0.95}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <Magnetic>
                  <a href="#consult" className="cursor-pointer block">
                    <StardustButton>Request a Private Consultation</StardustButton>
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <Link href="/results" className="cursor-pointer block">
                    <LeatherButton>See the Proof</LeatherButton>
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <Reveal delay={1.2}>
              <div className="flex flex-col items-center gap-2">
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-parchment-dim">
                  Scroll
                </span>
                <span className="h-10 w-px bg-gradient-to-b from-bronze to-transparent" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* THE MIRROR */}
        <section className="relative border-t border-[rgba(240,235,227,0.06)] py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="01">The Mirror</SectionLabel>
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-7">
                <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] text-parchment">
                  <LineMask>You don&apos;t lack discipline.</LineMask>
                  <LineMask delay={0.12}>You lack someone</LineMask>
                  <LineMask delay={0.24} className="italic text-bronze-bright">
                    who owns it for you.
                  </LineMask>
                </h2>
              </div>
              <div className="md:col-span-5 md:pt-4">
                <Reveal delay={0.2}>
                  <div className="space-y-6 text-sm leading-relaxed text-parchment-dim md:text-[0.95rem]">
                    <p>
                      You have tried the programs. The apps. The crowded floors at 6am.
                      You were told to grind harder, wake earlier, track everything.
                    </p>
                    <p>
                      You don&apos;t need another curriculum. You need someone excellent
                      to take the weight off your shoulders — and put it on the bar for you.
                    </p>
                    <p className="text-parchment">
                      Time-poor. Decision-fatigued. Ready to be handled by someone who
                      does this for a living.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="relative border-t border-[rgba(240,235,227,0.06)] py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="02">The Philosophy</SectionLabel>
            <div className="grid gap-10 md:grid-cols-3">
              {[
                {
                  t: "You do not plan.",
                  b: "Your trainer designs every session, every progression, every deload. Your only job is to show up.",
                },
                {
                  t: "You do not research.",
                  b: "No blogs. No conflicting advice. No influencers. One expert. One direction.",
                },
                {
                  t: "You do not track.",
                  b: "We measure. You receive a clear monthly briefing — like any report that matters.",
                },
              ].map((item, i) => (
                <Reveal key={item.t} delay={i * 0.12}>
                  <NoisePatternCard className="h-full">
                    <NoisePatternCardBody className="flex h-full min-h-[220px] flex-col justify-between">
                      <p className="font-display text-2xl leading-snug text-parchment md:text-3xl">
                        {item.t}
                      </p>
                      <p className="mt-6 text-sm leading-relaxed text-parchment-dim">
                        {item.b}
                      </p>
                    </NoisePatternCardBody>
                  </NoisePatternCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* THE STANDARD / PROOF OF PROCESS */}
        <section className="relative border-t border-[rgba(240,235,227,0.06)] py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="03">The Standard</SectionLabel>
            <div className="mb-12 max-w-2xl">
              <h2 className="font-display text-[clamp(1.85rem,4vw,3.25rem)] leading-tight text-parchment">
                Claims are cheap.
                <span className="block italic text-bronze-bright">
                  Standards are not.
                </span>
              </h2>
              <Reveal delay={0.15}>
                <p className="mt-5 text-sm leading-relaxed text-parchment-dim md:text-base">
                  This is how we prove we do what we say — before you ever pay a rupee
                  or pound or dollar of membership.
                </p>
              </Reveal>
            </div>

            <div className="grid gap-px overflow-hidden rounded-md border border-[rgba(240,235,227,0.08)] bg-[rgba(240,235,227,0.08)] md:grid-cols-2">
              {standards.map((s, i) => (
                <Reveal key={s.k} delay={i * 0.08} className="bg-obsidian-raised">
                  <div className="h-full p-7 transition-colors duration-500 hover:bg-[#1a1d21] md:p-9">
                    <span className="label">{s.k}</span>
                    <h3 className="mt-4 font-display text-2xl text-parchment md:text-[1.75rem]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-parchment-dim">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-md border border-[rgba(154,139,114,0.28)] bg-[#121417] px-6 py-5">
                {promises.map((p) => (
                  <span
                    key={p}
                    className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.2em] text-parchment-dim"
                  >
                    <span className="text-bronze-bright" aria-hidden>
                      —
                    </span>
                    {p}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="relative border-t border-[rgba(240,235,227,0.06)] py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="04">The Experience</SectionLabel>
            <div className="grid gap-14 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-5">
                <h2 className="sticky top-28 font-display text-[clamp(1.85rem,4vw,3.25rem)] leading-tight text-parchment">
                  From request
                  <span className="block italic text-bronze-bright">
                    to results.
                  </span>
                </h2>
              </div>
              <ol className="md:col-span-7">
                {experience.map((e, i) => (
                  <Reveal key={e.step} delay={i * 0.08}>
                    <li className="group grid grid-cols-[auto_1fr] gap-6 border-b border-[rgba(240,235,227,0.07)] py-8 first:pt-0 last:border-0 md:gap-10">
                      <span className="font-display text-3xl text-bronze transition-colors group-hover:text-bronze-bright md:text-4xl">
                        {e.step}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl text-parchment md:text-[1.75rem]">
                          {e.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-parchment-dim">
                          {e.body}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section className="relative border-t border-[rgba(240,235,227,0.06)] py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="05">The Filter</SectionLabel>
            <Reveal>
              <p className="mb-10 max-w-2xl text-sm leading-relaxed text-parchment-dim md:text-base">
                Built for founders, physicians, partners, and the next generation
                of them — people who value privacy and results over a scene.
              </p>
            </Reveal>
            <div className="grid gap-10 md:grid-cols-2 md:gap-16">
              <Reveal>
                <div className="rounded-md border border-[rgba(154,139,114,0.35)] bg-[#121417] p-7 md:p-9">
                  <p className="label mb-6">This is for you if</p>
                  <ul className="space-y-4 text-sm leading-relaxed text-parchment-dim">
                    <li className="flex gap-3">
                      <span className="text-bronze-bright">—</span>
                      You want results without becoming a student of fitness.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-bronze-bright">—</span>
                      You value privacy, punctuality, and one relationship with your trainer.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-bronze-bright">—</span>
                      You prefer a clear monthly briefing over a workout app.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-bronze-bright">—</span>
                      You are ready to hand it over — fully — and follow through.
                    </li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="rounded-md border border-[rgba(240,235,227,0.08)] p-7 md:p-9">
                  <p className="label mb-6">This is not for you if</p>
                  <ul className="space-y-4 text-sm leading-relaxed text-parchment-dim">
                    <li className="flex gap-3">
                      <span className="text-parchment-dim/50">—</span>
                      You are shopping purely on price.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-parchment-dim/50">—</span>
                      You want a crowded class calendar and a social scene.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-parchment-dim/50">—</span>
                      You prefer to design the program yourself.
                    </li>
                    <li className="flex gap-3">
                      <span className="text-parchment-dim/50">—</span>
                      You want promises without a process behind them.
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* TRAINer + RESULTS TEASERS */}
        <section className="relative border-t border-[rgba(240,235,227,0.06)] py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              <Reveal>
                <Link href="/trainer" className="group block h-full cursor-pointer">
                  <div className="flex h-full flex-col justify-between rounded-md border border-[rgba(240,235,227,0.08)] bg-obsidian-raised p-8 transition-all duration-500 group-hover:border-[rgba(154,139,114,0.45)] md:p-10">
                    <div>
                      <p className="label">The Trainer</p>
                      <h3 className="mt-5 font-display text-3xl text-parchment md:text-4xl">
                        One person.
                        <span className="block italic text-bronze-bright">
                          Your entire system.
                        </span>
                      </h3>
                      <p className="mt-4 max-w-sm text-sm leading-relaxed text-parchment-dim">
                        Credentials, philosophy, and the promise that your sessions are
                        never handed off.
                      </p>
                    </div>
                    <span className="mt-10 inline-block text-[0.68rem] uppercase tracking-[0.22em] text-bronze transition-transform duration-300 group-hover:translate-x-1">
                      Meet them →
                    </span>
                  </div>
                </Link>
              </Reveal>

              <Reveal delay={0.1}>
                <Link href="/results" className="group block h-full cursor-pointer">
                  <div className="flex h-full flex-col justify-between rounded-md border border-[rgba(240,235,227,0.08)] bg-obsidian-raised p-8 transition-all duration-500 group-hover:border-[rgba(154,139,114,0.45)] md:p-10">
                    <div>
                      <p className="label">Results</p>
                      <h3 className="mt-5 font-display text-3xl text-parchment md:text-4xl">
                        Measured.
                        <span className="block italic text-bronze-bright">
                          Reported. Undeniable.
                        </span>
                      </h3>
                      <p className="mt-4 max-w-sm text-sm leading-relaxed text-parchment-dim">
                        Real member outcomes with the metrics we track — and how we
                        prove the work is working.
                      </p>
                    </div>
                    <span className="mt-10 inline-block text-[0.68rem] uppercase tracking-[0.22em] text-bronze transition-transform duration-300 group-hover:translate-x-1">
                      See the proof →
                    </span>
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative border-t border-[rgba(240,235,227,0.06)] py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="06">Questions</SectionLabel>
            <div className="mb-12 max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-tight text-parchment">
                Before you ask.
                <span className="block italic text-bronze-bright">
                  Answered plainly.
                </span>
              </h2>
              <Reveal delay={0.12}>
                <p className="mt-5 text-sm leading-relaxed text-parchment-dim md:text-base">
                  No sales sequence. No fine print. The seven things every serious
                  buyer wants to know — said once, clearly.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <Faq />
            </Reveal>
          </div>
        </section>

        {/* CONSULTATION */}
        <section
          id="consult"
          className="relative scroll-mt-24 border-t border-[rgba(240,235,227,0.06)] py-24 md:py-36"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(154,139,114,0.08),transparent_55%)]" />
          <div className="relative mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="07">Private Consultation</SectionLabel>
            <div className="mb-12 max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-tight text-parchment">
                No forms that feel like
                <span className="block italic text-bronze-bright">
                  applications for a loan.
                </span>
              </h2>
              <Reveal delay={0.12}>
                <p className="mt-5 text-sm leading-relaxed text-parchment-dim md:text-base">
                  Four quiet questions. A personal response within 24 hours. No
                  prices on this page — because the conversation comes first.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-4 text-sm leading-relaxed text-parchment-dim">
                  One-to-one only. Identities, schedules, and results are never
                  shared.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <ConsultationForm />
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
