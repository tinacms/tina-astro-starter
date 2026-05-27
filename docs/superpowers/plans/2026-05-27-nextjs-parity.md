# Next.js-Parity (Astro Starter) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the TinaCMS Next.js starter's UI and block-based CMS to the Astro starter, staying React-free.

**Architecture:** Tailwind v4 + shadcn-style tokens replace the Bear Blog CSS. Pages become a Tina `blocks` object-list (8 block templates) rendered by a React-free `.astro` dispatcher inside the existing `page` visual-editing island. The blog is kept and restyled.

**Tech Stack:** Astro (static, React-free), `@tinacms/astro`, Tailwind CSS v4 (`@tailwindcss/vite`), `@tailwindcss/typography`, `tailwind-variants`, Inter (`@fontsource-variable/inter`), `astro-icon` + `@iconify-json/tabler`.

**Verification note (TDD adaptation):** This is a presentational Astro/CMS port with no unit-test harness, and adding one (container rendering) is out of scope. Each task's verification gate is therefore: `npx astro check` (types) and/or `npm run build:local` (Tina schema compile + Astro build) plus a dev-server render check. Treat a failing gate exactly like a failing test: do not proceed or commit until it passes.

**Reference (read-only):** `../tina-nextjs-starter/components/blocks/*.tsx` and `tina/collection/page.ts`. Each block task names its source file; consult it for structure, then use the translated `.astro` code given here.

**Simplifications from the Next.js starter (intentional, in scope):**
- Icon fields are a single Tabler icon-name **string** (not the Next.js icon-picker object). `Icon.astro` renders `astro-icon`.
- Video block is a responsive `<iframe>` embed (no `react-player`).
- No dark-mode toggle (tokens wired, light only). No entrance animation (static).

---

## File structure

Created:
- `src/components/ui/Button.astro`, `Card.astro`, `CardHeader.astro`, `CardContent.astro`, `Section.astro`, `Icon.astro`, `Avatar.astro`
- `src/components/blocks/Blocks.astro` (dispatcher)
- `src/components/blocks/{Hero,Features,Stats,Testimonial,Callout,Cta,Content,Video}.astro`
- `src/components/blocks/{hero,features,stats,testimonial,callout,cta,content,video}.template.ts`
- `tina/templates/section-background.ts` (shared section-background field)
- `src/lib/cn.ts` (class-merge helper)

Modified:
- `package.json` (deps), `astro.config.mjs` (Tailwind vite plugin), `src/styles/global.css` (tokens + Inter, drop Bear Blog/Atkinson)
- `tina/collections/page.ts` (blocks list), `src/components/islands/PageBody.astro` (render Blocks)
- `src/content/page/home.mdx` (blocks frontmatter)
- `src/components/Header.astro`, `src/components/Footer.astro`
- `src/pages/index.astro` (blog index, if it lists posts) and `src/layouts/BlogPost.astro`

Removed:
- `public/fonts/atkinson-*.woff` and the Atkinson `@font-face` rules.

---

## Task 1: Tailwind v4 + tokens + Inter foundation

**Files:**
- Modify: `package.json`, `astro.config.mjs`
- Modify: `src/styles/global.css`
- Create: `src/lib/cn.ts`

- [ ] **Step 1: Install dependencies**

```bash
npm install tailwindcss @tailwindcss/vite @tailwindcss/typography tailwind-variants clsx tailwind-merge @fontsource-variable/inter
npm install -D @astrojs/check typescript
```

- [ ] **Step 2: Add the Tailwind Vite plugin to `astro.config.mjs`**

Add the import and put `tailwindcss()` first in `vite.plugins`:

```js
import tailwindcss from '@tailwindcss/vite';
// ...
	vite: {
		plugins: [tailwindcss(), tinaAdminDevRedirect()],
		ssr: {
			noExternal: ['@tinacms/astro', '@tinacms/bridge'],
		},
		// ...rest unchanged
	}
```

- [ ] **Step 3: Create the class-merge helper `src/lib/cn.ts`**

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Replace `src/styles/global.css` with the token layer + Inter**

Replace the ENTIRE file with:

```css
@import 'tailwindcss';
@import '@fontsource-variable/inter';
@plugin '@tailwindcss/typography';

@theme inline {
	--font-sans: 'Inter Variable', system-ui, sans-serif;
	--radius-sm: calc(var(--radius) - 4px);
	--radius-md: calc(var(--radius) - 2px);
	--radius-lg: var(--radius);
	--radius-xl: calc(var(--radius) + 4px);
	--color-background: var(--background);
	--color-foreground: var(--foreground);
	--color-card: var(--card);
	--color-card-foreground: var(--card-foreground);
	--color-popover: var(--popover);
	--color-popover-foreground: var(--popover-foreground);
	--color-primary: var(--primary);
	--color-primary-foreground: var(--primary-foreground);
	--color-secondary: var(--secondary);
	--color-secondary-foreground: var(--secondary-foreground);
	--color-muted: var(--muted);
	--color-muted-foreground: var(--muted-foreground);
	--color-accent: var(--accent);
	--color-accent-foreground: var(--accent-foreground);
	--color-destructive: var(--destructive);
	--color-border: var(--border);
	--color-input: var(--input);
	--color-ring: var(--ring);
	--color-chart-1: var(--chart-1);
	--color-chart-2: var(--chart-2);
	--color-chart-3: var(--chart-3);
	--color-chart-4: var(--chart-4);
	--color-chart-5: var(--chart-5);
}

:root {
	--radius: 0.625rem;
	--background: oklch(1 0 0);
	--foreground: oklch(0.145 0 0);
	--card: oklch(1 0 0);
	--card-foreground: oklch(0.145 0 0);
	--popover: oklch(1 0 0);
	--popover-foreground: oklch(0.145 0 0);
	--primary: oklch(0.205 0 0);
	--primary-foreground: oklch(0.985 0 0);
	--secondary: oklch(0.97 0 0);
	--secondary-foreground: oklch(0.205 0 0);
	--muted: oklch(0.97 0 0);
	--muted-foreground: oklch(0.556 0 0);
	--accent: oklch(0.97 0 0);
	--accent-foreground: oklch(0.205 0 0);
	--destructive: oklch(0.577 0.245 27.325);
	--border: oklch(0.922 0 0);
	--input: oklch(0.922 0 0);
	--ring: oklch(0.708 0 0);
	--chart-1: oklch(0.646 0.222 41.116);
	--chart-2: oklch(0.6 0.118 184.704);
	--chart-3: oklch(0.398 0.07 227.392);
	--chart-4: oklch(0.828 0.189 84.429);
	--chart-5: oklch(0.769 0.188 70.08);
}

.dark {
	--background: oklch(0.145 0 0);
	--foreground: oklch(0.985 0 0);
	--card: oklch(0.205 0 0);
	--card-foreground: oklch(0.985 0 0);
	--popover: oklch(0.205 0 0);
	--popover-foreground: oklch(0.985 0 0);
	--primary: oklch(0.922 0 0);
	--primary-foreground: oklch(0.205 0 0);
	--secondary: oklch(0.269 0 0);
	--secondary-foreground: oklch(0.985 0 0);
	--muted: oklch(0.269 0 0);
	--muted-foreground: oklch(0.708 0 0);
	--accent: oklch(0.269 0 0);
	--accent-foreground: oklch(0.985 0 0);
	--destructive: oklch(0.704 0.191 22.216);
	--border: oklch(1 0 0 / 10%);
	--input: oklch(1 0 0 / 15%);
	--ring: oklch(0.556 0 0);
}

@layer base {
	* {
		border-color: var(--border);
	}
	body {
		background-color: var(--background);
		color: var(--foreground);
		font-family: var(--font-sans);
		margin: 0;
	}
	.bg-default {
		background-color: var(--background);
	}
}
```

