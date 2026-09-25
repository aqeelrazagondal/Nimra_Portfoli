# The Circuit: design handoff for Nimra Zahid's portfolio

**For:** Claude Code, working in the existing Next.js (App Router) + Vercel repo for `nimra-portfolio`.
**Live preview:** https://nimra-portfolio-gamma.vercel.app (already implements most of the Circuit design; see §10 for what's left).
**Source of truth:** the files in `docs/design/pages/` (exported from the design canvas) + `docs/design/tokens.css` + this document. When this document and a page file disagree, this document wins.

---

## 0. How to work

1. **Update, don't rebuild.** The live site already has the Circuit hero, the insulator/instigator switch, the research pages, the CV timing diagram, the contact form, OG images and JSON-LD. Diff the existing code against the page files and change only what differs.
2. Work **page by page** in the order of §11. After each page, run the checks in §9 and show the diff.
3. **Never invent content.** Copy text exactly from the page files. Anything in `[SQUARE BRACKETS]` is a placeholder for Nimra; keep it out of production (hide the element or keep the current live text), and list every one you meet in your summary.
4. Keep all existing routes, metadata, structured data, spam protection and form handling working.

---

## 1. Who the site is for

- **PhD supervisors and admissions committees** (IR, US/Australia/UK) and an **EdD panel**. They skim, judge credibility fast and often read on phones.
- One identity, two strands: *International Relations researcher* (lead) and *educator* (second).
- Tone: calm, rigorous, first person. The metaphor is decoration for the first impression; reading pages stay quiet.

## 2. The concept

Regional Security Complex Theory (Buzan & Wæver, 2003) classifies Afghanistan as an **insulator**. Nimra's research reads it as an **instigator**. The site is a circuit board where current flows *out* of Afghanistan.

- Hero line: **"They called it an insulator. I study the current."**
- Afghanistan is always the **chip (U1)** at the centre; regions are **pads**; connections are **traces**.
- **Designators** are silkscreen labels: U1–U7 pages, J1–J4 sections, E/R/T/L/P/C entries, FIG. n diagrams, F findings, M modules.
- Every diagram must say something true about the work. Diagrams are **abstract, never maps** (no borders).

## 3. Tokens

Use `docs/design/tokens.css` as-is (CSS variables for dark + light). Map them into Tailwind's theme if the repo uses Tailwind: colours → `theme.extend.colors` via `var(--…)`, fonts via `next/font` (`Fraunces`, `Newsreader`, `Geist`, `Geist_Mono`), and no more than these four families.

Hard rules:
- **12px is the minimum text size** anywhere (the mono labels). No 8–11px text.
- **44px minimum tap targets** (links in nav/footer, "Read overview", "Download CV" etc.).
- Mono labels: uppercase, letter-spacing 0.12–0.16em, `--text-faint` or an accent.
- Long-form reading: Newsreader 21px / 1.65, max width 680px.
- Colour never carries state alone: the insulator state uses the rose double-bar symbol **and** a text label.

## 4. Circuit primitives (build as small SVG React components)

| Component | Spec |
|---|---|
| `Trace` | 2px stroke, **45° bends only**, `--trace` idle. `live` prop overlays the same path with `--current` and `.trace-live` (dash 4/16, 1.4s linear). |
| `Pad` | circle r≈11–12, fill `--ink`, 1.5px stroke; inner dot r≈4–5. Off: `--trace-strong`/`--trace`. On: `--current`. |
| `Chip` | rounded rect (r 12), `--surface` fill, 1.5px stroke, pins on all sides, mono label "AFGHANISTAN" + state line. Only used for Afghanistan. |
| `Barrier` | rose double bar across a trace with a small `--board`-coloured gap behind it. Insulator state only. |
| `Switch` | open: lever at ~30°, right trace idle. Closed: lever flat, right trace live. Contact page only. |
| `Lamp` | circle with an X, gold, soft gold glow. Teaching page's parallel circuit only. |
| `SignalLane` | step waveform for the CV timing diagram: low = inactive, high = active; 12% tint fill under high segments. |
| `SectionMarker` | eyebrow row: mono designator + title, with a stub and dot on the left page "bus" trace (home page). |

Motion: only traces flow. State changes fade over 0.6s. With `prefers-reduced-motion: reduce`, all traces are **lit and still**, and nothing fades in on scroll.

## 5. Shared components

