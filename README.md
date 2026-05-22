This is a [Tina CMS](https://tina.io/) starter project.

# Astro + TinaCMS Starter Kit: Blog

```sh
npx create-tina-app@latest --template tina-astro-starter
```

And start editing with TinaCMS at `/admin/index.html` (in dev, `astro dev` won't serve `/admin` directly)! 


> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Markdown & MDX support + TinaCMS Markdown Component
- ✅ TinaCMS Collections (Pages, Blogs, Config)
- ✅ Visual Editing using Custom Loaders and Client Directives (requires React)
- ✅ 100/100 Lighthouse performance
- ✅ View transitions are enabled 
- ✅ Minimal styling (make it your own!)
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support


## 🚀 Project Structure

Inside of your project, you'll see the following folders and files:

```text
├── README.md
├── astro-tina-directive/
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── public/
├── src
│   ├── components
│   ├── content
│   ├── content.config.ts
│   ├── layouts
│   ├── pages
│   └── styles
├── tina
│   ├── collections
│   ├── components
│   ├── config.ts
│   ├── pages
│   └── tina-lock.json
└── tsconfig.json
```

Each page is exposed as a route based on its file name which are generated from the content under `src/content/` (excluding the `config` folder). 

To enable Visual Editing with TinaCMS we have had to use React components and a new `client:tina` Directive. Which is the code located under `astro-tina-directive`. 

Under the `tina/` folder we have, `collections/` which holds our TinaCMS schema definitions. Under `components/` we have a custom Icon Component that is used within the TinaCMS UI. Under `pages/` we have the "wrappers" that make the Visual Editing work, using the `useTina` hook. 

The `pages/index.astro` is the "Home" page - This is a special case and has been setup to look for the `content/page/home.mdx` file. 

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

> [!NOTE]
> To use `getCollection()` we need to add a schema in `content.config.ts` with a custom loader that uses the correct TinaCMS Collection.


Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out the [TinaCMS documentation](https://tina.io/docs) and the [Astro documentation](https://docs.astro.build) or jump into our [TinaCMS Discord server](https://discord.gg/cG2UNREu).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