- [ ] **Step 5: Verify the build gate passes**

Run: `npm run build:local`
Expected: Tina schema compiles and `astro build` completes with no errors. (Existing pages still render; `home.mdx` body still shows until Task 3.)

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json astro.config.mjs src/styles/global.css src/lib/cn.ts
git commit -m "feat: adopt Tailwind v4 + shadcn tokens + Inter"
```

---

## Task 2: shadcn-style UI primitives (React-free)

**Files:**
- Create: `src/components/ui/Button.astro`, `Card.astro`, `CardHeader.astro`, `CardContent.astro`, `Section.astro`, `Icon.astro`, `Avatar.astro`
- Create: `tina/templates/section-background.ts`

- [ ] **Step 1: `src/components/ui/Button.astro`**

Port of `../tina-nextjs-starter/components/ui/button.tsx`. Renders `<a>` when `href` is set, else `<button>`.

```astro
---
import { tv, type VariantProps } from 'tailwind-variants';
import { cn } from '../../lib/cn';

const button = tv({
	base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] shrink-0",
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
			destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90',
			outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
			secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
			ghost: 'hover:bg-accent hover:text-accent-foreground',
			link: 'text-primary underline-offset-4 hover:underline',
		},
		size: {
			default: 'h-9 px-4 py-2',
			sm: 'h-8 rounded-md gap-1.5 px-3',
			lg: 'h-10 rounded-md px-6',
			icon: 'size-9',
		},
	},
	defaultVariants: { variant: 'default', size: 'default' },
});

type Props = VariantProps<typeof button> & {
	href?: string;
	class?: string;
	[key: string]: any;
};

const { variant, size, href, class: className, ...rest } = Astro.props;
const classes = cn(button({ variant, size }), className);
---

