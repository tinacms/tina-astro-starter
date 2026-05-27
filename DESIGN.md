---
name: TinaCMS Astro Starter
description: A neutral, theme-able shadcn-based system aligned with the TinaCMS Next.js starter. Light and dark, block-composed, color supplied by content.
colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.145 0 0)"
  card: "oklch(1 0 0)"
  primary: "oklch(0.205 0 0)"
  primary-foreground: "oklch(0.985 0 0)"
  secondary: "oklch(0.97 0 0)"
  secondary-foreground: "oklch(0.205 0 0)"
  muted: "oklch(0.97 0 0)"
  muted-foreground: "oklch(0.556 0 0)"
  accent: "oklch(0.97 0 0)"
  accent-foreground: "oklch(0.205 0 0)"
  destructive: "oklch(0.577 0.245 27.325)"
  border: "oklch(0.922 0 0)"
  input: "oklch(0.922 0 0)"
  ring: "oklch(0.708 0 0)"
  chart-orange: "oklch(0.646 0.222 41.116)"
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

**Creative North Star: "The Editor's Canvas"**

This system is deliberately quiet so the content can be loud. It is the shadcn/ui foundation the TinaCMS Next.js starter is built on, adopted here so every Tina starter speaks the same visual language. The palette is a pure neutral grayscale with no fixed brand color; identity arrives from the content itself, the editor's per-section background tint, real imagery, sharp typography, and the Tina-orange iconography, rather than from chrome that shouts. The chrome (a translucent fixed header, generous section rhythm, soft-bordered cards) recedes; the page is a canvas an editor paints on inside TinaCMS.

Two things make this work rather than read as a default install. First, it is genuinely theme-aware: a first-class light and dark mode, switched by a `.dark` class on the root, with every token defined for both. Second, it is composed, not templated: pages are built from blocks (hero, features, stats, testimonial, CTA, content) at a wide `max-w-7xl` rhythm, each section able to carry its own background tint. The single largest risk is the obvious one, and PRODUCT.md names it: a neutral shadcn shell with filler content is exactly the **generic AI / SaaS template** this project must not be. The defense is not more color in the chrome; it is real content, deliberate type, and restraint. If the page looks generic, the fix is better words and images, not a louder UI.

**Key Characteristics:**
- Neutral OKLCH grayscale foundation; zero brand hue in the core palette.
- First-class light and dark themes, every token defined for both.
- Block-composed pages at a wide `max-w-7xl` (1280px) section rhythm.
- Color is supplied by content: per-section tints, chart hues, Tina-orange icons.
- shadcn/ui component vocabulary: Button (six variants), Card, translucent nav.

## 2. Colors

A zero-chroma neutral scale carrying the whole UI, with one saturated red reserved for destructive actions and a small chart palette for data. Brand color is intentionally absent from the chrome.

### Primary
- **Ink** (light `oklch(0.205 0 0)` / dark `oklch(0.922 0 0)`): The `--primary`. Default button fill and the strongest interactive surface. Near-black on light, near-white on dark; it inverts with the theme rather than staying a fixed color.
- **Primary Foreground** (light `oklch(0.985 0 0)` / dark `oklch(0.205 0 0)`): Text on primary surfaces.

### Secondary
- **Surface Gray** (light `oklch(0.97 0 0)` / dark `oklch(0.269 0 0)`): `--secondary`, `--muted`, and `--accent` all share this near-white (near-charcoal in dark) tone. Secondary buttons, muted panels, hover backgrounds.
- **Muted Foreground** (light `oklch(0.556 0 0)` / dark `oklch(0.708 0 0)`): Secondary text, nav links at rest, card descriptions, captions.

### Tertiary
- **Destructive Red** (light `oklch(0.577 0.245 27.325)` / dark `oklch(0.704 0.191 22.216)`): Reserved exclusively for destructive actions and error states. Never decorative.
- **Chart Palette** (`chart-1..5`, e.g. orange `oklch(0.646 0.222 41.116)`, teal, blue, gold, amber): The only saturated colors in the system, reserved for data visualization. `chart-1` is the Tina-adjacent orange.

### Neutral
- **Canvas** (light `oklch(1 0 0)` / dark `oklch(0.145 0 0)`): `--background` and `--card`. The page and card surface.
- **Foreground** (light `oklch(0.145 0 0)` / dark `oklch(0.985 0 0)`): Body and heading text.
- **Border** (light `oklch(0.922 0 0)` / dark `oklch(1 0 0 / 10%)`): `--border` and `--input`. Applied globally; separation is border-driven, not shadow-driven.
- **Ring** (light `oklch(0.708 0 0)` / dark `oklch(0.556 0 0)`): Focus-visible ring color.

