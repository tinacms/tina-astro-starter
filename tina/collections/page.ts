import type { Collection } from 'tinacms';
import { heroBlockSchema } from '../../src/components/blocks/hero.template';
import { featuresBlockSchema } from '../../src/components/blocks/features.template';
import { statsBlockSchema } from '../../src/components/blocks/stats.template';
import { ctaBlockSchema } from '../../src/components/blocks/cta.template';
import { testimonialBlockSchema } from '../../src/components/blocks/testimonial.template';
import { calloutBlockSchema } from '../../src/components/blocks/callout.template';
import { contentBlockSchema } from '../../src/components/blocks/content.template';
import { videoBlockSchema } from '../../src/components/blocks/video.template';
import { splitBlockSchema } from '../../src/components/blocks/split.template';

export const PageCollection: Collection = {
	name: 'page',
	label: 'Pages',
	path: 'src/content/page',
	format: 'mdx',
	ui: {
		router: ({ document }) => `/${document._sys.filename}`,
	},
	fields: [
		{
			name: 'title',
			label: 'Page Title',
			type: 'string',
			isTitle: true,
			required: true,
			description:
				"The page's name. Renders as the on-page heading (inside the Hero block, if there is one) and is used as the default browser-tab and SEO title. Set Meta Title below only when you want a different value in the browser tab.",
		},
		{
			name: 'seoTitle',
			label: 'Meta Title (browser tab override)',
			type: 'string',
			description:
				"Optional. Overrides the browser-tab and search-result title for this page. Leave blank to use the Page Title above.",
		},
		{
			type: 'object',
			list: true,
			name: 'blocks',
			label: 'Page Sections',
			description:
				"The visible content of the page below the heading. Start with a Hero block to give the page a large illustrated heading; otherwise the Page Title above renders as a plain heading.",
			ui: { visualSelector: true },
			templates: [
				heroBlockSchema,
				calloutBlockSchema,
				featuresBlockSchema,
				statsBlockSchema,
				ctaBlockSchema,
				contentBlockSchema,
				testimonialBlockSchema,
				videoBlockSchema,
				splitBlockSchema,
			],
		},
	],
};
