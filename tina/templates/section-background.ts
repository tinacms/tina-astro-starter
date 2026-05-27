export const tailwindBackgroundOptions = [
	{ label: 'Default', value: 'bg-default' },
	{ label: 'White', value: 'bg-white/80' },
	{ label: 'Gray', value: 'bg-gray-50/80' },
	{ label: 'Zinc', value: 'bg-zinc-50' },
	{ label: 'Black', value: 'bg-black/80' },
	{ label: 'Red', value: 'bg-red-50/80' },
	{ label: 'Orange', value: 'bg-orange-50/80' },
	{ label: 'Yellow', value: 'bg-yellow-50/80' },
	{ label: 'Green', value: 'bg-green-50/80' },
	{ label: 'Blue', value: 'bg-blue-50/80' },
	{ label: 'Indigo', value: 'bg-indigo-50/80' },
	{ label: 'Purple', value: 'bg-purple-50/80' },
	{ label: 'Pink', value: 'bg-pink-50/80' },
];

export const sectionBackgroundField = {
	type: 'string',
	label: 'Background',
	name: 'background',
	options: tailwindBackgroundOptions,
} as const;
