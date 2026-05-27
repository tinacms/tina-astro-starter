/**
 * Thin aliases over Tina's generated query result types
 * (`tina/__generated__/types.ts`). Run `tinacms dev` (or any `tinacms build*`
 * script) to regenerate. The query-result shapes already have required
 * `__typename` discriminators, so the union in `Blocks.astro` narrows
 * straight off `block.__typename`.
 */
import type { TinaRichTextContent } from '@tinacms/astro';
import type {
	BlogQuery,
	ConfigQuery,
	PageQuery,
} from '../../../tina/__generated__/types';

export type CmsPage = NonNullable<PageQuery['page']>;
export type CmsBlog = NonNullable<BlogQuery['blog']>;
export type CmsConfig = NonNullable<ConfigQuery['config']>;

export type PageBlock = NonNullable<NonNullable<CmsPage['blocks']>[number]>;
export type PageBlockTypename = PageBlock['__typename'];

export type HeroBlock = Extract<PageBlock, { __typename: 'PageBlocksHero' }>;
export type CalloutBlock = Extract<PageBlock, { __typename: 'PageBlocksCallout' }>;
export type FeaturesBlock = Extract<PageBlock, { __typename: 'PageBlocksFeatures' }>;
export type StatsBlock = Extract<PageBlock, { __typename: 'PageBlocksStats' }>;
export type CtaBlock = Extract<PageBlock, { __typename: 'PageBlocksCta' }>;
export type ContentBlock = Extract<PageBlock, { __typename: 'PageBlocksContent' }>;
export type TestimonialBlock = Extract<PageBlock, { __typename: 'PageBlocksTestimonial' }>;
export type VideoBlock = Extract<PageBlock, { __typename: 'PageBlocksVideo' }>;
export type SplitBlock = Extract<PageBlock, { __typename: 'PageBlocksSplit' }>;

export type CmsConfigNav = NonNullable<NonNullable<CmsConfig['nav']>[number]>;
export type CmsConfigContactLink = NonNullable<NonNullable<CmsConfig['contactLinks']>[number]>;
export type CmsConfigSeo = NonNullable<CmsConfig['seo']>;

export type Action = NonNullable<NonNullable<HeroBlock['actions']>[number]>;
export type ImageField = NonNullable<HeroBlock['image']>;
export type FeatureItem = NonNullable<NonNullable<FeaturesBlock['items']>[number]>;
export type StatItem = NonNullable<NonNullable<StatsBlock['stats']>[number]>;
export type TestimonialItem = NonNullable<NonNullable<TestimonialBlock['testimonials']>[number]>;

/** Tina rich-text bodies come through GraphQL typed as `any`; this is the shape `<TinaMarkdown>` expects. */
export type RichText = TinaRichTextContent;
