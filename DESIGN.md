---
name: TinaCMS Astro Starter
description: A deep-space, ember-accented, dark-capable space theme ("The Observatory") on a content-first Astro + TinaCMS starter.
colors:
  background: "oklch(0.99 0.004 285)"
  foreground: "oklch(0.20 0.03 285)"
  card: "oklch(1 0.002 285)"
  primary: "oklch(0.645 0.198 37)"
  primary-foreground: "oklch(0.99 0.005 285)"
  secondary: "oklch(0.96 0.01 285)"
  secondary-foreground: "oklch(0.30 0.04 285)"
  muted: "oklch(0.96 0.01 285)"
  muted-foreground: "oklch(0.48 0.03 285)"
  accent: "oklch(0.95 0.02 285)"
  accent-foreground: "oklch(0.30 0.05 285)"
  destructive: "oklch(0.577 0.245 27.325)"
  border: "oklch(0.90 0.012 285)"
  input: "oklch(0.90 0.012 285)"
  ring: "oklch(0.645 0.198 37)"
  chart-orange: "oklch(0.646 0.222 41.116)"
  chart-teal: "oklch(0.6 0.118 184.704)"
  chart-blue: "oklch(0.398 0.07 227.392)"
  chart-gold: "oklch(0.828 0.189 84.429)"
  chart-amber: "oklch(0.769 0.188 70.08)"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6vw, 5.25rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.875rem"
  pill: "1.5rem"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "3rem"
  xl: "4rem"
components:
  button-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    height: "2.25rem"
    padding: "0.5rem 1rem"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    height: "2.25rem"
    padding: "0.5rem 1rem"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.md}"
    height: "2.25rem"
    padding: "0.5rem 1rem"
  button-ghost:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    height: "2.25rem"
    padding: "0.5rem 1rem"
  button-link:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    padding: "0 0"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "1.5rem 0"
  nav-link:
    textColor: "{colors.muted-foreground}"
    typography: "{typography.label}"
---

# Design System: TinaCMS Astro Starter

## 1. Overview

**Creative North Star: "The Observatory"**

Picture a deep-night observatory: the dome is open, the telescope is pointed at something worth seeing, and everything around it stays dark and quiet so your eyes can adjust. That is the posture of this design system. Content — the headline, the feature copy, the blog post — is the celestial object under examination. The surrounding chrome is the dome: present, purposeful, and unlit.

Personality arrives in the atmosphere and the seams. Starfields drift behind the header and footer at 15% opacity. An aurora — a single low-chroma radial glow, not a linear sweep — warms the hero from above. ConstellationDividers stitch sections together with a hand-drawn-feeling dot-and-line. A llama-naut mascot floats above the hero headline, wearing a helmet, waiting to drift into a 404 page. These motifs are placed sparingly, `aria-hidden`, and `pointer-events-none`; they add soul without obscuring a single word or blocking an editor click target.

The neutral palette is hue 285 across all surfaces, light and dark. On the "daybreak" light surface (`oklch(0.99 0.004 285)`) the indigo tint is almost imperceptible, a cool undertone rather than a color. The dark surface (`oklch(0.16 0.02 285)`) reads as deep space — not pure black, but the blue-black of a night sky. The single saturated accent is Tina ember orange (`oklch(0.645 0.198 37)` light / `oklch(0.70 0.18 40)` dark): links, the primary CTA button, focus rings, and small motifs. It is a warm solar glow against the deep-space surfaces, never used as a flood. Dark mode is the canonical state; the light "daybreak" mode is a clean, desk-lamp alternative that shares the same ember-on-indigo logic.

**Key Characteristics:**
- Tina ember orange accent (`oklch(0.645 0.198 37)` light / `oklch(0.70 0.18 40)` dark); all neutrals tinted to hue 285.
- First-class light and dark themes, every token defined for both.
- Starfield, aurora, and constellation atmospheric motifs — decorative, `aria-hidden`, `currentColor`-driven.
- Llama-naut SVG mascot as a signature character on the hero and 404.
- Content stays fully legible (WCAG AA) in both themes; motifs never reduce contrast.

## 2. Colors

The neutral palette is an indigo tint (hue 285) on every level of the surface scale, with a warm ember orange primary from a separate hue family — a deliberate warm-against-cool contrast.

