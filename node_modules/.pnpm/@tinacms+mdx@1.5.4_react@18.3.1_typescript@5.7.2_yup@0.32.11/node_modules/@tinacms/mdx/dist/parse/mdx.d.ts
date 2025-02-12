/**



*/
import type { MdxJsxTextElement, MdxJsxFlowElement } from 'mdast-util-mdx-jsx';
import type { RichTextType } from '@tinacms/schema-tools';
import type * as Plate from './plate';
import { ContainerDirective } from 'mdast-util-directive';
import { LeafDirective } from 'mdast-util-directive/lib';
export declare function mdxJsxElement(node: MdxJsxTextElement, field: RichTextType, imageCallback: (url: string) => string): Plate.MdxInlineElement;
export declare function mdxJsxElement(node: MdxJsxFlowElement, field: RichTextType, imageCallback: (url: string) => string): Plate.MdxBlockElement;
export declare const directiveElement: (node: ContainerDirective | LeafDirective, field: RichTextType, imageCallback: (url: string) => string, raw?: string) => Plate.BlockElement | Plate.ParagraphElement;
