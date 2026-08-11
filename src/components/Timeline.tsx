"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { TimelineEntry } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";

/** Card width as a share of the track, so the timeline always fits its container. */
const CARD_PCT = 24;
const CARD_GUTTER_PCT = 1.5;
const MIN_BAR_PCT = 7;
const RAIL_GAP = 24;
const CARD_H = 152;
const LANE_H = CARD_H + 12;
const MAX_LANES = 4;

/**
 * Applied newest-role-first, so the current position always wears the site's
 * gold accent and earlier roles cool off through teal, indigo and orchid.
 */
const PALETTE = [
  { base: "#c8a96a", lift: "#e8d3a4" },
  { base: "#5fae9c", lift: "#93d6c6" },
  { base: "#7f93b8", lift: "#adc0e0" },
  { base: "#b189bb", lift: "#d5b3dc" },
  { base: "#c28b70", lift: "#e2b299" },
];

const paletteFor = (indexFromNewest: number) =>
  PALETTE[indexFromNewest % PALETTE.length];

function toDecimalYear(value: string): number {
  if (value.trim().toLowerCase() === "present") {
    const now = new Date();
    return now.getFullYear() + now.getMonth() / 12;
  }
  const [year, month] = value.split("-");
  return Number(year) + (month ? (Number(month) - 1) / 12 : 0);
}