### Primary
- **Tina Ember Orange** (light `oklch(0.645 0.198 37)` / dark `oklch(0.70 0.18 40)`): The `--primary`. Default button fill, active focus ring, and the one allowed accent color anywhere in the chrome. A warm solar ember against the deep-space indigo-tinted surfaces. On light surfaces it reads as a vivid orange-amber; on dark surfaces it softens slightly to remain vibrant without washing out.
- **Primary Foreground** (light `oklch(0.99 0.005 285)` / dark `oklch(0.16 0.02 285)`): Text on primary surfaces — near-white on the ember button in light mode, deep-space dark on the lighter ember button in dark mode.

### Secondary
- **Indigo-tinted Surface** (light `oklch(0.96 0.01 285)` / dark `oklch(0.26 0.03 285)`): `--secondary`, `--muted`, and `--accent` all share this value. Near-white with a cool undertone in light; a lifted charcoal in dark. Used for secondary buttons, muted panels, and hover backgrounds.
- **Muted Foreground** (light `oklch(0.48 0.03 285)` / dark `oklch(0.72 0.03 285)`): Secondary text — nav links at rest, card descriptions, captions. The violet tint is present here too, a ghost of hue 285 in the gray.

### Tertiary
- **Destructive Red** (light `oklch(0.577 0.245 27.325)` / dark `oklch(0.70 0.19 22)`): Reserved exclusively for destructive actions and error states. Never decorative.
- **Chart Palette** (`chart-1..5`, orange/teal/blue/gold/amber): The only other saturated colors in the system, reserved for data visualization.

### Neutral
- **Deep-space Background** (light `oklch(0.99 0.004 285)` / dark `oklch(0.16 0.02 285)`): Page and card surfaces. Light reads as a whisper of violet; dark reads as deep space.
- **Foreground** (light `oklch(0.20 0.03 285)` / dark `oklch(0.95 0.012 285)`): Body and heading text. The dark-mode foreground is slightly warm-violet, not pure white.
- **Border** (light `oklch(0.90 0.012 285)` / dark `oklch(0.95 0.01 285 / 12%)`): Applied globally; separation is border-driven, not shadow-driven.
- **Ring** (light `oklch(0.645 0.198 37)` / dark `oklch(0.70 0.18 40)`): Focus-visible ring color — matches primary, so focus reads as an ember halo.

### Named Rules
**The Rationed Ember Rule.** Tina ember orange (`--primary`) is the single accent color. It should cover at most ~10% of any screen: links, one CTA button, active/focus states, and small decorative motifs. Do not use it as a background flood, a hero gradient wash, or a card tint. Restraint is what makes it feel like craft rather than a theme kit.

**The Indigo-Tint Rule.** All neutrals are tinted toward hue 285, never pure gray, black, or white. This includes surfaces, borders, muted text, and shadows. The tint is subtle (chroma 0.004–0.03) on lighter values and more perceptible on darker ones. Introducing a zero-chroma gray anywhere breaks the tonal coherence.

## 3. Typography

**Display / Body Font:** Inter (variable `--font-sans`, with `system-ui, sans-serif` fallback)
**Alternates loaded:** Nunito (`--font-nunito`) and Lato (`--font-lato`) are available for content-driven overrides; Inter is the default everywhere.

**Character:** Inter disappears so the content reads. Personality comes from scale jumps and weight, not from the typeface. Hero text uses `text-wrap: balance` so headlines break gracefully. The ember accent on links and CTAs carries the theme into the type without changing the face.

### Hierarchy
- **Display** (600, `clamp(3rem, 6vw, 5.25rem)`, line-height ~1.05, letter-spacing -0.02em): Hero `h1` only. The one oversized moment per page.
- **Headline** (600, `clamp(2.25rem, 4vw, 3rem)`, line-height 1.1): Section `h2`. Block titles.
- **Title** (500–600, ~1.125rem, line-height 1.2): Card titles and feature `h3`.
- **Body** (400, 1rem, line-height ~1.6): Paragraph copy. Long-form uses `prose prose-lg`.
- **Label** (400, 0.875rem): Nav links, card descriptions, captions — carried in Muted Foreground.

