import { type Config } from '@tinacms/schema-tools';
export interface IndexStatusResponse {
    status: 'inprogress' | 'complete' | 'failed' | 'unknown';
    timestamp: number;
    error?: string;
}
export declare const waitForDB: (config: Config<true>, apiUrl: string, previewName?: string, verbose?: boolean) => Promise<void>;
