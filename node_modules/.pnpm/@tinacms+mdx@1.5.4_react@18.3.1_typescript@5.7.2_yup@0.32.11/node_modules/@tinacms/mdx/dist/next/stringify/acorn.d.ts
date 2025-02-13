import type { RichTextField } from '@tinacms/schema-tools';
import type { MdxJsxAttribute } from 'mdast-util-mdx-jsx';
import * as Plate from '../../parse/plate';
import type * as Md from 'mdast';
export declare const stringifyPropsInline: (element: Plate.MdxInlineElement, field: RichTextField, imageCallback: (url: string) => string) => {
    attributes: MdxJsxAttribute[];
    children: Md.PhrasingContent[];
};
export declare function stringifyProps(element: Plate.MdxInlineElement, parentField: RichTextField, flatten: boolean, imageCallback: (url: string) => string): {
    attributes: MdxJsxAttribute[];
    children: Md.PhrasingContent[];
    useDirective: boolean;
    directiveType: string;
};
export declare function stringifyProps(element: Plate.MdxBlockElement, parentField: RichTextField, flatten: boolean, imageCallback: (url: string) => string): {
    attributes: MdxJsxAttribute[];
    children: Md.BlockContent[];
    useDirective: boolean;
    directiveType: string;
};
export declare function assertShape<T>(value: unknown, callback: (item: any) => boolean, errorMessage?: string): asserts value is T;
