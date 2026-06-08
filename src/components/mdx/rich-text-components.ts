import type { CustomComponentsMap } from '@tinacms/astro/types';
import Table from '../islands/Table.astro';
import Cta from '../islands/Cta.astro';

/**
 * Component overrides passed to `<TinaMarkdown components={…} />` for blog
 * bodies.
 *
 * The `Custom` type param (`{ cta: { title: string } }`) mirrors the `cta`
 * template's fields in `tina/collections/blog.ts`. Supplying it does two
 * things the bare inline map can't:
 *   1. `cta` becomes a real, autocompleted key (otherwise it only matches the
 *      type's catch-all string index, which editors never suggest), and
 *   2. each component's props are checked against the fields the renderer
 *      passes — `Cta` must accept `{ title }`, `Table` must accept `{ node }`.
 *
 * Register a new custom template by adding its fields to the param and the
 * component under its template name here.
 */
export const richTextComponents: CustomComponentsMap<{
	cta: { title: string };
}> = {
	table: Table,
	cta: Cta
};
