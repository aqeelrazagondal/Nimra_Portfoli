# Nimra Zahid — academic portfolio

First working local version of the revised educator–researcher plan. Built with Next.js App Router, TypeScript, React, semantic CSS tokens and self-hosted Fraunces, Inter and Newsreader through next/font. Intended deployment: Vercel.

## Run

```sh
npm install
npm run dev
```

Visit http://127.0.0.1:3000. Production check: `npm run build`. Type check: `npm run typecheck`.

## Implemented

- Home with the thesis-led hero and an interactive regional constellation: hover, focus or tap a region to see the related research, then click or tap again to open it.
- About, Research and three expanded project pages (question, argument, approach, status, abstract, argument or findings, significance, route into doctoral research, related work), Teaching, CV and Contact.
- Contact form backed by a Server Action (`app/contact/actions.ts`): validation, honeypot, timing check, per-instance rate limit, Cloudflare Turnstile and delivery through the Resend REST API. See `.env.example`.
- SEO: per-page descriptions and canonical URLs, OpenGraph/Twitter cards with generated images (`/opengraph-image` and one per research page), `sitemap.xml`, ProfilePage/Person and Thesis JSON-LD, and a dedicated 404 title. Indexing is off unless `ENABLE_INDEXING=true` on production (`lib/site.ts`).
- Dark theme by default; an explicit light/dark choice is remembered site-wide and synced across tabs.
- `/cv.pdf` is rendered with @react-pdf using the brand fonts (static Fraunces and Inter TTFs in `assets/fonts`, under the OFL) from the same data as the web CV.
- Writing (`/writing`): articles are written in Keystatic (`/keystatic` locally) and stored as Markdoc in `content/articles/`. Drafts and scheduled articles appear only locally and on Vercel previews (or with `SHOW_DRAFTS=true`); Writing stays out of the navigation and sitemap until one is published. Pages revalidate hourly so scheduled articles go live on their date. See `docs/phase-2/`.
- Contact links (email, ORCID, LinkedIn) and the portrait appear automatically once they are configured.

## Content source and privacy

The revised plan supplied by the user is the source, not independently inspected degree documents. The current school is anonymised. No pupil information, home address, personal telephone, dates of birth, identifiers, certificates, reference letters or full thesis PDFs are included. No testimonials are included, and no publications, metrics, awards, quotes or research findings have been invented.

All outstanding content, configuration and go-live steps are tracked in [LAUNCH.md](LAUNCH.md). Editorial notes belong there or in the content source, never in rendered pages.

The application is not deployed. No external accounts, messages or domain registrations have been created.