- **Nav** (`pages/component-nav.html`): logo chip "nz" + name + mono tagline; links `01 About · 02 Research · 03 Teaching · 04 CV` (+ `05 Writing` only once an article is published); active link gets a current-tinted pill; theme toggle (44px); Contact pill with a pulsing current dot. Sticky header: **`background: color-mix(in srgb, var(--ink) 92%, transparent)` + `backdrop-filter: blur(12px)`**, because the current 86% with no blur lets content show through. Mobile: full-screen overlay menu (already correct on live; keep it).
- **Footer** (`pages/component-footer.html`): trace with a pad at the top; name; Explore / Elsewhere / Documents columns; bottom row © · Last updated (auto from build date) · "Circuit closed". **Elsewhere must list real links**: professional email (mailto), ORCID, LinkedIn.
- Buttons: primary (lilac bg, `--on-lilac` text, 52px, pill), secondary (1px `--trace-strong` outline), teaching variant (current bg, ink text).
- Chips, segmented control, readout cells, cards, fields: see `pages/design-system.html` §F.

## 6. Pages

| Route | Page file | Notes |
|---|---|---|
| `/` | `home.html` (+ `mobile-home.html`) | Hero: headline (put "I study the current." on **its own line**, the live site currently leaves a dangling "I"), lead, meta, two CTAs, **Insulator/Instigator segmented control** (aria-pressed, aria-live caption), FIG. 1 circuit. Readout strip. J1 two-strand cards joined by a live trace. J2 signal path (2018 → 2020 → 2024 → dashed NEXT). J3 writing: **hide until an article is published.** Closing band with open switch. |
| `/about` | `about.html` | **Portrait:** `p1-portrait-C-recommended.webp` in the U2 frame (radius 40/40/40/120), bottom gradient + mono label. Story (Newsreader), journey trace with 5 city pads, academic record rows, principles, methods, languages. Optional: `p5-bruges-bridge-C-recommended.webp` as a small image beside "Five places, one line of inquiry". |
| `/research` | `research.html` | Title, question block, **FIG. 2 two readings** (insulator vs instigator schematics), outputs list, emerging interests, talks, CTA. Keep the live "Future directions" section. |
| `/research/[slug]` | `research-detail.html` | Header + meta chips; sections 01–06 with anchors; sticky rail (on this page, cite this with APA/Harvard/BibTeX + copy, specification). Keep live abstracts/findings (they replace the design placeholders). |
| `/teaching` | `teaching.html` | Hero + **FIG. 3 parallel circuit** (lit lamps). Philosophy with **`p2-teaching-C-recommended.webp`** under the heading (radius 32/32/120/32, chip "T · EVERY BRANCH LIT"). Four-role vertical timeline, modules grid (M1–M3 real, M4–M6 hidden until named), specialisms, testimonial slot (**hidden until written permission**), CTA. |
| `/cv` | `cv.html` | Header + one "Download PDF CV" button. **FIG. 4 timing diagram**. Mobile: the diagram is unreadable today; make lanes stack vertically or start scrolled to the latest years with a visible swipe hint and sticky lane labels. Sticky section nav + entries with designators. |
| `/writing` | `writing.html` | Hidden from nav until the first article. Medium-style list, tag filter (URL state), featured card, series rail, subscribe. Author avatar = `nimra-avatar.webp` (or the P4 B pair, §7). |
| `/writing/[slug]` | `article.html` (+ `mobile-article.html`) | Reading view: 3px progress bar, minimal header, title/subtitle, author row (48px avatar), share/copy/cite, cover, 680px Newsreader body, highlight-to-share tooltip, footnotes, references, cite box, author card (72px avatar), subscribe, "More from Nimra". Reader-theme toggle. Mobile: bottom action bar. |
| `/contact` | `contact.html` | Left: **`p3-research-C-recommended.webp`** (radius 32/120/32/32, label "S1 · WAITING FOR YOUR SIGNAL"), intro, email, based in, ORCID/LinkedIn. Right: switch panel + form (enquiry chips change the message placeholder; honeypot + Turnstile + timing field stay). Success state closes the switch: "Circuit complete." |
| 404 | (live) | Keep "This trace goes nowhere." |

## 7. Photography

All files are in `public/images/nimra/` (4:5 WebP, ≈1000–1280px long edge). Serve with `next/image`, `sizes` for 480/960/1280, `priority` only on the About portrait. **Strip nothing else; they already have no GPS metadata.**

| File | Use | object-position | Alt text |
|---|---|---|---|
| `p1-portrait-C-recommended` ★ | About portrait, OG/author fallback | 50% 28% | Nimra Zahid, International Relations researcher and educator, seated on a park bench |
| `p1-portrait-B-dark` / `-B-light` | Standalone uses (speaker kit, press, OG card photo) | 50% 30% | Nimra Zahid |
| `p2-teaching-C-recommended` ★ | Teaching page | 55% 30% | Nimra Zahid seated on a green park bench under autumn trees |
| `p3-research-C-recommended` ★ | Contact page | 50% 22% | Nimra Zahid seated on stone steps in a modern city square |
| `p4-smile-steps-B-dark` / `-B-light` ★ | Article author cards, Writing page | 50% 30% | Nimra Zahid |
| `p5-bruges-bridge-C-recommended` ★ | About journey section (optional), never as the main profile | 50% 30% | Nimra Zahid on a canal bridge |
| `nimra-avatar` | Small round avatars (32/48/72/112px) | center | Nimra Zahid |
| `*-A-original` | Reference only; do not ship | — | — |

