import type { PromptAuthProvider, Config } from './types';
import type { Framework } from '../';
export declare const chooseAuthProvider: ({ framework, config, }: {
    config: Config;
    framework: Framework;
}) => Promise<PromptAuthProvider>;
