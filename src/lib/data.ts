/**
 * Per-collection data loaders. Each calls the generated Tina client the
 * normal way, then pipes the result through `requestWithMetadata()` so the
 * editor overlay flows in automatically when the page is rendered inside
 * the admin iframe, and `tinaField()` has the metadata it needs.
 */
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';

export const getConfig = () =>
	requestWithMetadata(client.queries.config({ relativePath: 'config.json' }));

export const getPage = (slug: string) =>
	requestWithMetadata(
		client.queries.page({ relativePath: `${slug}.mdx` }),
		{ priority: 'primary' },
	);

export const getBlog = (slug: string) =>
	requestWithMetadata(
		client.queries.blog({ relativePath: `${slug}.mdx` }),
		{ priority: 'primary' },
	);

export async function listPages() {
	const result = await client.queries.pageConnection();
	return (result?.data?.pageConnection?.edges ?? [])
		.filter((edge): edge is NonNullable<typeof edge> => !!edge?.node)
		.map((edge) => edge!.node!);
}

export async function listBlogs() {
	const result = await client.queries.blogConnection();
	return (result?.data?.blogConnection?.edges ?? [])
		.filter((edge): edge is NonNullable<typeof edge> => !!edge?.node)
		.map((edge) => edge!.node!)
		.sort((a, b) => {
			const ad = a.pubDate ? new Date(a.pubDate).valueOf() : 0;
			const bd = b.pubDate ? new Date(b.pubDate).valueOf() : 0;
			return bd - ad;
		});
}
