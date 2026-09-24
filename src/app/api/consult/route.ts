import { NextResponse } from "next/server";

type ConsultPayload = {
  name?: string;
  email?: string;
  goal?: string;
  failure?: string;
  time?: string;
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: ConsultPayload;
  try {
    body = (await req.json()) as ConsultPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!emailOk(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  const record = {
    name,
    email,
    goal: body.goal ?? "",
    failure: body.failure ?? "",
    time: body.time ?? "",
    receivedAt: new Date().toISOString(),
  };

  // Log for local/dev. Swap for email/CRM webhook when ready:
  // await fetch(process.env.CONSULT_WEBHOOK_URL!, { method: "POST", ... })
  if (process.env.NODE_ENV !== "production") {
    console.info("[consult]", JSON.stringify(record));
  }

  if (process.env.CONSULT_WEBHOOK_URL) {
    try {
      await fetch(process.env.CONSULT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch {
      return NextResponse.json(
        { error: "We could not deliver your request. Please try again." },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
