/**



*/
import type * as Md from 'mdast';
import type * as Plate from '../parse/plate';
import type { RichTextType } from '@tinacms/schema-tools';
type InlineElementWithCallback = Plate.InlineElement & {
    linkifyTextNode?: (arg: Md.Text) => Md.Link;
};
export declare const eat: (c: InlineElementWithCallback[], field: RichTextType, imageCallback: (url: string) => string) => Md.PhrasingContent[];
export {};
