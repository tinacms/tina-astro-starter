import { Pattern } from '../lib/syntax';
import type { Handle as FromMarkdownHandle } from 'mdast-util-from-markdown';
import type { Handle as ToMarkdownHandle, Options } from 'mdast-util-to-markdown';
export declare function mdxJsxFromMarkdown({ patterns }: {
    patterns: Pattern[];
}): {
    canContainEols: string[];
    enter: {
        mdxJsxFlowTag: FromMarkdownHandle;
        mdxJsxFlowTagClosingMarker: FromMarkdownHandle;
        mdxJsxFlowTagAttribute: FromMarkdownHandle;
        mdxJsxFlowTagExpressionAttribute: FromMarkdownHandle;
        mdxJsxFlowTagAttributeValueLiteral: FromMarkdownHandle;
        mdxJsxFlowTagAttributeValueExpression: FromMarkdownHandle;
        mdxJsxFlowTagSelfClosingMarker: FromMarkdownHandle;
        mdxJsxTextTag: FromMarkdownHandle;
        mdxJsxTextTagClosingMarker: FromMarkdownHandle;
        mdxJsxTextTagAttribute: FromMarkdownHandle;
        mdxJsxTextTagExpressionAttribute: FromMarkdownHandle;
        mdxJsxTextTagAttributeValueLiteral: FromMarkdownHandle;
        mdxJsxTextTagAttributeValueExpression: FromMarkdownHandle;
        mdxJsxTextTagSelfClosingMarker: FromMarkdownHandle;
    };
    exit: {
        mdxJsxFlowTagClosingMarker: FromMarkdownHandle;
        mdxJsxFlowTagNamePrimary: FromMarkdownHandle;
        mdxJsxFlowTagNameMember: FromMarkdownHandle;
        mdxJsxFlowTagNameLocal: FromMarkdownHandle;
        mdxJsxFlowTagExpressionAttribute: FromMarkdownHandle;
        mdxJsxFlowTagExpressionAttributeValue: FromMarkdownHandle;
        mdxJsxFlowTagAttributeNamePrimary: FromMarkdownHandle;
        mdxJsxFlowTagAttributeNameLocal: FromMarkdownHandle;
        mdxJsxFlowTagAttributeValueLiteral: FromMarkdownHandle;
        mdxJsxFlowTagAttributeValueLiteralValue: FromMarkdownHandle;
        mdxJsxFlowTagAttributeValueExpression: FromMarkdownHandle;
        mdxJsxFlowTagAttributeValueExpressionValue: FromMarkdownHandle;
        mdxJsxFlowTagSelfClosingMarker: FromMarkdownHandle;
        mdxJsxFlowTag: FromMarkdownHandle;
        mdxJsxTextTagClosingMarker: FromMarkdownHandle;
        mdxJsxTextTagNamePrimary: FromMarkdownHandle;
        mdxJsxTextTagNameMember: FromMarkdownHandle;
        mdxJsxTextTagNameLocal: FromMarkdownHandle;
        mdxJsxTextTagExpressionAttribute: FromMarkdownHandle;
        mdxJsxTextTagExpressionAttributeValue: FromMarkdownHandle;
        mdxJsxTextTagAttributeNamePrimary: FromMarkdownHandle;
        mdxJsxTextTagAttributeNameLocal: FromMarkdownHandle;
        mdxJsxTextTagAttributeValueLiteral: FromMarkdownHandle;
        mdxJsxTextTagAttributeValueLiteralValue: FromMarkdownHandle;
        mdxJsxTextTagAttributeValueExpression: FromMarkdownHandle;
        mdxJsxTextTagAttributeValueExpressionValue: FromMarkdownHandle;
        mdxJsxTextTagSelfClosingMarker: FromMarkdownHandle;
        mdxJsxTextTag: FromMarkdownHandle;
    };
};
/**
 * Create an extension for `mdast-util-to-markdown` to enable MDX JSX.
 *
 * This extension configures `mdast-util-to-markdown` with
 * `options.fences: true` and `options.resourceLink: true` too, do not
 * overwrite them!
 *
 */
export declare const mdxJsxToMarkdown: (options: Options & {
    printWidth?: number;
    quoteSmart?: boolean;
    tightSelfClosing?: boolean;
    patterns: Pattern[];
}) => {
    handlers: {
        mdxJsxFlowElement: ToMarkdownHandle;
        mdxJsxTextElement: ToMarkdownHandle;
    };
    unsafe: ({
        character: string;
        inConstruct: "phrasing"[];
        atBreak?: undefined;
    } | {
        atBreak: boolean;
        character: string;
        inConstruct?: undefined;
    })[];
    fences: boolean;
    resourceLink: boolean;
    bullet?: "-" | "*" | "+" | null | undefined;
    bulletOther?: "-" | "*" | "+" | null | undefined;
    bulletOrdered?: "." | ")" | null | undefined;
    bulletOrderedOther?: "." | ")" | null | undefined;
    closeAtx?: boolean | null | undefined;
    emphasis?: "_" | "*" | null | undefined;
    fence?: "~" | "`" | null | undefined;
    incrementListMarker?: boolean | null | undefined;
    listItemIndent?: "tab" | "one" | "mixed" | null | undefined;
    quote?: "\"" | "'" | null | undefined;
    rule?: "-" | "_" | "*" | null | undefined;
    ruleRepetition?: number | null | undefined;
    ruleSpaces?: boolean | null | undefined;
    setext?: boolean | null | undefined;
    strong?: "_" | "*" | null | undefined;
    tightDefinitions?: boolean | null | undefined;
    join?: Array<import("mdast-util-to-markdown").Join> | null | undefined;
    extensions?: Array<Options> | null | undefined;
    printWidth?: number;
    quoteSmart?: boolean;
    tightSelfClosing?: boolean;
    patterns: Pattern[];
};
