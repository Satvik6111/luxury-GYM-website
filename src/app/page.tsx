"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Minus } from "phosphor-react";
import { SiteNav, SiteFooter } from "@/components/chrome";
import { Reveal, LineMask, SectionLabel } from "@/components/motion";
import { ConsultationForm } from "@/components/consultation-form";
import { Faq } from "@/components/faq";
import { Figure } from "@/components/figure";
import { CountUp } from "@/components/count-up";
import { Marquee } from "@/components/marquee";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { LeatherButton } from "@/components/ui/leather-button";
import { StardustButton } from "@/components/ui/stardust-button";
import { CustomCursor } from "@/components/cursor";
import { Magnetic } from "@/components/magnetic";

const DotGridBg = dynamic(
  () => import("@/components/dot-grid-bg").then((m) => m.DotGridBg),
  { ssr: false }
);

const stats: {
  to?: number;
  suffix?: string;
  text?: string;
  label: string;
}[] = [
  { to: 24, suffix: "h", label: "Reply to every request" },
  { text: "1:1", label: "Trainer to member, always" },
  { to: 100, suffix: "%", label: "Sessions owned by your trainer" },
  { to: 0, label: "Classes, queues, or handoffs" },
];

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

const voicesA = [
  {
    quote:
      "I stopped negotiating with myself at six in the morning. That alone was worth it.",
    who: "AR",
    role: "Managing Partner",
  },
  {
    quote:
      "The monthly briefing is the part I did not know I wanted. Numbers, plain English, decisions made.",
    who: "SM",
    role: "Consultant Physician",
  },
  {
    quote: "Nobody knows I train here. That is exactly the point.",
    who: "KT",
    role: "Founder",
  },
  {
    quote:
      "Six weeks in, my shoulder stopped clicking. Six months in, I stopped thinking about it.",
    who: "PV",
    role: "Architect",
  },
];

const voicesB = [
  {
    quote:
      "He moves the session when my week explodes. I have never had to build my life around a booking system.",
    who: "DL",
    role: "VP Engineering",
  },
  {
    quote: "No app. No group chat. No leaderboard. Just an hour that is entirely mine.",
    who: "RK",
    role: "Partner",
  },
  {
    quote:
      "I have had four trainers. This is the first one who read my bloodwork before writing a program.",
    who: "MJ",
    role: "Surgeon",
  },
  {
    quote:
      "The results are the least interesting part. Never having to think about it — that is the product.",
    who: "NB",
    role: "Head of Product",
  },
];

