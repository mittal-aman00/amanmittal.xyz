import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";
import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45rem_26rem_at_50%_10%,rgba(200,169,106,0.07),transparent_70%)]"
      />

      <div className="mx-auto max-w-xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase text-accent">
            Contact
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Contact <span className="text-accent">me</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            If you have an opportunity for me, feel free to leave a message.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 rounded-3xl border border-border bg-surface/40 p-6 sm:p-9">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12">
            <p className="text-sm text-muted">
              Prefer email?{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
            <SocialLinks className="mt-6 justify-center" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
