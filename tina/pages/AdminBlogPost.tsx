import React from 'react';
import { tinaField, useTina } from "tinacms/dist/react";
import type { BlogQuery, BlogQueryVariables } from '../__generated__/types';
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import FormattedDate from '../../src/components/react/FormattedDate.tsx';


type Props = {
	variables: BlogQueryVariables;
	data: BlogQuery;
	query: string;
}

export default function AdminBlogPost(props: Props) {

	const { data } = useTina({
		query: props.query,
		variables: props.variables,
		data: props.data,
	})

	const blog = data.blog;

	return (
		<article>
			<div data-tina-field={tinaField(blog, "heroImage")} class="hero-image">
				{blog.heroImage && <img width={1020} height={510} src={blog.heroImage} alt="" />}
			</div>
			<div class="prose">
				<div class="title">
					<div class="date" data-tina-field={tinaField(blog, "pubDate")} >
						<FormattedDate date={blog.pubDate} />
						{
							blog.updatedDate && (
								<div class="last-updated-on" data-tina-field={tinaField(blog, "updatedDate")} >
									Last updated on <FormattedDate date={blog.updatedDate} />
								</div>
							)
						}
					</div>
					<h1 data-tina-field={tinaField(blog, "title")} >{blog.title}</h1>
					<hr />
				</div>
				<div data-tina-field={tinaField(blog, "body")}>
					<TinaMarkdown content={blog.body} />
				</div>
			</div>
		</article>
	);
}
