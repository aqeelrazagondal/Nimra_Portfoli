---
name: Nimra Zahid
description: International Relations researcher and educator, drawn as a regional atlas.
colors:
  lapis: "#23409E"
  lapis-deep: "#1A3283"
  berry: "#8C2A55"
  sage-ink: "#2A6849"
  rose-ink: "#983A2A"
  ochre-ink: "#7C5B0E"
  sea: "#E4ECF0"
  figure-sea: "#DAE5EB"
  panel: "#EDF2F5"
  land: "#FAFBF9"
  hairline: "#C6D3DB"
  map-rule: "#ADBECA"
  map-rule-strong: "#8297A7"
  navy-ink: "#0F1A2C"
  body-ink: "#1C283B"
  secondary-ink: "#334058"
  muted-ink: "#46546A"
  field-ochre: "#EAD9A4"
  field-sage: "#CDE0CF"
  field-rose: "#EDCDC3"
  field-lapis: "#CBD6F1"
  field-land: "#D2DCE2"
  night-sea: "#0A1525"
  night-land: "#122339"
  night-lapis: "#A3B8FF"
  night-berry: "#F0A9C6"
  night-ink: "#E8EEF5"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 4.6vw, 4.4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  display-emphasis:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontWeight: 500
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 3vw, 2.75rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.6vw, 1.4rem)"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  reading:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.12rem, 1.5vw, 1.31rem)"
    fontWeight: 400
    lineHeight: 1.66
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.09em"
    fontVariation: "'wdth' 125"
  meta:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    letterSpacing: "0.035em"
    fontFeature: "'tnum'"
rounded:
  tag: "8px"
  control: "10px"
  card: "12px"
  panel: "14px"
  photo: "14px"
spacing:
  section: "clamp(88px, 11vw, 160px)"
  section-tight: "clamp(64px, 8vw, 120px)"
  gutter: "clamp(20px, 8.33vw, 120px)"
  page-max: "1440px"
components:
  button-primary:
    backgroundColor: "{colors.lapis}"
    textColor: "{colors.land}"
    rounded: "{rounded.control}"
    height: "50px"
    padding: "0 26px"
  button-primary-hover:
    backgroundColor: "{colors.lapis-deep}"
  button-ghost:
    backgroundColor: "{colors.land}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.control}"
    height: "50px"
    padding: "0 24px"
  plate:
    backgroundColor: "{colors.land}"
    rounded: "{rounded.card}"
    padding: "32px"
  tag:
    backgroundColor: "{colors.land}"
    textColor: "{colors.secondary-ink}"
    rounded: "{rounded.tag}"
    padding: "6px 12px"
---

# Design System: Nimra Zahid

## Overview

**Creative North Star: "The Atlas Plate"**

Regional Security Complex Theory is drawn as a map of complexes, so the site speaks the language of strategic atlases. The ground is a pale sea with a faint graticule; content sits on land-white plates ruled with 1px map lines; the three regional complexes around Afghanistan are flat fields of colour (Central Asia ochre, South Asia sage, the Middle East and Gulf rose); and Afghanistan itself, with every action a visitor can take, is lapis, the stone the country is known for.

It is Nimra's own site, so the atlas carries a personal, graceful voice: a deep rose-berry second ink and an elegant reading serif set the emphasised line of each big heading, corners are soft, and her real photographs lead the pages about her. Density is calm and scannable for supervisors who give the site a few minutes; the one moving thing is Fig. 1 redrawing its borders when the reading switches. Dark mode is a night chart: the same plate printed on deep navy.

It rejects the academic-portfolio default of cream paper, italic display serif everywhere and tracked monospace labels, and it rejects gender clichés: warmth comes from the berry ink, soft forms and the serif voice, never from pink chrome.

**Key Characteristics:**
- Sea-blue ground with a 96px graticule behind page openings and figures.
- Flat regional fields as whole areas of colour; lapis for Afghanistan and every action.
- Archivo map lettering (expanded width) for headings and labels; Source Serif 4 for long reading and heading emphasis.
- Land-white plates, 1px map rules, 12 to 14px corners.
- One authored motion moment; everything else is still.

## Colors

A cool atlas palette: one lapis ink for meaning and action, a berry ink for voice, and regional field tints that own whole areas.

