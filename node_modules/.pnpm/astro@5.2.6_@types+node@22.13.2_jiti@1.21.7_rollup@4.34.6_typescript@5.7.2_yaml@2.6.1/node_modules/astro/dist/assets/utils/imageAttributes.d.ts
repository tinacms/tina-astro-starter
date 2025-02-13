import type { GetImageResult, ImageLayout, LocalImageProps, RemoteImageProps } from '../types.js';
export declare function addCSSVarsToStyle(vars: Record<string, string | false | undefined>, styles?: string | Record<string, any>): string;
export declare function applyResponsiveAttributes<T extends LocalImageProps<unknown> | RemoteImageProps<unknown>>({ layout, image, props, additionalAttributes, }: {
    layout: Exclude<ImageLayout, 'none'>;
    image: GetImageResult;
    additionalAttributes: Record<string, any>;
    props: T;
}): {
    [x: string]: any;
};
