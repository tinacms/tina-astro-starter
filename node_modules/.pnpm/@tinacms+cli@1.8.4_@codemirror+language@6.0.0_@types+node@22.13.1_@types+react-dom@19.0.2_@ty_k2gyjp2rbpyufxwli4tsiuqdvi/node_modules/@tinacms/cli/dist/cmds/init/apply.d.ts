import { GeneratedFile, InitEnvironment, InitParams } from './index';
import { Config } from './prompts';
declare function apply({ env, params, config, }: {
    env: InitEnvironment;
    params: InitParams;
    config: Config;
}): Promise<void>;
export declare const addTemplateFile: ({ content, generatedFile, config, }: {
    content: string;
    generatedFile: GeneratedFile;
    config: Config;
}) => Promise<void>;
/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
export declare function execShellCommand(cmd: any): Promise<string>;
export default apply;
