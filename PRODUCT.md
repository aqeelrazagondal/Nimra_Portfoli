# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: academics in International Relations, Security Studies and Politics (and the admissions tutors who route applications to them), mostly at UK universities, deciding whether to supervise Nimra Zahid's PhD from 2027. They arrive from an email, a CV link or a search, usually on a laptop between other work, and give the site a few minutes: they scan the proposed research, check her preparation and the CV, then either email her or move on.

Secondary (not designed for, but must not be failed): schools and teaching employers reading the teaching record; other researchers reading her writing.

## Product Purpose

A personal academic site that gets Nimra a PhD supervisor for full-time study from 2027. Success is a supervisor emailing her about fit, funding routes and timelines. Everything else (research pages, writing, teaching, CV) exists to make that email likely.

## Positioning

Her research argues that Afghanistan should be reclassified from an "insulator" to an "instigator" in Regional Security Complex Theory (Buzan and Wæver, 2003): a state whose security governance failure generates and exports non-traditional threats into the neighbouring complexes. The site is the only place that argument, her three projects that lead to it (2018 MPhil, 2020 Istanbul conference paper, 2024 MA dissertation) and the proposed doctoral project sit together.

## Operating Context

- Supervisors compare many applicants. They look for a clear research question, method, fit with their own work, and evidence of preparation.
- Contact is by email (hello@nimrazahid.com, forwarding to her inbox). An on-site form appears only when Resend and Turnstile are configured.
- Content is edited in code (`content/profile.ts`, `content/phd.ts`) and articles in Keystatic (`content/articles`).
- Deployed on Vercel from `main`.

## Capabilities and Constraints

- Next.js App Router site, statically rendered; light and dark themes (device setting, then a saved choice).
- Pages: home, /phd, /research and three research detail pages, /teaching, /about, /cv (plus /cv.pdf), /writing and articles, /contact, /media.
- British English. No em dashes in copy.
- WCAG 2.2 AA in both themes at 1280px and 375px is enforced in CI (axe); Lighthouse budgets of 95 on /, /phd, /research and /cv.
- Respect prefers-reduced-motion; animations pause off-screen.
- Slots that are empty until Nimra supplies data must render nothing: proposal summary PDF, key literature, publications, ORCID, Google Scholar, PhD criteria grid, working title.
- Writing joins the main navigation only at three or more published posts.

## Brand Commitments

- Name: Nimra Zahid. Status line: "Seeking PhD supervision · 2027 entry".
- The insulator versus instigator contrast is the core idea and should stay demonstrable on the site.
- Real photographs of Nimra (in `public/images/nimra/`) are the only imagery of her; no generated likenesses.
- The site is Nimra's own and should feel personal to her as a woman researcher: warm and graceful, while staying a credible academic site for supervisors (owner direction, November 2026). Avoid gender clichés; express it through a warmer second ink, softer forms and an elegant reading serif.

## Evidence on Hand

- Degrees: MA International Relations (Merit), University of Northampton, 2024; MPhil IR, National Defence University Islamabad, 2016 to 2018; BS IR, Lahore College for Women University, 2011 to 2015.
- Research: three projects with abstracts in `content/profile.ts`; full texts on request only.
- Teaching: 10+ years in Pakistan and England, including six undergraduate IR modules at the University of Gujrat and specialist SEMH provision.
- Two short referee quotes (`testimonials` in `content/profile.ts`), used verbatim.
- Absent, and never to be invented: publications, citations, metrics, awards, conference talks beyond Istanbul 2020, findings for the MPhil and conference paper.

## Product Principles

1. The research question first: within one viewport a supervisor knows what she wants to study and why it matters.
2. Prove, don't claim: show the argument, the projects and the preparation; no self-praise.
3. One clear next step on every page: read the proposal, or email her.
4. Calm, credible and quick to scan: this is judged against other applicants by busy academics.
5. Truthful by default: empty slots stay hidden rather than showing placeholders.

## Accessibility & Inclusion

WCAG 2.2 AA in both themes, keyboard operable, reduced motion respected, readable at 375px.