### Named Rules
**The One-Big-Moment Rule.** Only the hero `h1` is oversized (up to 5.25rem). Section headings stop at ~3rem. Don't let a second element compete with the hero for scale.

**The Measure Rule.** Section width is wide (`max-w-7xl`), but text blocks are constrained: taglines to `max-w-2xl`, feature copy inside `max-w-5xl`. Never run body text the full 1280px.

## 4. Elevation

A border-first system with restrained, low shadows, plus a new atmosphere layer for cosmic personality. Separation is carried by `--border` applied globally (`* { @apply border-border }`), not by drop shadows. The one deliberate blur remains the fixed header's translucency.

### Shadow Vocabulary
- **shadow-xs** (`0 1px 2px rgba(0,0,0,0.05)`): Buttons.
- **shadow-sm** (`0 1px 3px rgba(0,0,0,0.1)`): Cards at rest.
- **shadow-lg** (`0 10px 15px rgba(24,24,27,0.15)`): Hero image plate.
- **Header glass** (`backdrop-blur-3xl` over `bg-background/50`, `border-b`): The fixed nav. The single sanctioned blur.

### Atmosphere Layer
Decorative `aria-hidden` backdrops add depth without elevation:
- **Starfield**: deterministic SVG star-dots at 10–20% opacity, with optional `twinkle` animation gated behind `prefers-reduced-motion: no-preference`. Applied behind the header, footer, and hero.
- **Aurora**: a single soft radial gradient glow (`radial-gradient(closest-side, oklch(0.645 0.198 37 / 0.5), transparent)`) at 30–40% opacity. A warm ember glow positioned above the hero, pointing at the headline. Not a linear sweep.
- **ConstellationDivider**: a five-point dot-and-polyline SVG used as a section seam between blocks.

### Named Rules
**The Border-First Rule.** Reach for a 1px `--border` before a shadow. Separation is by stroke; shadow is a small accent on top, never the primary divider.

**The Glass-Once Rule.** The only backdrop blur is the fixed header. Do not add glass panels, blurred cards, or frosted overlays elsewhere.

**The Aurora-Not-Sweep Rule.** The atmospheric glow is always a radial gradient (a single soft point source). Never a linear gradient swept across a hero or section background. A linear purple-to-magenta sweep is the generic SaaS anti-reference; the radial aurora is the intentional alternative.

## 5. Components

### Buttons (shadcn `cva`)
- **Shape:** `rounded-md` (0.5rem). Sizes: default `h-9 px-4`, `sm h-8 px-3`, `lg h-10 px-6`, `icon size-9`.
- **Default:** `bg-primary text-primary-foreground shadow-xs`; hover `bg-primary/90`. Ember orange fill in both themes.
- **Outline:** `border bg-background shadow-xs`; hover `bg-accent text-accent-foreground`.
- **Secondary/Ghost/Link:** as per the existing shadcn `cva` definitions.
- **Focus:** `focus-visible:ring-[3px] ring-ring/50` — the ring is ember orange, matching `--ring` = `--primary`.
- **CTA pill pattern:** primary actions sit inside a `bg-foreground/10 rounded-[~16px] border p-0.5` wrapper.

### Cards
- **Shape:** `rounded-xl` (0.875rem), `border`, `bg-card`, `shadow-sm`, `py-6`, vertical `gap-6`.
- **Feature grid variant:** a single Card split into a 3-column `divide-x` grid. Each cell uses a **CardDecorator** with a dotted grid and radial fade.

### Navigation
- **Header:** `fixed`, full width, `border-b`, `bg-background/50 backdrop-blur-3xl`, inner `max-w-6xl px-6`. Contains the ThemeToggle at the right end of the actions group.
- **Links:** `text-sm text-muted-foreground`, hover `text-accent-foreground`, `duration-150`.
- **Mobile:** hamburger toggles a `rounded-3xl border bg-background p-6 shadow-2xl` panel.

### Space Motifs
All motif components live in `src/components/space/` and share these invariants: `aria-hidden="true"`, `pointer-events-none`, absolutely positioned by the consuming layout, and color-driven by `currentColor` or token classes so they adapt to both themes automatically.

