"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, siteConfig } from "@/lib/site-config";
import { SocialLinks } from "@/components/SocialLinks";
import { EASE_OUT } from "@/lib/motion";
import { usePageScrolled } from "@/lib/hooks";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(navLinks[0].href);
  const scrolled = usePageScrolled();

  // Highlights whichever section is currently crossing the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (inView[0]) setActive(`#${inView[0].target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    for (const link of navLinks) {
      const section = document.getElementById(link.href.slice(1));
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <a
          href="#top"
          aria-label={`${siteConfig.name} — back to top`}
          onClick={() => setOpen(false)}
          className="shrink-0 opacity-90 transition-opacity duration-300 hover:opacity-100"
        >
          <Image
            src="/images/am-monogram.png"
            alt={siteConfig.name}
            width={192}
            height={110}
            priority
            className="h-7 w-auto"
          />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative px-3.5 py-2 text-[0.78rem] font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent"
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <SocialLinks size="sm" />
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-accent hover:text-accent lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            {open ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 8h16" />
                <path d="M4 16h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <div className="px-5 pb-7 pt-4">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block border-b border-border py-3.5 text-base font-medium transition-colors ${
                        active === link.href
                          ? "text-accent"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <SocialLinks className="mt-6" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
