import fs from "node:fs";
import path from "node:path";
import type { BlogPost, Project } from "@/lib/content";

type ContentKind = "projects" | "blogs";

/**
 * Reads every `*.json` entry from a content folder at build / request time.
 *
 * Skipped filenames (not shown on the site):
 *   - schema.json
 *   - anything starting with `_` (templates live here as `_template.json`)
 *
 * Drop a filled copy of `_template.json` into the folder, commit, and the
 * card appears on the next build. No other file needs editing.
 */
function readJsonEntries<T>(kind: ContentKind): T[] {
  // Folder name is a fixed literal so Turbopack can trace the content tree.
  const dir = path.join(process.cwd(), "content", kind);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter(
      (file) =>
        file.endsWith(".json") &&
        file !== "schema.json" &&
        !file.startsWith("_")
    )
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const data = JSON.parse(raw) as T & { $schema?: string };
      // `$schema` is only for editor autocomplete - strip before rendering.
      const { $schema: _schema, ...entry } = data as T & { $schema?: string };
      void _schema;
      return entry as T;
    });
}

/** One JSON file per project under `content/projects/`. Featured first. */
export function loadProjects(): Project[] {
  return readJsonEntries<Project>("projects").sort(
    (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false)
  );
}

/** One JSON file per Medium link under `content/blogs/`. Newest first. */
export function loadBlogPosts(): BlogPost[] {
  return readJsonEntries<BlogPost>("blogs").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
