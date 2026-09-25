# Launch checklist

Editorial notes live here, never in rendered pages.

## Content needed from Nimra

- [x] MPhil dates: 2016 – 2018 everywhere (web and PDF).
- [ ] Confirm the About methods list (now: qualitative case study, theory-driven analysis (RSCT), practitioner reflection, SPSS, research ethics · NIH training).
- [ ] Confirm the Research page “Future directions” claims.
- [ ] Professional (non-Gmail) email if she has one, and an ORCID iD.

- [ ] Confirmed formal MPhil thesis title ("Counter" vs "Contours" in the transcript). The site uses the descriptive title *Russia–Afghanistan relations and regional stability*.
- [ ] Exact Istanbul conference paper title and original abstract (from proceedings or certificate). The site uses a descriptive title.
- [x] Host university of the Istanbul International Social Science Conference: Istanbul Sabahattin Zaim University (from The Circuit design).
- [ ] Check the expanded teaching entries in `content/profile.ts` (form tutor pastoral work, SENCO collaboration and parent liaison under the SEMH school; progress records under Abbeyfield) against her own CV. Grades are never shown on the site (decision, Sep 2026).
- [ ] Review and approve the drafted research copy in `content/profile.ts`: each project's `abstract`, `significance`, `phd` and `method`, plus the MA "argument in brief" list.
- [ ] Key findings for the MPhil thesis and the conference paper (`findings: []`). The section stays hidden until they are filled in.
- [ ] Names of the remaining three University of Gujrat modules (`universityModules`). The Teaching page shows the three confirmed ones until then.
- [x] Edited photos added in `public/images/nimra/` (Circuit v2 handoff): About portrait, Teaching, Contact, Bruges on About, round avatar on articles.
- [ ] Optional: photos from conferences, talks or teaching (never showing pupils) in Keystatic → **Profile photos** → In pictures, shown on About.
- [x] Email and LinkedIn added (defaults in `content/profile.ts`). ORCID still to add.
- [ ] Replace the two placeholder articles in `content/articles/` (lorem ipsum drafts, used to test the design) with real ones, or delete them. Drafts show only locally and on Vercel preview deployments. Writing appears in the navigation and sitemap once an article is set to Published with a publish date that has arrived.
- [ ] Referee permission before any testimonials are added.
- [ ] Review all first-person copy, including the Circuit hero line "They called it an insulator. I study the current."

- [ ] A short referee quote on reflective practice for the Teaching page (The Circuit design has a slot for it), only with written permission.
- [ ] Replace the draft sample articles: “Why Afghanistan is not a buffer” uses the design’s draft text minus the “[Your strongest example]” paragraph; “Afghanistan’s neighbours, re-wired” is still lorem ipsum.

- [ ] One concrete “Approach” sentence (sources, period, method) for the MPhil thesis and the Istanbul paper (`method` in `content/profile.ts`). The section is hidden on those pages until then.

## Configuration

- [ ] Set `SITE_URL` to the custom domain once it is connected (canonical URLs, OG URLs, sitemap, robots.txt, JSON-LD and the CV PDF all follow it).
- [ ] Verify the sending domain in Resend and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.
- [ ] Create a Turnstile widget for the domain and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
- [ ] Send a test enquiry from production and confirm it arrives with the right reply-to address.
- [ ] Set `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_ORCID_URL` and `NEXT_PUBLIC_LINKEDIN_URL`, then redeploy. The CV PDF is built at deploy time.

## Go-live (only after the content is approved)

- [ ] Indexing follows `VERCEL_ENV`: the **Production** deployment is indexable (allow-all `robots.txt`, no `noindex`); previews stay `noindex` with `Disallow: /`. Set `ENABLE_INDEXING=false` in Production to keep it hidden until the content and domain are final.
- [ ] Check `/robots.txt` (allow plus sitemap link), `/sitemap.xml`, the canonical URLs and `<meta name="robots">` on the production domain.
- [ ] Test link previews with the LinkedIn Post Inspector and a WhatsApp or email paste.
- [ ] Validate JSON-LD (ProfilePage/Person on home, Thesis on the research pages) with the Rich Results Test.
- [ ] Run Lighthouse on mobile against the production domain. Local runs (Sep 2026, simulated slow 4G): accessibility 100, best practices 100, CLS 0, performance 89–94, LCP 3.0–3.7 s (fonts dominate). axe (WCAG 2.1 AA plus best practice) passes on every page in both themes at 375px and 1440px.
- [ ] Open `/cv.pdf` and proofread it.
- [ ] Submit the sitemap in Google Search Console.

## Later

- Move content into a CMS (Keystatic + MDX) with a `permissionGranted` gate for testimonials.
- Persistent rate limiting for the contact form (e.g. Upstash) if spam gets past Turnstile.
