# Production copy audit

Audited the production build using its sitemap, plus `/media` and a 404 response. Public HTML, metadata, JSON-LD and accessibility attributes are listed below. Search is case-insensitive and includes literal substrings, so `press` also finds `pressing` and publisher names. No em dashes found unless listed.

Contact descriptions, two mailto topics and subjects, fallback queries, inherited intro link font size, PhD mailto subjects, /media redirect, and mobile/desktop overflow checks passed.

## Remaining matches by route

### /

HTTP 200.

| Location | Match context |
| --- | --- |
| JSON-LD $.mainEntity.description | Nimra Zahid is an International Relations researcher and educator in Northampton, UK, studying Afghanistan’s role in regional security in South and Central Asia. Seeking PhD supervision for 2027 entry. |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | Seeking PhD supervision for 2027 entry. Read the proposed research |
| HTML span.label | Seeking PhD supervision · 2027 entry |
| HTML span.mono.muted | PHD PROJECT · SEEKING SUPERVISION · 2027 ENTRY |
| HTML a.footer-status | Seeking PhD supervision · 2027 entry |

Technical HTML: 2 `aria-pressed` attributes (literal `press` in the attribute name); 5 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).

### /about

HTTP 200.

| Location | Match context |
| --- | --- |
| JSON-LD $.mainEntity.description | Nimra Zahid is an International Relations researcher and educator in Northampton, UK, studying Afghanistan’s role in regional security in South and Central Asia. Seeking PhD supervision for 2027 entry. |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a.footer-status | Seeking PhD supervision · 2027 entry |

Technical HTML: 5 `aria-pressed` attributes (literal `press` in the attribute name); 2 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).

### /research

HTTP 200.

| Location | Match context |
| --- | --- |
| meta description | Research by Nimra Zahid on Afghanistan and Regional Security Complex Theory: an MA dissertation, an MPhil thesis on Russia–Afghanistan relations and a conference paper on Turkey and the Global War on Terror. Seeking PhD supervision for 2027 entry. |
| meta og:description | Research by Nimra Zahid on Afghanistan and Regional Security Complex Theory: an MA dissertation, an MPhil thesis on Russia–Afghanistan relations and a conference paper on Turkey and the Global War on Terror. Seeking PhD supervision for 2027 entry. |
| meta twitter:description | Research by Nimra Zahid on Afghanistan and Regional Security Complex Theory: an MA dissertation, an MPhil thesis on Russia–Afghanistan relations and a conference paper on Turkey and the Global War on Terror. Seeking PhD supervision for 2027 entry. |
| JSON-LD $.description | Research by Nimra Zahid on Afghanistan and Regional Security Complex Theory: an MA dissertation, an MPhil thesis on Russia–Afghanistan relations and a conference paper on Turkey and the Global War on Terror. Seeking PhD supervision for 2027 entry. |
| JSON-LD $.about.description | Nimra Zahid is an International Relations researcher and educator in Northampton, UK, studying Afghanistan’s role in regional security in South and Central Asia. Seeking PhD supervision for 2027 entry. |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a.footer-status | Seeking PhD supervision · 2027 entry |

Technical HTML: 6 `aria-pressed` attributes (literal `press` in the attribute name); 6 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).

### /cv

HTTP 200.

| Location | Match context |
| --- | --- |
| JSON-LD $.mainEntity.description | Nimra Zahid is an International Relations researcher and educator in Northampton, UK, studying Afghanistan’s role in regional security in South and Central Asia. Seeking PhD supervision for 2027 entry. |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML p | I’m seeking PhD supervision in International Relations, Security Studies or Politics, for full-time study from 2027. My project asks whether Afghanistan should be reclassified from an “insulator” to an “instigator” in Regional Security Complex Theory. |
| HTML a.footer-status | Seeking PhD supervision · 2027 entry |

Technical HTML: 0 `aria-pressed` attributes (literal `press` in the attribute name); 3 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).

### /teaching

HTTP 200.

| Location | Match context |
| --- | --- |
| JSON-LD $.about.description | Nimra Zahid is an International Relations researcher and educator in Northampton, UK, studying Afghanistan’s role in regional security in South and Central Asia. Seeking PhD supervision for 2027 entry. |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML p.text-2 | I’m now seeking PhD supervision in International Relations for 2027 entry. |
| HTML a.footer-status | Seeking PhD supervision · 2027 entry |

Technical HTML: 0 `aria-pressed` attributes (literal `press` in the attribute name); 3 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).

### /contact

HTTP 200.

| Location | Match context |
| --- | --- |
| JSON-LD $.mainEntity.description | Nimra Zahid is an International Relations researcher and educator in Northampton, UK, studying Afghanistan’s role in regional security in South and Central Asia. Seeking PhD supervision for 2027 entry. |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML span.photo-plate.photo-label.at-bottom | Seeking PhD supervision · 2027 entry |
| HTML p.contact-intro | Could my project fit your supervision? Email me, or first. |
| HTML a.footer-status | Seeking PhD supervision · 2027 entry |

