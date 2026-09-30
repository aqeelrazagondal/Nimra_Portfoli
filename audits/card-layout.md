# Card and responsive verification

Checked 30 September 2026 at 1280 × 812 and 375 × 812, in light and dark themes. Every currently rendered `.card` has 32px padding on all sides at 1280px and 24px at 375px. The base class has no positioning; linked cards receive relative positioning for the gradient pseudo-element, and the PhD summary is sticky only above 900px.

## Every `.card` usage

| Source | Usage | Verification |
| --- | --- | --- |
| `components/phd-summary.tsx` | At a glance | 32px / 24px; desktop sticky and mobile static |
| `app/(site)/phd/page.tsx` | Four sub-question cards | All four: 32px / 24px |
| `app/(site)/phd/page.tsx` | Buffer and driver panels | Both: 32px / 24px |
| `app/(site)/research/page.tsx` | PhD teaser | 32px / 24px |
| `app/(site)/about/page.tsx` | Three principle cards | All three: 32px / 24px |
| `app/(site)/teaching/page.tsx` | University modules, specialisms, emerging interests | All three: 32px / 24px |
| `components/circuit/cite-panel.tsx` | Citation panels on three research details and the published article | All four: 32px / 24px |
| `app/(site)/research/[slug]/page.tsx` | Two related research links on each of three projects | All six: 32px / 24px |
| `app/(site)/writing/[slug]/page.tsx` | Author card | 32px / 24px |
| `app/(site)/writing/[slug]/page.tsx` | Next-in-series and more-writing links | Conditional; no eligible published content currently. Use the same padded base class. |
| `app/(site)/writing/page.tsx` | Series sidebar cards | Conditional; no published series currently. Uses the same padded base class. |
| `components/talk-feature.tsx` | Presentation card | Untracked, unused component; About no longer renders it under the later copy instructions. |

There are 25 rendered cards per viewport. Raw computed styles are saved in `artifacts/fixes/card-inventory.json`. Class names such as `h-card`, `reading-card`, `topic-card` and `featured-card` are separate classes, not `.card` usages.

## Checks

- Responsive regression checks: PhD stickiness, three approach paragraphs, hidden working title, removed Documents section, mobile actions appearing after the summary and disappearing at the final CTA.
- Research: two-column/one-column teaser, Phosphor Path and CaretRight icons, metadata, chips, native disclosure marker suppression, 44px summary controls, keyboard focus ring, hover lift and gradient, reduced-motion behavior.
- Contact: inline link size inheritance, eager/high-priority photo, copy icon and polite success feedback.
- Home: two project columns at 1280px, one at 375px, primary proposal button visible in the first 812px mobile viewport and preceding the portrait.
- Existing accessibility suite: all public layouts at 375, 768, 1280 and 1440px in both themes; keyboard and reduced-motion checks.

## Conflicting copy instructions

The separate “Update PhD supervision copy” task explicitly superseded original items 5 and 6: it removed Talks & media, retained two email topics, and supplied a different contact lead. Those changes are preserved. Its push included the shared layout work up to commit `31a4d3e`. The final reduced-motion and full-CTA observation refinements were made afterwards.
