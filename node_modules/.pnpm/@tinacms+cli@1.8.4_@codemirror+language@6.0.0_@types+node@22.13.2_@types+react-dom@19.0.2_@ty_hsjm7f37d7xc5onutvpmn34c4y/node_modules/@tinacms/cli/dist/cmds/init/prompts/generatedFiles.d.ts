import type { GeneratedFile, GeneratedFileType } from '..';
import type { Config } from './types';
export declare const askOverwriteGenerateFiles: ({ config, generatedFiles, }: {
    generatedFiles: GeneratedFile[];
    config: Config;
}) => Promise<GeneratedFileType[]>;
