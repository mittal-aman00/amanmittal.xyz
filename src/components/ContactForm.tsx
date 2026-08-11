"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-xl border border-border-strong bg-surface px-4 py-3 text-sm text-foreground transition-colors duration-200 placeholder:text-faint hover:border-border-strong focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    // Honeypot - real people leave this hidden field empty.
    if ((form.elements.namedItem("company") as HTMLInputElement)?.value) {
      setStatus("sent");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      setError("The contact form isn't configured yet. Please email me directly.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError("That didn't go through. Please try again, or email me directly.");
      // EmailJS rejects with { status, text }; the text is the only thing that
      // says *why*, so keep it out of the UI but make it reachable when debugging.
      console.error("EmailJS send failed:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label htmlFor="from_name" className="sr-only">
          Name
        </label>
        <input
          id="from_name"
          name="from_name"
          type="text"
          required
          autoComplete="name"
          placeholder="Name"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="from_email" className="sr-only">
          Email
        </label>
        <input
          id="from_email"
          name="from_email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          placeholder="Message"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="pt-2 text-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-full bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground transition-colors duration-300 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[12rem]"
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
      </div>

      <div role="status" aria-live="polite" className="min-h-[1.5rem] text-center">
        {status === "sent" && (
          <p className="text-sm text-accent">
            Thanks - your message is on its way. I&rsquo;ll get back to you shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400">
            {error}{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline underline-offset-4 hover:text-red-300"
            >
              {siteConfig.email}
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
