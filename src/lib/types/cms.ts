/**
 * Hand-written wrappers around Tina's generated `__generated__/types.ts`.
 *
 * Tina regenerates `Page`/`Config` on `tinacms build`, but the generated file
 * is stale here (regen currently fails because of a react/react-dom version
 * skew in node_modules), so the canonical shape of `blocks`, the per-block
 * templates, and `footerStarfield` lives in this file. When Tina regenerates,
 * the wrappers below stay correct — they intersect generated fields with the
 * extras we know are in the schema.
 *
 * The block discriminated union (`PageBlock`) mirrors the templates in
 * `src/components/blocks/*.template.ts`. Add a new template → add a member
 * here → the renderer and component get type-checked end to end.
 */
import type {
	BlogQuery,
	ConfigQuery,
	PageQuery,
} from '../../../tina/__generated__/types';

/** Shared shape for the button/link actions used by Hero, Cta, and Split. */
export type Action = {
	label?: string | null;
	type?: 'button' | 'link' | string | null;
	icon?: string | null;
	link?: string | null;
};

export type ImageField = {
	src?: string | null;
	alt?: string | null;
};

/**
 * A Tina rich-text body comes through GraphQL as JSON. The generated types
 * use `any`; we mirror that so the value flows straight into TinaMarkdown's
 * `content` prop without forcing a cast at every call site.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RichText = any;

export type HeroBlock = {
	__typename: 'PageBlocksHero';
	headline?: string | null;
	tagline?: string | null;
	actions?: (Action | null)[] | null;
	image?: ImageField | null;
	starfield?: boolean | null;
};

export type CalloutBlock = {
	__typename: 'PageBlocksCallout';
	text?: string | null;
	url?: string | null;
};

export type FeatureItem = {
	icon?: string | null;
	title?: string | null;
	text?: RichText;
};

export type FeaturesBlock = {
	__typename: 'PageBlocksFeatures';
	title?: string | null;
	description?: string | null;
	items?: (FeatureItem | null)[] | null;
};

export type StatItem = {
	stat?: string | null;
	type?: string | null;
};

export type StatsBlock = {
	__typename: 'PageBlocksStats';
	title?: string | null;
	description?: string | null;
	stats?: (StatItem | null)[] | null;
};

export type CtaBlock = {
	__typename: 'PageBlocksCta';
	title?: string | null;
	description?: string | null;
	actions?: (Action | null)[] | null;
};

export type ContentBlock = {
	__typename: 'PageBlocksContent';
	body?: RichText;
};

export type TestimonialItem = {
	quote?: string | null;
	author?: string | null;
	role?: string | null;
	avatar?: string | null;
};

export type TestimonialBlock = {
	__typename: 'PageBlocksTestimonial';
	title?: string | null;
	description?: string | null;
	testimonials?: (TestimonialItem | null)[] | null;
};

export type VideoBlock = {
	__typename: 'PageBlocksVideo';
	url?: string | null;
	autoPlay?: boolean | null;
	loop?: boolean | null;
};

export type SplitBlock = {
	__typename: 'PageBlocksSplit';
	title?: string | null;
	body?: RichText;
	image?: ImageField | null;
	reverse?: boolean | null;
	actions?: (Action | null)[] | null;
};

export type PageBlock =
	| HeroBlock
	| CalloutBlock
	| FeaturesBlock
	| StatsBlock
	| CtaBlock
	| ContentBlock
	| TestimonialBlock
	| VideoBlock
	| SplitBlock;

export type PageBlockTypename = PageBlock['__typename'];

type GeneratedPage = NonNullable<PageQuery['page']>;
type GeneratedBlog = NonNullable<BlogQuery['blog']>;
type GeneratedConfig = NonNullable<ConfigQuery['config']>;

/**
 * Page shape after the schema migrated from a rich-text `body` to a
 * `blocks` list. Intersects with the generated type so any future regen
 * stays compatible.
 */
export type CmsPage = Omit<GeneratedPage, 'body'> & {
	blocks?: (PageBlock | null)[] | null;
};

export type CmsBlog = GeneratedBlog;

export type CmsConfig = GeneratedConfig & {
	footerStarfield?: boolean | null;
};

export type CmsConfigNav = NonNullable<NonNullable<CmsConfig['nav']>[number]>;
export type CmsConfigContactLink = NonNullable<NonNullable<CmsConfig['contactLinks']>[number]>;
export type CmsConfigSeo = NonNullable<CmsConfig['seo']>;