function formatPoint(value: string): string {
  if (value.trim().toLowerCase() === "present") return "Present";
  const [year, month] = value.split("-");
  if (!month) return year;
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatRange(start: string, end: string): string {
  const from = formatPoint(start);
  const to = formatPoint(end);
  return from === to ? from : `${from} - ${to}`;
}

type Placed = TimelineEntry & {
  xPct: number;
  widthPct: number;
  cardLeftPct: number;
  above: boolean;
  lane: number;
  isCurrent: boolean;
  color: string;
  colorLift: string;
  /** Older roles sit back slightly; the newest is full strength. */
  intensity: number;
};

type Layout = {
  placed: Placed[];
  railY: number;
  height: number;
  /** Colour wash along the rail, following the roles sitting on it. */
  railGradient: string;
};

/**
 * Positions everything in percentages of the track rather than pixels, so the
 * whole history fits the container at any width - no sideways scrolling.
 *
 * Cards prefer to alternate above and below the rail. When two roles start too
 * close together for that to work, one moves out to a further lane instead of
 * overlapping, and the track grows taller to make room. Slots are claimed
 * newest-first so recent roles keep the spots nearest the rail.
 */
function useLayout(entries: TimelineEntry[]): Layout {
  return useMemo(() => {
    const sorted = [...entries].sort(
      (a, b) => toDecimalYear(a.start) - toDecimalYear(b.start)
    );
    if (sorted.length === 0)
      return { placed: [], railY: 0, height: 0, railGradient: "none" };

    const minYear = Math.floor(Math.min(...sorted.map((e) => toDecimalYear(e.start))));
    const maxYear = Math.ceil(Math.max(...sorted.map((e) => toDecimalYear(e.end))));
    const span = Math.max(maxYear - minYear, 1);
    const last = sorted.length - 1;

    const geometry = sorted.map((entry, i) => {
      const rawX = ((toDecimalYear(entry.start) - minYear) / span) * 100;
      const rawWidth =
        ((toDecimalYear(entry.end) - toDecimalYear(entry.start)) / span) * 100;

      const widthPct = Math.min(Math.max(rawWidth, MIN_BAR_PCT), 100);
      const xPct = Math.max(0, Math.min(rawX, 100 - widthPct));
      const swatch = paletteFor(last - i);

      return {
        ...entry,
        xPct,
        widthPct,
        // Cards near the right edge hang off the left of their marker instead.
        cardLeftPct: xPct > 100 - CARD_PCT ? xPct - CARD_PCT : xPct,
        isCurrent: entry.end.trim().toLowerCase() === "present",
        color: swatch.base,
        colorLift: swatch.lift,
        intensity: last === 0 ? 1 : 0.78 + (0.22 * i) / last,
      };
    });

    // Walking right to left, so we track the left-most occupied edge per lane.
    const edges: Record<"above" | "below", number[]> = { above: [], below: [] };
    const slots: { above: boolean; lane: number }[] = [];

    for (let i = last; i >= 0; i--) {
      const { cardLeftPct } = geometry[i];
      const cardRight = cardLeftPct + CARD_PCT;
      const preferred: "above" | "below" = (last - i) % 2 === 0 ? "above" : "below";
      const other = preferred === "above" ? "below" : "above";

      let side: "above" | "below" = preferred;
      let lane = MAX_LANES - 1;

      outer: for (let candidate = 0; candidate < MAX_LANES; candidate++) {
        for (const trySide of [preferred, other] as const) {
          const edge = edges[trySide][candidate];
          if (edge === undefined || cardRight <= edge) {
            side = trySide;
            lane = candidate;
            break outer;
          }
        }
      }

      edges[side][lane] = cardLeftPct - CARD_GUTTER_PCT;
      slots[i] = { above: side === "above", lane };
    }

    const placed: Placed[] = geometry.map((entry, i) => ({ ...entry, ...slots[i] }));

    const sideHeight = (side: "above" | "below") =>
      edges[side].length === 0
        ? 0
        : RAIL_GAP + (edges[side].length - 1) * LANE_H + CARD_H;

    const stops = placed
      .map((p) => `${p.color} ${(p.xPct + p.widthPct / 2).toFixed(1)}%`)
      .join(", ");

    const railY = sideHeight("above");
    return {
      placed,
      railY,
      height: railY + sideHeight("below"),
      railGradient: `linear-gradient(90deg, ${stops})`,
    };
  }, [entries]);
}

function CardBody({ entry }: { entry: Placed }) {
  return (
    <>
      <p className="font-display text-[0.95rem] leading-snug font-semibold text-foreground">
        {entry.organization}
      </p>
      <p
        className="mt-1.5 text-[0.72rem] font-medium tracking-[0.1em] uppercase"
        style={{ color: entry.color }}
      >
        {formatRange(entry.start, entry.end)}
      </p>
      <p className="mt-1.5 text-[0.82rem] leading-snug font-medium text-foreground/85">
        {entry.role}
      </p>
      {entry.summary && (
        <p className="mt-1.5 line-clamp-2 text-[0.78rem] leading-relaxed text-muted">
          {entry.summary}
        </p>
      )}
    </>
  );
}

function HorizontalTimeline({ entries }: { entries: TimelineEntry[] }) {
  const { placed, railY, height, railGradient } = useLayout(entries);

  return (
    <div className="relative" style={{ height }}>
      <div
        className="absolute inset-x-0 h-px"
        style={{ top: railY, backgroundImage: railGradient, opacity: 0.4 }}
      />

      {placed.map((entry, i) => {
        const reach = RAIL_GAP + entry.lane * LANE_H;

        return (
          <div key={entry.id}>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 * i, ease: EASE_OUT }}
              className="absolute h-2.5 origin-left rounded-full"
              style={{
                left: `${entry.xPct}%`,
                width: `${entry.widthPct}%`,
                top: railY - 5,
                opacity: entry.intensity,
                backgroundImage: `linear-gradient(90deg, ${entry.color}, ${entry.colorLift})`,
                boxShadow: `0 0 20px -5px ${entry.color}`,
              }}
            />

            {entry.isCurrent && (
              <span
                aria-hidden="true"
                className="absolute flex h-2.5 w-2.5"
                style={{
                  left: `calc(${entry.xPct + entry.widthPct}% - 10px)`,
                  top: railY - 5,
                }}
              >
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: entry.colorLift }}
                />
              </span>
            )}

            <motion.div
              initial={{ opacity: 0, y: entry.above ? 10 : -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * i + 0.15 }}
            >
              <span
                aria-hidden="true"
                className="absolute w-px"
                style={{
                  left: `${entry.xPct}%`,
                  height: reach,
                  // Brightest where it meets the rail, fading out towards the card.
                  backgroundImage: `linear-gradient(${
                    entry.above ? "to top" : "to bottom"
                  }, ${entry.color}, ${entry.color}33)`,
                  opacity: 0.7,
                  ...(entry.above
                    ? { bottom: height - railY }
                    : { top: railY }),
                }}
              />
              <div
                className="absolute"
                style={{
                  left: `${entry.cardLeftPct}%`,
                  width: `${CARD_PCT}%`,
                  ...(entry.above
                    ? { bottom: height - railY + reach }
                    : { top: railY + reach }),
                }}
              >
                <CardBody entry={entry} />
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

function VerticalTimeline({ entries }: { entries: TimelineEntry[] }) {
  const sorted = [...entries].sort(
    (a, b) => toDecimalYear(b.start) - toDecimalYear(a.start)
  );

  return (
    <ol className="relative space-y-8 border-l border-border-strong pl-6">
      {sorted.map((entry, i) => {
        const swatch = paletteFor(i);
        return (
          <li key={entry.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[1.655rem] top-1.5 h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: swatch.base,
                boxShadow: `0 0 12px -2px ${swatch.base}`,
              }}
            />
            <p
              className="text-[0.7rem] font-medium tracking-[0.12em] uppercase"
              style={{ color: swatch.base }}
            >
              {formatRange(entry.start, entry.end)}
            </p>
            <p className="mt-1.5 font-display text-base font-semibold text-foreground">
              {entry.organization}
            </p>
            <p className="mt-0.5 text-sm text-foreground/85">
              {entry.role}
              {entry.location && (
                <span className="text-muted"> · {entry.location}</span>
              )}
            </p>
            {entry.summary && (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {entry.summary}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border-strong px-6 py-8 text-sm text-muted">
        Work history is on its way.
      </p>
    );
  }

  return (
    <>
      <div className="hidden lg:block">
        <HorizontalTimeline entries={entries} />
      </div>
      <div className="lg:hidden">
        <VerticalTimeline entries={entries} />
      </div>
    </>
  );
}
