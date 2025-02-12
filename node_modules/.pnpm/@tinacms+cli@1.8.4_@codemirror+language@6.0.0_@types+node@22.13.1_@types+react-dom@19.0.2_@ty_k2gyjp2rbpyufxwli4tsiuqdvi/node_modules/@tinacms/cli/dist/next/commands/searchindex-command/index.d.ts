import { Command } from 'clipanion';
export declare class SearchIndexCommand extends Command {
    static paths: string[][];
    rootPath: string;
    verbose: boolean;
    static usage: import("clipanion").Usage;
    catch(error: any): Promise<void>;
    execute(): Promise<number | void>;
}
