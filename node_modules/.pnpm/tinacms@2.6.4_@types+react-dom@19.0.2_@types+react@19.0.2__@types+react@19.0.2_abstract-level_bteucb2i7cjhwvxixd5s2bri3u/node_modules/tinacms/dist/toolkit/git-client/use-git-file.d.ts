import { GitFile } from './git-file';
export declare function useGitFile(relativePath: string, format: (file: any) => string, parse: (content: string) => any): GitFile;
