# Blogs folder

One JSON file = one Medium article card on the website.

## How to add a blog

1. Copy `_template.json` and rename it, e.g. `my-first-post.json`  
   (do **not** keep the leading `_` - files starting with `_` are ignored)
2. Fill in the fields (see template below)
3. Commit and push - the site picks it up on the next build

Skip / never publish: `_template.json`, `schema.json`

Blogs stay on Medium; this folder only stores the link and card copy.

## Template

```json
{
  "$schema": "./schema.json",
  "title": "Your Medium article title",
  "url": "https://medium.com/@you/your-article-slug-abc123",
  "date": "2026-08-11",
  "excerpt": "One or two sentences that appear on the card.",
  "tags": ["SAP", "AI"],
  "readingTime": "6 min read"
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Card heading |
| `url` | yes | Full Medium URL |
| `date` | yes | `YYYY-MM-DD` (sorts newest first) |
| `excerpt` | yes | One or two sentences |
| `tags` | no | Topic chips |
| `readingTime` | no | e.g. `6 min read` |
