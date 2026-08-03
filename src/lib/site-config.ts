export const siteConfig = {
  name: "Aman Mittal",
  initials: "AM",
  url: "https://amanmittal.xyz",
  /** Cycled through by the animated tagline on the landing page. */
  roles: ["AI Enthusiast", "SAP Professional", "Tech Savant"],
  intro:
    "I design and ship software that solves real business problems — from enterprise SAP landscapes to AI-driven products.",
  location: "Mumbai, India",
  email: "mittal.aman00@gmail.com",
  /** Optional — drop a PDF at public/aman-mittal-resume.pdf and set this to that path. */
  resumeUrl: "",
  socials: {
    linkedin: "https://www.linkedin.com/in/mittalaman00/",
    twitter: "https://x.com/amanmittal_xyz",
    github: "https://github.com/mittal-aman00",
  },
} as const;

/** The site is one scrolling page — every link targets a section id. */
export const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#blogs", label: "Blogs" },
  { href: "#contact", label: "Contact" },
];
