import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/content";

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built."
        description="Each one is open source — the code sits on GitHub if you'd like a closer look."
      />

      {projects.length > 0 ? (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.repo} delay={0.05 * (i % 2)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal delay={0.2}>
          <p className="mt-14 rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center text-sm text-muted">
            Nothing published here yet — check back soon.
          </p>
        </Reveal>
      )}
    </section>
  );
}
