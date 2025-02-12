import type { Options as ToMarkdownExtension } from 'mdast-util-to-markdown';
import { Pattern } from '../../stringify';
export declare const directiveToMarkdown: (patterns: Pattern[]) => ToMarkdownExtension;
