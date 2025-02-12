interface CommandHandler<Environment, Parameters> {
    setup(p: Parameters): Promise<void>;
    detectEnvironment(p: Parameters): Promise<Environment>;
    configure(e: Environment, p: Parameters): Promise<Record<any, any>>;
    apply(Record: any, e: Environment, p: Parameters): Promise<void>;
}
export declare class CLICommand<Environment, Parameters> {
    private readonly handler;
    constructor(handler: CommandHandler<Environment, Parameters>);
    execute(params: Parameters): Promise<void>;
}
export {};
