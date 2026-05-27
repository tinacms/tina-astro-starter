# Astro Starter → Next.js Starter Parity (Design)

Date: 2026-05-27
Status: Approved
Target repo: `tina-astro-starter` only. `tina-nextjs-starter` is read-only reference.

## Goal

Bring the TinaCMS **Astro** starter to parity with the **Next.js** starter (`@tinacms/starter`) on both the UI and the technical CMS side, while keeping the Astro starter **React-free** (`@tinacms/astro`, commit 178bfbd). This serves issue #37 (polish the Astro starter) and aligns the visual system documented in `DESIGN.md` ("The Editor's Canvas", shadcn-neutral).

## Approved decisions

- **React strategy:** React-free. Rebuild blocks as native `.astro` + Tailwind v4. No `@astrojs/react`, no Radix, no framer-motion.
- **Blocks:** all 8 (Hero, Features, Stats, CTA, Testimonial, Callout, Content, Video).
- **Blog:** keep the existing blog collection + posts; restyle to the new look. Schema unchanged.
- **Dark mode:** light only for now. Wire the `.dark` OKLCH tokens but ship no toggle.
- **Motion:** static. Hover/focus transitions only; no entrance choreography.
- **Styling:** adopt Tailwind v4 (the rejected alternative was hand-porting block styles in vanilla CSS).

## Architecture

### 1. Styling foundation
- Add Tailwind v4 via `@tailwindcss/vite` in `astro.config`.
- Replace the token block in `src/styles/global.css` with the shadcn `@theme inline` + `:root` + `.dark` OKLCH tokens copied from the Next.js `styles.css` (background/foreground/card/primary/secondary/muted/accent/destructive/border/input/ring/chart-1..5). Keep the global `prose`/base resets needed for blog content.
- Switch display/body font from Atkinson to **Inter** (self-hosted or `@fontsource`). Remove Atkinson `@font-face` + font files.
- shadcn primitives as `.astro` components in `src/components/ui/`: `Button.astro`, `Card.astro` (+ subparts), `Section.astro`, `Input.astro`. Variant logic via `tailwind-variants` (or `cva` + `clsx`) evaluated in Astro frontmatter.

### 2. Block system (CMS port)
- New `tina/collections/page.ts`: a single `blocks` field, `type: object`, `list: true`, `ui.visualSelector: true`, with `templates` = the 8 block schemas. Mirrors `tina-nextjs-starter/tina/collection/page.ts`.
- Each block lives in `src/components/blocks/<block>.astro` with a colocated `src/components/blocks/<block>.template.ts` exporting its Tina `Template` (repo already uses the `.template.ts` pattern for `YouTubeEmbed`).
- `src/components/blocks/Blocks.astro` is the dispatcher: iterates the `blocks` array, maps each `block._template` (or `__typename`) to its component, and wraps each with `data-tina-field={tinaField(block)}` for in-context editing.
- `src/components/islands/PageBody.astro` renders `Blocks.astro` instead of `TinaMarkdown`. The island registry in `src/lib/islands.ts` is unchanged (still one `page` island), so React-free visual editing keeps refreshing correctly.

### 3. Blocks (parity, static)
- **Hero:** centered headline (display scale) + tagline + action buttons (CTA-pill pattern) + image plate (`shadow-lg`, `ring-1`, rounded-2xl). No framer-motion; optional CSS fade is out of scope (static).
- **Features:** centered `h2` + a single Card split into a `divide-x` 3-col grid; each cell uses the **CardDecorator** (24px dotted grid + radial fade + bordered icon tile).
- **Stats, Testimonial, Callout, Video, Content:** port markup/structure 1:1, restyled with tokens. Content uses Tailwind Typography `prose prose-lg`.
- **CTA:** centered title + description + action pills.
- Icons: existing `astro-icon` + `@iconify-json/tabler` (map the Next.js icon names as needed).

### 4. Content + chrome
- `src/content/page/home.mdx`: convert from rich-text `body` to a `blocks` list seeded with credible landing content (so a fresh install renders a real page).
- `Header.astro`: translucent fixed `max-w-6xl` glass nav (`bg-background/50 backdrop-blur`, `border-b`), foreground-shift hover, mobile menu. Keep logo + nav from `global-config`.
- `Footer.astro`: shadcn restyle; keep the "Powered by TinaCMS" banner.

### 5. Blog (kept, restyled)
- Restyle the blog index and `src/layouts/BlogPost.astro` to the shadcn look (tokens, `prose`, cards). Collection schema unchanged.

## Units & boundaries

- Each block: one `.astro` component (presentation) + one `.template.ts` (schema). Independent, testable by rendering with sample data.
- `Blocks.astro`: pure dispatcher; depends only on the component map + block data.
- `ui/*` primitives: presentation-only, no data deps.
- Token layer in `global.css`: single source of truth; components reference semantic Tailwind classes.

## Testing / acceptance

- `astro check` and `tsc` pass; `npx tinacms build` compiles the schema; `astro build` succeeds.
- Home page renders all 8 block types from `home.mdx`.
- TinaCMS visual editing: editing a block field refreshes via the `page` island; `visualSelector` lists the 8 blocks.
- Blog index + a post render with the new styling.
- Light theme only; `.dark` tokens present but inert. No console errors. No React in the client bundle.

## Out of scope

- Dark-mode toggle, entrance animations, author/tag collections, content for blocks beyond the seeded home page.
