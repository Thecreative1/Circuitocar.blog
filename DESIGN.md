---
name: Circuito Car Blog
description: Editorial arm of a Portuguese used-car dealership — trusted expertise, local warmth, sharp identity.
colors:
  logo-yellow: "#FFFF00"
  logo-yellow-hot: "#FFE600"
  logo-yellow-deep: "#E5CC00"
  logo-yellow-tint: "#FFFCD6"
  workshop-dark: "#0A0B0D"
  asphalt-900: "#131418"
  asphalt-800: "#1C1E24"
  asphalt-700: "#2A2D35"
  asphalt-600: "#3E424C"
  asphalt-500: "#6B6F7A"
  asphalt-400: "#9A9EA8"
  asphalt-300: "#C4C7CD"
  paper: "#FAFAF7"
  paper-warm: "#F4F2EA"
  paper-card: "#FFFFFF"
  paper-border: "#E8E6DE"
  circuit-navy: "#0D1F3C"
  circuit-navy-mid: "#163560"
  circuit-navy-light: "#1E4A8A"
  fg-muted: "#4A4D55"
  fg-subtle: "#757882"
  signal-red: "#E5342B"
  whatsapp-green: "#25D366"
typography:
  display:
    fontFamily: '"Saira Condensed", "Saira", "Oswald", system-ui, sans-serif'
    fontSize: "clamp(36px, 4.6vw, 64px)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "0"
  headline:
    fontFamily: '"Saira Condensed", "Saira", "Oswald", system-ui, sans-serif'
    fontSize: "clamp(26px, 2.4vw, 36px)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: '"Manrope", "Plus Jakarta Sans", system-ui, sans-serif'
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: '"Manrope", "Plus Jakarta Sans", system-ui, sans-serif'
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: '"Saira Condensed", "Saira", "Oswald", system-ui, sans-serif'
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.16em"
rounded:
  xs: "2px"
  sm: "4px"
  md: "8px"
  lg: "14px"
  pill: "999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "24px"
  6: "32px"
  7: "48px"
  8: "64px"
  9: "96px"
components:
  button-primary:
    backgroundColor: "{colors.logo-yellow}"
    textColor: "{colors.workshop-dark}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.logo-yellow-hot}"
    textColor: "{colors.circuit-navy-light}"
  button-dark:
    backgroundColor: "{colors.workshop-dark}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
    height: "46px"
  button-wa:
    backgroundColor: "{colors.whatsapp-green}"
    textColor: "{colors.workshop-dark}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
    height: "46px"
  button-ghost-light:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "12px 20px"
    height: "46px"
  side-card:
    backgroundColor: "{colors.paper-card}"
    rounded: "{rounded.lg}"
    padding: "22px 24px"
  share-pill:
    backgroundColor: "{colors.paper-card}"
    textColor: "{colors.fg-muted}"
    rounded: "{rounded.pill}"
    padding: "6px 13px"
    height: "34px"
---

# Design System: Circuito Car Blog

## 1. Overview

**Creative North Star: "The Corner Garage"**

The corner garage has been on that street for twenty years. It earned trust one honest repair at a time. It does not need to look expensive. It does not need a rebrand. It has the manual, the tools, and the knowledge — and when it tells you what's wrong with your car, you believe it.

That is the model for circuitocar.blog. Content carries the weight. The design clears the path: dark surfaces anchor authority, the Logo Yellow cuts through exactly where it needs to, and the warm paper tones of article pages feel like something worth reading rather than scanning. There is no hero graphic earning its keep through decoration. There is no animation that doesn't serve a purpose. Expertise is implied by precision, not by polish.

The system operates in two modes. **Dark** — header, hero bands, stat bars, the sticky nav — is where the brand asserts itself: ink and asphalt, Logo Yellow as the single electric accent, Circuit Navy providing depth without competing for attention. **Light** — article prose, simulators, card grids — is where the content speaks, on warm paper tones that recall the printed guide rather than the digital feed.

