/**
 * Content is sourced from TinaCMS (see `src/lib/data.ts`), not Astro's
 * content layer, so these collections are unused at runtime. We only
 * declare `config` to stop Astro auto-generating it as a Markdown
 * collection: `src/content/config` holds JSON (Tina's global config), so
 * the default Markdown glob finds nothing and warns. Pointing it at JSON
 * silences that. `blog` and `page` keep their Markdown auto-generation.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const config = defineCollection({
	loader: glob({ pattern: '**/*.json', base: 'src/content/config' }),
});

export const collections = { config };
