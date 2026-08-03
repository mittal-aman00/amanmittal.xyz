"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";

type Phase = "typing" | "holding" | "deleting";

const TYPE_MS = 65;
const DELETE_MS = 32;
const HOLD_MS = 1600;
const SWITCH_MS = 280;

/** Types each role out one character at a time, then swaps to the next. */
export function RoleTicker({
  roles,
  className = "",
}: {
  roles: readonly string[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const current = roles[index % roles.length];
  const longest = roles.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (reduced) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      timeout =
        text.length < current.length
          ? setTimeout(() => setText(current.slice(0, text.length + 1)), TYPE_MS)
          : setTimeout(() => setPhase("holding"), HOLD_MS);
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), 0);
    } else {
      timeout =
        text.length > 0
          ? setTimeout(() => setText(current.slice(0, text.length - 1)), DELETE_MS)
          : setTimeout(() => {
              setIndex((i) => (i + 1) % roles.length);
              setPhase("typing");
            }, SWITCH_MS);
    }

    return () => clearTimeout(timeout);
  }, [text, phase, current, reduced, roles.length]);

  // Without animation, rotate the full label on a slow interval instead.
  useEffect(() => {
    if (!reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), 3200);
    return () => clearInterval(id);
  }, [reduced, roles.length]);

  return (
    <span className={`relative inline-grid ${className}`}>
      {/* Reserves the width of the longest role so nothing shifts while typing. */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-pre">
        {longest}
      </span>
      <span className="col-start-1 row-start-1 whitespace-pre text-left">
        <span aria-live="polite">{reduced ? current : text}</span>
        {!reduced && (
          <span
            aria-hidden="true"
            className="animate-caret ml-0.5 inline-block h-[0.9em] w-px translate-y-[0.08em] bg-accent align-middle"
          />
        )}
      </span>
    </span>
  );
}
