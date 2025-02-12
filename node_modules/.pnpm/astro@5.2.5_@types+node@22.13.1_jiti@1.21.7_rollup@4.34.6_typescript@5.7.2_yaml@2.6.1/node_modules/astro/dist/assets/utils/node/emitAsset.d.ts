import type * as vite from 'vite';
import type { ImageMetadata } from '../../types.js';
type FileEmitter = vite.Rollup.EmitFile;
type ImageMetadataWithContents = ImageMetadata & {
    contents?: Buffer;
};
export declare function emitESMImage(id: string | undefined, 
/** @deprecated */
_watchMode: boolean, experimentalSvgEnabled: boolean, fileEmitter?: FileEmitter): Promise<ImageMetadataWithContents | undefined>;
export {};