- **Starfield** (`Starfield.astro`): Deterministic pseudo-random SVG `<circle>` dots. Props: `count` (default 60), `twinkle` (boolean, default true). Twinkle uses the `star-twinkle` CSS class with a `--d` delay custom property; the animation is gated behind `prefers-reduced-motion: no-preference` in `global.css`. Applied to: header (count 40, no twinkle, 15% opacity), footer (count 50, 15% opacity), hero (count 70, 20% opacity).
- **Aurora** (`Aurora.astro`): A single radial `blur-3xl` glow div. Positioned in the hero behind the content. Per the Aurora-Not-Sweep Rule, this is always radial.
- **ConstellationDivider** (`ConstellationDivider.astro`): Five-node dot-and-polyline SVG. Used as a section seam between each pair of blocks via `Blocks.astro`.
- **OrbitRings** (`OrbitRings.astro`): Three overlapping ellipses at `text-primary/20`, centered behind the CTA section.
- **Planet** (`Planet.astro`): A circle + ring ellipse at `fill-primary/15` / `stroke-primary/30`, positioned as a corner accent behind the Stats section.
- **LlamaNaut** (`LlamaNaut.astro`): The signature mascot — a clean llama-in-helmet SVG. Rendered above the hero headline and as the centerpiece of the 404 page. Sized via the `class` prop (default `size-40`).

### ThemeToggle
`ThemeToggle.astro`: a `size-9` icon button at the right end of the header nav. Shows a sun icon in dark mode, a moon icon in light. Persists preference to `localStorage` and applies `dark` class to `<html>` via an `is:inline` no-flash init script in `<head>`.

### Section / Block System
- **Section:** `py-12 mx-auto max-w-7xl px-6`. Per-section tint picker for editors.
- **Blocks:** hero, features, stats, CTA, testimonial, callout, content, video. Separated by ConstellationDividers when composed in `Blocks.astro`.

### Inputs / Fields
- **Style:** `border` (`--input`), `bg-background`, `rounded-md`, `text-sm`. Focus: `ring-[3px] ring-ring/50` — ember orange ring.

## 6. Do's and Don'ts

### Do:
- **Do** ration the ember accent: use `--primary` for links, one CTA button, active/focus states, and small motifs only. Keep it to ~10% of screen area, per The Rationed Ember Rule.
- **Do** keep content legible at WCAG AA in both light and dark themes. Body text, muted text, and interactive labels must all pass contrast. Motifs must not sit on top of readable text.
- **Do** gate all animation (star twinkle, block entrance) behind `@media (prefers-reduced-motion: no-preference)`.
- **Do** mark every decorative motif SVG `aria-hidden="true"` and `pointer-events-none` so it is invisible to assistive technology and cannot block editor interaction.
- **Do** reference semantic tokens (`bg-primary`, `text-muted-foreground`, `border-border`) so elements invert correctly between light and dark, per The Theme-Parity Rule.
- **Do** compose pages from the existing blocks at the `max-w-7xl` rhythm and separate sections with ConstellationDividers.
- **Do** keep one oversized moment (the hero `h1`) per page and constrain text blocks to `max-w-2xl` / `max-w-5xl`.

### Don't:
- **Don't** use gradient text (`background-clip: text`) anywhere. It is unreadable on some display/OS combinations and is a visual marker of the generic SaaS template.
- **Don't** use a flat purple→magenta linear gradient on a hero or section background. That is the exact anti-reference in PRODUCT.md. The aurora is a radial glow, not a linear sweep; the distinction is the whole point.
- **Don't** add glassmorphism beyond the header. The Glass-Once Rule is explicit: one backdrop blur, one translucent panel, the fixed nav.
- **Don't** let motifs reduce text contrast or block TinaCMS editor click targets. Motifs are atmosphere; content is the signal.
- **Don't** use zero-chroma neutrals (pure `oklch(L 0 0)`). All surfaces and neutrals carry the 285 hue tint, per The Indigo-Tint Rule.
- **Don't** hardcode `#000`/`#fff` or theme-specific values outside the token file; reference the semantic token so it inverts automatically.
- **Don't** run body text the full 1280px width, and don't let any element other than the hero `h1` compete for display scale.
- **Don't** animate without a reduced-motion gate. Spring-bounce or long blur-in entrances are off by default; prefer a short ease-out.
