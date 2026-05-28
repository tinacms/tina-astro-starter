import type { Template } from 'tinacms';

export const videoBlockSchema: Template = {
	name: 'video',
	label: 'Video',
	fields: [
		{ type: 'string', label: 'Url (YouTube/Vimeo embed or watch URL)', name: 'url' },
		{ type: 'boolean', label: 'Auto Play', name: 'autoPlay' },
		{ type: 'boolean', label: 'Loop', name: 'loop' },
	],
	ui: { defaultItem: { url: 'https://www.youtube.com/watch?v=j8egYW7Jpgk' } },
};
