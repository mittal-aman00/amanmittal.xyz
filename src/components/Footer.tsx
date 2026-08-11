import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <a href="#top" aria-label={`${siteConfig.name} - back to top`}>
            <Image
              src="/images/signature.png"
              alt={siteConfig.name}
              width={286}
              height={40}
              className="h-8 w-auto opacity-80 transition-opacity duration-300 hover:opacity-100"
            />
          </a>
          <p className="mt-4 text-sm text-faint">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        <SocialLinks size="sm" />
      </div>
    </footer>
  );
}
