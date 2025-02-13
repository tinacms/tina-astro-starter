import type * as Md from 'mdast';
import type * as Plate from '../../parse/plate';
import type { RichTextField } from '@tinacms/schema-tools';
type InlineElementWithCallback = Plate.InlineElement & {
    linkifyTextNode?: (arg: Md.Text) => Md.Link;
};
export declare const eat: (c: InlineElementWithCallback[], field: RichTextField, imageCallback: (url: string) => string) => Md.PhrasingContent[];
export {};
