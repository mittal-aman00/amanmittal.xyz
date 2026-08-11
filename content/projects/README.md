# Projects folder

One JSON file = one project card on the website.

## How to add a project

1. Copy `_template.json` and rename it, e.g. `my-app.json`  
   (do **not** keep the leading `_` - files starting with `_` are ignored)
2. Fill in the fields (see template below)
3. Put the cover image in `public/images/projects/` and set `image` to `/images/projects/<filename>`
4. Commit and push - the site picks it up on the next build

Skip / never publish: `_template.json`, `schema.json`

## Template

```json
{
  "$schema": "./schema.json",
  "name": "Your Project Name",
  "tagline": "One short line under the title.",
  "description": "Two or three sentences about what the project does and why it exists.",
  "image": "/images/projects/your-project.png",
  "repo": "https://github.com/mittal-aman00/your-repo",
  "demo": "https://your-demo.vercel.app",
  "tags": ["Tech1", "Tech2", "Tech3"],
  "featured": false
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `name` | yes | Card heading |
| `description` | yes | Two to three sentences |
| `image` | yes | Path under `public/`, landscape 16:9 |
| `repo` | yes | Full GitHub URL |
| `tagline` | no | Accent line under the title |
| `demo` | no | Live URL; omit if none |
| `tags` | no | Tech chips |
| `featured` | no | `true` lists it first |
