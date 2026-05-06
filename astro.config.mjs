// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL || `https://${process.env.VERCEL_URL}`,
	integrations: [mdx(), sitemap()],
	vite: {
		build: {
			rollupOptions: {
				onwarn(warning, warn) {
					// Suppress TinaCMS generated file warning
					// TODO: Relevant issue to follow and remove when that is fixed: https://github.com/tinacms/tinacms/issues/6386
					if (warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
						warning.exporter === 'tinacms/dist/client') {
						return;
					}
					warn(warning);
				}
			}
		}
	}
});
