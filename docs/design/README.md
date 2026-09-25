# Nimra Zahid: Circuit handoff pack

## 1. Copy into the repo

Unzip, then copy these two folders into the root of the Next.js project, keeping the paths:

```
docs/design/HANDOFF.md        ← the full spec (start here)
docs/design/tokens.css        ← colours, type, spacing, motion (dark + light)
docs/design/pages/*.html      ← one design comp per page and component
public/images/nimra/*.webp    ← 21 edited photos (★ versions listed in HANDOFF.md §7)
```

Commit them on a new branch, e.g. `git checkout -b design/circuit-v2`.

## 2. Open Claude Code in the repo and paste this

> Read `docs/design/HANDOFF.md` fully, then `docs/design/tokens.css` and the files in `docs/design/pages/`. The live site already implements most of the Circuit design, so **update it, don't rebuild it**.
>
> First, reply with a short plan: what already matches, what differs per page, and the list of launch blockers from §10. Don't edit anything yet.
>
> Then work in the order of §11, one page at a time. After each page, run the checks in §9 (375px mobile, both themes, reduced motion, contrast, tap targets), show me the diff and wait for my OK before the next page.
>
> Rules: copy text exactly from the page files; never publish anything in [SQUARE BRACKETS] or anything listed in §8; keep existing routes, metadata, JSON-LD, the contact form and spam protection working; use `next/image` for every photo and swap `-B-dark`/`-B-light` files with the theme.
>
> At the end, list every placeholder you hid and every open question for Nimra.

## 3. Useful follow-up prompts

- "Show me the About page at 375px and 1440px in both themes." (needs a dev server + Playwright)
- "Run Lighthouse on /, /about and /cv (mobile) and fix anything under 95."
- "Search the codebase and the CV PDF generator for 'awaiting', 'review', 'preview', 'confirm', 'overlapped' and remove them from rendered output."
- "Prepare production indexing: allow-all robots and no noindex when VERCEL_ENV is production; keep preview deployments hidden."

## 4. Still needed from Nimra

- Professional email, ORCID iD, LinkedIn URL
- Confirmation of the methods list, "Future directions" claims and research abstracts
- MPhil dates (one version everywhere)
- Names of modules M4–M6
- A referee quote, only with written permission
- The first article, to switch Writing back on
