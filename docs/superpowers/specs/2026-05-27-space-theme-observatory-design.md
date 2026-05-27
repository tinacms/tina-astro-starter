# Space Theme: "The Observatory" (Design)

Date: 2026-05-27
Status: Approved
Target repo: `tina-astro-starter` (branch `feat/nextjs-parity`). React-free.

## Goal

Give the starter a tasteful, slightly space/astronaut-themed personality ("Astro" → cosmos), built on the existing shadcn/Tailwind v4 block UI. Add a cosmic-violet identity, ship a React-free light/dark toggle (dark is where the theme shines), and weave restrained space motifs across the page, without sacrificing readability or tipping into generic-AI-SaaS cliche.

## Approved decisions (from brainstorm)

- **Intensity:** Accent (more than a whisper, less than full-vibe). Cohesive atmosphere, kept refined.
- **Placement:** Everywhere, but content text stays clean; personality lives in chrome, backdrops, seams, and a few section accents.
- **Mechanism:** Inline SVG motifs + a color/gradient atmosphere (no heavy assets).
- **Palette:** Cosmic violet (Astro brand). Done as deep-space indigo surfaces + a controlled periwinkle-violet accent, NOT the flat purple→magenta SaaS gradient.
- **Theme mode:** Ship light/dark. System default. Dark = deep space; light = clean "daybreak".
- **Mascot:** Llama-naut (Tina's llama in a helmet), reserved for hero, 404, and empty states.

## Creative North Star: "The Observatory"

A calm, deep-night observatory. The page is the night sky; the content is what's lit up. Atmosphere and seams carry personality so reading stays effortless. Dark is the primary mode; light is a clean daybreak variant.

## Anti-slop guardrails (non-negotiable)

- **No gradient text** (`background-clip: text`).
- **No flat purple→magenta hero gradient.** Atmosphere = a faint, low-chroma radial aurora glow behind the hero, plus a starfield, not a loud sweep.
- **No glassmorphism** beyond the already-sanctioned single glass header.
- Violet accent stays rationed (links, one CTA, active/focus, small motifs); it must not wash every surface.
- Content text blocks remain high-contrast and undecorated for readability (WCAG AA in both themes).

## Color system (cosmic violet, light + dark)

Replace the neutral OKLCH tokens in `src/styles/global.css`. Neutrals gain a faint indigo tint (hue ~285). Representative target values (implementation may fine-tune for AA contrast):

**Dark (primary / space):**
- `--background: oklch(0.16 0.02 285)` (near-black indigo ink)
- `--foreground: oklch(0.95 0.01 285)` (starlight)
- `--card: oklch(0.21 0.025 285)` (lifted ink)
- `--primary: oklch(0.62 0.18 285)` (periwinkle violet); `--primary-foreground: oklch(0.99 0 0)`
- `--muted-foreground: oklch(0.72 0.03 285)`
- `--border: oklch(1 0 0 / 12%)`; `--ring: oklch(0.62 0.18 285)`
- `--accent`/`--secondary`/`--muted`: ink-tinted grays at low chroma 285.

**Light (daybreak):**
- `--background: oklch(0.99 0.004 285)`; `--foreground: oklch(0.18 0.02 285)`
- `--card: oklch(1 0.002 285)`
- `--primary: oklch(0.52 0.2 285)`; `--primary-foreground: oklch(0.99 0 0)`
- `--muted-foreground: oklch(0.5 0.02 285)`; `--border: oklch(0.9 0.012 285)`; `--ring: --primary`

Keep the chart-* tokens. The destructive red stays. Verify text/accent contrast meets AA in BOTH themes before finalizing values.

## Dark-mode mechanism (React-free)

- **No-flash init:** an `is:inline` script in `<head>` (via `BaseHead.astro`) sets `document.documentElement.classList` to `dark`/`light` from `localStorage.theme` else `prefers-color-scheme`, before paint.
- **Toggle:** a `ThemeToggle.astro` button in the header. A bundled (non-inline) `<script>` flips the `dark` class on `<html>` and writes `localStorage.theme`. Sun/moon Tabler icons. Zero new dependencies; no React.
- `class="dark"` lives on `<html>`; tokens already switch via the `.dark` selector.

## Motif components (`src/components/space/`, inline SVG)

- `Starfield.astro` — scatter of faint star dots (deterministic positions); used as a backdrop layer. Optional slow twinkle (reduced-motion gated).
- `Aurora.astro` — a single soft radial-gradient glow (low chroma violet), absolutely positioned behind hero content. NOT a linear sweep.
- `ConstellationDivider.astro` — a thin SVG line of connected stars used as a section seam.
- `OrbitRings.astro` — concentric elliptical orbit rings (decorative, behind the CTA).
- `Planet.astro` — a simple ringed-planet SVG accent (stats backdrop).
- `LlamaNaut.astro` — the signature mascot: Tina's llama silhouette in a space helmet, as inline SVG. Used in hero, 404, empty states.

All are decorative: `aria-hidden="true"`, `pointer-events-none`, positioned absolutely under content.

## Where applied (tasteful "everywhere")

- **Header/Footer:** faint starfield backdrop behind the glass header; starfield in the footer above the Tina banner.
- **Hero block:** `Aurora` + `Starfield` backdrop; optional `LlamaNaut` beside/above the headline.
- **Section seams:** `ConstellationDivider` rendered between blocks by the `Blocks.astro` dispatcher (between sections, not inside editable content). Keep it subtle and skip around full-bleed blocks.
- **Stats block:** faint `Planet` backdrop.
- **CTA block:** `OrbitRings` behind the centered CTA.
- **404 page (`src/pages/404.astro`):** llama-naut lost in space + starfield + a "back to home" button. A delight moment.
- Content/testimonial/video text remains undecorated for readability.

## Motion

Very light, all behind `@media (prefers-reduced-motion: no-preference)`: slow star twinkle/opacity drift, a gentle hover lift on cards/buttons (already partly present). No parallax-on-scroll, no bounce. Ease-out only.

## Doc updates (part of this work)

- **DESIGN.md:** new North Star ("The Observatory"), cosmic-violet palette (light+dark), dark-first elevation/atmosphere (starfield, aurora), motif vocabulary, and the anti-slop Don'ts. Replaces the "Editor's Canvas" / No-Brand-Chrome framing (chrome now carries a deliberate violet identity).
- **PRODUCT.md:** update personality to include the cosmic/Astro identity; reframe the "purple gradients" anti-reference to specifically forbid the *flat SaaS purple→magenta gradient and gradient text*, distinguishing our crafted cosmic violet from the cliche. Update the sidecar `.impeccable/design.json` to match.

## Units & boundaries

- Token layer (`global.css`): single source of truth for both themes.
- Theme toggle: `BaseHead` inline script (init) + `ThemeToggle.astro` + its bundled script (toggle). Independent of blocks.
- `src/components/space/*`: pure decorative presentational components, each one SVG with one responsibility, no data deps, `aria-hidden`.
- Application: motifs composed into existing block components/chrome via absolutely-positioned backdrops; editable content untouched.

## Testing / acceptance

- `npx astro check` 0 errors; `npx astro build` succeeds; React-free maintained (no react-dom in `dist/_astro`).
- Toggle: clicking flips `.dark` on `<html>`, persists across reload (localStorage), and there is no flash of the wrong theme on load.
- Home renders the cosmic atmosphere in both themes; content remains legible (AA contrast spot-check on body text, muted text, accent links/buttons in both themes).
- `/404` renders the llama-naut scene.
- `prefers-reduced-motion: reduce` disables twinkle/drift (verify the animation is gated).
- Motifs are `aria-hidden` and do not interfere with keyboard nav or the TinaCMS visual editor click targets.

## Out of scope

- Per-block editor controls for motifs (motifs are theme-level, not content fields).
- New illustrations beyond the listed SVG set.
- Animated/3D starfields or WebGL.
