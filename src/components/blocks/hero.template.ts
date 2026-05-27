import type { Template } from 'tinacms';
export const heroBlockSchema: Template = {
	name: 'hero',
	label: 'Hero',
	fields: [{ type: 'string', name: 'title', label: 'Title' }],
};
