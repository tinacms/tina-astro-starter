import type { Template } from 'tinacms';
import type { Action } from '../../lib/data';

export const ctaBlockSchema: Template = {
	name: 'cta',
	label: 'CTA',
	fields: [
		{ type: 'string', label: 'Title', name: 'title' },
		{ type: 'string', label: 'Description', name: 'description', ui: { component: 'textarea' } },
		{
			type: 'object', label: 'Actions', name: 'actions', list: true,
			ui: {
				defaultItem: { label: 'Get Started', type: 'button', link: '/' },
				itemProps: (item: Action) => ({ label: item.label ?? '' }),
			},
			fields: [
				{ type: 'string', label: 'Label', name: 'label' },
				{ type: 'string', label: 'Type', name: 'type', options: [
					{ label: 'Button', value: 'button' }, { label: 'Link', value: 'link' } ] },
				{ type: 'string', label: 'Icon (Tabler name)', name: 'icon' },
				{ type: 'string', label: 'Link', name: 'link' },
			],
		},
	],
	ui: {
		defaultItem: {
			title: 'Start Building',
			description: 'Get started with TinaCMS today and take your content management to the next level.',
			actions: [
				{ label: 'Get Started', type: 'button', link: '/' },
				{ label: 'Book Demo', type: 'link', link: '/' },
			],
		},
	},
};
