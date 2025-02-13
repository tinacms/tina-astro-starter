import { InitEnvironment } from './index';
declare const detectEnvironment: ({ baseDir, pathToForestryConfig, rootPath, debug, }: {
    baseDir?: string;
    pathToForestryConfig: string;
    rootPath: string;
    debug?: boolean;
    tinaVersion?: string;
}) => Promise<InitEnvironment>;
export default detectEnvironment;
