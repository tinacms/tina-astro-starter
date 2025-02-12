import { InitEnvironment } from '.';
import { Config } from './prompts';
declare function configure(env: InitEnvironment, opts: {
    debug?: boolean;
    isBackend?: boolean;
}): Promise<Config>;
export default configure;
