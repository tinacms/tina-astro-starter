import type { Template } from 'tinacms';
export const featuresBlockSchema: Template = {
	name: 'features',
	label: 'Features',
	fields: [{ type: 'string', name: 'title', label: 'Title' }],
};