### Named Rules
**The No-Brand-Chrome Rule.** The core palette has no brand hue on purpose. Color enters a page through content: the editor's per-section background tint, chart colors, Tina-orange icons, and imagery. Do not paint the header, buttons, or borders Tina orange to "add brand"; that breaks the canvas.

**The Theme-Parity Rule.** Every color token is defined for both light and dark. Never hardcode a hex that only works in one theme; reference the semantic token (`--primary`, `--muted-foreground`) so it inverts automatically.

**The Saturation-Earns-Its-Place Rule.** The only saturated colors are destructive red (actions/errors) and the chart palette (data viz). A saturated color anywhere else is a mistake.

## 3. Typography

**Display / Body Font:** Inter (variable `--font-sans`, with `system-ui, sans-serif` fallback)
**Alternates loaded:** Nunito (`--font-nunito`) and Lato (`--font-lato`) are available for content-driven overrides; Inter is the default everywhere.

**Character:** Inter is the neutral, screen-native workhorse: it disappears so the content reads. Personality comes from scale jumps and weight, not from the typeface. Hero text uses `text-wrap: balance` so headlines break gracefully.

### Hierarchy
- **Display** (600, `clamp(3rem, 6vw, 5.25rem)`, line-height ~1.05, letter-spacing -0.02em): Hero `h1` only. The one oversized moment per page (`text-6xl` → `7xl` → `5.25rem`).
- **Headline** (600, `clamp(2.25rem, 4vw, 3rem)`, line-height 1.1): Section `h2` (`text-4xl` → `lg:text-5xl`). Block titles.
- **Title** (500-600, ~1.125rem, line-height 1.2): Card titles (`font-semibold leading-none`) and feature `h3` (`font-medium`).
- **Body** (400, 1rem / `text-base`, line-height ~1.6): Paragraph copy. Taglines step up to `text-lg` at `max-w-2xl`. Long-form uses the Tailwind Typography `prose prose-lg` plugin.
- **Label** (400, 0.875rem / `text-sm`): Nav links, card descriptions, feature body, captions. Carried in Muted Foreground.

### Named Rules
**The One-Big-Moment Rule.** Only the hero `h1` is oversized (up to 5.25rem). Section headings stop at `~3rem`. Don't let a second element compete with the hero for scale.

**The Measure Rule.** Section width is wide (`max-w-7xl`), but text blocks are constrained: taglines to `max-w-2xl`, feature copy inside `max-w-5xl`. Never run body text the full 1280px.

## 4. Elevation

A border-first system with restrained, low shadows. Separation is carried by `--border` applied globally (`* { @apply border-border }`), not by drop shadows. Shadows are soft and small, used to lift interactive and content objects a half-step, never to manufacture depth on flat panels. Depth inverts cleanly in dark mode (borders shift to `white / 10%`, shadows all but vanish). The one deliberate blur is the fixed header's translucency, a purposeful glass nav, not decorative glassmorphism.

### Shadow Vocabulary
- **shadow-xs** (`0 1px 2px rgba(0,0,0,0.05)`): Buttons. A hairline lift so controls read as pressable.
- **shadow-sm** (`0 1px 3px rgba(0,0,0,0.1)`): Cards at rest.
- **shadow-lg** (`0 10px 15px rgba(24,24,27,0.15)`): The hero image plate, paired with `ring-1 ring-background` and `inset-shadow-2xs`.
- **Header glass** (`backdrop-blur-3xl` over `bg-background/50`, `border-b`): The fixed nav. The single sanctioned blur.

### Named Rules
**The Border-First Rule.** Reach for a 1px `--border` before a shadow. Cards, inputs, and sections separate by stroke; shadow is a small accent on top, never the primary divider.

**The Glass-Once Rule.** The only backdrop blur is the fixed header. Do not add glass panels, blurred cards, or frosted overlays elsewhere.

## 5. Components

### Buttons (shadcn `cva`)
- **Shape:** `rounded-md` (0.5rem). Sizes: default `h-9 px-4`, `sm h-8 px-3`, `lg h-10 px-6`, `icon size-9`. Weight `font-medium`, `text-sm`, `gap-2` for icon+label.
- **Default:** `bg-primary text-primary-foreground shadow-xs`; hover `bg-primary/90`.
- **Outline:** `border bg-background shadow-xs`; hover `bg-accent text-accent-foreground`.
- **Secondary:** `bg-secondary text-secondary-foreground`; hover `bg-secondary/80`.
- **Ghost:** transparent; hover `bg-accent`. **Link:** `text-primary`, `underline-offset-4`, hover underline.
- **Destructive:** `bg-destructive text-white`. Reserved for destructive actions.
- **Focus:** `focus-visible:ring-[3px] ring-ring/50` with `border-ring`. Always visible.
- **CTA pill pattern:** primary actions sit inside a `bg-foreground/10 rounded-[~16px] border p-0.5` wrapper with a `rounded-xl` button, giving the hero/CTA buttons a soft double-edge.

