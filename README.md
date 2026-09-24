# Nimra Zahid — academic portfolio

First working local version of the revised educator–researcher plan. Built with Next.js App Router, TypeScript, React, semantic CSS tokens and self-hosted Fraunces, Inter and Newsreader through next/font. Intended deployment: Vercel.

## Run

```sh
npm install
npm run dev
```

Visit http://127.0.0.1:3000. Production check: `npm run build`. Type check: `npm run typecheck`.

## Implemented

- Home with a static, abstract regional constellation, balanced researcher/educator positioning and three research projects.
- About, Research and three project pages, Teaching, CV, Writing and Contact.
- Responsive navigation, remembered light/dark theme with system default, visible keyboard focus and reduced-motion support.
- Web CV and pre-rendered `/cv.pdf` share `content/profile.ts` through `lib/cv-document.tsx`.
- Thesis JSON-LD on thesis pages. Search indexing deliberately disabled during author review.
- Writing has an honest empty state. The contact form explicitly reports that delivery is not connected and cannot submit.

## Content source and privacy

The revised plan supplied by the user is the source, not independently inspected degree documents. Review the drafted first-person copy with Nimra before launch. The current school is anonymised. No pupil information, home address, personal telephone, dates of birth, identifiers, certificates, reference letters or full thesis PDFs are included. No testimonials are included.

`content/profile.ts` holds identity, qualifications, research and CV data. Longer draft text currently lives in the page components. The MPhil and conference project titles are descriptive pending confirmation. No invented publications, metrics, awards or quotes are used. Only two of the six university module titles have been supplied.

## Next implementation stages

1. Confirm hero wording, exact MPhil/conference titles, project abstracts and methods, full university module list, professional contact address, profile links and headshot. Review all first-person copy.
2. Introduce Keystatic with MDX collections for projects, teaching, writing and a structured CV. Add content validation and a strict `permissionGranted` gate before any testimonials can render. CMS is **not installed yet**.
3. Connect server-side contact delivery through Resend with Turnstile validation, honeypot, rate limiting and verified sender/recipient configuration. No scheduling widget.
4. Add approved essays, final project findings, Person/ProfilePage metadata, production canonical URLs, sitemap and branded OpenGraph cards. Scholar metadata stays dormant until eligible outputs exist.
5. Run a full accessibility and throttled Lighthouse audit, connect the GitHub repository and Vercel, configure the domain, then deliberately enable indexing after approval of the content.

The application is not deployed. No external accounts, messages or domain registrations have been created.
