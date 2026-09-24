import { NextResponse } from "next/server";

type ConsultPayload = {
  name?: string;
  email?: string;
  goal?: string;
  failure?: string;
  time?: string;
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const LIMITS = { name: 120, email: 254, goal: 200, failure: 200, time: 200 };
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, { count: number; at: number }>();

function isRateLimited(key: string) {
  const now = Date.now();
  if (hits.size > 1000) {
    for (const [k, v] of hits) {
      if (now - v.at > WINDOW_MS) hits.delete(k);
    }
  }
  const entry = hits.get(key);
  if (!entry || now - entry.at > WINDOW_MS) {
    hits.set(key, { count: 1, at: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  let body: ConsultPayload;
  try {
    body = (await req.json()) as ConsultPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const goal = (body.goal ?? "").trim();
  const failure = (body.failure ?? "").trim();
  const time = (body.time ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (name.length > LIMITS.name) {
    return NextResponse.json({ error: "Name is too long." }, { status: 400 });
  }
  if (!emailOk(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }
  if (email.length > LIMITS.email) {
    return NextResponse.json({ error: "Email is too long." }, { status: 400 });
  }
  if (
    goal.length > LIMITS.goal ||
    failure.length > LIMITS.failure ||
    time.length > LIMITS.time
  ) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const record = {
    name,
    email,
    goal,
    failure,
    time,
    receivedAt: new Date().toISOString(),
  };

  console.info("[consult]", JSON.stringify(record));

  if (!process.env.CONSULT_WEBHOOK_URL) {
    console.warn(
      "[consult] CONSULT_WEBHOOK_URL is not set — keeping this submission in logs only."
    );
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  try {
    const delivered = await fetch(process.env.CONSULT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(8000),
    });
    if (!delivered.ok) {
      console.error("[consult] webhook responded", delivered.status);
      return NextResponse.json(
        { error: "We could not deliver your request. Please try again." },
        { status: 502 }
      );
    }
  } catch (e) {
    console.error("[consult] webhook failed", e);
    return NextResponse.json(
      { error: "We could not deliver your request. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
