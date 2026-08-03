import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { BlogsSection } from "@/components/sections/BlogsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <BlogsSection />
      <ContactSection />
    </>
  );
}
