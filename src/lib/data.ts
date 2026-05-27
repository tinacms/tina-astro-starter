/**
 * Per-collection data loaders. Each calls the generated Tina client the
 * normal way, then pipes the result through `requestWithMetadata()` so the
 * editor overlay flows in automatically when the page is rendered inside
 * the admin iframe, and `tinaField()` has the metadata it needs.
 *
 * Return shapes are widened/narrowed via the wrapper types in
 * `./types/cms` so consumers don't have to know about the generated-vs-
 * actual schema drift.
 */
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';
import type { CmsBlog, CmsConfig, CmsPage } from './types/cms';

export const getConfig = () =>
	requestWithMetadata(client.queries.config({ relativePath: 'config.json' })) as Promise<{
		data?: { config?: CmsConfig | null } | null;
	}>;

export const getPage = (slug: string) =>
	requestWithMetadata(
		client.queries.page({ relativePath: `${slug}.mdx` }),
		{ priority: 'primary' },
	) as Promise<{ data?: { page?: CmsPage | null } | null }>;

export const getBlog = (slug: string) =>
	requestWithMetadata(
		client.queries.blog({ relativePath: `${slug}.mdx` }),
		{ priority: 'primary' },
	) as Promise<{ data?: { blog?: CmsBlog | null } | null }>;

export async function listPages(): Promise<CmsPage[]> {
	const result = await client.queries.pageConnection();
	return (result?.data?.pageConnection?.edges ?? [])
		.flatMap((edge) => (edge?.node ? [edge.node as unknown as CmsPage] : []));
}

/** Derive a blog post's URL slug from its source file path. */
export function blogSlug(node: { _sys?: { relativePath?: string | null } | null }): string {
	return node._sys?.relativePath?.replace(/\.mdx?$/, '') ?? '';
}

export async function listBlogs(): Promise<CmsBlog[]> {
	const result = await client.queries.blogConnection();
	return (result?.data?.blogConnection?.edges ?? [])
		.flatMap((edge) => (edge?.node ? [edge.node] : []))
		.sort((a, b) => {
			const ad = a.pubDate ? new Date(a.pubDate).valueOf() : 0;
			const bd = b.pubDate ? new Date(b.pubDate).valueOf() : 0;
			return bd - ad;
		});
}
