import { Command } from 'clipanion';
export declare class AuditCommand extends Command {
    static paths: string[][];
    rootPath: string;
    verbose: boolean;
    clean: boolean;
    useDefaultValues: boolean;
    noTelemetry: boolean;
    datalayerPort: string;
    static usage: import("clipanion").Usage;
    catch(error: any): Promise<void>;
    execute(): Promise<number | void>;
}
