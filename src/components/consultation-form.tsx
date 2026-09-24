"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassRadioGroup } from "@/components/ui/glass-radio-group";
import { LeatherButton } from "@/components/ui/leather-button";
import { StardustButton } from "@/components/ui/stardust-button";

const goals = [
  { value: "energy", label: "Energy" },
  { value: "longevity", label: "Longevity" },
  { value: "strength", label: "Strength" },
  { value: "private", label: "Private health" },
];

const failures = [
  { value: "time", label: "No time" },
  { value: "programs", label: "Programs failed" },
  { value: "trainers", label: "Trainers failed" },
  { value: "public", label: "Public gyms" },
];

const steps = ["Identity", "Contact", "Intent", "History", "Timing"] as const;

type Status = "idle" | "loading" | "error" | "done";

export function ConsultationForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    goal: "",
    failure: "",
    time: "",
  });

  const emailValid = useMemo(() => {
    if (!form.email.trim()) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  }, [form.email]);

  const progress = useMemo(
    () => (status === "done" ? 100 : ((step + 1) / steps.length) * 100),
    [step, status]
  );

  const canNext =
    (step === 0 && form.name.trim().length > 1) ||
    (step === 1 && emailValid) ||
    (step === 2 && !!form.goal) ||
    (step === 3 && !!form.failure) ||
    (step === 4 && !!form.time);

  const submit = async () => {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error || "Something went wrong.");
      }
      setStatus("done");
    } catch (e) {
      setStatus("error");
      setErrorMsg(
        e instanceof Error
          ? e.message
          : "We could not send your request. Please try again."
      );
    }
  };

  const next = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    await submit();
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        aria-live="polite"
        className="rounded-md border border-[rgba(154,139,114,0.35)] bg-[#121417] p-8 text-center md:p-12"
      >
        <p className="label mb-4">Received</p>
        <h3 className="font-display text-3xl text-parchment md:text-4xl">
          Thank you, {form.name.trim().split(" ")[0]}.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-parchment-dim">
          A personal response will reach {form.email.trim()} within 24 hours. No
          automated queues — a human from Limitless will write to you.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="rounded-md border border-[rgba(240,235,227,0.08)] bg-[#121417] p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <span className="label">
          {String(step + 1).padStart(2, "0")} — {steps[step]}
        </span>
        <span className="text-[0.65rem] tracking-[0.2em] text-parchment-dim">
          {step + 1} / {steps.length}
        </span>
      </div>

      <div
        className="mb-8 h-px w-full bg-[rgba(240,235,227,0.08)]"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={step + 1}
        aria-label="Consultation progress"
      >
        <motion.div
          className="h-px bg-bronze-bright"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          tabIndex={-1}
          className="mb-6 rounded-md border border-[rgba(196,120,120,0.45)] bg-[rgba(120,40,40,0.15)] px-4 py-3 text-sm text-parchment"
        >
          {errorMsg}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 && (
            <div>
              <h3 className="font-display text-3xl text-parchment md:text-4xl">
                How should we address you?
              </h3>
              <label htmlFor="name" className="sr-only">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onBlur={(e) => {
                  if (e.target.value.trim().length <= 1 && e.target.value.length > 0) {
                    setErrorMsg("Please enter your full name.");
                  } else {
                    setErrorMsg("");
                  }
                }}
                placeholder="Full name"
                aria-invalid={form.name.length > 0 && form.name.trim().length <= 1}
                className="mt-8 w-full cursor-text border-b border-[rgba(240,235,227,0.14)] bg-transparent pb-4 font-display text-2xl text-parchment outline-none transition-colors placeholder:text-[rgba(196,189,178,0.35)] focus:border-bronze-bright md:text-3xl"
              />
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="font-display text-3xl text-parchment md:text-4xl">
                Where should we reply?
              </h3>
              <p className="mt-3 text-sm text-parchment-dim">
                One address. One human response. Within 24 hours.
              </p>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                inputMode="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onBlur={(e) => {
                  const v = e.target.value.trim();
                  if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
                    setErrorMsg("Enter a valid email address.");
                  } else {
                    setErrorMsg("");
                  }
                }}
                placeholder="you@company.com"
                aria-invalid={form.email.length > 0 && !emailValid}
                className="mt-8 w-full cursor-text border-b border-[rgba(240,235,227,0.14)] bg-transparent pb-4 font-display text-2xl text-parchment outline-none transition-colors placeholder:text-[rgba(196,189,178,0.35)] focus:border-bronze-bright md:text-3xl"
              />
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-display text-3xl text-parchment md:text-4xl">
                What are you reclaiming?
              </h3>
              <p className="mt-3 text-sm text-parchment-dim">
                Choose the outcome that matters most right now.
              </p>
              <fieldset className="mt-8">
                <legend className="sr-only">Primary goal</legend>
                <GlassRadioGroup
                  name="goal"
                  options={goals}
                  value={form.goal}
                  onChange={(v) => setForm({ ...form, goal: v })}
                />
              </fieldset>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-display text-3xl text-parchment md:text-4xl">
                What has failed until now?
              </h3>
              <p className="mt-3 text-sm text-parchment-dim">
                You are not starting from zero — only from what did not work.
              </p>
              <fieldset className="mt-8">
                <legend className="sr-only">What has failed</legend>
                <GlassRadioGroup
                  name="failure"
                  options={failures}
                  value={form.failure}
                  onChange={(v) => setForm({ ...form, failure: v })}
                />
              </fieldset>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="font-display text-3xl text-parchment md:text-4xl">
                When are you reachable?
              </h3>
              <p className="mt-3 text-sm text-parchment-dim">
                We fit the consultation to your calendar — not ours.
              </p>
              <fieldset className="mt-8">
                <legend className="sr-only">Preferred contact time</legend>
                <GlassRadioGroup
                  name="time"
                  columns={3}
                  options={[
                    { value: "morning", label: "Morning" },
                    { value: "afternoon", label: "Afternoon" },
                    { value: "evening", label: "Evening" },
                  ]}
                  value={form.time}
                  onChange={(v) => setForm({ ...form, time: v })}
                />
              </fieldset>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        {step > 0 && (
          <button
            type="button"
            onClick={() => {
              setErrorMsg("");
              setStep(step - 1);
            }}
            className="cursor-pointer text-[0.68rem] uppercase tracking-[0.2em] text-parchment-dim transition-colors hover:text-parchment focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze-bright"
          >
            Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <LeatherButton onClick={next} disabled={!canNext}>
            Continue
          </LeatherButton>
        ) : (
          <StardustButton
            onClick={next}
            disabled={!canNext || status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Sending…" : "Request Private Consultation"}
          </StardustButton>
        )}
      </div>

      <p className="mt-6 text-[0.68rem] uppercase tracking-[0.18em] text-parchment-dim/70">
        Your details are never shared or sold.
      </p>
    </div>
  );
}
