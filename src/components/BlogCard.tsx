import type { BlogPost } from "@/lib/content";
import { MediumIcon } from "@/components/BrandIcons";

function formatDate(iso: string) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? iso
    : date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group h-full">
      <a
        href={post.url}
        target="_blank"
        rel="noreferrer noopener"
        className="flex h-full flex-col rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-surface-hover"
      >
        <div className="flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.1em] uppercase text-faint">
          <MediumIcon className="h-3.5 w-3.5 text-muted transition-colors duration-300 group-hover:text-accent" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </>
          )}
        </div>

        <h2 className="mt-4 font-display text-xl leading-snug font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
          {post.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>

        {post.tags && post.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border-strong px-2.5 py-1 text-[0.72rem] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
          Read on Medium
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </span>
      </a>
    </article>
  );
}