This system should never look like a generic car classifieds site, a cold franchise dealer portal, an SEO-stuffed auto blog, or an over-animated agency showcase. If it could belong to a dealership in any country, it has failed. The town name is in the copy on purpose.

**Key Characteristics:**
- Dual-surface: dark brand shell, warm paper content interior
- Condensed italic display type as the primary brand signal
- Logo Yellow used sparingly — header CTA, price tags, active states — never decoratively
- Circuit Navy as the structural accent: top borders on cards, button glows, trust signals
- Contact CTAs (WhatsApp, phone) treated as primary UI, not afterthoughts

## 2. Colors: The Workshop Palette

Two anchors, one accent, one structural signal. Everything else is tonal scaffolding.

### Primary
- **Logo Yellow** (`#FFFF00`): The brand mark color, sampled directly from the Circuito Car logo. Used on primary CTAs, price tags, active nav states, link underlines, and the pulsing topbar indicator. Its rarity is its power — Logo Yellow appears on less than 10% of any light-mode surface. On dark surfaces it is the only accent that exists.
- **Logo Yellow Hot** (`#FFE600`): Hover and active variant of Logo Yellow. Slightly warmer; used on button hover, link hover. Never appears without Logo Yellow in context.

### Secondary
- **Circuit Navy** (`#0D1F3C`): The second brand identity color, sampled from the Circuito Car visual identity. Used as body background on the main site, as the top-border accent on cards (3px), as the glow source on dark buttons, and as a fill for the blue CTA variant. Depth without competition.
- **Circuit Navy Light** (`#1E4A8A`): The readable, text-safe variant of Circuit Navy. Used for small accent text, active focus rings, and the card-top accent stripe where a lighter value is needed.

### Neutral — Dark Scale (Asphalt)
- **Workshop Dark** (`#0A0B0D`): The true dark surface. Used as dark-mode `body`, hero band backgrounds, sticky header. Not pure black — slightly blue-tinted toward asphalt.
- **Asphalt 900** (`#131418`): Elevated dark surface. Cards and raised elements on dark.
- **Asphalt 800** (`#1C1E24`): Hover state on dark surfaces.
- **Asphalt 700** (`#2A2D35`): Borders and dividers on dark.
- **Asphalt 500** (`#6B6F7A`): Muted text on dark surfaces.
- **Asphalt 400** (`#9A9EA8`): Secondary text on dark. Metadata, bylines.
- **Asphalt 300** (`#C4C7CD`): Light borders when on a light background.

### Neutral — Light Scale (Paper)
- **Paper** (`#FAFAF7`): The default article page background. Off-white, very slightly warm — like the page of a workshop manual, not a sterile screen.
- **Paper Warm** (`#F4F2EA`): Sectioned backgrounds, alternating rows, callout blocks. A touch more golden; readable as "this section is different" without a hard border.
- **Paper Card** (`#FFFFFF`): Pure card on light. Used only as a contained surface, never as a page background.
- **Paper Border** (`#E8E6DE`): Subtle dividers and card borders on light surfaces.

### Semantic
- **Signal Red** (`#E5342B`): Stop / error / "vendido" (sold). Used sparingly. Never decorative.
- **WhatsApp Green** (`#25D366`): The WhatsApp button fill. Not a brand color. Used on exactly one button variant. Never appear elsewhere.

### Named Rules
**The Logo Yellow Rule.** Logo Yellow is used in exactly one role per surface zone: the primary CTA on dark, the price tag on cards, the active nav indicator. It is not a pattern. It is a signal. If something else is already yellow on the page, the new element uses a different treatment.

**The Dark-First Rule.** The header, hero, topbar, and any full-bleed band section default to the dark (Workshop Dark / Asphalt) surface. Light surfaces belong to the content interior. Never invert this for novelty.

## 3. Typography

