This is a [TinaCMS](https://tina.io/) starter project.

Edit your site visually in the browser, ship it as fast static HTML.

## Getting started

Create the project:

```sh
pnpm dlx create-tina-app@latest --template tina-astro-starter
```

Install dependencies:

> [!NOTE]
> **[Which package manager is best for Node.js?](https://www.ssw.com.au/rules/best-package-manager-for-node)** The right one makes a real difference to your workflow. We recommend pnpm for its speed and efficient dependency handling — this SSW rule explains why.

```sh
pnpm install
```

Start the dev server, then edit visually at `localhost:4321/admin/`:

```sh
pnpm dev
```

![homepage](./public/home-page.png)

**Figure: Homepage UI**

## Features 

- Visual editing via [`@tinacms/astro`](https://www.npmjs.com/package/@tinacms/astro) — a vanilla-JS bridge, with no React in the page tree
- Tailwind CSS v4 block builder: Hero, CTA, Features, Stats, Testimonial, Callout, Content, Split, and Video
- Light/dark theme toggle with a Tina-ember space theme
- Markdown and MDX with `<TinaMarkdown>` rich-text rendering
- Collections for Pages, Blog, and global Config
- Astro view transitions, SEO meta, OpenGraph, sitemap, and RSS
- Icons via [`astro-icon`](https://github.com/natemoo-re/astro-icon) and the Tabler set

## Deploying

The starter is host-neutral — it isn't tied to any one platform. Every content page is prerendered to static HTML; the only on-demand route is the `/tina-island` endpoint that powers live visual editing.

`astro.config.mjs` picks the right adapter automatically from the platform's build environment — [Vercel](https://docs.astro.build/en/guides/integrations-guide/vercel/), [Cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) (Pages or Workers) and [Netlify](https://docs.astro.build/en/guides/integrations-guide/netlify/) are detected and configured with no changes, and anywhere else falls back to a portable [Node](https://docs.astro.build/en/guides/integrations-guide/node/) server you can run with `node ./dist/server/entry.mjs`. The bundled `wrangler.jsonc` targets Cloudflare Workers and enables `nodejs_compat`, which the editing route's `node:async_hooks` needs.

Set `SITE_URL` to your production URL — it feeds the sitemap, RSS, and OpenGraph tags; see `.env.example`. Most platforms inject their own deploy URL as a fallback, but Cloudflare Workers exposes none, so set `SITE_URL` there to avoid `localhost` canonicals.

### Before your first deploy: TinaCloud credentials

The default `pnpm build` compiles the CMS against TinaCloud, so it needs your project credentials. Without them it fails fast with `ERR_MISSING_CLOUD_CREDS`. Create a project at [app.tina.io](https://app.tina.io), then set `PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN` (see `.env.example`) in your host's environment variables.

To build without TinaCloud — a purely local/offline build with no auth — run `pnpm build:local` instead, which skips the cloud checks.

## A note on React

`react` and `react-dom` are both pinned to the same version (`^19.2.7`) in `devDependencies` for the TinaCMS admin UI build only — the site itself ships zero React. The pin keeps the two packages locked in lockstep; without it, pnpm's peer auto-install can pair mismatched `react` / `react-dom` versions and the admin crashes on init (`Cannot read properties of undefined (reading 'ReactCurrentDispatcher')`). This is tracked in [tinacms#6985](https://github.com/tinacms/tinacms/issues/6985); remove the pin once Tina declares `react` / `react-dom` as direct dependencies.

## Want to learn more?

Read the [TinaCMS documentation](https://tina.io/docs) and the [Astro documentation](https://docs.astro.build), or come and say hello in the [TinaCMS Discord server](https://discord.gg/cG2UNREu).
