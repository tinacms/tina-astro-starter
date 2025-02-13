import childProcess from 'child_process';
export declare const startSubprocess2: ({ command }: {
    command: string;
}) => Promise<childProcess.ChildProcess>;