**Display Font:** Saira Condensed (italic, black 900, uppercase — with Saira, Oswald, system-ui as fallbacks)
**Body Font:** Manrope (with Plus Jakarta Sans, system-ui as fallbacks)
**Mono Font:** JetBrains Mono (used for code snippets, calculator outputs)

**Character:** Saira Condensed italic at weight 900 is the brand's voice at full volume — compressed, fast, assertive. It says "we know cars" in the same way a racing number on a bodywork panel does. Manrope is its counterweight: open, unhurried, highly readable at small sizes. The pairing creates a tension between declaration and conversation that matches the brand personality exactly.

### Hierarchy

- **Display** (900 italic, `clamp(36px, 4.6vw, 64px)`, line-height 0.98, `letter-spacing: 0`): Page-level hero headlines and article H1s. Always uppercase. Always Saira Condensed italic. The `letter-spacing: 0` is deliberate at display sizes — fractional sub-pixel values cause visible blurriness on DPR-1 screens.
- **Headline** (900 italic, `clamp(26px, 2.4vw, 36px)`, line-height 1.05, `letter-spacing: -0.02em`): Article section H2s and card titles. Same display stack.
- **Title** (bold 700, `24px`, line-height 1.3): Sidebar card heads, feature card titles. Manrope. No uppercase, no italic.
- **Body** (regular 400, `18px`, line-height 1.65): Article prose. Manrope. Max line length 65–75ch. `text-wrap: pretty` to prevent orphans.
- **Label** (bold 700, `12px`, letter-spacing `0.16em`, uppercase): Eyebrows, metadata labels, CTA button text, category tags. Saira Condensed italic. Wide tracking.

### Numeric Display (Special Rule)
- **Price / Result** (black 900 italic, `32px` or `44px`, `letter-spacing: 0`, `font-variant-numeric: tabular-nums`, `-webkit-font-smoothing: subpixel-antialiased`): Used on price tags, simulator result cards. The `letter-spacing: 0` and `subpixel-antialiased` are non-negotiable — at DPR-1 the fractional tracking token causes visible blurriness on numeric glyphs.

### Named Rules
**The Italic-Uppercase Rule.** All Saira Condensed display text is italic AND uppercase. Never one without the other. Italic alone looks unfinished; uppercase alone looks generic. The combination is the brand signature.

**The Tracking Rule for Numbers.** Never apply `--cc-tracking-tight` to numeric display text 32px or larger. Use `letter-spacing: 0`. The `-0.02em` token was designed for heading text, not for rendering large digits.

## 4. Elevation

This system is flat by default and structural by exception. Surfaces are differentiated through background tonal shifts (Workshop Dark → Asphalt 900 → Asphalt 800) rather than box shadows. Shadows appear only in two roles: as an **ambient glow** on interactive dark surfaces, and as a **structural lift** on cards when they need to separate from the page.

The dark-mode header uses `backdrop-filter: blur(12px) saturate(140%)` with a semi-transparent Workshop Dark fill rather than a shadow. This is the only glassmorphism in the system; it is purposeful (sticky nav separation) and not decorative.

### Shadow Vocabulary
- **Surface** (`0 1px 0 rgba(10,11,13,0.04), 0 1px 2px rgba(10,11,13,0.06)`): Barely-there lift. Cards at rest on Paper backgrounds.
- **Raised** (`0 6px 16px -6px rgba(10,11,13,0.12), 0 2px 4px rgba(10,11,13,0.06)`): Cards on hover, modals, dropdowns. Structural.
- **Elevated** (`0 24px 48px -12px rgba(10,11,13,0.22)`): Overlays, high-priority flyouts. Use sparingly.
- **Focus Yellow** (`0 0 0 4px rgba(255,255,0,0.18)`): The keyboard focus ring. Yellow at 18% opacity — visible without screaming.
- **Blue Glow** (`0 0 0 1px rgba(30,74,138,0.4), 0 0 16px rgba(30,74,138,0.55), 0 0 32px rgba(30,74,138,0.2)`): The signature dark button treatment. Circuit Navy as a luminous border-glow. Used on `cc-btn--dark` to communicate "this is the trusted action" without using yellow.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (hover, focus) or to establish a hard layer hierarchy (sticky header, overlapping card). A card that has a shadow just because it's a card is wrong.