### Primary
- **Lapis** (#23409E): buttons, links, the active nav bar, Afghanistan on every map, flows in Fig. 1. Night chart: #A3B8FF. Hover: Lapis Deep (#1A3283).

### Secondary
- **Rose-Berry** (#8C2A55): the emphasised serif line of display and section headings, the status dot, the testimonial mark, the portrait name-plate dot. Night chart: #F0A9C6. At least 6.8:1 on every ground.

### Tertiary
- **Sage Ink** (#2A6849), **Rose Ink** (#983A2A), **Ochre Ink** (#7C5B0E): lane and data inks (CV Fig. 4 spans, research markers, results chips).
- **Regional fields**: Ochre (#EAD9A4) Central Asia, Sage (#CDE0CF) South Asia, Rose (#EDCDC3) Middle East and Gulf, Lapis field (#CBD6F1), Land (#D2DCE2) Russia and the rest. Used as filled areas in figures and as plate backgrounds that key a topic (research plate on lapis field, teaching plate on sage).

### Neutral
- **Sea** (#E4ECF0): page ground. **Figure Sea** (#DAE5EB): inside figures. **Panel** (#EDF2F5).
- **Land** (#FAFBF9): plates, ghost buttons, tags.
- **Navy Ink** (#0F1A2C): headings and text; **Body Ink** (#1C283B), **Secondary Ink** (#334058), **Muted Ink** (#46546A) for supporting copy and data.
- **Hairline** (#C6D3DB), **Map Rule** (#ADBECA), **Map Rule Strong** (#8297A7): dividers and plate borders.

### Named Rules
**The Lapis Means Afghanistan Rule.** Lapis marks Afghanistan in every figure and every action in the interface. Nothing decorative is lapis, so the map's meaning never blurs.

**The Whole Field Rule.** Regional tints fill whole regions or whole plates. They are never sprinkled as small accents.

## Typography

**Display Font:** Archivo (variable width; expanded 112 to 125 for headings and map lettering)
**Body Font:** Archivo (normal width)
**Reading Font:** Source Serif 4 (long reading, testimonial, research questions, heading emphasis)

**Character:** Political-map lettering meets a calm book serif: the grotesque states the argument, the serif speaks in Nimra's voice.

### Hierarchy
- **Display** (700, wdth 118, clamp(2.5rem, 4.6vw, 4.4rem), 1.02): page claims; the second line set in Source Serif 4 italic 500, berry.
- **Headline** (650, wdth 112, clamp(1.8rem, 3vw, 2.75rem), 1.08): section headings.
- **Title** (600, clamp(1.2rem, 1.6vw, 1.4rem), 1.25): plate and item titles.
- **Body** (400, 17px, 1.65): interface copy, max about 68ch.
- **Reading** (Source Serif 4 400, clamp(1.12rem, 1.5vw, 1.31rem), 1.66): abstracts, articles, About; measure about 680px.
- **Label** (600, wdth 125, 12px, 0.09em, uppercase): figure captions and map lettering only.
- **Meta** (400, wdth 110, 13px, 0.035em, tabular figures): dates, institutions and other data rows.

### Named Rules
**The No Kicker Rule.** A heading carries its own weight. No label sits above a heading; information that used to live there goes below it as a meta row.

**The Data-Only Lettering Rule.** Expanded capitals are for figure captions and map labels. Monospace is not used as a style; code blocks alone use a system mono.

## Layout

A 1440px page with a fluid gutter (clamp(20px, 8.33vw, 120px)). Sections are spaced clamp(88px, 11vw, 160px), with tighter sections at clamp(64px, 8vw, 120px). The home hero is a two-column cartouche (claim and actions left, portrait plate right); Fig. 1 follows as a full-width row with the map at 1.75fr and a flat map key at 1fr, stacking on phones below 900px. Reading pages hold a single column of about 680px beside a sticky aside (on this page, cite, details). Grids collapse to one column at 767px; nothing scrolls sideways at 375px.

## Elevation & Depth

Flat by default: plates are separated by 1px map rules and tonal steps from sea to land, not by shadow. Lift exists only as feedback.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 10px 28px -12px rgba(15,26,44,.28)`; night chart `0 12px 30px -12px rgba(0,0,0,.55)`): linked plates on hover with a 2px rise and a lapis border, pointer devices only, removed under reduced motion.

### Named Rules
**The No Glow Rule.** No zero-offset halos, gradient borders or glass. Depth is an offset shadow on interaction, or nothing.

## Shapes

Soft rectangles: tags 8px, buttons and controls 10px, plates 12px, panels and photographs 14px. Figure regions are hand-drawn organic fields with 2px land-coloured borders; Afghanistan's border becomes a hatched wall in the Insulator reading. Icons are lucide line icons at 1.5 to 1.75 stroke; link arrows are the one lucide arrow, never a text glyph.

## Components

- **Primary button:** lapis fill, land text, 50px tall, 10px corners, Archivo 600; hover deepens to Lapis Deep; arrow icon inherits the text colour.
- **Ghost button:** land fill, Map Rule Strong border; hover turns border and text lapis.
- **Plate:** land fill, 1px Map Rule border, 12px corners, 32px padding (24px on phones). Linked plates lift on hover.
- **Keyed plate:** a plate whose fill is a regional field to tie it to a topic (research on lapis field, teaching on sage).
- **Tag:** land fill, 1px Map Rule border, 8px corners, Archivo 13px.
- **Navigation:** solid sea header, ruled when scrolled; current page marked by a 2px lapis bar under the link.
- **Segmented reading switch:** land track, selected option filled lapis with land text.
- **Map key:** swatch list of the figure's fields, then ruled rows of number (lapis, 28px) and label.
- **Fig. 1 atlas plate:** schematic regional map; switching readings cross-fades walls and flows (0.45s, ease-out expo); flows animate only here.

## Do's and Don'ts

- Do keep lapis for Afghanistan and for actions only.
- Do use regional fields as whole areas, in figures or as keyed plate fills.
- Do set the emphasised line of big headings in Source Serif 4 italic, berry.
- Do put dates, institutions and statuses below headings as meta rows.
- Do theme the browser surfaces: selection, caret, scrollbars and focus rings from the palette.
- Don't put a label or kicker above a heading.
- Don't use monospace as decoration, glow halos, gradient text or glass.
- Don't use text glyphs (→) as link icons.
- Don't express Nimra's identity through gender clichés; use the berry ink, soft forms and her real photographs.
- Don't add scattered entrance animations; Fig. 1's redraw is the one motion moment.
