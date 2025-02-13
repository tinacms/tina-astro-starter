import type { MdxJsxAttribute, MdxJsxExpressionAttribute } from 'mdast-util-mdx-jsx';
import type { TinaField } from '@tinacms/schema-tools';
export declare const extractAttributes: (attributes: (MdxJsxAttribute | MdxJsxExpressionAttribute)[], fields: TinaField[], imageCallback: (image: string) => string) => Record<string, unknown>;
export declare const trimFragments: (string: string) => string;
