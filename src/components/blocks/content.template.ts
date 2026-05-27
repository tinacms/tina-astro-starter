import type { Template } from 'tinacms';
import { sectionBackgroundField } from '../../../tina/templates/section-background';

export const contentBlockSchema: Template = {
	name: 'content',
	label: 'Content',
	fields: [
		sectionBackgroundField as any,
		{ type: 'rich-text', label: 'Body', name: 'body' },
	],
	ui: {
		defaultItem: {
			body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.',
		},
	},
};
