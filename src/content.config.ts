import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().nullish(),
  }),
});

const page = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/page" }),
  schema: z.object({
    seoTitle: z.string(),
  }),
});

export const collections = { blog, page };
