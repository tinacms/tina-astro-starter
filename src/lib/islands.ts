import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

import PageBody from '../components/islands/PageBody.astro';
import BlogBody from '../components/islands/BlogBody.astro';
import { getPage, getBlog } from './data';

export interface IslandConfig {
  fetch: (request: Request, params: URLSearchParams) => Promise<unknown>;
  component: AstroComponentFactory;
  wrapper: { tag: string; className?: string };
  propsFromData: (data: unknown, params: URLSearchParams) => Record<string, unknown>;
}

export const islands: Record<string, IslandConfig> = {
  page: {
    fetch: (request, params) => getPage(params.get('slug') ?? 'home', request),
    component: PageBody,
    wrapper: { tag: 'main' },
    propsFromData: (data) => ({
      data: (data as { data?: { page?: unknown } }).data?.page,
    }),
  },
  blog: {
    fetch: (request, params) => getBlog(params.get('slug') ?? '', request),
    component: BlogBody,
    wrapper: { tag: 'article' },
    propsFromData: (data) => ({
      data: (data as { data?: { blog?: unknown } }).data?.blog,
    }),
  },
};
