import type { Template } from 'tinacms';
export const videoBlockSchema: Template = {
	name: 'video',
	label: 'Video',
	fields: [{ type: 'string', name: 'title', label: 'Title' }],
};
