"use client";

import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/chrome";
import { Reveal, LineMask, SectionLabel } from "@/components/motion";
import { NoisePatternCard, NoisePatternCardBody } from "@/components/ui/noise-card";
import { CustomCursor } from "@/components/cursor";
import { LeatherButton } from "@/components/ui/leather-button";

const trainerProfile = {
  name: "",
  title: "Head Trainer · Limitless",
  quote:
    "My members don\u2019t need another person who counts reps. They need someone who takes responsibility for the outcome \u2014 and has the skill to earn that trust.",
  bio: [
    "Fourteen years in private practice. Background in strength & conditioning, corrective exercise, and nutrition \u2014 built for people who run companies, practices, and families, and refuse to treat their health like a hobby.",
    "Every Limitless member works with the same trainer. No rotations. No \u201Cfill-ins.\u201D If you booked 7am, your trainer is there at 6:55 \u2014 knowing your shoulder, your sleep, and your schedule.",
  ],
  credentials: [
    { label: "Years in private practice", value: "14+" },
    { label: "Members coached 1-on-1", value: "120" },
    { label: "Average member tenure", value: "3.2 yrs" },
    { label: "Certifications held", value: "6" },
  ],
  certs: [
    "NASM Certified Personal Trainer",
    "Precision Nutrition Level 2",
    "FMS Level 2 — Functional Movement",
    "PreScript Level 1 — Corrective Exercise",
    "TRX Suspension Training Specialist",
    "CPR / AED / First Aid (current)",
  ],
};

const { credentials, certs: certList } = trainerProfile;

export default function TrainerPage() {
  return (
    <>
      <CustomCursor />
      <SiteNav />

      <main id="main">
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(154,139,114,0.1),transparent_50%)]" />
          <div className="relative mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="01">The Trainer</SectionLabel>
            <h1 className="max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] text-parchment">
              <LineMask>Your sessions</LineMask>
              <LineMask delay={0.12}>are never</LineMask>
              <LineMask delay={0.24} className="italic text-bronze-bright">
                handed off.
              </LineMask>
            </h1>
            <Reveal delay={0.4}>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-parchment-dim md:text-base">
                At Limitless, you do not get &ldquo;a team.&rdquo; You get one trainer who
                owns your health — present for every session, accountable for every
                number in your briefing.
              </p>
            </Reveal>
          </div>
        </section>

        {/* DOSSIER */}
        <section className="border-t border-[rgba(240,235,227,0.06)] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <div className="grid gap-12 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-5">
                <Reveal>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-[rgba(154,139,114,0.3)] bg-obsidian-raised">
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                      <span className="font-display text-[6rem] leading-none text-bronze-bright md:text-[8rem]">
                        LF
                      </span>
                      <span className="label">
                        {trainerProfile.name || "Portrait"}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 border-t border-[rgba(240,235,227,0.08)] bg-[rgba(11,12,14,0.85)] p-5 backdrop-blur-sm">
                      <p className="font-display text-2xl text-parchment">
                        {trainerProfile.name || "The Trainer"}
                      </p>
                      <p className="mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-bronze">
                        {trainerProfile.title}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="md:col-span-7">
                <Reveal>
                  <p className="label">Philosophy</p>
                  <blockquote className="mt-5 font-display text-[clamp(1.5rem,3vw,2.35rem)] leading-snug text-parchment">
                    &ldquo;{trainerProfile.quote}&rdquo;
                  </blockquote>
                </Reveal>

                <Reveal delay={0.12}>
                  <div className="mt-8 space-y-4 text-sm leading-relaxed text-parchment-dim">
                    {trainerProfile.bio.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                </Reveal>

                <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-[rgba(240,235,227,0.08)] bg-[rgba(240,235,227,0.08)] sm:grid-cols-4">
                  {credentials.map((c, i) => (
                    <Reveal key={c.label} delay={i * 0.06} className="bg-obsidian-raised">
                      <div className="flex h-full flex-col justify-between p-4">
                        <span className="font-display text-3xl text-parchment">
                          {c.value}
                        </span>
                        <span className="mt-3 text-[0.6rem] uppercase leading-snug tracking-[0.14em] text-parchment-dim">
                          {c.label}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CREDENTIALS LEDGER */}
        <section className="border-t border-[rgba(240,235,227,0.06)] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionLabel index="02">Credentials</SectionLabel>
            <Reveal>
              <p className="mb-8 max-w-2xl text-sm leading-relaxed text-parchment-dim">
                Screened before we load you. Current in CPR/AED. Works alongside
                your physician.
              </p>
            </Reveal>
            <div className="grid gap-10 md:grid-cols-2">
              <Reveal>
                <ul className="divide-y divide-[rgba(240,235,227,0.07)] border-y border-[rgba(240,235,227,0.07)]">
                  {certList.map((cert) => (
                    <li
                      key={cert}
                      className="flex items-center justify-between gap-4 py-4 text-sm text-parchment-dim"
                    >
                      <span>{cert}</span>
                      <span className="label shrink-0">Verified</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <div className="grid gap-5">
                {[
                  {
                    t: "Never handed off",
                    b: "Your trainer does not delegate your session to an assistant. Ever.",
                  },
                  {
                    t: "Limited roster",
                    b: "Membership is capped so every member receives undivided attention.",
                  },
                  {
                    t: "Owns your briefing",
                    b: "The same person who trains you prepares and delivers your monthly health report.",
                  },
                ].map((p, i) => (
                  <Reveal key={p.t} delay={i * 0.08}>
                    <NoisePatternCard>
                      <NoisePatternCardBody>
                        <p className="font-display text-xl text-parchment md:text-2xl">
                          {p.t}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-parchment-dim">
                          {p.b}
                        </p>
                      </NoisePatternCardBody>
                    </NoisePatternCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[rgba(240,235,227,0.06)] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
            <Reveal>
              <h2 className="font-display text-[clamp(1.85rem,4vw,3rem)] text-parchment">
                Put your health
                <span className="italic text-bronze-bright"> in these hands.</span>
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/#consult" className="cursor-pointer">
                  <LeatherButton>Request a Private Consultation</LeatherButton>
                </Link>
                <Link href="/results" className="cursor-pointer text-[0.68rem] uppercase tracking-[0.2em] text-parchment-dim transition-colors hover:text-parchment self-center">
                  See results →
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
