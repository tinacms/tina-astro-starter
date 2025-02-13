import type { Config, PromptGitProvider } from './types';
export declare const chooseGitProvider: ({ config }: {
    config: Config;
}) => Promise<PromptGitProvider>;
