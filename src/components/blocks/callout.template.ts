import type { Template } from 'tinacms';

export const calloutBlockSchema: Template = {
	name: 'callout',
	label: 'Callout',
	fields: [
		{ type: 'string', label: 'Text', name: 'text' },
		{ type: 'string', label: 'Url', name: 'url' },
	],
	ui: {
		defaultItem: { url: 'https://tina.io/editorial-workflow', text: 'Support for live editing and editorial workflow' },
	},
};
