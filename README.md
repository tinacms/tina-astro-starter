This is a [Tina CMS](https://tina.io/) starter project.

# Astro + TinaCMS Starter Kit: Blog

```sh
npx create-tina-app@latest --template tina-astro-starter
```

And start editing with TinaCMS at `/admin`!


> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Markdown & MDX support + TinaCMS `<TinaMarkdown>` rich-text rendering
- ✅ TinaCMS Collections (Pages, Blogs, Config)
- ✅ Visual editing via [`@tinacms/astro`](https://www.npmjs.com/package/@tinacms/astro) — vanilla-JS bridge, **no React in the page tree**
- ✅ 100/100 Lighthouse performance
- ✅ View transitions are enabled
- ✅ Minimal styling (make it your own!)
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support


## 🚀 Project Structure

```text
├── README.md
├── astro.config.mjs        # adds the `tina()` integration
├── package.json
├── pnpm-lock.yaml
├── public/
├── src
│   ├── components
│   │   ├── BaseHead.astro   # <head> meta (no Tina plumbing — the integration injects it)
│   │   └── islands/         # components rendered inside `<TinaIsland>` (PageBody, BlogBody)
│   ├── content              # Markdown/MDX content + config.json (the `config` collection)
│   ├── layouts              # Base.astro (header/footer global islands), BlogPost.astro
│   ├── lib
│   │   ├── data.ts          # `requestWithMetadata()`-wrapped query loaders
│   │   └── islands.ts        # the island registry (one entry per editable region)
│   ├── pages
│   │   └── tina-island/[name].ts  # generic island-refresh endpoint
│   └── styles
├── tina
│   ├── collections          # TinaCMS schema definitions
│   ├── config.ts
│   ├── __generated__        # generated GraphQL client + types (git-ignored)
│   └── tina-lock.json
└── tsconfig.json
```

### How visual editing works

- `astro.config.mjs` adds the `tina()` integration (`@tinacms/astro/integration`). Its
  middleware injects the bridge script (`/_tina/bridge.js`) and the `<div data-tina-form hidden>`
  payloads **only on edit-mode responses** — production HTML is byte-identical to a Tina-free app.
- Data loaders in `src/lib/data.ts` wrap each `client.queries.X(...)` call with
  `requestWithMetadata()`, which stamps the `_content_source` metadata `tinaField()` needs and
  swaps in the editor's unsaved overlay when rendering inside the admin iframe.
- Each editable region is registered in `src/lib/islands.ts` (`IslandRegistry`) and wrapped on the
  page with `<TinaIsland name="..." wrapper={...} params={...}>`. When you edit a field, the bridge
  re-fetches just that island via `/tina-island/[name]` and swaps it into the DOM — no full reload.
- `src/pages/index.astro` is the "Home" page — it loads `src/content/page/home.mdx`.

Each page is exposed as a route based on its file name, generated from the content under
`src/content/` (excluding the `config` folder). Any static assets, like images, go in `public/`.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321` (site) and `localhost:4321/admin/` (TinaCMS) |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run build:local`     | Build with content indexed locally (no TinaCloud) |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Why does `package.json` pin `react` and `react-dom`?

The Astro site itself is React-free — `@tinacms/astro` ships React-free visual editing. The pinned `react` / `react-dom@^18.3.1` in `devDependencies` exist only so the TinaCMS admin UI (which is a React app, built at dev/CI time by `tinacms build` into `public/admin/`) gets a React version matching the `react-dom@^18.3.1` peer that `tinacms` requires.

Without these pins, pnpm's `auto-install-peers` resolves `react@19.0.0-rc` (to satisfy `@vercel/analytics`'s wide optional peer range) and pairs it with `react-dom@18.3.1`, which crashes at module init with `Cannot read properties of undefined (reading 'ReactCurrentDispatcher')`. Don't remove these pins until TinaCMS declares `react` / `react-dom` as direct deps of `@tinacms/cli` ([tinacms#6985](https://github.com/tinacms/tinacms/issues/6985)) — once that lands, this workaround can go.

## 👀 Want to learn more?

Check out the [TinaCMS documentation](https://tina.io/docs) and the [Astro documentation](https://docs.astro.build) or jump into our [TinaCMS Discord server](https://discord.gg/cG2UNREu).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
