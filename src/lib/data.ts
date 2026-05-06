import client from '../../tina/__generated__/client';
import { PAGE_QUERY, BLOG_QUERY } from './queries';
import { type QueryResult, withOverlay } from './tina-preview';

interface PageData {
  page: {
    seoTitle?: string;
    body?: unknown;
  } | null;
}

interface BlogData {
  blog: {
    title?: string;
    description?: string | null;
    pubDate?: string | null;
    updatedDate?: string | null;
    heroImage?: string | null;
    body?: unknown;
  } | null;
}

const DEFAULT_PAGE: PageData = { page: { seoTitle: '', body: null } };
const DEFAULT_BLOG: BlogData = { blog: { title: '', body: null } };

export function getPage(slug: string, request: Request): Promise<QueryResult<PageData>> {
  const variables = { relativePath: `${slug}.mdx` };
  return withOverlay<PageData>({
    query: PAGE_QUERY,
    variables,
    request,
    fetcher: async () => {
      const result = await client.queries.page(variables);
      return result?.data as PageData | null;
    },
    defaults: DEFAULT_PAGE,
  });
}

export function getBlog(slug: string, request: Request): Promise<QueryResult<BlogData>> {
  const variables = { relativePath: `${slug}.mdx` };
  return withOverlay<BlogData>({
    query: BLOG_QUERY,
    variables,
    request,
    fetcher: async () => {
      const result = await client.queries.blog(variables);
      return result?.data as BlogData | null;
    },
    defaults: DEFAULT_BLOG,
  });
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