Technical HTML: 0 `aria-pressed` attributes (literal `press` in the attribute name); 4 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).

### /research/afghanistan-regional-security

HTTP 200.

| Location | Match context |
| --- | --- |
| JSON-LD $.author.description | Nimra Zahid is an International Relations researcher and educator in Northampton, UK, studying Afghanistan’s role in regional security in South and Central Asia. Seeking PhD supervision for 2027 entry. |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML p | How Afghanistan is classified shapes how its neighbours, and the analysts who study them, understand risk in the wider region. If Afghanistan is treated as a buffer, instability there looks containable; if it is a driver, regional security cannot be analysed without it. The question has become more pressing since 2021. |
| HTML a.footer-status | Seeking PhD supervision · 2027 entry |

Technical HTML: 3 `aria-pressed` attributes (literal `press` in the attribute name); 3 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).

### /research/russia-afghanistan-relations

HTTP 200.

| Location | Match context |
| --- | --- |
| JSON-LD $.author.description | Nimra Zahid is an International Relations researcher and educator in Northampton, UK, studying Afghanistan’s role in regional security in South and Central Asia. Seeking PhD supervision for 2027 entry. |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a.footer-status | Seeking PhD supervision · 2027 entry |

Technical HTML: 3 `aria-pressed` attributes (literal `press` in the attribute name); 2 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).

### /research/istanbul-conference-2020

HTTP 200.

| Location | Match context |
| --- | --- |
| JSON-LD $.author.description | Nimra Zahid is an International Relations researcher and educator in Northampton, UK, studying Afghanistan’s role in regional security in South and Central Asia. Seeking PhD supervision for 2027 entry. |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a.footer-status | Seeking PhD supervision · 2027 entry |

Technical HTML: 3 `aria-pressed` attributes (literal `press` in the attribute name); 2 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).

### /phd

HTTP 200.

| Location | Match context |
| --- | --- |
| meta description | Nimra Zahid is seeking PhD supervision in International Relations, Security Studies or Politics for 2027 entry. Proposed research: Afghanistan’s role in Regional Security Complex Theory. |
| meta og:description | Nimra Zahid is seeking PhD supervision in International Relations, Security Studies or Politics for 2027 entry. Proposed research: Afghanistan’s role in Regional Security Complex Theory. |
| meta og:image:alt | Proposed PhD research: from insulator to instigator. Nimra Zahid is seeking PhD supervision for 2027 entry. |
| meta twitter:description | Nimra Zahid is seeking PhD supervision in International Relations, Security Studies or Politics for 2027 entry. Proposed research: Afghanistan’s role in Regional Security Complex Theory. |
| meta twitter:image:alt | Proposed PhD research: from insulator to instigator. Nimra Zahid is seeking PhD supervision for 2027 entry. |
| JSON-LD $.description | Nimra Zahid is seeking PhD supervision in International Relations, Security Studies or Politics for 2027 entry. Proposed research: Afghanistan’s role in Regional Security Complex Theory. |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML span.label | Seeking PhD supervision · 2027 entry |
| HTML p.lead | I’m seeking PhD supervision in International Relations, Security Studies or Politics, for full-time study from 2027. My project asks whether Afghanistan should be reclassified from an “insulator” to an “instigator” in Regional Security Complex Theory. |
| HTML dt | Supervision |
| HTML section @aria-labelledby | supervision-cta |
| HTML h2 @id | supervision-cta |
| HTML a.footer-status | Seeking PhD supervision · 2027 entry |

Technical HTML: 0 `aria-pressed` attributes (literal `press` in the attribute name); 11 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).

### /writing

HTTP 200.

| Location | Match context |
| --- | --- |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a.footer-status | Seeking PhD supervision · 2027 entry |

Technical HTML: 0 `aria-pressed` attributes (literal `press` in the attribute name); 1 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).

### /writing/why-afghanistan-is-not-a-buffer

HTTP 200.

| Location | Match context |
| --- | --- |
| JSON-LD $.author.description | Nimra Zahid is an International Relations researcher and educator in Northampton, UK, studying Afghanistan’s role in regional security in South and Central Asia. Seeking PhD supervision for 2027 entry. |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML li#fn-1 | Barry Buzan and Ole Wæver, Regions and Powers: The Structure of International Security (Cambridge: Cambridge University Press, 2003). |
| HTML a.footer-status | Seeking PhD supervision · 2027 entry |

Technical HTML: 3 `aria-pressed` attributes (literal `press` in the attribute name); 4 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).

### /media

HTTP 307; redirects to /about.

| Location | Match context |
| --- | --- |
| All checked content | No matches |

Technical HTML: 0 `aria-pressed` attributes (literal `press` in the attribute name); 1 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).

### /not-a-real-page

HTTP 404.

| Location | Match context |
| --- | --- |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a @aria-label | PhD (seeking supervision, 2027 entry) |
| HTML a.footer-status | Seeking PhD supervision · 2027 entry |

Technical HTML: 0 `aria-pressed` attributes (literal `press` in the attribute name); 1 keyword occurrences in Next.js hydration scripts (serialised page content and component identifiers, not additional copy).
