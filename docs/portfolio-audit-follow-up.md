# Portfolio audit follow-up

Audit: 30 September 2026. Source: the supplied “nimrazahid.com — Portfolio Audit” document. This record covers all recommendations and distinguishes implemented work from items needing Nimra’s content, permission or external setup.

## Implemented

- Unpublished the lorem-ipsum neighbours article; the shared publication policy removes it from home, Writing, related articles, RSS, sitemap and public article/preview routes. Removed the promised next instalment from the existing essay.
- Added the audit-supplied MA Merit classification to home, About, web CV, generated PDF and Person credentials.
- Used each project's central title consistently for cards, page headings, citations, browser titles, share images, connected work and CV. The shorter line appears only as a subtitle. The MPhil and conference titles still need documentary confirmation (below).
- Rewrote the home introduction to name Afghanistan and explain the thesis. Added the portrait, three meaningful credentials, the existing Dr Tembo testimonial and the Istanbul venue.
- Replaced metaphor-only action labels, removed section codes outside figures and simplified captions and footer. Degree verification stays on the CV.
- Added expandable research abstracts, full-text availability labels and email requests with the project title prefilled.
- Added copyable biographies to About and Talks & media. The article author card uses the first-person line. The new page includes supported talk topics, the existing 2020 presentation and downloadable WebP/JPEG headshots; linked it from navigation, Contact and the sitemap.
- Kept inclusion, SEMH practice, student welfare and community service visible. Did not claim gender research without an output.
- Hid Writing filters until six posts (a directly linked tag can still be cleared). Replaced the published gradient cover with a title-based cover. Retained the duplicate-image link's existing accessibility fix.
- Made mobile hero buttons equal/full-width; added CV download and email shortcuts to the mobile menu.
- Added copy email, topic-specific guidance, plain Send message/success labels, explicit POST and a no-JavaScript email fallback in the form.
- Production currently lacks Resend and Turnstile configuration. Contact therefore shows a usable direct-email panel; the form appears only when all required credentials exist.
- Linked BlogPosting authors to the shared Person identity. Added optional Scholar, booking and reply-window settings without inventing values. ORCID was already supported.

## Future requirements

| Priority | Requirement | Needed to complete it |
| --- | --- | --- |
| High | Publish readable MA work | Nimra's dissertation or an approved 6–8 page extended summary; check university sharing rules and third-party rights before public upload. |
| High | DOI and Scholar indexing | Deposit the approved output on Zenodo or OSF; provide its DOI and stable PDF URL, then add `citation_pdf_url`. Create/link Google Scholar after an output is indexed. |
| High | ORCID | Nimra registers or supplies her own iD. Set `NEXT_PUBLIC_ORCID_URL` and redeploy; it appears in profile links, CV and `sameAs`. |
| High | Confirm formal titles and research copy | Original MPhil and conference titles/abstracts; approve existing research summaries, concrete methods, findings and exact supervisor names/roles before adding them. Dr Tembo is currently identified as module tutor, not assumed to be a supervisor. |
| High | Name the remaining modules | Supply the other three University of Gujrat module names. The documented total remains six; only the three supplied names are listed. Explicitly deferred by the user. |
| High | Activate the contact form | Verify Resend sender; set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY`; redeploy and perform an authorised delivery test. Direct email is live meanwhile. |
| Medium | Reply-time promise | Nimra chooses a realistic window; set `NEXT_PUBLIC_REPLY_WINDOW` and redeploy. The audit's three days was a suggestion, not a confirmed commitment. |
| Medium | Confirmation emails | After delivery setup and reply-window agreement, implement an automatic acknowledgement with that promise and verify delivery/abuse handling. No unsolicited test email was sent. |
| Medium | Optional booking | Supply a 20-minute booking URL and availability policy; set `NEXT_PUBLIC_BOOKING_URL`. It is shown only for doctoral/research enquiries once the form is configured. Explicitly deferred by the user. |
| Medium | Google Scholar link | Supply the profile URL once available; set `NEXT_PUBLIC_SCHOLAR_URL` and redeploy. Explicitly deferred by the user. |
| Medium | Research statement | Supply/approve a substantive two-page statement for prospective supervisors before generating a public PDF. Current proposal notes deliberately omit research design and evidence. |
| Medium | Working paper or journal submission | Nimra develops and approves the dissertation-derived manuscript and selects an appropriate outlet; research work cannot be supplied by a design change. |
| Medium | Writing programme | Replace the neighbours draft with a reviewed 800–1,500-word essay, then agree a sustainable monthly schedule. Review the remaining sample essay for author approval. No recurring publication commitment has been made for Nimra. |
| Medium | Referees | Obtain two referees' permission and approved names, roles and contact details, then add the CV/PDF section. Existing testimonial quotes do not establish permission to publish referee contact details. |
| Medium | Gender research | Confirm genuine interest; publish an evidence-based essay on an appropriate topic before adding this to Future directions. |
| Ongoing | Expand Talks & media | Add verified future talks, recordings, press coverage and permissions for event photographs. Do not invent grants, awards, keynotes or media appearances. |
| Ongoing | Production follow-through | Submit sitemap in Search Console; refresh LinkedIn/WhatsApp caches for removed content; check Scholar indexing, cold-cache Lighthouse, screen-reader navigation and a real enquiry after email setup. Enable Vercel Analytics/Speed Insights in the dashboard if wanted. |

## Operational notes

The audit documents Merit explicitly, so it is included; it does not establish the missing module names, reply window or account URLs. Public research text and existing testimonials remain based on the repository's prior material. Historical editorial checks in LAUNCH.md remain relevant unless superseded here. No new account registrations, repository deposits, external messages or unsupported academic outputs were created.
