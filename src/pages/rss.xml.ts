import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import config from '../content/config/config.json';
import { listBlogs } from '../lib/data';

export const prerender = true;

export async function GET(context: APIContext) {
	const posts = await listBlogs();
	return rss({
		title: config.seo.title,
		description: config.seo.description,
		site: context.site ?? '',
		items: posts.map((post) => ({
			title: post.title,
			description: post.description ?? undefined,
			pubDate: post.pubDate ? new Date(post.pubDate) : undefined,
			link: `/blog/${post._sys.filename}/`,
		})),
	});
}
