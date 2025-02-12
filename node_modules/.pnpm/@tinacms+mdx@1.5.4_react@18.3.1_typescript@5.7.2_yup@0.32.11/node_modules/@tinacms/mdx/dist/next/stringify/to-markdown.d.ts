import type { RichTextField } from '@tinacms/schema-tools';
import type * as Md from 'mdast';
export declare const toTinaMarkdown: (tree: Md.Root, field: RichTextField) => string;
