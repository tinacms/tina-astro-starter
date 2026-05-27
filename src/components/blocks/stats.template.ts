import type { Template } from 'tinacms';
export const statsBlockSchema: Template = {
	name: 'stats',
	label: 'Stats',
	fields: [{ type: 'string', name: 'title', label: 'Title' }],
};