{href ? (
	<a href={href} class={classes} {...rest}><slot /></a>
) : (
	<button class={classes} {...rest}><slot /></button>
)}
```

- [ ] **Step 2: `src/components/ui/Card.astro`, `CardHeader.astro`, `CardContent.astro`**

`Card.astro`:

```astro
---
import { cn } from '../../lib/cn';
const { class: className, ...rest } = Astro.props;
---
<div class={cn('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className)} {...rest}>
	<slot />
</div>
```

`CardHeader.astro`:

```astro
---
import { cn } from '../../lib/cn';
const { class: className, ...rest } = Astro.props;
---
<div class={cn('grid auto-rows-min items-start gap-1.5 px-6', className)} {...rest}>
	<slot />
</div>
```

`CardContent.astro`:

```astro
---
import { cn } from '../../lib/cn';
const { class: className, ...rest } = Astro.props;
---
<div class={cn('px-6', className)} {...rest}>
	<slot />
</div>
```

- [ ] **Step 3: `src/components/ui/Section.astro`** (port of `layout/section.tsx`)

```astro
---
import { cn } from '../../lib/cn';
const { background = 'bg-default', class: className, ...rest } = Astro.props;
---
<div class={background}>
	<section class={cn('py-12 mx-auto max-w-7xl px-6', className)} {...rest}>
		<slot />
	</section>
</div>
```

- [ ] **Step 4: `src/components/ui/Icon.astro`** (Tabler name string)

```astro
---
import { Icon as Iconify } from 'astro-icon/components';
const { name, class: className } = Astro.props;
const iconName = name ? `tabler:${name}` : null;
---
{iconName && <Iconify name={iconName} class={className ?? 'size-5'} />}
```

- [ ] **Step 5: `src/components/ui/Avatar.astro`** (image + initials fallback)

```astro
---
const { src, alt = '', fallback = '', class: className } = Astro.props;
---
<span class={`relative flex size-9 shrink-0 overflow-hidden rounded-full bg-muted ${className ?? ''}`}>
	{src
		? <img src={src} alt={alt} width="120" height="120" loading="lazy" class="aspect-square size-full object-cover" />
		: <span class="flex size-full items-center justify-center text-xs font-medium text-muted-foreground">{fallback}</span>}
</span>
```

- [ ] **Step 6: `tina/templates/section-background.ts`** (shared field; port of `sectionBlockSchemaField`)

```ts
export const tailwindBackgroundOptions = [
	{ label: 'Default', value: 'bg-default' },
	{ label: 'White', value: 'bg-white/80' },
	{ label: 'Gray', value: 'bg-gray-50/80' },
	{ label: 'Zinc', value: 'bg-zinc-50' },
	{ label: 'Black', value: 'bg-black/80' },
	{ label: 'Red', value: 'bg-red-50/80' },
	{ label: 'Orange', value: 'bg-orange-50/80' },
	{ label: 'Yellow', value: 'bg-yellow-50/80' },
	{ label: 'Green', value: 'bg-green-50/80' },
	{ label: 'Blue', value: 'bg-blue-50/80' },
	{ label: 'Indigo', value: 'bg-indigo-50/80' },
	{ label: 'Purple', value: 'bg-purple-50/80' },
	{ label: 'Pink', value: 'bg-pink-50/80' },
];

export const sectionBackgroundField = {
	type: 'string',
	label: 'Background',
	name: 'background',
	options: tailwindBackgroundOptions,
} as const;
```

- [ ] **Step 7: Verify**

Run: `npx astro check`
Expected: 0 errors (unused components are fine; no type errors).

- [ ] **Step 8: Commit**

```bash
git add src/components/ui tina/templates/section-background.ts
git commit -m "feat: add React-free shadcn UI primitives"
```

---

## Task 3: Page block schema + dispatcher + pipeline proof (Content + CTA)

This task changes the page content model and proves the full pipeline (schema → regenerate types → dispatcher → island → visual editing) with two simple blocks before adding the rest.

**Files:**
- Create: `src/components/blocks/content.template.ts`, `cta.template.ts`
- Create: `src/components/blocks/Content.astro`, `Cta.astro`
- Create: `src/components/blocks/Blocks.astro`
- Modify: `tina/collections/page.ts`, `src/components/islands/PageBody.astro`, `src/content/page/home.mdx`

- [ ] **Step 1: `src/components/blocks/content.template.ts`**

```ts
import type { Template } from 'tinacms';
import { sectionBackgroundField } from '../../../tina/templates/section-background';

export const contentBlockSchema: Template = {
	name: 'content',
	label: 'Content',
	fields: [
		sectionBackgroundField as any,
		{ type: 'rich-text', label: 'Body', name: 'body' },
	],
	ui: {
		defaultItem: {
			body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.',
		},
	},
};
```

- [ ] **Step 2: `src/components/blocks/cta.template.ts`**

```ts
import type { Template } from 'tinacms';

export const ctaBlockSchema: Template = {
	name: 'cta',
	label: 'CTA',
	fields: [
		{ type: 'string', label: 'Title', name: 'title' },
		{ type: 'string', label: 'Description', name: 'description', ui: { component: 'textarea' } },
		{
			type: 'object', label: 'Actions', name: 'actions', list: true,
			ui: {
				defaultItem: { label: 'Get Started', type: 'button', link: '/' },
				itemProps: (item: any) => ({ label: item.label }),
			},
			fields: [
				{ type: 'string', label: 'Label', name: 'label' },
				{ type: 'string', label: 'Type', name: 'type', options: [
					{ label: 'Button', value: 'button' }, { label: 'Link', value: 'link' } ] },
				{ type: 'string', label: 'Icon (Tabler name)', name: 'icon' },
				{ type: 'string', label: 'Link', name: 'link' },
			],
		},
	],
	ui: {
		defaultItem: {
			title: 'Start Building',
			description: 'Get started with TinaCMS today and take your content management to the next level.',
			actions: [
				{ label: 'Get Started', type: 'button', link: '/' },
				{ label: 'Book Demo', type: 'link', link: '/' },
			],
		},
	},
};
```

- [ ] **Step 3: `src/components/blocks/Content.astro`** (port of `content.tsx`, reuses Tina's Astro markdown renderer)

```astro
---
import TinaMarkdown from '@tinacms/astro/TinaMarkdown.astro';
import Section from '../ui/Section.astro';
const { data } = Astro.props;
---
<Section background={data.background} class="prose prose-lg max-w-none">
	<div class="mx-auto max-w-3xl">
		<TinaMarkdown content={data.body} />
	</div>
</Section>
```

- [ ] **Step 4: `src/components/blocks/Cta.astro`** (port of `call-to-action.tsx`)

```astro
---
import Section from '../ui/Section.astro';
import Button from '../ui/Button.astro';
import Icon from '../ui/Icon.astro';
const { data } = Astro.props;
const actions = (data.actions ?? []).filter(Boolean);
---
<Section>
	<div class="text-center">
		<h2 class="text-balance text-4xl font-semibold lg:text-5xl">{data.title}</h2>
		<p class="mt-4 text-muted-foreground">{data.description}</p>
		<div class="mt-12 flex flex-wrap justify-center gap-4">
			{actions.map((action: any) => (
				<div class="bg-foreground/10 rounded-2xl border p-0.5">
					<Button href={action.link} size="lg" variant={action.type === 'link' ? 'ghost' : 'default'} class="rounded-xl px-5 text-base">
						{action.icon && <Icon name={action.icon} class="size-4" />}
						<span class="text-nowrap">{action.label}</span>
					</Button>
				</div>
			))}
		</div>
	</div>
</Section>
```

- [ ] **Step 5: `src/components/blocks/Blocks.astro`** (dispatcher with per-block `tinaField`)

```astro
---
import { tinaField } from '@tinacms/astro/tina-field';
import Content from './Content.astro';
import Cta from './Cta.astro';

const componentMap: Record<string, any> = {
	PageBlocksContent: Content,
	PageBlocksCta: Cta,
};

const { data } = Astro.props;
const blocks = (data?.blocks ?? []).filter(Boolean);
---
{blocks.map((block: any, i: number) => {
	const Component = componentMap[block.__typename];
	if (!Component) return null;
	return (
		<div data-tina-field={tinaField(block)}>
			<Component data={block} />
		</div>
	);
})}
```

- [ ] **Step 6: Rewrite `tina/collections/page.ts`** to a blocks list

```ts
import type { Collection } from 'tinacms';
import { heroBlockSchema } from '../../src/components/blocks/hero.template';
import { featuresBlockSchema } from '../../src/components/blocks/features.template';
import { statsBlockSchema } from '../../src/components/blocks/stats.template';
import { ctaBlockSchema } from '../../src/components/blocks/cta.template';
import { testimonialBlockSchema } from '../../src/components/blocks/testimonial.template';
import { calloutBlockSchema } from '../../src/components/blocks/callout.template';
import { contentBlockSchema } from '../../src/components/blocks/content.template';
import { videoBlockSchema } from '../../src/components/blocks/video.template';

export const PageCollection: Collection = {
	name: 'page',
	label: 'Pages',
	path: 'src/content/page',
	format: 'mdx',
	ui: {
		router: ({ document }) => `/${document._sys.filename}`,
	},
	fields: [
		{
			type: 'object',
			list: true,
			name: 'blocks',
			label: 'Sections',
			ui: { visualSelector: true },
			templates: [
				heroBlockSchema as any,
				calloutBlockSchema as any,
				featuresBlockSchema as any,
				statsBlockSchema as any,
				ctaBlockSchema as any,
				contentBlockSchema as any,
				testimonialBlockSchema as any,
				videoBlockSchema as any,
			],
		},
	],
};
```

> NOTE: This imports all 8 templates. Create empty-but-valid stub templates for the not-yet-built ones now so the schema compiles, OR temporarily comment out the six unbuilt imports/entries and uncomment them in their tasks. Choose stubbing: add minimal `export const <name>BlockSchema = { name, label, fields: [{type:'string',name:'title',label:'Title'}] }` files for hero/features/stats/testimonial/callout/video, to be fully replaced in their tasks.

- [ ] **Step 7: Create the six stub templates** so the schema compiles

For each of `hero, features, stats, testimonial, callout, video`, create `src/components/blocks/<name>.template.ts`:

```ts
import type { Template } from 'tinacms';
export const <NAME>BlockSchema: Template = {
	name: '<name>',
	label: '<Label>',
	fields: [{ type: 'string', name: 'title', label: 'Title' }],
};
```

(Use the exported names exactly: `heroBlockSchema`, `featuresBlockSchema`, `statsBlockSchema`, `testimonialBlockSchema`, `calloutBlockSchema`, `videoBlockSchema`.)

- [ ] **Step 8: Update `src/components/islands/PageBody.astro`** to render Blocks

```astro
---
import Blocks from '../blocks/Blocks.astro';
const { data } = Astro.props;
---
{data && <Blocks data={data} />}
```

- [ ] **Step 9: Rewrite `src/content/page/home.mdx`** to blocks frontmatter (Content + CTA for now)

```mdx
---
blocks:
  - _template: content
    body: |
      # Welcome to TinaCMS + Astro

      This starter is composed from editable blocks. Open the editor and try it.
  - _template: cta
    title: Start Building
    description: Get started with TinaCMS today.
    actions:
      - label: Get Started
        type: button
        link: /
---
```

- [ ] **Step 10: Regenerate the Tina schema/types and build**

Run: `npm run build:local`
Expected: `tinacms build` regenerates `tina/__generated__/types.ts` (now exposing `PageBlocksContent`, `PageBlocksCta`, etc.) and `astro build` succeeds. The home page renders the Content + CTA blocks.

- [ ] **Step 11: Dev render + visual-editing check**

Run: `npm run dev`, open `http://localhost:4321/` (blocks render) and `http://localhost:4321/admin/index.html#/~` → edit the home page → confirm the `visualSelector` lists blocks and editing the CTA title updates in context. Stop the dev server.

- [ ] **Step 12: Commit**

```bash
git add tina/collections/page.ts src/components/blocks src/components/islands/PageBody.astro src/content/page/home.mdx tina/__generated__
git commit -m "feat: block-based page schema + React-free dispatcher (content, cta)"
```

---

## Task 4: Hero block

**Files:**
- Replace stub: `src/components/blocks/hero.template.ts`
- Create: `src/components/blocks/Hero.astro`
- Modify: `src/components/blocks/Blocks.astro` (register `PageBlocksHero`)

Reference: `../tina-nextjs-starter/components/blocks/hero.tsx`.

- [ ] **Step 1: `src/components/blocks/hero.template.ts`**

```ts
import type { Template } from 'tinacms';
import { sectionBackgroundField } from '../../../tina/templates/section-background';

export const heroBlockSchema: Template = {
	name: 'hero',
	label: 'Hero',
	fields: [
		sectionBackgroundField as any,
		{ type: 'string', label: 'Headline', name: 'headline' },
		{ type: 'string', label: 'Tagline', name: 'tagline' },
		{
			type: 'object', label: 'Actions', name: 'actions', list: true,
			ui: { defaultItem: { label: 'Get Started', type: 'button', link: '/' }, itemProps: (i: any) => ({ label: i.label }) },
			fields: [
				{ type: 'string', label: 'Label', name: 'label' },
				{ type: 'string', label: 'Type', name: 'type', options: [{ label: 'Button', value: 'button' }, { label: 'Link', value: 'link' }] },
				{ type: 'string', label: 'Icon (Tabler name)', name: 'icon' },
				{ type: 'string', label: 'Link', name: 'link' },
			],
		},
		{
			type: 'object', label: 'Image', name: 'image',
			fields: [
				{ name: 'src', label: 'Image Source', type: 'image' },
				{ name: 'alt', label: 'Alt Text', type: 'string' },
			],
		},
	],
	ui: {
		defaultItem: {
			tagline: "Here's some text above the other text",
			headline: 'Astro + TinaCMS, ready to ship',
		},
	},
};
```

- [ ] **Step 2: `src/components/blocks/Hero.astro`** (static; no framer-motion)

```astro
---
import Section from '../ui/Section.astro';
import Button from '../ui/Button.astro';
import Icon from '../ui/Icon.astro';
const { data } = Astro.props;
const actions = (data.actions ?? []).filter(Boolean);
---
<Section background={data.background}>
	<div class="text-center sm:mx-auto lg:mr-auto">
		{data.headline && <h1 class="mt-8 text-balance text-6xl md:text-7xl xl:text-[5.25rem] font-semibold tracking-tight">{data.headline}</h1>}
		{data.tagline && <p class="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">{data.tagline}</p>}
		{actions.length > 0 && (
			<div class="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
				{actions.map((action: any) => (
					<div class="bg-foreground/10 rounded-2xl border p-0.5">
						<Button href={action.link} size="lg" variant={action.type === 'link' ? 'ghost' : 'default'} class="rounded-xl px-5 text-base">
							{action.icon && <Icon name={action.icon} class="size-4" />}
							<span class="text-nowrap">{action.label}</span>
						</Button>
					</div>
				))}
			</div>
		)}
	</div>
	{data.image?.src && (
		<div class="relative mt-8 overflow-hidden px-2 sm:mt-12 md:mt-20">
			<div class="bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg ring-1 ring-background">
				<img src={data.image.src} alt={data.image.alt ?? ''} width="3000" height="1600" class="rounded-2xl border border-border/25 aspect-[15/8] object-cover w-full h-auto" />
			</div>
		</div>
	)}
</Section>
```

- [ ] **Step 3: Register in `Blocks.astro`**

Add the import and map entry:
```astro
import Hero from './Hero.astro';
// in componentMap:
PageBlocksHero: Hero,
```

- [ ] **Step 4: Verify**

Run: `npm run build:local`
Expected: schema compiles (`PageBlocksHero` generated), build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/blocks/hero.template.ts src/components/blocks/Hero.astro src/components/blocks/Blocks.astro tina/__generated__
git commit -m "feat: hero block"
```

---

## Task 5: Features block (+ CardDecorator)

**Files:**
- Replace stub: `src/components/blocks/features.template.ts`
- Create: `src/components/blocks/Features.astro`
- Modify: `Blocks.astro` (register `PageBlocksFeatures`)

Reference: `../tina-nextjs-starter/components/blocks/features.tsx`.

- [ ] **Step 1: `features.template.ts`**

```ts
import type { Template } from 'tinacms';
import { sectionBackgroundField } from '../../../tina/templates/section-background';

export const featuresBlockSchema: Template = {
	name: 'features',
	label: 'Features',
	fields: [
		sectionBackgroundField as any,
		{ type: 'string', label: 'Title', name: 'title' },
		{ type: 'string', label: 'Description', name: 'description' },
		{
			type: 'object', label: 'Feature Items', name: 'items', list: true,
			ui: { itemProps: (i: any) => ({ label: i?.title }), defaultItem: { title: "Here's a feature", text: 'Describe it here.' } },
			fields: [
				{ type: 'string', label: 'Icon (Tabler name)', name: 'icon' },
				{ type: 'string', label: 'Title', name: 'title' },
				{ type: 'rich-text', label: 'Text', name: 'text' },
			],
		},
	],
	ui: {
		defaultItem: {
			title: 'Built to cover your needs',
			description: 'Everything you need to build content-driven sites.',
			items: [
				{ title: 'Visual editing', text: 'Edit in context.', icon: 'edit' },
				{ title: 'Composable blocks', text: 'Build pages from blocks.', icon: 'layout-grid' },
				{ title: 'Git-backed', text: 'Content lives in your repo.', icon: 'brand-git' },
			],
		},
	},
};
```

- [ ] **Step 2: `Features.astro`** (single Card split into a divide-x grid, with CardDecorator)

```astro
---
import TinaMarkdown from '@tinacms/astro/TinaMarkdown.astro';
import Section from '../ui/Section.astro';
import Card from '../ui/Card.astro';
import CardHeader from '../ui/CardHeader.astro';
import CardContent from '../ui/CardContent.astro';
import Icon from '../ui/Icon.astro';
const { data } = Astro.props;
const items = (data.items ?? []).filter(Boolean);
---
<Section background={data.background}>
	<div class="mx-auto max-w-5xl px-6">
		<div class="text-center">
			<h2 class="text-balance text-4xl font-semibold lg:text-5xl">{data.title}</h2>
			<p class="mt-4 text-muted-foreground">{data.description}</p>
		</div>
		<Card class="mx-auto mt-8 grid max-w-sm divide-y overflow-hidden md:mt-16 md:max-w-full md:grid-cols-3 md:divide-x md:divide-y-0 *:text-center">
			{items.map((item: any) => (
				<div>
					<CardHeader class="pb-3">
						<div class="relative mx-auto size-36">
							<div aria-hidden class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
							<div aria-hidden class="absolute inset-0 bg-radial from-transparent to-background to-75%"></div>
							<div class="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
								{item.icon && <Icon name={item.icon} class="size-6" />}
							</div>
						</div>
						<h3 class="mt-6 font-medium">{item.title}</h3>
					</CardHeader>
					<CardContent class="text-sm pb-8 text-muted-foreground">
						<TinaMarkdown content={item.text} />
					</CardContent>
				</div>
			))}
		</Card>
	</div>
</Section>
```

- [ ] **Step 3: Register `PageBlocksFeatures: Features` in `Blocks.astro`** (import + map entry).

- [ ] **Step 4: Verify** — Run: `npm run build:local` → Expected: success, `PageBlocksFeatures` generated.

- [ ] **Step 5: Commit**

```bash
git add src/components/blocks/features.template.ts src/components/blocks/Features.astro src/components/blocks/Blocks.astro tina/__generated__
git commit -m "feat: features block"
```

---

## Task 6: Stats block

**Files:** replace stub `stats.template.ts`, create `Stats.astro`, register in `Blocks.astro`. Reference: `blocks/stats.tsx`.

- [ ] **Step 1: `stats.template.ts`**

```ts
import type { Template } from 'tinacms';
import { sectionBackgroundField } from '../../../tina/templates/section-background';

export const statsBlockSchema: Template = {
	name: 'stats',
	label: 'Stats',
	fields: [
		sectionBackgroundField as any,
		{ type: 'string', label: 'Title', name: 'title' },
		{ type: 'string', label: 'Description', name: 'description' },
		{
			type: 'object', label: 'Stats', name: 'stats', list: true,
			ui: { defaultItem: { stat: '12K', type: 'Stars on GitHub' }, itemProps: (i: any) => ({ label: `${i.stat} ${i.type}` }) },
			fields: [
				{ type: 'string', label: 'Stat', name: 'stat' },
				{ type: 'string', label: 'Type', name: 'type' },
			],
		},
	],
	ui: {
		defaultItem: {
			title: 'TinaCMS by the numbers',
			description: 'An open-source, Git-backed CMS.',
			stats: [ { stat: '12K', type: 'Stars on GitHub' }, { stat: '11K', type: 'Active Users' }, { stat: '22K', type: 'Powered Apps' } ],
		},
	},
};
```

- [ ] **Step 2: `Stats.astro`**

```astro
---
import Section from '../ui/Section.astro';
const { data } = Astro.props;
const stats = (data.stats ?? []).filter(Boolean);
---
<Section background={data.background}>
	<div class="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
		<div class="relative z-10 mx-auto max-w-xl space-y-6 text-center">
			<h2 class="text-4xl font-medium lg:text-5xl">{data.title}</h2>
			<p class="text-muted-foreground">{data.description}</p>
		</div>
		<div class="grid divide-y *:text-center md:grid-cols-3 md:divide-x md:divide-y-0">
			{stats.map((stat: any) => (
				<div class="space-y-4 py-4">
					<div class="text-5xl font-bold">{stat.stat}</div>
					<p class="text-muted-foreground">{stat.type}</p>
				</div>
			))}
		</div>
	</div>
</Section>
```

- [ ] **Step 3: Register `PageBlocksStats: Stats` in `Blocks.astro`.**
- [ ] **Step 4: Verify** — `npm run build:local` → success.
- [ ] **Step 5: Commit** — `git commit -m "feat: stats block"` (add the three files + `tina/__generated__`).

---

## Task 7: Testimonial block

**Files:** replace stub `testimonial.template.ts`, create `Testimonial.astro`, register in `Blocks.astro`. Reference: `blocks/testimonial.tsx`.

- [ ] **Step 1: `testimonial.template.ts`**

```ts
import type { Template } from 'tinacms';
import { sectionBackgroundField } from '../../../tina/templates/section-background';

export const testimonialBlockSchema: Template = {
	name: 'testimonial',
	label: 'Testimonial',
	fields: [
		sectionBackgroundField as any,
		{ type: 'string', label: 'Title', name: 'title' },
		{ type: 'string', label: 'Description', name: 'description', ui: { component: 'textarea' } },
		{
			type: 'object', list: true, label: 'Testimonials', name: 'testimonials',
			ui: { defaultItem: { quote: 'There are only two hard things in Computer Science: cache invalidation and naming things.', author: 'Phil Karlton' }, itemProps: (i: any) => ({ label: `${i.quote} - ${i.author}` }) },
			fields: [
				{ type: 'string', label: 'Quote', name: 'quote', ui: { component: 'textarea' } },
				{ type: 'string', label: 'Author', name: 'author' },
				{ type: 'string', label: 'Role', name: 'role' },
				{ type: 'image', label: 'Avatar', name: 'avatar' },
			],
		},
	],
	ui: {
		defaultItem: {
			title: 'Loved by developers',
			testimonials: [ { quote: 'There are only two hard things in Computer Science: cache invalidation and naming things.', author: 'Phil Karlton' } ],
		},
	},
};
```

- [ ] **Step 2: `Testimonial.astro`** (CSS columns masonry + Avatar)

```astro
---
import Section from '../ui/Section.astro';
import Card from '../ui/Card.astro';
import CardContent from '../ui/CardContent.astro';
import Avatar from '../ui/Avatar.astro';
const { data } = Astro.props;
const testimonials = (data.testimonials ?? []).filter(Boolean);
const initials = (name = '') => name.split(' ').map((w: string) => w[0]).join('');
---
<Section background={data.background}>
	<div class="text-center">
		<h2 class="text-3xl font-semibold">{data.title}</h2>
		<p class="mt-6 text-muted-foreground">{data.description}</p>
	</div>
	<div class="mt-8 [column-width:300px] [column-gap:1.5rem] md:mt-12">
		{testimonials.map((t: any) => (
			<Card class="mb-6 break-inside-avoid">
				<CardContent class="grid grid-cols-[auto_1fr] gap-3 pt-6">
					<Avatar src={t.avatar} alt={t.author} fallback={initials(t.author)} />
					<div>
						<h3 class="font-medium">{t.author}</h3>
						<span class="text-muted-foreground block text-sm tracking-wide">{t.role}</span>
						<blockquote class="mt-3"><p class="text-muted-foreground">{t.quote}</p></blockquote>
					</div>
				</CardContent>
			</Card>
		))}
	</div>
</Section>
```

- [ ] **Step 3: Register `PageBlocksTestimonial: Testimonial`.**
- [ ] **Step 4: Verify** — `npm run build:local` → success.
- [ ] **Step 5: Commit** — `git commit -m "feat: testimonial block"`.

---

## Task 8: Callout block

**Files:** replace stub `callout.template.ts`, create `Callout.astro`, register. Reference: `blocks/callout.tsx` (static port, Tabler arrow).

- [ ] **Step 1: `callout.template.ts`**

```ts
import type { Template } from 'tinacms';
import { sectionBackgroundField } from '../../../tina/templates/section-background';

export const calloutBlockSchema: Template = {
	name: 'callout',
	label: 'Callout',
	fields: [
		sectionBackgroundField as any,
		{ type: 'string', label: 'Text', name: 'text' },
		{ type: 'string', label: 'Url', name: 'url' },
	],
	ui: {
		defaultItem: { url: 'https://tina.io/editorial-workflow', text: 'Support for live editing and editorial workflow' },
	},
};
```

- [ ] **Step 2: `Callout.astro`**

```astro
---
import Section from '../ui/Section.astro';
import Icon from '../ui/Icon.astro';
const { data } = Astro.props;
---
<Section background={data.background} class="py-6">
	<a href={data.url} class="hover:bg-background bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md transition-colors duration-300">
		<span class="text-foreground text-sm">{data.text}</span>
		<span class="block h-4 w-0.5 border-l bg-background"></span>
		<div class="bg-background size-6 flex items-center justify-center rounded-full">
			<Icon name="arrow-right" class="size-3" />
		</div>
	</a>
</Section>
```

- [ ] **Step 3: Register `PageBlocksCallout: Callout`.**
- [ ] **Step 4: Verify** — `npm run build:local` → success.
- [ ] **Step 5: Commit** — `git commit -m "feat: callout block"`.

---

## Task 9: Video block

**Files:** replace stub `video.template.ts`, create `Video.astro`, register. Reference: `blocks/video.tsx` (ported to a responsive iframe; no react-player).

- [ ] **Step 1: `video.template.ts`**

```ts
import type { Template } from 'tinacms';
import { sectionBackgroundField } from '../../../tina/templates/section-background';

export const videoBlockSchema: Template = {
	name: 'video',
	label: 'Video',
	fields: [
		sectionBackgroundField as any,
		{ type: 'string', label: 'Url (YouTube/Vimeo embed or watch URL)', name: 'url' },
		{ type: 'boolean', label: 'Auto Play', name: 'autoPlay' },
		{ type: 'boolean', label: 'Loop', name: 'loop' },
	],
	ui: { defaultItem: { url: 'https://www.youtube.com/watch?v=j8egYW7Jpgk' } },
};
```

- [ ] **Step 2: `Video.astro`** (normalize YouTube/Vimeo URLs to an embed src)

```astro
---
import Section from '../ui/Section.astro';
const { data } = Astro.props;

function toEmbed(url = '') {
	const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
	if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
	const vimeo = url.match(/vimeo\.com\/(\d+)/);
	if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
	return url;
}
const src = data.url ? toEmbed(data.url) : null;
const params = new URLSearchParams();
if (data.autoPlay) { params.set('autoplay', '1'); params.set('mute', '1'); }
if (data.loop) params.set('loop', '1');
const qs = params.toString();
---
{src && (
	<Section background={data.background}>
		<div class="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border">
			<iframe class="absolute inset-0 h-full w-full" src={qs ? `${src}?${qs}` : src} title="Video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
	</Section>
)}
```

- [ ] **Step 3: Register `PageBlocksVideo: Video`.**
- [ ] **Step 4: Verify** — `npm run build:local` → success.
- [ ] **Step 5: Commit** — `git commit -m "feat: video block"`.

---

## Task 10: Seed the full home page

**Files:** Modify `src/content/page/home.mdx`.

- [ ] **Step 1: Rewrite `home.mdx`** to exercise all 8 blocks with credible copy

```mdx
---
blocks:
  - _template: hero
    headline: Build content-driven sites with Astro + TinaCMS
    tagline: A polished, Git-backed starter with visual editing and composable blocks.
    actions:
      - label: Get Started
        type: button
        icon: rocket
        link: /
      - label: Read the docs
        type: link
        link: https://tina.io/docs
  - _template: callout
    text: Now with React-free visual editing
    url: https://tina.io
  - _template: features
    title: Everything you need
    description: Composable, Git-backed, and editable in context.
    items:
      - title: Visual editing
        icon: edit
        text: Click any field and edit it in place.
      - title: Composable blocks
        icon: layout-grid
        text: Assemble pages from reusable sections.
      - title: Git-backed
        icon: brand-git
        text: Content lives in your repository.
  - _template: stats
    title: TinaCMS by the numbers
    description: An open-source headless CMS developers trust.
    stats:
      - stat: 12K
        type: Stars on GitHub
      - stat: 11K
        type: Active Users
      - stat: 22K
        type: Powered Apps
  - _template: testimonial
    title: Loved by developers
    testimonials:
      - quote: The visual editing experience is unmatched.
        author: Jane Doe
        role: Frontend Engineer
  - _template: cta
    title: Start building today
    description: Ship a polished, editable site in minutes.
    actions:
      - label: Get Started
        type: button
        link: /
---
```

- [ ] **Step 2: Verify** — Run: `npm run build:local` then `npm run dev`, open `/`, confirm every block renders and visual editing still works. Stop dev server.
- [ ] **Step 3: Commit** — `git add src/content/page/home.mdx && git commit -m "feat: seed home page with all blocks"`.

---

## Task 11: Header glass nav

**Files:** Modify `src/components/Header.astro`. Keep the `config` prop and `tinaField` data attributes; restyle only.

- [ ] **Step 1: Replace the `<style>` + markup** with a translucent fixed nav (Tailwind). Keep logo (`seo.logo`/`seo.title`), `nav` links (`HeaderLink`), and `contactLinks`.

```astro
<header class="fixed top-0 z-20 w-full border-b bg-background/50 backdrop-blur-xl">
	<nav class="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
		<a href="/" class="flex items-center gap-2 font-semibold">
			{seo?.logo && <img src={seo.logo} alt="Logo" width="32" height="32" data-tina-field={tinaField(seo, 'logo')} />}
			<span data-tina-field={seo ? tinaField(seo, 'title') : undefined}>{seo?.title}</span>
		</a>
		<div class="hidden items-center gap-8 text-sm lg:flex">
			{nav.map((item) => (
				<a href={item.link} class="text-muted-foreground transition-colors hover:text-foreground" data-tina-field={tinaField(item, 'title')}>{item.title}</a>
			))}
		</div>
		<div class="flex items-center gap-3">
			{contactLinks.map((link) => (
				<IconLink title={link.title} link={link.link} icon={link.icon} data-tina-field={tinaField(link, 'title')} />
			))}
		</div>
	</nav>
</header>
```

Remove the old `<style>` block. Keep the frontmatter imports (`HeaderLink` may be dropped if unused; if dropped, remove its import to avoid an unused-import check error).

- [ ] **Step 2: Offset content for the fixed header.** In `src/layouts/Base.astro`, add `class="pt-20"` to the `<slot />` wrapper or the first content element. Simplest: wrap `<slot />` in `<main class="pt-20"><slot /></main>` only if not already inside a `main`; the page islands already provide `main`/`article`. Instead add top padding to the body via a utility: in `global.css` base layer add `body { padding-top: 5rem; }`. Pick the `global.css` approach to avoid double-`main`.

Update Task 1's base layer accordingly (add `padding-top: 5rem;` to `body`). If Task 1 is already committed, add it now in `global.css` and include it in this commit.

- [ ] **Step 3: Verify** — `npm run build:local` and dev render: header is fixed, translucent, content not hidden beneath it.
- [ ] **Step 4: Commit** — `git add src/components/Header.astro src/styles/global.css && git commit -m "feat: glass header nav"`.

---

## Task 12: Footer restyle

**Files:** Modify `src/components/Footer.astro`. Keep the "Powered by TinaCMS" banner and copyright; restyle with tokens.

- [ ] **Step 1: Restyle the copyright footer** (replace its `<style>` with token classes); keep the existing `.tina-footer` banner gradient block as-is (it is on-brand and intentional).

```astro
<footer class="border-t bg-background py-12 text-center text-sm text-muted-foreground">
	&copy; {today.getFullYear()}
	<span data-tina-field={seo ? tinaField(seo, 'siteOwner') : undefined}>{seo?.siteOwner}</span>. All rights reserved.
	<div class="mt-4 flex justify-center gap-4">
		{contactLinks.map((link) => (
			<IconLink title={link.title} link={link.link} icon={link.icon} data-tina-field={tinaField(link, 'title')} />
		))}
	</div>
</footer>
```

Keep the `.tina-footer` banner markup + its scoped `<style>` above the footer.

- [ ] **Step 2: Verify** — `npm run build:local` → success; footer renders.
- [ ] **Step 3: Commit** — `git add src/components/Footer.astro && git commit -m "feat: restyle footer"`.

---

## Task 13: Blog index + post restyle

**Files:** Modify `src/layouts/BlogPost.astro` and the blog index page (`src/pages/index.astro` if it lists posts, or the relevant blog list page). Inspect first to confirm which file lists posts.

- [ ] **Step 1: Inspect** — `grep -rl "getBlog\|getCollection\|blog" src/pages src/layouts` to find the blog index and post layout. Confirm the post slug page (`src/pages/[...slug].astro`) and `BlogPost.astro`.

- [ ] **Step 2: Restyle `BlogPost.astro`** to token-based prose

```astro
<style>
	main { width: 100%; }
	.prose { width: 100%; max-width: 48rem; margin: auto; padding: 1.5rem; }
	.title { text-align: center; padding: 2rem 0 1rem; }
	.date { color: var(--muted-foreground); margin-bottom: 0.5rem; }
</style>
```

Replace the article body wrapper class with `class="prose prose-lg mx-auto"` so `@tailwindcss/typography` styles the markdown. Keep the hero image with `rounded-2xl border shadow-lg`.

- [ ] **Step 3: Restyle the blog index** — render the post list as a responsive grid of `Card`s (title, date, excerpt) using the `ui/Card` primitives, `max-w-5xl mx-auto`, `grid gap-6 md:grid-cols-2`.

- [ ] **Step 4: Verify** — `npm run build:local`; dev render of the blog index and one post.
- [ ] **Step 5: Commit** — `git commit -m "feat: restyle blog index and post"`.

---

## Task 14: Cleanup + final gate

**Files:** Remove Atkinson font files; update README admin/run notes if needed.

- [ ] **Step 1: Remove Atkinson font assets**

```bash
git rm public/fonts/atkinson-regular.woff public/fonts/atkinson-bold.woff
```
Confirm no remaining `Atkinson` references: `grep -rn "Atkinson\|atkinson" src public` → expect none (font is now Inter via `global.css`).

- [ ] **Step 2: Grep for leftover Bear Blog / vanilla styles** that conflict (`grep -rn "var(--gray\|--accent\b\|gray-gradient" src`) and remove any now-dead CSS.

- [ ] **Step 3: Full verification gate**

Run: `npx astro check` → 0 errors.
Run: `npm run build:local` → Tina schema compiles + Astro build succeeds.
Run: `npm run dev` → home renders all blocks, blog renders, visual editing refreshes islands, no console errors, no React in network tab. Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove Atkinson fonts and dead styles"
```

---

## Self-review notes (addressed)

- **Spec coverage:** Tailwind+tokens (T1), primitives (T2), all 8 blocks + schema + dispatcher + visual editing (T3-T9), home content (T10), header (T11), footer (T12), blog kept+restyled (T13), Inter switch + cleanup (T1/T14), light-only/static honored throughout. ✔
- **Type consistency:** dispatcher maps Tina `__typename` values (`PageBlocksHero`, `PageBlocksFeatures`, `PageBlocksStats`, `PageBlocksTestimonial`, `PageBlocksCallout`, `PageBlocksCta`, `PageBlocksContent`, `PageBlocksVideo`); template exports are `<name>BlockSchema` and imported under those exact names in `page.ts`. ✔
- **Schema-compile ordering:** Task 3 introduces stub templates for the six later blocks so `page.ts` compiles before those blocks are built; each later task replaces its stub. ✔
- **Known check-sensitive spots:** remove unused imports when restyling Header/Footer; regenerate `tina/__generated__` (committed) after each schema change via `npm run build:local`.
