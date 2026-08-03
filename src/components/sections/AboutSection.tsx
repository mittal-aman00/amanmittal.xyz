import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { bio, skillGroups } from "@/lib/content";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="About"
        title={
          <>
            A little background
            <br className="hidden sm:block" /> on who I am.
          </>
        }
      />

      <div className="mt-12 max-w-3xl space-y-5">
        {bio.map((paragraph, i) => (
          <Reveal key={i} delay={0.05 * i}>
            <p className="text-base leading-[1.85] text-muted sm:text-[1.05rem]">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <Reveal>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Skills &amp; Tools
          </h3>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            The stack I reach for most often, grouped by where it tends to show up in my work.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={0.05 * i}>
              <div className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors duration-300 hover:border-border-strong">
                <h4 className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-accent">
                  {group.category}
                </h4>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border-strong px-3 py-1.5 text-[0.82rem] text-foreground/90 transition-colors duration-300 hover:border-accent hover:text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
