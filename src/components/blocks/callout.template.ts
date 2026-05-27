import type { Template } from 'tinacms';
export const calloutBlockSchema: Template = {
	name: 'callout',
	label: 'Callout',
	fields: [{ type: 'string', name: 'title', label: 'Title' }],
};
