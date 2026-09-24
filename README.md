# UnderStand

## Generate a news article for Supabase

Use the prompt below with ChatGPT or Codex. Replace `ARTICLE_URL` with the URL of the news article you want to publish.

The generated SQL follows the structure expected by the `news` table and can be pasted directly into the Supabase SQL Editor.

```text
Access and analyze this news article:

ARTICLE_URL

Your task is to extract the article's factual information and adapt it into English-learning content for publication in my Supabase `news` table.

The table has this structure:

- id: generated automatically; do not include it
- created_at: generated automatically; do not include it
- data: JSONB with:
  - title: string
  - short_description: string
  - html: string[]
  - difficult_words: string[][]
  - slug: string
  - links: array of { link: string, text: string }
  - author: { name: string }

Create exactly 3 versions of the article in English:

1. Beginner — CEFR A1–A2
2. Intermediate — CEFR B1–B2
3. Advanced — CEFR C1–C2

Rules:

- Preserve the facts, names, dates, numbers, places, and meaning of the original article.
- Do not invent information.
- Write every version in English.
- Rewrite the article instead of copying long passages from the source.
- Each item in `html` must be a complete HTML string.
- Use only semantic HTML such as `<p>`, `<h2>`, `<h3>`, `<strong>`, `<em>`, `<blockquote>`, `<ul>`, `<ol>`, and `<li>`.
- Do not include `<html>`, `<body>`, scripts, styles, classes, Markdown, or images.
- Keep the same key facts in all three versions.
- `html[0]` must be the Beginner version.
- `html[1]` must be the Intermediate version.
- `html[2]` must be the Advanced version.
- Create one `difficult_words` array for each article level.
- `difficult_words[0]` must contain challenging words that actually appear in `html[0]`.
- `difficult_words[1]` must contain challenging words that actually appear in `html[1]`.
- `difficult_words[2]` must contain challenging words that actually appear in `html[2]`.
- Use individual words or short expressions, without definitions.
- Preserve the original author name when available. Otherwise, use the publication name.
- `short_description` must contain a concise English summary of no more than 180 characters.
- Generate a lowercase, URL-safe English slug using only letters, numbers, and hyphens.
- Add the original article URL to `links`.
- If the article references important primary sources, add them after the original article.
- Escape every SQL single quote as two single quotes: `'` becomes `''`.
- Ensure the resulting JSON is valid JSON.
- Do not use trailing commas.
- Do not surround the SQL with Markdown fences.
- Do not add explanations before or after the SQL.

Return exactly one executable PostgreSQL statement in this format:

INSERT INTO public.news (data)
VALUES (
  $json$
  {
    "title": "Article title",
    "short_description": "Short description",
    "html": [
      "<p>Beginner article...</p>",
      "<p>Intermediate article...</p>",
      "<p>Advanced article...</p>"
    ],
    "difficult_words": [
      ["word from beginner version"],
      ["word from intermediate version"],
      ["word from advanced version"]
    ],
    "slug": "article-title-as-a-slug",
    "links": [
      {
        "link": "ARTICLE_URL",
        "text": "Original article — Publication name"
      }
    ],
    "author": {
      "name": "Author name"
    }
  }
  $json$::jsonb
);
```

PostgreSQL dollar quoting (`$json$...$json$`) prevents apostrophes in the article, such as `it's` or `government's`, from breaking the SQL statement.

After generating the statement, paste it into the Supabase SQL Editor and run it.