### Cards
- **Shape:** `rounded-xl` (0.875rem), `border`, `bg-card`, `shadow-sm`, `py-6`, vertical `gap-6`.
- **Anatomy:** `CardHeader` (`px-6 gap-1.5`), `CardTitle` (`font-semibold leading-none`), `CardDescription` (`text-muted-foreground text-sm`), `CardContent` (`px-6`), `CardFooter` (`px-6`).
- **Feature grid variant:** a single Card split into a 3-column `divide-x` grid (stacks to `divide-y` on mobile). Each cell uses a **CardDecorator**: a 144px square with a 24px dotted grid and a radial fade, centering a 48px bordered icon tile. This is the signature content-card pattern; reach for it before inventing a new card.

### Navigation
- **Header:** `fixed`, full width, `border-b`, `bg-background/50 backdrop-blur-3xl`, inner `max-w-6xl px-6`, ~`h-20` (main content offsets with `pt-20`). Logo (Tina icon + name) at left, nav at right.
- **Links:** `text-sm text-muted-foreground`, hover `text-accent-foreground`, `duration-150`. No underline, no active stripe; hover is a foreground-color shift only.
- **Mobile:** hamburger toggles a `rounded-3xl border bg-background p-6 shadow-2xl` panel; the `lucide` Menu/X icons cross-fade and rotate (`duration-200`).

### Section / Block System
- **Section:** `py-12 mx-auto max-w-7xl px-6`, wrapped in a selectable background (`bg-default` plus 20 editor-chosen Tailwind 50-tints: `bg-orange-50/80`, `bg-blue-50/80`, and so on). This tint picker is how editors introduce color per section.
- **Blocks:** `hero` (centered headline + tagline + action pills + image plate), `features` (centered `h2` + feature-grid card), `cta` (centered title + description + action pills), plus `stats`, `testimonial`, `callout`, `content` (`prose prose-lg`), and `video`. Compose pages from these; do not hand-roll one-off section layouts.

### Inputs / Fields
- **Style:** `border` (`--input`), `bg-background`, `rounded-md`, `text-sm`. **Focus:** the same `ring-[3px] ring-ring/50` as buttons. **Invalid:** `aria-invalid` shifts the ring to `destructive`.

## 6. Do's and Don'ts

### Do:
- **Do** reference semantic tokens (`bg-primary`, `text-muted-foreground`, `border-border`) so every element inverts correctly between light and dark, per The Theme-Parity Rule.
- **Do** introduce color through content: the per-section tint picker, chart palette, Tina-orange icons, and real imagery, never through the chrome.
- **Do** compose pages from the existing blocks (hero, features, stats, CTA, content) at the `max-w-7xl` rhythm.
- **Do** separate with a 1px `--border` first; add `shadow-xs`/`shadow-sm` only as a small lift.
- **Do** keep one oversized moment (the hero `h1`) per page and constrain text blocks to `max-w-2xl`/`max-w-5xl`.
- **Do** give every control the visible `focus-visible:ring-[3px]` and respect `prefers-reduced-motion` on block entrance animations.

### Don't:
- **Don't** ship the raw shadcn default with filler copy: that is precisely the **generic AI / SaaS template** PRODUCT.md forbids (hero-metric blocks, identical icon-card grids, purple gradients, "trusted by" logo soup). Differentiate through content and type, not a louder UI.
- **Don't** paint the chrome (header, buttons, borders) Tina orange to "add brand"; the No-Brand-Chrome Rule keeps the canvas neutral.
- **Don't** use saturated color outside destructive actions and charts.
- **Don't** add backdrop blur or glass anywhere but the fixed header (The Glass-Once Rule); no decorative glassmorphism.
- **Don't** use `border-left` greater than 1px as a colored stripe on cards, list items, or callouts.
- **Don't** hardcode `#000`/`#fff` or theme-specific hexes; consider tinting the neutrals a hair toward a hue if the pure-gray default feels sterile, but keep it a single source of truth.
- **Don't** run body text the full 1280px width, and don't let a second element rival the hero for scale.
- **Don't** lean on spring-bounce or long blur-in entrances as default motion; prefer a short ease-out, and gate all block choreography behind reduced-motion.
