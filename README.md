This is a [Tina CMS](https://tina.io/) starter project.

# Astro + TinaCMS Starter

A starter for Astro with a Tailwind block builder, light/dark theming, and React-free visual editing.

> [!IMPORTANT]
> This starter uses the new **experimental** [`@tinacms/astro`](https://www.npmjs.com/package/@tinacms/astro) integration. The API may change before it stabilises.

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

## Features

- Visual editing via [`@tinacms/astro`](https://www.npmjs.com/package/@tinacms/astro) — vanilla-JS bridge, no React in the page tree
- Tailwind CSS v4 block builder: Hero, CTA, Features, Stats, Testimonial, Callout, Content, Split, Video
- Light/dark theme toggle with a Tina-ember space theme
- Markdown & MDX with `<TinaMarkdown>` rich-text rendering
- Collections for Pages, Blog, and global Config
- Astro view transitions, SEO meta, OpenGraph, sitemap, and RSS
- Icons via [`astro-icon`](https://github.com/natemoo-re/astro-icon) + Tabler set

## Getting started

Use this repo as a GitHub template, scaffold via `npx create-tina-app@latest --template tina-astro-starter`, or just `git clone`.

Install the project's dependencies:

> [!NOTE]
> Do you know the best package manager for Node.js? Using the right package manager can greatly enhance your development workflow. We recommend using **pnpm** for its speed and efficient handling of dependencies. Learn more about why pnpm might be the best choice for your projects by checking out [this rule from SSW](https://www.ssw.com.au/rules/best-package-manager-for-node).

```sh
pnpm install
pnpm dev
```

Open `localhost:4321` for the site and `localhost:4321/admin/` for the Tina editor.

Copy `.env.example` to `.env` and fill in your TinaCloud `PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` (grab them from [app.tina.io](https://app.tina.io)). Set `SITE_URL` for canonical/OG/sitemap output. To work entirely offline, skip the env vars and run `pnpm build:local`.

### Commit your lockfile

This template ships with lockfiles ignored (see the **Package Manager Lock Files** block in `.gitignore`). That's intentional for the template itself, but **your project should commit one**. After scaffolding, delete that block from `.gitignore` so your chosen lockfile is tracked.

## Project structure

```text
├── astro.config.mjs        # registers the tina() integration
├── public/
├── src
│   ├── components
│   │   ├── blocks/          # Tailwind block builder (Hero, CTA, Features, …)
│   │   ├── islands/         # editable regions rendered inside <TinaIsland>
│   │   ├── mdx/             # rich-text MDX components
│   │   └── space/           # ambient space-theme visuals
│   ├── content              # Markdown/MDX + config.json
│   ├── layouts              # Base.astro, BlogPost.astro
│   ├── lib
│   │   ├── data.ts          # requestWithMetadata()-wrapped query loaders
│   │   └── islands.ts       # the island registry
│   ├── pages
│   │   └── tina-island/[name].ts  # island-refresh endpoint
│   └── styles
└── tina
    ├── collections          # Tina schema (page, blog, global-config)
    └── config.ts
```

### How visual editing works

- `astro.config.mjs` adds `@tinacms/astro/integration`. Its middleware injects the bridge (`/_tina/bridge.js`) and `<div data-tina-form hidden>` payloads **only on edit-mode responses** — production HTML is byte-identical to a Tina-free app.
- Loaders in `src/lib/data.ts` wrap `client.queries.X(...)` with `requestWithMetadata()`, stamping the `_content_source` metadata `tinaField()` needs.
- Each editable region is registered in `src/lib/islands.ts` and wrapped with `<TinaIsland name="..." wrapper={...} params={...}>`. Edits re-fetch just that island via `/tina-island/[name]` — no full reload.

## Learn more

[TinaCMS docs](https://tina.io/docs) · [Astro docs](https://docs.astro.build) · [TinaCMS Discord](https://discord.gg/cG2UNREu)