function QuoteCard({
  quote,
  who,
  role,
}: {
  quote: string;
  who: string;
  role: string;
}) {
  return (
    <figure className="flex w-[19rem] shrink-0 flex-col rounded-panel border border-hairline bg-obsidian-raised p-7 shadow-card md:w-[25rem] md:p-8">
      <span aria-hidden className="font-display text-5xl leading-none text-bronze-rule">
        &ldquo;
      </span>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-parchment-dim">
        {quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-hairline-soft pt-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-bronze-line-soft bg-obsidian-soft text-[0.7rem] md:text-[0.62rem] tracking-[0.12em] text-bronze-bright">
          {who}
        </span>
        <span className="text-[0.7rem] md:text-[0.62rem] uppercase tracking-[0.18em] text-parchment-faint">
          {role}
        </span>
      </figcaption>
    </figure>
  );
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-4%", "8%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.18, 1.34]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -44]);
  const copyFade = useTransform(scrollYProgress, [0.45, 0.85], [1, 0]);

  return (
    <>
      <CustomCursor />
      <SiteNav />

      <main id="main">
        {/* ── HERO ─────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative flex min-h-[100svh] flex-col overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            style={reduced ? undefined : { y: photoY, scale: photoScale }}
          >
            <Figure
              src="/images/hero-facility.jpg"
              alt="The Limitless training floor, empty, lit only by the ceiling wash"
              priority
              sizes="100vw"
              className="h-full w-full"
            />
          </motion.div>

          <div aria-hidden className="pointer-events-none absolute inset-0 scrim-vignette" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-48 scrim-top" />
          <div aria-hidden className="pointer-events-none absolute inset-0 scrim-left" />

          <div className="relative z-10 flex flex-1 items-end">
            <motion.div
              className="mx-auto w-full max-w-6xl px-5 pb-14 pt-32 md:px-8 md:pb-20"
              style={reduced ? undefined : { y: copyY, opacity: copyFade }}
            >
              <Reveal delay={0.1}>
                <div className="mb-7 flex items-center gap-4">
                  <span className="h-px w-12 bg-bronze-rule" />
                  <span className="label">Private Membership · By Request</span>
                </div>
              </Reveal>

              <h1 className="font-display text-[clamp(2.6rem,7vw,6rem)] font-medium leading-[1.08] tracking-[-0.02em] text-parchment">
                <LineMask delay={0.25}>You&apos;ve been told</LineMask>
                <LineMask delay={0.4}>to work harder.</LineMask>
                <LineMask delay={0.55} className="italic text-bronze-bright">
                  You&apos;ve never been handled.
                </LineMask>
              </h1>

              <Reveal delay={0.75}>
                <p className="mt-8 max-w-xl text-sm leading-relaxed text-parchment-dim md:text-base">
                  Limitless is a private fitness membership where one trainer owns your
                  plan, your sessions, and your results. You do not learn. You do not
                  manage. You arrive — and leave healthier.
                </p>
              </Reveal>

              <Reveal delay={0.95}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <a href="#consult" className="block cursor-pointer">
                      <StardustButton>Request a Private Consultation</StardustButton>
                    </a>
                  </Magnetic>
                  <Magnetic strength={0.2}>
                    <Link href="/results" className="block cursor-pointer">
                      <LeatherButton>See the Proof</LeatherButton>
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute bottom-44 right-6 z-10 hidden flex-col items-center gap-4 lg:flex">
            <span className="label rotate-180" style={{ writingMode: "vertical-rl" }}>
              Scroll
            </span>
            <span className="scroll-hint h-16 w-px bg-bronze-rule" />
          </div>

          {/* Proof ticker */}
          <div className="relative z-10 border-t border-hairline-soft bg-obsidian">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <div className="grid grid-cols-2 gap-px bg-hairline-soft md:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-obsidian px-4 py-6 md:px-6 md:py-8">
                    <p className="font-display text-4xl leading-none tabular-nums lining-nums text-parchment md:text-5xl">
                      {s.text ?? <CountUp to={s.to ?? 0} suffix={s.suffix ?? ""} />}
                    </p>
                    <p className="mt-3 text-[0.7rem] uppercase leading-[1.6] tracking-[0.16em] text-parchment-dim/80 md:text-[0.63rem] md:text-parchment-faint">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 01 · THE MIRROR ──────────────────── */}
        <section className="relative border-t border-hairline-soft">
          <div className="grid md:grid-cols-2">
            <div className="split-pad-l px-5 pb-20 pt-24 md:pb-36 md:pr-14 md:pt-36">
              <SectionLabel index="01">The Mirror</SectionLabel>
              <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.4rem)] leading-[1.1] text-parchment">
                <LineMask>You don&apos;t lack</LineMask>
                <LineMask delay={0.1}>discipline.</LineMask>
                <LineMask delay={0.2}>You lack someone</LineMask>
                <LineMask delay={0.3} className="italic text-bronze-bright">
                  who owns it for you.
                </LineMask>
              </h2>
              <Reveal delay={0.2}>
                <div className="mt-8 max-w-md space-y-5 text-sm leading-relaxed text-parchment-dim md:text-[0.95rem]">
                  <p>
                    You have tried the programs. The apps. The crowded floors at 6am. You
                    were told to grind harder, wake earlier, track everything.
                  </p>
                  <p>
                    You don&apos;t need another curriculum. You need someone excellent to
                    take the weight off your shoulders — and put it on the bar for you.
                  </p>
                  <p className="text-parchment">
                    Time-poor. Decision-fatigued. Ready to be handled by someone who does
                    this for a living.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="relative min-h-[62vh] md:min-h-0">
              <Figure
                src="/images/action-lift.jpg"
                alt="A member set over the bar, eyes up, mid-assessment"
                scrim="left"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </section>

        {/* ── 02 · THE PHILOSOPHY ──────────────── */}
        <section className="relative border-t border-hairline-soft py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="02">The Philosophy</SectionLabel>
            <div className="grid gap-5 md:grid-cols-12">
              <Reveal className="md:col-span-7">
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col">
                    <Figure
                      src="/images/action-squat.jpg"
                      alt="A member mid-set under the low light"
                      grade="deep"
                      scrim="bottom"
                      zoom
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="aspect-[16/9] w-full md:aspect-auto md:min-h-[16rem] md:flex-1"
                    />
                    <div className="p-8 md:p-10">
                      <span className="label">Principle 01</span>
                      <p className="mt-5 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.05] text-parchment">
                        You do not plan.
                      </p>
                      <p className="mt-5 max-w-md text-sm leading-relaxed text-parchment-dim">
                        Your trainer designs every session, every progression, every
                        deload. Your only job is to show up.
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>

              <div className="grid gap-5 md:col-span-5">
                <Reveal delay={0.1}>
                  <SpotlightCard>
                    <div className="flex h-full flex-col justify-between p-8 md:p-9">
                      <span className="label">Principle 02</span>
                      <div className="mt-12">
                        <p className="font-display text-3xl leading-snug text-parchment">
                          You do not research.
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-parchment-dim">
                          No blogs. No conflicting advice. No influencers. One expert. One
                          direction.
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>

                <Reveal delay={0.2}>
                  <SpotlightCard>
                    <div className="flex h-full flex-col justify-between p-8 md:p-9">
                      <span className="label">Principle 03</span>
                      <div className="mt-12">
                        <p className="font-display text-3xl leading-snug text-parchment">
                          You do not track.
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-parchment-dim">
                          We measure. You receive a clear monthly briefing — like any
                          report that matters.
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 · THE STANDARD ────────────────── */}
        <section className="relative border-t border-hairline-soft py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="03">The Standard</SectionLabel>
            <div className="mb-12 max-w-2xl">
              <h2 className="font-display text-[clamp(1.85rem,4vw,3.25rem)] leading-tight text-parchment">
                Claims are cheap.
                <span className="block italic text-bronze-bright">Standards are not.</span>
              </h2>
              <Reveal delay={0.15}>
                <p className="mt-5 text-sm leading-relaxed text-parchment-dim md:text-base">
                  This is how we prove we do what we say — before you ever pay a rupee or
                  pound or dollar of membership.
                </p>
              </Reveal>
            </div>

            <div className="grid gap-px overflow-hidden rounded-md border border-hairline bg-hairline md:grid-cols-2">
              {standards.map((s, i) => (
                <Reveal key={s.k} delay={i * 0.08} className="bg-obsidian-raised">
                  <div className="h-full p-7 transition-colors duration-500 hover:bg-obsidian-soft md:p-9">
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
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-md border border-bronze-veil bg-obsidian-raised px-6 py-5">
                {promises.map((p) => (
                  <span
                    key={p}
                    className="flex items-center gap-2.5 text-[0.7rem] md:text-[0.66rem] uppercase tracking-[0.2em] text-parchment-dim"
                  >
                    <Check size={13} weight="light" className="text-bronze-bright" />
                    {p}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── 04 · THE EXPERIENCE ──────────────── */}
        <section className="relative border-t border-hairline-soft py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="04">The Experience</SectionLabel>
            <div className="grid gap-14 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-5">
                <h2 className="font-display text-[clamp(1.85rem,4vw,3.25rem)] leading-tight text-parchment md:sticky md:top-28">
                  From request
                  <span className="block italic text-bronze-bright">to results.</span>
                </h2>
              </div>

              <ol className="space-y-4 md:col-span-7">
                {experience.map((e, i) => (
                  <li key={e.step}>
                    <Reveal delay={i * 0.08}>
                      <div className="group grid grid-cols-[auto_1fr] gap-6 rounded-panel border border-hairline bg-hairline-faint p-6 transition-colors duration-500 hover:border-bronze-veil hover:bg-obsidian-raised md:gap-10 md:p-8">
                        <span className="block w-10 font-display text-3xl leading-none text-bronze transition-colors group-hover:text-bronze-bright md:w-12 md:text-4xl">
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
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── 05 · THE SPACE ───────────────────── */}
        <section className="relative border-t border-hairline-soft py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="05">The Space</SectionLabel>
            <div className="mb-12 max-w-2xl">
              <h2 className="font-display text-[clamp(1.85rem,4vw,3.25rem)] leading-tight text-parchment">
                Everything you need.
                <span className="block italic text-bronze-bright">
                  Nothing you don&apos;t.
                </span>
              </h2>
              <Reveal delay={0.15}>
                <p className="mt-5 text-sm leading-relaxed text-parchment-dim md:text-base">
                  A full floor held deliberately below capacity — so the rack is free when
                  you reach it, the room stays quiet, and the hour is genuinely yours.
                </p>
              </Reveal>
            </div>

            <div className="grid gap-3 md:auto-rows-[13rem] md:grid-cols-12 lg:auto-rows-[15rem]">
              <Reveal className="md:col-span-5 md:row-span-2">
                <Figure
                  src="/images/facility-floor.jpg"
                  alt="The main training floor, empty"
                  grade="deep"
                  zoom
                  scrim="edge"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="aspect-[4/3] w-full md:aspect-auto md:h-full"
                />
              </Reveal>

              <Reveal delay={0.08} className="md:col-span-4">
                <Figure
                  src="/images/facility-machines.jpg"
                  alt="Plate-loaded machines along the wall"
                  zoom
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="aspect-[4/3] w-full md:aspect-auto md:h-full"
                />
              </Reveal>

              <Reveal delay={0.16} className="md:col-span-3">
                <Figure
                  src="/images/action-pushup.jpg"
                  alt="A member working through a set on the floor"
                  zoom
                  sizes="(min-width: 768px) 22vw, 100vw"
                  className="aspect-[4/3] w-full md:aspect-auto md:h-full"
                />
              </Reveal>

              <Reveal delay={0.24} className="md:col-span-4">
                <Figure
                  src="/images/facility-rack.jpg"
                  alt="A full dumbbell rack, unoccupied"
                  grade="soft"
                  zoom
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="aspect-[4/3] w-full md:aspect-auto md:h-full"
                />
              </Reveal>

              <Reveal delay={0.32} className="md:col-span-3">
                <Figure
                  src="/images/detail-plates.jpg"
                  alt="Cast-iron plates stacked beside a loaded bar"
                  grade="deep"
                  zoom
                  sizes="(min-width: 768px) 22vw, 100vw"
                  className="aspect-[4/3] w-full md:aspect-auto md:h-full"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 06 · THE FILTER ──────────────────── */}
        <section className="relative border-t border-hairline-soft py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="06">The Filter</SectionLabel>
            <Reveal>
              <p className="mb-10 max-w-2xl text-sm leading-relaxed text-parchment-dim md:text-base">
                Built for founders, physicians, partners, and the next generation of them —
                people who value privacy and results over a scene.
              </p>
            </Reveal>

            <div className="grid gap-6 md:grid-cols-12">
              <Reveal className="md:col-span-7">
                <div className="h-full rounded-md border border-bronze-line-soft bg-obsidian-raised p-7 shadow-card md:p-9">
                  <p className="label mb-6">This is for you if</p>
                  <ul className="space-y-4 text-sm leading-relaxed text-parchment-dim">
                    {[
                      "You want results without becoming a student of fitness.",
                      "You value privacy, punctuality, and one relationship with your trainer.",
                      "You prefer a clear monthly briefing over a workout app.",
                      "You are ready to hand it over — fully — and follow through.",
                    ].map((t) => (
                      <li key={t} className="flex gap-3">
                        <Check
                          size={14}
                          weight="light"
                          className="mt-1 shrink-0 text-bronze-bright"
                        />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.12} className="md:col-span-5">
                <div className="rounded-md border border-hairline bg-obsidian-raised/60 p-7 md:p-9">
                  <p className="label mb-6">This is not for you if</p>
                  <ul className="space-y-4 text-sm leading-relaxed text-parchment-faint">
                    {[
                      "You are shopping purely on price.",
                      "You want a crowded class calendar and a social scene.",
                      "You prefer to design the program yourself.",
                      "You want promises without a process behind them.",
                    ].map((t) => (
                      <li key={t} className="flex gap-3">
                        <Minus
                          size={14}
                          weight="light"
                          className="mt-1 shrink-0 text-parchment-mute"
                        />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 07 · MEMBERS ─────────────────────── */}
        <section className="relative overflow-hidden border-t border-hairline-soft py-24 md:py-36">
          <div className="mx-auto mb-12 max-w-6xl px-5 md:px-8">
            <SectionLabel index="07">Members</SectionLabel>
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(1.85rem,4vw,3.25rem)] leading-tight text-parchment">
                Quiet results.
                <span className="block italic text-bronze-bright">Said plainly.</span>
              </h2>
              <Reveal delay={0.15}>
                <p className="mt-5 text-sm leading-relaxed text-parchment-dim md:text-base">
                  No names. No photographs. Members who chose to say something — said it.
                </p>
              </Reveal>
            </div>
          </div>

          <Marquee duration={64} className="mask-fade-x">
            {voicesA.map((v) => (
              <QuoteCard key={v.who} {...v} />
            ))}
          </Marquee>
          <Marquee duration={80} reverse className="mask-fade-x mt-3">
            {voicesB.map((v) => (
              <QuoteCard key={v.who} {...v} />
            ))}
          </Marquee>
        </section>

        {/* ── TEASERS ──────────────────────────── */}
        <section className="relative border-t border-hairline-soft py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="grid gap-4 md:grid-cols-2">
              <Reveal>
                <Link
                  href="/trainer"
                  className="group block h-full cursor-pointer overflow-hidden rounded-panel border border-hairline transition-colors duration-500 hover:border-bronze-rule"
                >
                  <Figure
                    src="/images/portrait-trainer.jpg"
                    alt="The Limitless trainer on the floor"
                    scrim="bottom"
                    zoom
                    grade="full"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[4/3] w-full"
                  >
                    <div className="p-7 md:p-9">
                      <p className="label">The Trainer</p>
                      <h3 className="mt-4 font-display text-3xl leading-tight text-parchment md:text-4xl">
                        One person.
                        <span className="block italic text-bronze-bright">
                          Your entire system.
                        </span>
                      </h3>
                      <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] md:text-[0.66rem] uppercase tracking-[0.22em] text-bronze transition-transform duration-300 group-hover:translate-x-1">
                        Meet them
                        <ArrowRight size={14} weight="light" />
                      </span>
                    </div>
                  </Figure>
                </Link>
              </Reveal>

              <Reveal delay={0.1}>
                <Link
                  href="/results"
                  className="group block h-full cursor-pointer overflow-hidden rounded-panel border border-hairline transition-colors duration-500 hover:border-bronze-rule"
                >
                  <Figure
                    src="/images/progress-early.jpg"
                    alt="A member mid-set under the low light"
                    scrim="bottom"
                    zoom
                    grade="full"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="aspect-[4/3] w-full"
                  >
                    <div className="p-7 md:p-9">
                      <p className="label">Results</p>
                      <h3 className="mt-4 font-display text-3xl leading-tight text-parchment md:text-4xl">
                        Measured.
                        <span className="block italic text-bronze-bright">
                          Reported. Undeniable.
                        </span>
                      </h3>
                      <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] md:text-[0.66rem] uppercase tracking-[0.22em] text-bronze transition-transform duration-300 group-hover:translate-x-1">
                        See the proof
                        <ArrowRight size={14} weight="light" />
                      </span>
                    </div>
                  </Figure>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 08 · QUESTIONS ───────────────────── */}
        <section className="relative border-t border-hairline-soft py-24 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="08">Questions</SectionLabel>
            <div className="grid gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-4">
                <div className="md:sticky md:top-28">
                  <h2 className="font-display text-[clamp(1.85rem,4vw,3rem)] leading-tight text-parchment">
                    Before you ask.
                    <span className="block italic text-bronze-bright">
                      Answered plainly.
                    </span>
                  </h2>
                  <Reveal delay={0.12}>
                    <p className="mt-5 text-sm leading-relaxed text-parchment-dim">
                      No sales sequence. No fine print. The seven things every serious
                      buyer wants to know — said once, clearly.
                    </p>
                  </Reveal>
                </div>
              </div>
              <div className="md:col-span-8">
                <Faq />
              </div>
            </div>
          </div>
        </section>

        {/* ── 09 · PRIVATE CONSULTATION ────────── */}
        <section
          id="consult"
          className="relative scroll-mt-24 overflow-hidden border-t border-hairline-soft py-24 md:py-36"
        >
          <div className="pointer-events-none absolute inset-0 glow-top" />
          <DotGridBg className="absolute inset-0 h-full w-full opacity-40" />

          <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="09">Private Consultation</SectionLabel>

            <div className="grid gap-12 md:grid-cols-12 md:gap-14">
              <div className="md:col-span-5">
                <h2 className="font-display text-[clamp(1.85rem,4vw,3rem)] leading-tight text-parchment">
                  No forms that feel like
                  <span className="block italic text-bronze-bright">
                    applications for a loan.
                  </span>
                </h2>
                <Reveal delay={0.12}>
                  <div className="mt-6 max-w-md space-y-4 text-sm leading-relaxed text-parchment-dim">
                    <p>
                      Four quiet questions. A personal response within 24 hours. No prices
                      on this page — because the conversation comes first.
                    </p>
                    <p>
                      One-to-one only. Identities, schedules, and results are never
                      shared.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.2}>
                  <Figure
                    src="/images/portrait-coach.jpg"
                    alt="A trainer in conversation with a member"
                    zoom
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="mt-10 hidden aspect-[16/10] w-full md:block"
                  />
                </Reveal>
              </div>

              <Reveal delay={0.15} className="md:col-span-7">
                <div className="rounded-bezel border border-hairline bg-hairline-faint p-1.5 shadow-card">
                  <div className="overflow-hidden rounded-panel bg-obsidian-raised p-6 md:p-9">
                    <ConsultationForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
