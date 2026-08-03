import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/lib/content";

export function BlogsSection() {
  const posts = blogPosts;

  return (
    <section id="blogs" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <SectionHeading
        eyebrow="Writing"
        title="Notes, posts and things I've figured out."
        description="Everything I publish lives on Medium. These cards link straight through to the full article."
      />

      {posts.length > 0 ? (
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.url + post.title} delay={0.05 * (i % 3)}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal delay={0.2}>
          <p className="mt-14 rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center text-sm text-muted">
            No posts published yet — check back soon.
          </p>
        </Reveal>
      )}
    </section>
  );
}
