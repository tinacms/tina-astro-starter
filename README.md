This is a [Tina CMS](https://tina.io/) starter project.

## Getting Started

Create the project:

```sh
pnpm dlx create-tina-app@latest --template tina-astro-starter
```

Install the project's dependencies:

> [!NOTE]
> **[Do you know the best package manager for Node.js?](https://www.ssw.com.au/rules/best-package-manager-for-node)** Using the right package manager can greatly enhance your development workflow. We recommend using pnpm for its speed and efficient handling of dependencies. Learn more about why pnpm might be the best choice for your projects by checking out this rule from SSW.

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

- Visual editing via [`@tinacms/astro`](https://www.npmjs.com/package/@tinacms/astro) — vanilla-JS bridge, no React in the page tree
- Tailwind CSS v4 block builder: Hero, CTA, Features, Stats, Testimonial, Callout, Content, Split, Video
- Light/dark theme toggle with a Tina-ember space theme
- Markdown & MDX with `<TinaMarkdown>` rich-text rendering
- Collections for Pages, Blog, and global Config
- Astro view transitions, SEO meta, OpenGraph, sitemap, and RSS
- Icons via [`astro-icon`](https://github.com/natemoo-re/astro-icon) + Tabler set

## Getting started

> **Note:** `react` and `react-dom@^18.3.1` are pinned in `devDependencies` only for the TinaCMS admin UI build — the site itself ships zero React. Without the pin, pnpm resolves `react@19` against `react-dom@18` and the admin crashes at init. Tracked in [tinacms#6985](https://github.com/tinacms/tinacms/issues/6985); remove the pin once that lands.

## 👀 Want to learn more?

Check out the [TinaCMS documentation](https://tina.io/docs) and the [Astro documentation](https://docs.astro.build) or jump into our [TinaCMS Discord server](https://discord.gg/cG2UNREu).
