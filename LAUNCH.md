# Launch checklist

Editorial notes live here, never in rendered pages.

## Content needed from Nimra

- [ ] Confirmed formal MPhil thesis title ("Counter" vs "Contours" in the transcript). The site uses the descriptive title *Russia–Afghanistan relations and regional stability*.
- [ ] Exact Istanbul conference paper title and original abstract (from proceedings or certificate). The site uses a descriptive title.
- [x] Host university of the Istanbul International Social Science Conference: Istanbul Sabahattin Zaim University (from The Circuit design).
- [ ] Check the expanded teaching entries in `content/profile.ts` (form tutor pastoral work, SENCO collaboration and parent liaison under the SEMH school; progress records under Abbeyfield) and the MPhil thesis grade (A, 86%) against her own CV.
- [ ] Review and approve the drafted research copy in `content/profile.ts`: each project's `abstract`, `significance`, `phd` and `method`, plus the MA "argument in brief" list.
- [ ] Key findings for the MPhil thesis and the conference paper (`findings: []`). The section stays hidden until they are filled in.
- [ ] Names of the remaining three University of Gujrat modules (`universityModules`). The Teaching page shows the three confirmed ones until then.
- [ ] Professional portrait, plus any photos from conferences, talks or teaching (never showing pupils): upload them in Keystatic → **Profile photos**. The portrait appears on the home page, About page and articles; photos appear in an “In pictures” section on About. The monogram shows until a portrait is added.
- [ ] Professional email, ORCID and LinkedIn URLs (environment variables, see `.env.example`).
- [ ] Replace the two placeholder articles in `content/articles/` (lorem ipsum drafts, used to test the design) with real ones, or delete them. Drafts show only locally and on Vercel preview deployments. Writing appears in the navigation and sitemap once an article is set to Published with a publish date that has arrived.
- [ ] Referee permission before any testimonials are added.
- [ ] Review all first-person copy, including the Circuit hero line "They called it an insulator. I study the current."

- [ ] A short referee quote on reflective practice for the Teaching page (The Circuit design has a slot for it), only with written permission.
- [ ] Replace the draft sample articles: “Why Afghanistan is not a buffer” uses the design’s draft text minus the “[Your strongest example]” paragraph; “Afghanistan’s neighbours, re-wired” is still lorem ipsum.

- [ ] One concrete “Approach” sentence (sources, period, method) for the MPhil thesis and the Istanbul paper (`method` in `content/profile.ts`). The section is hidden on those pages until then.

## Configuration

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- [ ] Verify the sending domain in Resend and set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.
- [ ] Create a Turnstile widget for the domain and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
- [ ] Send a test enquiry from production and confirm it arrives with the right reply-to address.
- [ ] Set `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_ORCID_URL` and `NEXT_PUBLIC_LINKEDIN_URL`, then redeploy. The CV PDF is built at deploy time.

## Go-live (only after the content is approved)

- [ ] Set `ENABLE_INDEXING=true` for the **Production** environment only. Previews stay `noindex` and `robots.txt` keeps disallowing everything there.
- [ ] Check `/robots.txt` (allow plus sitemap link), `/sitemap.xml`, the canonical URLs and `<meta name="robots">` on the production domain.
- [ ] Test link previews with the LinkedIn Post Inspector and a WhatsApp or email paste.
- [ ] Validate JSON-LD (ProfilePage/Person on home, Thesis on the research pages) with the Rich Results Test.
- [ ] Run Lighthouse on mobile. axe (WCAG 2.1 AA plus best practice) passed on every page in both themes at the time of writing.
- [ ] Open `/cv.pdf` and proofread it.
- [ ] Submit the sitemap in Google Search Console.

## Later

- Move content into a CMS (Keystatic + MDX) with a `permissionGranted` gate for testimonials.
- Persistent rate limiting for the contact form (e.g. Upstash) if spam gets past Turnstile.
