import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/lib/data";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";

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
    const lang = clip(body.lang, 8);

    if (!name || !phone || !email || !message) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
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
      `E-Mail: ${email}`,
      "",
      "Nachricht:",
      message,
    ].join("\n");

    const html = `
      <h2>Neue Anfrage über die Website Alphalux</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Nachricht:</strong></p>
      <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
    `;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error.message);
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    const dict = getDictionary(hasLocale(lang) ? lang : "de").contact.confirm;
    const confirmText = [
      `${dict.hello} ${name},`,
      "",
      dict.body,
      "",
      `${dict.summary}:`,
      `${dict.name}: ${name}`,
      `${dict.phone}: ${phone}`,
      `${dict.email}: ${email}`,
      `${dict.message}:`,
      message,
      "",
      dict.close,
      dict.team,
      company.email,
      company.phone,
    ].join("\n");

    const confirmHtml = `
      <div style="margin:0;padding:32px 20px;background:#f4efe6;color:#1c1915;font-family:Georgia,'Times New Roman',serif;">
        <div style="max-width:560px;margin:0 auto;background:#fffdf8;border:1px solid rgba(28,25,21,0.12);padding:32px 28px;">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.28em;text-transform:uppercase;color:#3d4a38;">Alphalux</p>
          <h1 style="margin:0 0 20px;font-size:28px;line-height:1.2;font-weight:500;">${escapeHtml(dict.title)}</h1>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">${escapeHtml(dict.hello)} ${escapeHtml(name)},</p>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.7;">${escapeHtml(dict.body)}</p>
          <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#6f675c;">${escapeHtml(dict.summary)}</p>
          <p style="margin:0 0 6px;font-size:15px;line-height:1.6;"><strong>${escapeHtml(dict.name)}:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 6px;font-size:15px;line-height:1.6;"><strong>${escapeHtml(dict.phone)}:</strong> ${escapeHtml(phone)}</p>
          <p style="margin:0 0 6px;font-size:15px;line-height:1.6;"><strong>${escapeHtml(dict.email)}:</strong> ${escapeHtml(email)}</p>
          <p style="margin:16px 0 6px;font-size:15px;line-height:1.6;"><strong>${escapeHtml(dict.message)}:</strong></p>
          <p style="margin:0 0 28px;font-size:15px;line-height:1.7;">${escapeHtml(message).replaceAll("\n", "<br />")}</p>
          <p style="margin:0;font-size:15px;line-height:1.7;">${escapeHtml(dict.close)}<br />${escapeHtml(dict.team)}</p>
          <p style="margin:16px 0 0;font-size:14px;line-height:1.7;color:#6f675c;">
            <a href="mailto:${escapeHtml(company.email)}" style="color:#3d4a38;">${escapeHtml(company.email)}</a><br />
            <a href="${escapeHtml(company.phoneHref)}" style="color:#3d4a38;">${escapeHtml(company.phone)}</a>
          </p>
        </div>
      </div>
    `;

    const confirmation = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: dict.subject,
      text: confirmText,
      html: confirmHtml,
    });

    if (confirmation.error) {
      console.error("Resend confirmation error:", confirmation.error.message);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
