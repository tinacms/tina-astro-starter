import CodeBlock from './CodeBlock.astro';
import YouTubeEmbed from './YouTubeEmbed.astro';

/**
 * Custom renderers shared by every `<TinaMarkdown>` surface — the blog body and
 * the Content / Split / Features page blocks. Registering them once here keeps
 * the overrides consistent instead of each consumer re-declaring its own map.
 *
 * - `YouTubeEmbed` — matches the template `name` in tina/collections/blog.ts.
 * - `code_block` — overrides the renderer's default plain `<pre><code>` with a
 *   Shiki-highlighted block (see CodeBlock.astro). Built-in rich-text node, not
 *   an editor-authored template.
 */
export const mdxComponents = { YouTubeEmbed, code_block: CodeBlock };