**Theme rule:** C-versions work in both themes unchanged. For B-versions, render `-B-dark` when `data-theme="dark"` and `-B-light` when light (use `<picture>` or two `next/image`s toggled by the theme attribute; no layout shift). Frames: one 120px corner per frame, 1px `--photo-border`; labels sit on `--photo-label-plate`, never directly on the photo. Light theme: no gradient overlays on photos. P2's B-dark and B-light are the same image.

## 8. Content and privacy rules (non-negotiable)

- **Never publish:** phone number, personal Gmail, date of birth, student/registration numbers, certificate scans, father's name, module-level grades.
- The current school is **"Specialist SEMH school, Northamptonshire"**: don't name it.
- No pupil names, photos or anecdotes.
- Theses: overview only, never the full text or PDF.
- Remove every internal/review note from rendered pages *and* from the CV PDF ("author review", "awaiting confirmation", "preview", "overlapped", etc.). Search the codebase for those words.
- **Confirm with Nimra before shipping** (flag, don't guess): the methods list on About (live has "Process tracing" and "Document & discourse analysis", which are not in her CV); the "Future directions" claims; the abstract wording on research pages; MPhil dates (web CV says 2016–2018, PDF says Spring 2016 – Fall 2017; pick one everywhere).

## 9. Acceptance checks (run after every page)

- No horizontal scroll at 375px; nothing under 12px; tap targets ≥44px.
- WCAG AA contrast in **both** themes (text 4.5:1, large 3:1).
- Keyboard: every control reachable, visible focus ring, Escape closes the mobile menu.
- Reduced motion: traces still, no scroll-reveal delays (content must be visible without JS).
- Lighthouse mobile ≥95 performance/accessibility/SEO; LCP < 1.8s (show the hero headline immediately; animate only the diagram); CLS ≈ 0.
- Theme toggle persists and B-photos swap without flashing.

## 10. Launch blockers from the latest audit

1. Add **professional email, ORCID, LinkedIn** to the Contact page, footer, CV page and CV PDF; add them to the `Person` JSON-LD `sameAs`.
2. **Indexing:** keep `noindex` + `Disallow: /` on preview deployments only. On the production domain serve an allow-all `robots.txt` pointing to `sitemap.xml`, and drop the `noindex` meta. Use `VERCEL_ENV === "production"` to decide.
3. Replace `nimra-portfolio-gamma.vercel.app` in canonical URLs, OG URLs, sitemap, JSON-LD and the CV PDF with the custom domain once connected (one `SITE_URL` env var).
4. Portrait on About (§7).
5. Header blur fix (§5), hero line break (§6), mobile CV timeline (§6).
6. CV PDF: brand fonts (Fraunces/Geist, embedded), email line, no review notes, dates consistent.
7. Nudge apart the "Abbeyfield" / "SEMH school" labels on the CV timeline.
8. Weak "Approach" copy on the MPhil and Istanbul pages: hide the section until Nimra supplies a concrete sentence.

## 11. Order of work

1. Tokens + fonts + theme provider (§3), primitives (§4), Nav/Footer (§5).
2. Photos into `public/images/nimra/` + an `<Photo>` component that handles frames, labels and B-theme swapping (§7).
3. Pages in this order: About → Contact → Teaching → Home → CV → Research → Research detail → Writing/Article (behind a feature flag until the first article).
4. Launch blockers (§10).
5. Final pass: §9 on every route, then a summary listing every placeholder and every open question for Nimra.

## 12. Reading the page files

The files in `pages/` are **inline-styled HTML design comps** at 1440px (mobile at 390px), not production code.
- `{{name}}` = a value computed by the small `<script type="text/x-dc">` class at the bottom of each file (e.g. the insulator/instigator state colours). Read the script to see the states.
- `<sc-for list=…>` = repeat; `<sc-if value=…>` = conditional; `<dc-import name="Nav">` = include `component-nav.html`.
- Links like `About.dc.html` map to routes in §6.
- Fixed heights on the root `<div>` are canvas artboard sizes. Build fluid, responsive layouts, never fixed page heights.
- Image `src` values already point at `/images/nimra/…`.
