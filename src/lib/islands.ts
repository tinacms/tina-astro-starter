/**
 * Island registry — single source of truth for every editable region the
 * bridge can refresh. Each entry maps a URL slug under `/tina-island/...`
 * to a fetcher + component + wrapper. Adding a new editable region = adding
 * one entry here; the dynamic `[name].ts` route picks it up automatically.
 */
import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';

import type { BlogQuery, ConfigQuery, PageQuery } from '../../tina/__generated__/types';
import type { CmsBlog, CmsConfig, CmsPage } from './data';
import PageBody from '../components/islands/PageBody.astro';
import BlogBody from '../components/islands/BlogBody.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { getBlog, getConfig, getPage } from './data';

export const islands: IslandRegistry = {
	page: {
		fetch: (_request, params) => getPage(params.get('slug') ?? 'home'),
		component: PageBody,
		wrapper: { tag: 'main' },
		propsFromData: (data) => ({
			data: (data as QueryResult<PageQuery>).data?.page as CmsPage | undefined,
		}),
	},
	blog: {
		fetch: (_request, params) => getBlog(params.get('slug') ?? ''),
		component: BlogBody,
		wrapper: { tag: 'article' },
		propsFromData: (data) => ({
			data: (data as QueryResult<BlogQuery>).data?.blog as CmsBlog | undefined,
		}),
	},
	global: {
		fetch: () => getConfig(),
		component: Header,
		wrapper: { tag: 'div' },
		propsFromData: (data) => ({
			config: (data as QueryResult<ConfigQuery>).data?.config as CmsConfig | undefined,
		}),
	},
	'global-footer': {
		fetch: () => getConfig(),
		component: Footer,
		wrapper: { tag: 'div' },
		propsFromData: (data) => ({
			config: (data as QueryResult<ConfigQuery>).data?.config as CmsConfig | undefined,
		}),
	},
};
