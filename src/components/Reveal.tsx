"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";

/** Fades content up once as it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
