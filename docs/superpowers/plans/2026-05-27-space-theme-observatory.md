# Space Theme "The Observatory" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the React-free Astro+TinaCMS starter a tasteful cosmic-violet "Observatory" personality with light/dark theming and restrained space motifs.

**Architecture:** Swap the neutral OKLCH tokens for cosmic-violet (light + dark) in `global.css`; add a React-free no-flash dark-mode toggle; build a small set of decorative inline-SVG motif components (`src/components/space/`) and compose them as absolutely-positioned, `aria-hidden` backdrops into chrome and a few blocks; add a llama-naut 404; update DESIGN.md/PRODUCT.md.

**Tech Stack:** Astro (static, React-free), Tailwind CSS v4, `astro-icon` + `@iconify-json/tabler`, vanilla JS for the toggle.

**Verification (TDD adaptation):** No unit harness for presentational Astro; the per-task gate is `npx astro check` (0 errors; the one pre-existing `frameborder` HINT in `YouTubeEmbed.astro` is acceptable) and/or `npx astro build`, plus curl render checks against the running dev server (`http://localhost:4321`). A `tinacms dev` server is already running (port 9000/4321); do NOT start another or run `tinacms build`/`build:local`. No schema changes here, so no Tina regeneration is needed. Commit SOURCE files only (don't `git add tina/__generated__`).

---

## File structure

Created:
- `src/components/ThemeToggle.astro` (dark-mode toggle button + script)
- `src/components/space/Starfield.astro`, `Aurora.astro`, `ConstellationDivider.astro`, `OrbitRings.astro`, `Planet.astro`, `LlamaNaut.astro`
- `src/pages/404.astro`

Modified:
- `src/styles/global.css` (cosmic-violet tokens light+dark; twinkle keyframe; reduced-motion gate)
- `src/components/BaseHead.astro` (inline no-flash theme script)
- `src/components/Header.astro` (ThemeToggle + starfield backdrop)
- `src/components/Footer.astro` (starfield backdrop)
- `src/components/blocks/Hero.astro` (Aurora + Starfield + LlamaNaut)
- `src/components/blocks/Stats.astro` (Planet backdrop)
- `src/components/blocks/Cta.astro` (OrbitRings backdrop)
- `src/components/blocks/Blocks.astro` (ConstellationDivider between blocks)
- `DESIGN.md`, `PRODUCT.md`, `.impeccable/design.json`

---

## Task 1: Cosmic-violet tokens (light + dark) + motion primitives

**Files:** Modify `src/styles/global.css`.

- [ ] **Step 1: Replace the `:root` block** (light "daybreak") with these values (keep the surrounding `@theme inline`, `@import`s, and `@layer base` structure; only change the token values inside `:root`):

```css
:root {
	--radius: 0.625rem;
	--background: oklch(0.99 0.004 285);
	--foreground: oklch(0.20 0.03 285);
	--card: oklch(1 0.002 285);
	--card-foreground: oklch(0.20 0.03 285);
	--popover: oklch(1 0.002 285);
	--popover-foreground: oklch(0.20 0.03 285);
	--primary: oklch(0.52 0.20 285);
	--primary-foreground: oklch(0.99 0.005 285);
	--secondary: oklch(0.96 0.01 285);
	--secondary-foreground: oklch(0.30 0.04 285);
	--muted: oklch(0.96 0.01 285);
	--muted-foreground: oklch(0.48 0.03 285);
	--accent: oklch(0.95 0.02 285);
	--accent-foreground: oklch(0.30 0.05 285);
	--destructive: oklch(0.577 0.245 27.325);
	--border: oklch(0.90 0.012 285);
	--input: oklch(0.90 0.012 285);
	--ring: oklch(0.52 0.20 285);
	--chart-1: oklch(0.646 0.222 41.116);
	--chart-2: oklch(0.6 0.118 184.704);
	--chart-3: oklch(0.398 0.07 227.392);
	--chart-4: oklch(0.828 0.189 84.429);
	--chart-5: oklch(0.769 0.188 70.08);
}
```

- [ ] **Step 2: Replace the `.dark` block** (deep space) with:

```css
.dark {
	--background: oklch(0.16 0.02 285);
	--foreground: oklch(0.95 0.012 285);
	--card: oklch(0.21 0.025 285);
	--card-foreground: oklch(0.95 0.012 285);
	--popover: oklch(0.21 0.025 285);
	--popover-foreground: oklch(0.95 0.012 285);
	--primary: oklch(0.70 0.16 285);
	--primary-foreground: oklch(0.16 0.02 285);
	--secondary: oklch(0.26 0.03 285);
	--secondary-foreground: oklch(0.95 0.012 285);
	--muted: oklch(0.26 0.03 285);
	--muted-foreground: oklch(0.72 0.03 285);
	--accent: oklch(0.28 0.04 285);
	--accent-foreground: oklch(0.95 0.012 285);
	--destructive: oklch(0.70 0.19 22);
	--border: oklch(0.95 0.01 285 / 12%);
	--input: oklch(0.95 0.01 285 / 15%);
	--ring: oklch(0.70 0.16 285);
}
```

- [ ] **Step 3: Append a twinkle keyframe + reduced-motion gate** to the END of `global.css`:

```css
@keyframes twinkle {
	0%, 100% { opacity: 0.25; }
	50% { opacity: 0.9; }
}
@media (prefers-reduced-motion: no-preference) {
	.star-twinkle { animation: twinkle var(--twinkle-dur, 4s) ease-in-out infinite; animation-delay: var(--d, 0s); }
}
```

- [ ] **Step 4: Verify** — Run `npx astro check` (expect 0 errors) and `npx astro build` (expect success). Then `curl -s http://localhost:4321/ | grep -c 'oklch'` won't apply (compiled); instead just confirm the build succeeds and the dev page still loads: `curl -so /dev/null -w "%{http_code}" http://localhost:4321/` should print `200`.

- [ ] **Step 5: Commit** — `git add src/styles/global.css && git commit -m "feat: cosmic-violet token palette (light + dark) + twinkle"`

---

## Task 2: React-free dark-mode toggle (no flash)

**Files:** Modify `src/components/BaseHead.astro`; Create `src/components/ThemeToggle.astro`; Modify `src/components/Header.astro`.

- [ ] **Step 1: Read `src/components/BaseHead.astro`** to find the `<head>` content it renders. Add this `is:inline` script as the FIRST child of the head output (before stylesheet links so it runs before paint):

```astro
<script is:inline>
	(function () {
		try {
			const stored = localStorage.getItem('theme');
			const dark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
			document.documentElement.classList.toggle('dark', dark);
		} catch (e) {}
	})();
</script>
```

- [ ] **Step 2: Create `src/components/ThemeToggle.astro`:**

```astro
---
import { Icon } from 'astro-icon/components';
---
<button
	id="theme-toggle"
	type="button"
	aria-label="Toggle color theme"
	class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
>
	<Icon name="tabler:sun" class="hidden size-5 dark:block" />
	<Icon name="tabler:moon" class="block size-5 dark:hidden" />
</button>
<script>
	const btn = document.getElementById('theme-toggle');
	btn?.addEventListener('click', () => {
		const isDark = document.documentElement.classList.toggle('dark');
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	});
</script>
```

- [ ] **Step 3: Add the toggle to the header.** In `src/components/Header.astro`, import it in the frontmatter (`import ThemeToggle from './ThemeToggle.astro';`) and render `<ThemeToggle />` inside the right-hand actions container (the `<div class="flex items-center gap-3">` that holds the social IconLinks), as the last child.

- [ ] **Step 4: Verify** — `npx astro check` (0 errors), `npx astro build` (success). Render check: `curl -s http://localhost:4321/ > /tmp/t.html; grep -c 'theme-toggle' /tmp/t.html` should be >=1, and `grep -c 'classList.toggle' /tmp/t.html` (the inline init script) should be >=1. Manually confirm the inline script appears in `<head>` ahead of CSS.

- [ ] **Step 5: Commit** — `git add src/components/BaseHead.astro src/components/ThemeToggle.astro src/components/Header.astro && git commit -m "feat: React-free light/dark toggle with no-flash init"`

---

## Task 3: Space motif components

**Files:** Create `src/components/space/{Starfield,Aurora,ConstellationDivider,OrbitRings,Planet,LlamaNaut}.astro`.

All are decorative: `aria-hidden="true"`, `pointer-events-none`, absolutely positioned where used (the consumer sets positioning context). Color via `currentColor`/token classes so they adapt to theme.

- [ ] **Step 1: `src/components/space/Starfield.astro`** (deterministic star dots; optional twinkle):

```astro
---
interface Props { count?: number; twinkle?: boolean; class?: string; }
const { count = 60, twinkle = true, class: className = '' } = Astro.props;
const frac = (n: number) => { const x = Math.sin(n) * 43758.5453; return Math.abs(x - Math.floor(x)); };
const stars = Array.from({ length: count }, (_, i) => ({
	cx: (frac(i + 1) * 100).toFixed(2),
	cy: (frac((i + 1) * 2.7) * 100).toFixed(2),
	r: (frac((i + 1) * 5.3) * 0.9 + 0.2).toFixed(2),
	d: (frac((i + 1) * 9.1) * 4).toFixed(2),
}));
---
<svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" class={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
	{stars.map((s) => (
		<circle cx={s.cx} cy={s.cy} r={s.r} fill="currentColor" class={twinkle ? 'star-twinkle' : ''} style={`--d:${s.d}s`} />
	))}
</svg>
```

- [ ] **Step 2: `src/components/space/Aurora.astro`** (single soft radial glow, NOT a linear sweep):

```astro
---
const { class: className = '' } = Astro.props;
---
<div aria-hidden="true" class={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
	<div
		class="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-30 blur-3xl dark:opacity-40"
		style="background: radial-gradient(closest-side, oklch(0.62 0.18 285 / 0.55), transparent);"
	></div>
</div>
```

- [ ] **Step 3: `src/components/space/ConstellationDivider.astro`** (section seam):

```astro
---
const { class: className = '' } = Astro.props;
const pts = [[20, 10], [110, 5], [200, 14], [290, 6], [380, 11]];
---
<svg aria-hidden="true" viewBox="0 0 400 20" class={`mx-auto h-5 w-full max-w-sm text-muted-foreground/40 ${className}`} fill="none" stroke="currentColor">
	<polyline points={pts.map((p) => p.join(',')).join(' ')} stroke-width="0.75" />
	{pts.map((p) => <circle cx={p[0]} cy={p[1]} r="2.2" fill="currentColor" stroke="none" />)}
</svg>
```

- [ ] **Step 4: `src/components/space/OrbitRings.astro`** (behind CTA):

```astro
---
const { class: className = '' } = Astro.props;
---
<svg aria-hidden="true" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" class={`pointer-events-none absolute inset-0 m-auto h-full w-full text-primary/20 ${className}`} fill="none" stroke="currentColor">
	<ellipse cx="100" cy="100" rx="92" ry="40" stroke-width="0.5" />
	<ellipse cx="100" cy="100" rx="78" ry="32" stroke-width="0.5" transform="rotate(60 100 100)" />
	<ellipse cx="100" cy="100" rx="84" ry="36" stroke-width="0.5" transform="rotate(-35 100 100)" />
	<circle cx="100" cy="100" r="2.5" fill="currentColor" stroke="none" class="text-primary/40" />
</svg>
```

- [ ] **Step 5: `src/components/space/Planet.astro`** (stats backdrop accent):

```astro
---
const { class: className = '' } = Astro.props;
---
<svg aria-hidden="true" viewBox="0 0 100 100" class={`pointer-events-none ${className}`} fill="none">
	<circle cx="50" cy="50" r="22" class="fill-primary/15" />
	<ellipse cx="50" cy="50" rx="40" ry="12" class="stroke-primary/30" stroke-width="1.5" transform="rotate(-20 50 50)" />
</svg>
```

- [ ] **Step 6: `src/components/space/LlamaNaut.astro`** (signature mascot; a clean, simple llama-in-helmet. This is a tasteful starting asset that can later be swapped for a designed illustration):

```astro
---
const { class: className = 'size-40' } = Astro.props;
---
<svg aria-hidden="true" viewBox="0 0 120 120" fill="none" class={className} xmlns="http://www.w3.org/2000/svg">
	<!-- helmet -->
	<circle cx="60" cy="60" r="46" class="fill-card stroke-border" stroke-width="2" />
	<circle cx="60" cy="60" r="38" class="fill-background" />
	<!-- visor -->
	<path d="M32 58a28 22 0 0 1 56 0a28 16 0 0 1 -56 0Z" class="fill-primary/25 stroke-primary/50" stroke-width="1.5" />
	<!-- llama head silhouette inside visor -->
	<g class="fill-foreground">
		<path d="M54 70c-1-8-3-12-3-18 0-7 4-12 9-12s9 5 9 12c0 6-2 10-3 18Z" />
		<path d="M50 44c-2-4-2-9 0-12 2 2 3 6 2 10Z" />
		<path d="M70 44c2-4 2-9 0-12-2 2-3 6-2 10Z" />
		<circle cx="56" cy="52" r="1.6" class="fill-background" />
		<circle cx="64" cy="52" r="1.6" class="fill-background" />
	</g>
	<!-- helmet highlight -->
	<path d="M40 40a26 26 0 0 1 14-12" class="stroke-foreground/20" stroke-width="2" stroke-linecap="round" fill="none" />
</svg>
```

- [ ] **Step 7: Verify** — `npx astro check` (0 errors). The components are unused for now; that's fine. `npx astro build` (success).

- [ ] **Step 8: Commit** — `git add src/components/space && git commit -m "feat: space motif SVG components (starfield, aurora, constellation, orbit, planet, llama-naut)"`

---

## Task 4: Apply motifs to chrome (header + footer)

**Files:** Modify `src/components/Header.astro`, `src/components/Footer.astro`.

- [ ] **Step 1: Header starfield.** In `Header.astro`, import Starfield (`import Starfield from './space/Starfield.astro';`). The `<header>` is `fixed ... bg-background/50 backdrop-blur-xl`. Add `relative overflow-hidden` to the `<header>` class list, and insert a faint starfield as the first child of `<header>` (behind the nav), with the nav wrapped so it stays above:

```astro
<Starfield count={40} twinkle={false} class="text-foreground/15" />
```

Ensure the existing `<nav>` renders after it and add `class="relative"` to the `<nav>` so it sits above the starfield. (The backdrop-blur header already reads atmospheric; keep stars very faint.)

- [ ] **Step 2: Footer starfield.** In `Footer.astro`, import Starfield. Wrap the copyright `<footer>` (the `border-t bg-background ...` one, NOT the `.tina-footer` banner) so it is `relative overflow-hidden`, and add `<Starfield count={50} class="text-foreground/15" />` as its first child, with the existing content wrapped in a `relative` container so text stays above. Do not touch the `.tina-footer` gradient banner.

- [ ] **Step 3: Verify** — `npx astro check` (0 errors), `npx astro build` (success). Render: `curl -s http://localhost:4321/ > /tmp/c.html; grep -c '<circle' /tmp/c.html` should be >=1 (stars present). Confirm nav links + theme toggle still visible in markup.

- [ ] **Step 4: Commit** — `git add src/components/Header.astro src/components/Footer.astro && git commit -m "feat: starfield backdrops in header and footer"`

---

## Task 5: Apply atmosphere to the hero

**Files:** Modify `src/components/blocks/Hero.astro`.

- [ ] **Step 1: Add Aurora + Starfield backdrop and the llama-naut.** Import in frontmatter:
```astro
import Aurora from '../space/Aurora.astro';
import Starfield from '../space/Starfield.astro';
import LlamaNaut from '../space/LlamaNaut.astro';
```
Wrap the hero `Section` content so the backdrops sit behind it. Concretely: make the `<Section>` `class="relative overflow-hidden"` (pass `class` through; Section already forwards `class`), add as the FIRST children inside Section:
```astro
<Aurora />
<Starfield count={70} class="text-foreground/20" />
```
Then ensure the existing centered content `<div>` gets `class="relative"` so it stays above the backdrops. Add the llama-naut above the headline inside that content div, before the `<h1>`:
```astro
<LlamaNaut class="mx-auto mb-6 size-28 md:size-32" />
```

- [ ] **Step 2: Verify** — `npx astro check` (0 errors), `npx astro build` (success). Render: `curl -s http://localhost:4321/ > /tmp/h.html; grep -c 'radial-gradient' /tmp/h.html` (aurora) >=1 and the hero headline still present.

- [ ] **Step 3: Commit** — `git add src/components/blocks/Hero.astro && git commit -m "feat: hero aurora, starfield, and llama-naut"`

---

## Task 6: Stats planet, CTA orbit, section dividers

**Files:** Modify `src/components/blocks/Stats.astro`, `src/components/blocks/Cta.astro`, `src/components/blocks/Blocks.astro`.

- [ ] **Step 1: Stats planet backdrop.** In `Stats.astro`, import Planet (`import Planet from '../space/Planet.astro';`). Make the `<Section>` `class="relative overflow-hidden"`. Add as first child inside Section a positioned planet accent:
```astro
<Planet class="absolute -right-10 -top-10 h-48 w-48 opacity-60" />
```
Wrap the existing inner `<div class="mx-auto max-w-5xl ...">` so it has `relative` (add `relative` to its class) so stats stay above.

- [ ] **Step 2: CTA orbit rings.** In `Cta.astro`, import OrbitRings (`import OrbitRings from '../space/OrbitRings.astro';`). Make `<Section>` `class="relative overflow-hidden"`. Add `<OrbitRings class="opacity-70" />` as the first child of Section, and add `relative` to the existing centered `<div class="text-center">` so content stays above.

- [ ] **Step 3: Constellation dividers between blocks.** In `Blocks.astro`, import the divider (`import ConstellationDivider from '../space/ConstellationDivider.astro';`). Render a divider BETWEEN blocks (after every block except the last). Update the map so it returns the block wrapper followed by a divider when not last:

```astro
{blocks.map((block: any, i: number) => {
	const Component = componentMap[block.__typename];
	if (!Component) return null;
	return (
		<>
			<div data-tina-field={tinaField(block)}>
				<Component data={block} />
			</div>
			{i < blocks.length - 1 && <ConstellationDivider class="my-2 opacity-70" />}
		</>
	);
})}
```

(Keep the existing import of `tinaField` and the `componentMap`. Astro supports fragment `<>...</>`.)

- [ ] **Step 4: Verify** — `npx astro check` (0 errors), `npx astro build` (success). Render: `curl -s http://localhost:4321/ > /tmp/s.html; grep -c 'ellipse' /tmp/s.html` (orbit + planet) >=1; confirm all 8 block strings from the home page still render (e.g. "Performance you can measure", "Start building today").

- [ ] **Step 5: Commit** — `git add src/components/blocks/Stats.astro src/components/blocks/Cta.astro src/components/blocks/Blocks.astro && git commit -m "feat: stats planet, CTA orbit rings, constellation dividers"`

---

## Task 7: Llama-naut 404 page

**Files:** Create `src/pages/404.astro`.

- [ ] **Step 1: Create `src/pages/404.astro`** using the Base layout, with a starfield, the llama-naut, and a home button:

```astro
---
import Base from '../layouts/Base.astro';
import Starfield from '../components/space/Starfield.astro';
import LlamaNaut from '../components/space/LlamaNaut.astro';
import Button from '../components/ui/Button.astro';
---
<Base title="Lost in space (404)" description="This page drifted out of orbit.">
	<section class="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 text-center">
		<Starfield count={90} class="text-foreground/20" />
		<div class="relative flex flex-col items-center">
			<LlamaNaut class="size-40" />
			<p class="mt-6 text-sm font-medium tracking-widest text-primary uppercase">Error 404</p>
			<h1 class="mt-2 text-4xl font-semibold tracking-tight lg:text-5xl">Lost in space</h1>
			<p class="mx-auto mt-4 max-w-md text-muted-foreground">This page drifted out of orbit. Let's get you back to mission control.</p>
			<Button href="/" class="mt-8">Back to home</Button>
		</div>
	</section>
</Base>
```

- [ ] **Step 2: Verify** — `npx astro check` (0 errors), `npx astro build` (success; `dist/404.html` generated). Render: `curl -s http://localhost:4321/this-does-not-exist 2>/dev/null | grep -c "Lost in space"` may not work for the dev 404; instead confirm `dist/404.html` contains "Lost in space": `grep -c "Lost in space" dist/404.html` >=1.

- [ ] **Step 3: Commit** — `git add src/pages/404.astro && git commit -m "feat: llama-naut 404 page"`

---

## Task 8: Update DESIGN.md, PRODUCT.md, sidecar

**Files:** Modify `DESIGN.md`, `PRODUCT.md`, `.impeccable/design.json`.

- [ ] **Step 1: PRODUCT.md.** Read it. Make these edits:
  - In **Brand Personality**, change the three words to **credible, crafted, cosmic** and add one sentence: "The starter wears a light, Astro-fitting space theme: a cosmic-violet identity and restrained celestial motifs, used to add personality without crowding the content."
  - In **Anti-references**, REPLACE the blanket "no purple gradients" wording with: "No **flat purple→magenta SaaS hero gradients** and **no gradient text** (`background-clip: text`). Our cosmic violet is a controlled accent on deep-space surfaces, not a loud gradient wash; the distinction is the whole point."
  - Keep everything else.

- [ ] **Step 2: DESIGN.md.** Replace its content to reflect "The Observatory". Keep the Stitch six-section structure and frontmatter format. Concretely:
  - **Frontmatter colors:** replace the neutral OKLCH values with the light-theme cosmic-violet values from Task 1 Step 1 (background/foreground/card/primary/primary-foreground/secondary/muted/muted-foreground/accent/destructive/border/ring + chart-*). Add `name: TinaCMS Astro Starter` / updated `description: A cosmic-violet, dark-capable space theme ("The Observatory") on a content-first Astro + TinaCMS starter.`
  - **## 1. Overview:** Creative North Star: "The Observatory". 2-3 paragraphs: deep-night observatory, content is what's lit, personality in atmosphere and seams, dark-first with a clean daybreak light mode, cosmic violet as a rationed accent. Key Characteristics bullets (cosmic-violet accent; light+dark; starfield/aurora atmosphere; llama-naut signature; content stays legible).
  - **## 2. Colors:** describe the violet Primary, the indigo-tinted neutrals, light vs dark. Named Rules: "The Rationed Violet Rule" (accent ≤ ~10% of a screen; links, one CTA, active/focus, small motifs) and "The Indigo-Tint Rule" (neutrals tinted toward hue 285, never pure gray/black/white).
  - **## 3. Typography:** unchanged from the shadcn/Inter system (Inter, the scale). Keep it brief; reference existing hierarchy.
  - **## 4. Elevation:** border-first + the new atmosphere layer: starfield + a single low-chroma radial aurora (NOT a linear sweep), absolutely-positioned `aria-hidden` backdrops. Named Rule: "The Aurora-Not-Sweep Rule".
  - **## 5. Components:** keep Button/Card/Nav, ADD a "Space motifs" subsection documenting Starfield, Aurora, ConstellationDivider, OrbitRings, Planet, LlamaNaut (decorative, aria-hidden, currentColor/token-driven), and the ThemeToggle.
  - **## 6. Do's and Don'ts:** carry the anti-slop guardrails: Do ration violet; Do keep content legible (AA both themes); Do gate motion behind reduced-motion; Do keep motifs aria-hidden. Don't use gradient text; Don't use the flat purple→magenta SaaS hero gradient; Don't add glassmorphism beyond the header; Don't let motifs reduce text contrast or block editor click targets.

- [ ] **Step 3: `.impeccable/design.json` sidecar.** Update `narrative.northStar` to "The Observatory", refresh `narrative.overview`/`keyCharacteristics`/`rules`/`dos`/`donts` to match the new DESIGN.md, update `colorMeta` to the cosmic-violet tokens (primary violet + indigo-tinted neutrals, with `darkValue`s from Task 1 Step 2), and add the space motifs to `components` (or note them). Keep `schemaVersion: 2`.

- [ ] **Step 4: Verify** — these are docs; run `node -e "JSON.parse(require('fs').readFileSync('.impeccable/design.json','utf8')); console.log('sidecar valid')"` and confirm it prints `sidecar valid`. Skim DESIGN.md/PRODUCT.md for the six headers / required sections.

- [ ] **Step 5: Commit** — `git add DESIGN.md PRODUCT.md .impeccable/design.json && git commit -m "docs: update design context for 'The Observatory' space theme"`

---

## Task 9: Final gate

**Files:** none (verification + a tidy commit if needed).

- [ ] **Step 1: Static gate** — `npx astro check` → 0 errors (the one pre-existing `frameborder` HINT is acceptable). `npx astro build` → success, all routes incl. `dist/404.html`.

- [ ] **Step 2: Render checks (dev server)**:
```bash
curl -s http://localhost:4321/ > /tmp/home.html
for s in "theme-toggle" "radial-gradient" "<circle" "ellipse" "Performance you can measure" "Start building today"; do printf '%s: ' "$s"; grep -qF "$s" /tmp/home.html && echo FOUND || echo MISSING; done
grep -c "Lost in space" dist/404.html
```
All FOUND; 404 count >=1. Investigate any MISSING.

- [ ] **Step 3: Reduced-motion + a11y sanity** — confirm `global.css` gates the twinkle animation behind `@media (prefers-reduced-motion: no-preference)` (so reduce = no animation), and that motif SVGs carry `aria-hidden="true"`: `grep -rL 'aria-hidden' src/components/space/*.astro` should print nothing (every motif file has it).

- [ ] **Step 4: React-free check** — `grep -rl "react-dom\|React.createElement" dist/_astro 2>/dev/null | head` → expect no output.

- [ ] **Step 5: Contrast spot-check (manual note)** — in both themes, body text (`--foreground` on `--background`), muted text (`--muted-foreground`), and accent links/buttons (`--primary`/`--primary-foreground`) should meet WCAG AA. If any pair is borderline, nudge the lightness in `global.css` and re-verify. Record the result in the commit message or report.

- [ ] **Step 6: Commit** (if any contrast nudges were made) — `git add -A && git commit -m "chore: contrast tuning for cosmic-violet themes"`. Otherwise no commit needed.

---

## Self-review notes (addressed)

- **Spec coverage:** tokens light+dark (T1), dark toggle React-free no-flash (T2), all 6 motifs (T3), chrome application (T4), hero atmosphere + mascot (T5), stats/CTA/dividers = "everywhere" but tasteful (T6), llama-naut 404 (T7), DESIGN.md/PRODUCT.md/sidecar incl. anti-reference reframe (T8), reduced-motion + aria-hidden + React-free + AA (T1/T9). ✔
- **Anti-slop:** Aurora is a single radial glow (no linear sweep); no gradient text anywhere; violet rationed; content text undecorated. Encoded in T5/T8/T9. ✔
- **Type/name consistency:** motif component filenames and import paths match across T3–T7; `star-twinkle` class (T1) matches the class used by `Starfield` (T3); `--d` custom prop set by Starfield matches the keyframe delay var (T1). ✔
- **No schema changes** → no Tina regeneration; verification is astro check/build + curl. ✔
