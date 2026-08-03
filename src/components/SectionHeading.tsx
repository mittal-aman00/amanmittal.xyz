import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div className={centered ? "text-center" : ""}>
      <Reveal>
        <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase text-accent">
          {eyebrow}
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.1}>
          <p
            className={`mt-4 max-w-2xl text-base leading-relaxed text-muted ${
              centered ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.15}>
        <div
          className={`mt-8 h-px w-full max-w-md rule-fade ${centered ? "mx-auto" : ""}`}
        />
      </Reveal>
    </div>
  );
}
