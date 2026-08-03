"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { RoleTicker } from "@/components/RoleTicker";
import { SocialLinks } from "@/components/SocialLinks";
import { EASE_OUT } from "@/lib/motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

export function Hero() {
  return (
    <section id="top" className="relative scroll-mt-24 overflow-hidden">
      <div className="mx-auto grid min-h-[calc(100dvh-4.5rem)] max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:py-0">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 lg:order-1"
        >
          <motion.h1
            variants={item}
            className="font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.1rem]"
          >
            Hi, I&rsquo;m
            <br />
            <span className="text-accent">{siteConfig.name}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 flex flex-wrap items-baseline gap-x-2 font-display text-xl text-muted sm:text-2xl"
          >
            <span>I&rsquo;m an</span>
            <RoleTicker roles={siteConfig.roles} className="font-medium text-foreground" />
          </motion.p>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-balance text-base leading-relaxed text-muted"
          >
            {siteConfig.intro}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors duration-300 hover:bg-accent-hover"
            >
              Get in touch
            </a>
            <a
              href="#about"
              className="rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              More about me
            </a>
            {siteConfig.resumeUrl && (
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="px-2 text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                Résumé
              </a>
            )}
          </motion.div>

          <motion.div variants={item} className="mt-10">
            <SocialLinks />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src="/images/aman-portrait.png"
              alt={`Portrait of ${siteConfig.name}`}
              width={687}
              height={859}
              priority
              quality={92}
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 22rem, 18rem"
              className="h-auto w-[18rem] select-none sm:w-[22rem] lg:w-[28rem]"
            />
            {/* Dissolves the cropped hem of the shirt into the page. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background via-background/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
