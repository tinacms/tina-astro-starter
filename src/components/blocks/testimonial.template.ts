import type { Template } from 'tinacms';
export const testimonialBlockSchema: Template = {
	name: 'testimonial',
	label: 'Testimonial',
	fields: [{ type: 'string', name: 'title', label: 'Title' }],
};
