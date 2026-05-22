export const prerender = true;
import rss from '@astrojs/rss';
import config from '../content/config/config.json';
import { blogSlug, listBlogs } from '../lib/data';

export async function GET(context) {
	const posts = await listBlogs();
	return rss({
		title: config.seo.title,
		description: config.seo.description,
		site: context.site,
		items: posts
			.map((post) => ({ post, slug: blogSlug(post) }))
			.filter(({ slug }) => slug)
			.map(({ post, slug }) => ({
				title: post.title,
				description: post.description,
				pubDate: post.pubDate ? new Date(post.pubDate) : undefined,
				link: `/blog/${slug}/`,
			})),
	});
}
