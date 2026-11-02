import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/lib/data";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TO = process.env.CONTACT_TO ?? company.email;
const FROM = process.env.CONTACT_FROM ?? "Alphalux <info@alphalux-innenausbau.de>";

function clip(value: unknown, max: number) {
  return String(value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = clip(body.name, 120);
    const phone = clip(body.phone, 40);
    const email = clip(body.email, 120);
    const message = clip(body.message, 4000);

    if (!name || !phone || !message) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    const text = [
      "Neue Anfrage über die Website Alphalux",
      "",
      `Name: ${name}`,
      `Telefon: ${phone}`,
      `E-Mail: ${email || "—"}`,
      "",
      "Nachricht:",
      message,
    ].join("\n");

    const html = `
      <h2>Neue Anfrage über die Website Alphalux</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email || "—")}</p>
      <p><strong>Nachricht:</strong></p>
      <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
    `;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email || undefined,
      subject: `Neue Anfrage von ${name}`,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error.message);
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
