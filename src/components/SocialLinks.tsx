import { siteConfig } from "@/lib/site-config";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/BrandIcons";

const socials = [
  { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedInIcon },
  { label: "X (Twitter)", href: siteConfig.socials.twitter, Icon: XIcon },
  { label: "GitHub", href: siteConfig.socials.github, Icon: GitHubIcon },
];

export function SocialLinks({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const glyph = size === "sm" ? "h-[15px] w-[15px]" : "h-4 w-4";

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={label}
            title={label}
            className={`group inline-flex ${box} items-center justify-center rounded-full border border-border text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent`}
          >
            <Icon className={glyph} />
          </a>
        </li>
      ))}
    </ul>
  );
}
