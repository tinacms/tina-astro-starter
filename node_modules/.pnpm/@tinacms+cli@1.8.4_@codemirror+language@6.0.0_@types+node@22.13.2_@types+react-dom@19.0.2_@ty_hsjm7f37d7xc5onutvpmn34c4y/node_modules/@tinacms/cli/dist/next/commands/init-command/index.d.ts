import { Command } from 'clipanion';
export declare class InitCommand extends Command {
    static paths: string[][];
    pathToForestryConfig: string;
    rootPath: string;
    debug: boolean;
    noTelemetry: boolean;
    tinaVersion: string;
    static usage: import("clipanion").Usage;
    catch(error: any): Promise<void>;
    execute(): Promise<number | void>;
}