**The Tonal Depth Rule.** On dark surfaces, depth is expressed through tonal steps in the Asphalt scale, not through shadows. Asphalt 900 sits on Workshop Dark. Asphalt 800 is the hover state. Shadow on dark is only for the Blue Glow.

## 5. Components

### Buttons

Buttons in this system have a distinct identity: condensed italic display font, uppercase, no decorative icons unless functionally necessary. They feel like a stamp of authority, not a suggestion.

- **Shape:** Slight rounding (4px / `--cc-radius-sm`). Never pill-shaped except on the article share bar, which is a deliberate exception (pill = lightweight secondary action).
- **Primary (`cc-btn--yellow`):** Logo Yellow fill, Workshop Dark text. The only yellow button per page section. Box-shadow: two-layer ink shadow. Hover shifts to Logo Yellow Hot fill + Circuit Navy Light text + a blue-tinted glow. The hover shift is the brand signature moment: yellow becomes deep, warm, and slightly electric.
- **Dark (`cc-btn--dark`):** Workshop Dark fill, Paper text. Blue Glow border (`0 0 0 1px rgba(30,74,138,0.4)` with outer glow layers). The trust signal button. Used when yellow would compete or on dark hero surfaces where yellow is already spoken for.
- **Ghost Light (`cc-btn--ghost-light`):** Transparent, Paper-colored border and text. For secondary hero actions on dark surfaces. Sharpens to Logo Yellow border and text on hover.
- **Ghost Dark (`cc-btn--ghost-dark`):** Transparent, Paper Border border and ink text. For secondary actions on light surfaces. Sharpens to ink border on hover.
- **WhatsApp (`cc-btn--wa`):** `#25D366` fill, Workshop Dark text. Green glow box-shadow. Hover shifts to Circuit Navy fill + Logo Yellow text + an intensified green outer glow. This button has unique physics: the hover inverts to the dark brand palette, signalling the brand behind the green. Never use this fill for anything other than a WhatsApp direct link.
- **Blue (`cc-btn--blue`):** Circuit Navy Light fill, Paper text. Blue glow box-shadow. Used for external navigation actions (maps, stock links) where yellow would imply "primary action" incorrectly.
- **Transition:** All button transitions are `140ms cubic-bezier(0.22, 1, 0.36, 1)` (fast ease-out). No bounce, no scale gimmicks. Active state: `transform: scale(0.98)`.

### Cards

- **Side Card (`.cc-side-card`):** Paper Card background, Paper Border border, 3px Circuit Navy top border accent (the structural signal that this is a trust element), 14px radius (`--cc-radius-lg`), 22px/24px internal padding. The top accent is never a decorative stripe — it identifies a "Circuito Car recommends" zone.
- **Stock Card:** Same radius and border treatment. Price tag uses Numeric Display rules (32px, `letter-spacing: 0`).
- **Related Article Card:** Paper Card bg, Paper Border border, 14px radius, 20px/22px padding. No top accent. Hover: 2px lift (`translateY(-2px)`) + Circuit Navy Mid border color. No shadow at rest.

### Article Share Bar

A lightweight pill-button strip. Buttons are `border-radius: 100px` (pill), `min-height: 34px`, Paper Card fill, Paper Border border. This is the only place pill shapes appear in the system — the pill communicates "lightweight secondary action" and distinguishes share buttons from primary CTAs. The native share button is filled (Workshop Dark) as the most prominent option on mobile.

