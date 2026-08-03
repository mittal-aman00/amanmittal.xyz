import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Timeline } from "@/components/Timeline";
import { timeline } from "@/lib/content";

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Work History"
        title="Where I've spent my time."
        description="Every role so far, plotted on one timeline — bar lengths track how long each one lasted."
      />

      <Reveal delay={0.1} className="mt-14">
        <Timeline entries={timeline} />
      </Reveal>
    </section>
  );
}
