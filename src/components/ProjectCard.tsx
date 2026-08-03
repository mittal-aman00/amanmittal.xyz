import Image from "next/image";
import type { Project } from "@/lib/content";
import { GitHubIcon } from "@/components/BrandIcons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-accent/50">
      <div className="relative aspect-[16/9] overflow-hidden bg-background">
        <Image
          src={project.image}
          alt={`${project.name} cover artwork`}
          fill
          sizes="(min-width: 768px) 33rem, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent"
        />
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {project.name}
        </h3>

        {project.tagline && (
          <p className="mt-1.5 text-sm font-medium text-accent">{project.tagline}</p>
        )}

        <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

        {project.tags && project.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border-strong px-2.5 py-1 text-[0.72rem] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7 text-sm font-medium">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-foreground transition-colors duration-300 hover:text-accent"
          >
            <GitHubIcon className="h-4 w-4" />
            View on GitHub
          </a>

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-accent"
            >
              Live demo
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
