# Phase 2 · Step 1: article format and Keystatic test

Result of step 1 of the Phase 2 plan: decide the article body format, and test Keystatic on this site's Next.js version before committing to Option A.

## Decision: article bodies are Markdoc

Every article body is stored as **Markdoc** (`.mdoc`), and the reading view renders Markdoc only.

- **Option A (Keystatic):** its editor writes Markdoc directly (`fields.markdoc`).
- **Option B (custom studio), if it is ever built:** the Tiptap editor saves its document as Markdoc text, not Tiptap JSON or HTML. Supabase stores that text. The renderer, footnotes, figures and so on are then reused unchanged, which keeps the plan's "nothing is wasted" promise.
- **Why Markdoc over MDX:** it is plain text with no executable code, so article content can never run JavaScript on the site. Keystatic's Markdoc support is also its most complete.

### Body elements

| Plan element | Markdoc |
|---|---|
| Headings | `##` / `###` (H2 and H3 only; the title is the H1) |
| Paragraphs, bold, italic, links | standard Markdown |
| Lists, blockquote, divider, table | standard Markdown |
| Image with caption, alt text and width | `{% figure src alt caption credit width="normal\|wide\|full" /%}`. The plain Markdown image is switched off so every image has alt text and a width. |
| Pull quote | `{% pullQuote quote="…" /%}` |
| Callout box | `{% callout tone="note\|key" %}…{% /callout %}` |
| Footnote | `{% footnote note="…" /%}`, inline and numbered in order at render time |
| Embed (YouTube, X, LinkedIn) | `{% embed url title /%}`, rendered as click-to-load |

The article fields (title, subtitle, cover and alt text, tags, series, dates, references, cite toggle, SEO overrides and so on) are in `keystatic.config.tsx`, stored as front matter in `content/articles/<slug>.mdoc`. Images go to `public/images/articles/<slug>/`.

Scheduled publishing is `status: published` plus a future `publishedAt`. The reading view (step 2) filters by date at render time.

## Keystatic on Next 16.3.6: works

Tested with `@keystatic/core` 0.6.9 and `@keystatic/next` 5.0.5, in a browser against `next dev`:

- The admin loads at `/keystatic` with no errors. Keystatic's API route reads its path from the request URL, not from Next's route params (the part Next 16 changed), so the Next 16 change doesn't affect it.
- A new article was created with a title, subtitle, date, cover image upload, alt text and a tag, then saved. The `.mdoc` file and the image were written to the repo as expected.
- All five custom components (figure, pull quote, callout, footnote, embed) load from the file, show a preview in the editor, and save back unchanged.
- **Pasting from Google Docs works well.** Pasted Google Docs HTML kept its heading, bold, italics, link, bullet list and blockquote, and dropped the Docs styling.
- The production build passes. `/keystatic` and `/api/keystatic/*` return 404 in production unless Keystatic Cloud is configured.

### Gaps found

- **Required fields aren't enforced on inline components.** A footnote inserted from the `+` menu saves with an empty note. The editor now shows empty notes as "empty note" in red, and the step 2 renderer must skip empty footnotes.
- **Footnotes are inserted from the `+` menu** (Insert → Footnote), then edited from the pencil button on the marker. Typing `/` mid-sentence doesn't offer them. Include this in Nimra's "How to publish" guide.
- **The editor is a form, not a page preview**, as the plan expected. Block previews (image, quote, embed title) make it much closer to what readers see.

## Structural change: route group

The site's pages moved to `app/(site)/`, whose layout adds the header, footer and `globals.css`. The root `app/layout.tsx` keeps only `<html>`, fonts, metadata and the theme script, so the Keystatic admin isn't styled by the site CSS. Unmatched URLs render `app/not-found.tsx` from the root layout, so that file brings in the header, footer and styles itself. URLs are unchanged.

## Setup still needed (step 2B)

- Create a Keystatic Cloud project connected to this GitHub repo and set `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT` (`team/project`) in Vercel. Invite Nimra.
- Decide where images live (in the repo, as now, or Keystatic Cloud images) before she uploads many.
