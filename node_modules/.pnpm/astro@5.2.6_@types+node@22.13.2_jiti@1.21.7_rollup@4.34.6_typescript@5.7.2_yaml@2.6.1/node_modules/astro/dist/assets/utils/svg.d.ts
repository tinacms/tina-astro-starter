import type { ImageMetadata } from '../types.js';
export type SvgRenderMode = 'inline' | 'sprite';
export declare function makeSvgComponent(meta: ImageMetadata, contents: Buffer | string, options?: {
    mode?: SvgRenderMode;
}): string;
