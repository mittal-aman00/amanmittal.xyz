import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-[0.72rem] font-medium tracking-[0.22em] uppercase text-accent">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-foreground sm:text-4xl">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="mt-4 text-sm text-muted">
        The link may be out of date, or the page may have moved.
      </p>
      <Link
        href="/"
        className="mt-9 rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
      >
        Back home
      </Link>
    </div>
  );
}
