"use client";

import { FormEvent, useState } from "react";
import { ContactSocials } from "@/components/ContactSocials";
import { company } from "@/lib/data";
import type { Dictionary } from "@/lib/dictionary";
import { Reveal } from "@/components/Reveal";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 bg-navy py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2">
        <Reveal dir="left">
          <p className="text-[11px] tracking-[0.42em] uppercase text-blue-bright">
            {dict.contact.eyebrow}
          </p>
          <h2 className="font-display mt-4 text-5xl text-ice md:text-6xl">{dict.contact.title}</h2>
          <p className="mt-6 max-w-md text-base leading-8 text-mist">{dict.contact.text}</p>
          <ContactSocials dict={dict} />
          <div className="mt-10 space-y-4 text-lg leading-7 text-mist">
            <p>
              {dict.contact.person}: {company.contactPerson}
            </p>
            <p>
              <a href={company.phoneHref} className="hover:text-blue-bright">
                {company.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${company.email}`} className="hover:text-blue-bright">
                {company.email}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal dir="right" delay={100}>
          <form onSubmit={onSubmit} className="rounded-2xl border border-line bg-panel/60 p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block text-[11px] tracking-[0.22em] uppercase text-mist">
                {dict.contact.name}
                <input name="name" required className="field mt-2" placeholder={dict.contact.namePh} />
              </label>
              <label className="block text-[11px] tracking-[0.22em] uppercase text-mist">
                {dict.contact.phone}
                <input name="phone" required className="field mt-2" placeholder="+49" />
              </label>
            </div>
            <label className="mt-6 block text-[11px] tracking-[0.22em] uppercase text-mist">
              {dict.contact.email}
              <input name="email" type="email" className="field mt-2" placeholder="info@..." />
            </label>
            <label className="mt-6 block text-[11px] tracking-[0.22em] uppercase text-mist">
              {dict.contact.task}
              <textarea
                name="message"
                rows={4}
                required
                className="field mt-2 resize-none"
                placeholder={dict.contact.taskPh}
              />
            </label>
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-shine mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-blue text-[12px] tracking-[0.22em] uppercase text-white disabled:opacity-60 md:w-auto md:px-10"
            >
              {status === "sending" ? dict.contact.sending : dict.contact.submit}
            </button>
            {status === "ok" && <p className="mt-4 text-sm text-blue-bright">{dict.contact.ok}</p>}
            {status === "error" && <p className="mt-4 text-sm text-red-300">{dict.contact.error}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
