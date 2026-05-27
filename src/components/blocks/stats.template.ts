import type { Template } from 'tinacms';
import type { StatItem } from '../../lib/data';

export const statsBlockSchema: Template = {
	name: 'stats',
	label: 'Stats',
	fields: [
		{ type: 'string', label: 'Title', name: 'title' },
		{ type: 'string', label: 'Description', name: 'description' },
		{
			type: 'object', label: 'Stats', name: 'stats', list: true,
			ui: { defaultItem: { stat: '12K', type: 'Stars on GitHub' }, itemProps: (i: StatItem) => ({ label: `${i.stat ?? ''} ${i.type ?? ''}` }) },
			fields: [
				{ type: 'string', label: 'Stat', name: 'stat' },
				{ type: 'string', label: 'Type', name: 'type' },
			],
		},
	],
	ui: {
		defaultItem: {
			title: 'TinaCMS by the numbers',
			description: 'An open-source, Git-backed CMS.',
			stats: [ { stat: '12K', type: 'Stars on GitHub' }, { stat: '11K', type: 'Active Users' }, { stat: '22K', type: 'Powered Apps' } ],
		},
	},
};