### Sidebar Contact Block (`.cc-side-seller`)

Paper Card bg nested inside a Side Card. Contact name at body-bold weight, role tag as a yellow pill chip (Saira Condensed black italic, yellow fill). Two CTAs stacked: Dark button (Ligar) and WA button (WhatsApp). Both buttons scale to fill the column (`flex: 1`), minimum height 38px. This is the most important UI on the page; it must never be treated as a footer element.

### Inline CTA Block (`.cta-inline`)

Paper Warm background, Paper Border border, 4px Circuit Navy left border (note: this is a functional border, not a decorative stripe — it identifies a "stop and act" moment within flowing prose). 24px/28px padding. CTA buttons below the text. The left accent is an exception to the no-stripe rule because it serves as a prose interruption marker, not a card decoration.

### Eyebrow Label (`.cc-eyebrow`)

Saira Condensed italic bold, 12px, `letter-spacing: 0.16em`, uppercase, Paper Border color on dark / muted ink on light. Preceded by a `::before` 18-32px horizontal rule in Logo Yellow. Used to label sections, articles, and card categories. Never used as decorative text.

## 6. Do's and Don'ts

### Do:
- **Do** use Logo Yellow exclusively on primary CTAs, price tags, active nav states, and the pulsing topbar indicator. Its rarity is its power; diluting it dilutes the brand.
- **Do** apply `letter-spacing: 0` and `-webkit-font-smoothing: subpixel-antialiased` to all numeric display text 32px and above. Fractional tracking makes numbers blurry on DPR-1 screens.
- **Do** treat the WhatsApp and phone buttons as primary UI elements. They belong in the content flow at the moment of conviction, not in a footer column.
- **Do** use `--cc-ease-out: cubic-bezier(0.22, 1, 0.36, 1)` for all interactive transitions. State changes should feel immediate; use 140ms for micro-feedback, 220ms for layout-level transitions.
- **Do** name towns, streets, and people in copy. "Joane, Famalicão" in the meta and "Marco Marinho" in the sidebar are design decisions, not just content choices.
- **Do** use Circuit Navy (3px top border) to signal "this is a trust element" on Side Cards. The accent is structural, not decorative.
- **Do** cap article body text at 65–75ch and apply `text-wrap: pretty`. Long lines on a 1280px viewport are unreadable; orphaned words undermine perceived quality.

### Don't:
- **Don't** make the site look like a generic car classifieds site (OLX, StandVirtual style): thumbnail grids with no personality, transactional layout, no editorial voice. If the page could belong to any dealership, redesign it.
- **Don't** make the site feel like a corporate franchise dealer portal: cold, over-polished, machine-scaled. Circuito Car is a family-run stand; the design should feel accountable and specific.
- **Don't** produce clickbait auto blog aesthetics: stock photography of generic cars, SEO-stuffed heading structure, no genuine expertise signalled through design. Every article page should feel authored.
- **Don't** use over-designed agency work patterns: heavy scroll animations, gradient hero overlays, glassmorphism as decoration, gradient text (`background-clip: text` is prohibited absolutely), side-stripe borders greater than 1px on cards or list items.
- **Don't** use Logo Yellow decoratively (background washes, icon fills, border colors, hover states on non-primary elements). If it appears more than once per screen zone, one use is wrong.
- **Don't** apply `--cc-tracking-tight` to any numeric text 32px or larger. The fractional pixel value causes visible blurriness on DPR-1 screens.
- **Don't** use pill-shaped buttons outside the article share bar. Pill = secondary, ephemeral. Primary CTAs use `--cc-radius-sm` (4px).
- **Don't** separate the WhatsApp button from its phone counterpart in bottom CTAs. The pair (phone + WhatsApp) is a single decision unit; splitting them reduces conversion.
- **Don't** put generic motivational copy in CTAs. "Falar com a equipa" is a real action. "Get in touch" is a template. Write the actual thing.
