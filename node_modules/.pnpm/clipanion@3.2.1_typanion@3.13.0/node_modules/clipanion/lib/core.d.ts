export declare function debug(str: string): void;
export declare type StateMachine = {
    nodes: Array<Node>;
};
export declare type RunState = {
    candidateUsage: string | null;
    requiredOptions: Array<Array<string>>;
    errorMessage: string | null;
    ignoreOptions: boolean;
    options: Array<{
        name: string;
        value: any;
    }>;
    path: Array<string>;
    positionals: Array<{
        value: string;
        extra: boolean | typeof NoLimits;
    }>;
    remainder: string | null;
    selectedIndex: number | null;
};
export declare function makeStateMachine(): StateMachine;
export declare function makeAnyOfMachine(inputs: Array<StateMachine>): StateMachine;
export declare function injectNode(machine: StateMachine, node: Node): number;
export declare function simplifyMachine(input: StateMachine): void;
export declare function debugMachine(machine: StateMachine, { prefix }?: {
    prefix?: string;
}): void;
export declare function runMachineInternal(machine: StateMachine, input: Array<string>, partial?: boolean): {
    node: number;
    state: RunState;
}[];
export declare function trimSmallerBranches(branches: Array<{
    node: number;
    state: RunState;
}>): {
    node: number;
    state: RunState;
}[];
export declare function selectBestState(input: Array<string>, states: Array<RunState>): RunState;
export declare function aggregateHelpStates(states: Array<RunState>): RunState[];
declare type Transition = {
    to: number;
    reducer?: Callback<keyof typeof reducers, typeof reducers>;
};
declare type Node = {
    dynamics: Array<[Callback<keyof typeof tests, typeof tests>, Transition]>;
    shortcuts: Array<Transition>;
    statics: {
        [segment: string]: Array<Transition>;
    };
};
export declare function makeNode(): Node;
export declare function isTerminalNode(node: number): boolean;
export declare function cloneTransition(input: Transition, offset?: number): {
    to: number;
    reducer: "setCandidateState" | "setSelectedIndex" | "pushBatch" | "pushBound" | "pushPath" | "pushPositional" | "pushExtra" | "pushExtraNoLimits" | "pushTrue" | "pushFalse" | "pushUndefined" | "pushStringValue" | "setStringValue" | "inhibateOptions" | "useHelp" | "setError" | "setOptionArityError" | ["setCandidateState" | "setSelectedIndex" | "pushBatch" | "pushBound" | "pushPath" | "pushPositional" | "pushExtra" | "pushExtraNoLimits" | "pushTrue" | "pushFalse" | "pushUndefined" | "pushStringValue" | "setStringValue" | "inhibateOptions" | "useHelp" | "setError" | "setOptionArityError"] | ["setCandidateState" | "setSelectedIndex" | "pushBatch" | "pushBound" | "pushPath" | "pushPositional" | "pushExtra" | "pushExtraNoLimits" | "pushTrue" | "pushFalse" | "pushUndefined" | "pushStringValue" | "setStringValue" | "inhibateOptions" | "useHelp" | "setError" | "setOptionArityError", Partial<RunState>] | ["setCandidateState" | "setSelectedIndex" | "pushBatch" | "pushBound" | "pushPath" | "pushPositional" | "pushExtra" | "pushExtraNoLimits" | "pushTrue" | "pushFalse" | "pushUndefined" | "pushStringValue" | "setStringValue" | "inhibateOptions" | "useHelp" | "setError" | "setOptionArityError", number] | ["setCandidateState" | "setSelectedIndex" | "pushBatch" | "pushBound" | "pushPath" | "pushPositional" | "pushExtra" | "pushExtraNoLimits" | "pushTrue" | "pushFalse" | "pushUndefined" | "pushStringValue" | "setStringValue" | "inhibateOptions" | "useHelp" | "setError" | "setOptionArityError", (string | undefined)?] | ["setCandidateState" | "setSelectedIndex" | "pushBatch" | "pushBound" | "pushPath" | "pushPositional" | "pushExtra" | "pushExtraNoLimits" | "pushTrue" | "pushFalse" | "pushUndefined" | "pushStringValue" | "setStringValue" | "inhibateOptions" | "useHelp" | "setError" | "setOptionArityError", string] | undefined;
};
export declare function cloneNode(input: Node, offset?: number): Node;
export declare function registerDynamic<T extends keyof typeof tests, R extends keyof typeof reducers>(machine: StateMachine, from: number, test: Callback<T, typeof tests>, to: number, reducer?: Callback<R, typeof reducers>): void;
export declare function registerShortcut<R extends keyof typeof reducers>(machine: StateMachine, from: number, to: number, reducer?: Callback<R, typeof reducers>): void;
export declare function registerStatic<R extends keyof typeof reducers>(machine: StateMachine, from: number, test: string, to: number, reducer?: Callback<R, typeof reducers>): void;
declare type UndefinedKeys<T> = {
    [P in keyof T]-?: undefined extends T[P] ? P : never;
}[keyof T];
declare type UndefinedTupleKeys<T extends Array<unknown>> = UndefinedKeys<Omit<T, keyof []>>;
declare type TupleKeys<T> = Exclude<keyof T, keyof []>;
export declare type CallbackFn<P extends Array<any>, R> = (state: RunState, segment: string, ...args: P) => R;
export declare type CallbackFnParameters<T extends CallbackFn<any, any>> = T extends ((state: RunState, segment: string, ...args: infer P) => any) ? P : never;
export declare type CallbackStore<T extends string, R> = Record<T, CallbackFn<any, R>>;
export declare type Callback<T extends string, S extends CallbackStore<T, any>> = [
    TupleKeys<CallbackFnParameters<S[T]>>
] extends [UndefinedTupleKeys<CallbackFnParameters<S[T]>>] ? (T | [T, ...CallbackFnParameters<S[T]>]) : [T, ...CallbackFnParameters<S[T]>];
export declare function execute<T extends string, R, S extends CallbackStore<T, R>>(store: S, callback: Callback<T, S>, state: RunState, segment: string): R;
export declare function suggest(callback: Callback<keyof typeof tests, typeof tests>, state: RunState): Array<string> | null;
export declare const tests: {
    always: () => boolean;
    isOptionLike: (state: RunState, segment: string) => boolean;
    isNotOptionLike: (state: RunState, segment: string) => boolean;
    isOption: (state: RunState, segment: string, name: string, hidden?: boolean) => boolean;
    isBatchOption: (state: RunState, segment: string, names: Array<string>) => boolean;
    isBoundOption: (state: RunState, segment: string, names: Array<string>, options: Array<OptDefinition>) => boolean;
    isNegatedOption: (state: RunState, segment: string, name: string) => boolean;
    isHelp: (state: RunState, segment: string) => boolean;
    isUnsupportedOption: (state: RunState, segment: string, names: Array<string>) => boolean;
    isInvalidOption: (state: RunState, segment: string) => boolean;
};
export declare const reducers: {
    setCandidateState: (state: RunState, segment: string, candidateState: Partial<RunState>) => {
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        options: Array<{
            name: string;
            value: any;
        }>;
        path: Array<string>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    setSelectedIndex: (state: RunState, segment: string, index: number) => {
        selectedIndex: number;
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        options: Array<{
            name: string;
            value: any;
        }>;
        path: Array<string>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
    };
    pushBatch: (state: RunState, segment: string) => {
        options: {
            name: string;
            value: any;
        }[];
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        path: Array<string>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    pushBound: (state: RunState, segment: string) => {
        options: {
            name: string;
            value: any;
        }[];
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        path: Array<string>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    pushPath: (state: RunState, segment: string) => {
        path: string[];
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        options: Array<{
            name: string;
            value: any;
        }>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    pushPositional: (state: RunState, segment: string) => {
        positionals: {
            value: string;
            extra: boolean | typeof NoLimits;
        }[];
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        options: Array<{
            name: string;
            value: any;
        }>;
        path: Array<string>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    pushExtra: (state: RunState, segment: string) => {
        positionals: {
            value: string;
            extra: boolean | typeof NoLimits;
        }[];
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        options: Array<{
            name: string;
            value: any;
        }>;
        path: Array<string>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    pushExtraNoLimits: (state: RunState, segment: string) => {
        positionals: {
            value: string;
            extra: boolean | typeof NoLimits;
        }[];
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        options: Array<{
            name: string;
            value: any;
        }>;
        path: Array<string>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    pushTrue: (state: RunState, segment: string, name?: string) => {
        options: {
            name: string;
            value: any;
        }[];
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        path: Array<string>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    pushFalse: (state: RunState, segment: string, name?: string) => {
        options: {
            name: string;
            value: any;
        }[];
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        path: Array<string>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    pushUndefined: (state: RunState, segment: string) => {
        options: {
            name: string;
            value: any;
        }[];
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        path: Array<string>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    pushStringValue: (state: RunState, segment: string) => {
        options: {
            name: string;
            value: any;
        }[];
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        path: Array<string>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    setStringValue: (state: RunState, segment: string) => {
        options: {
            name: string;
            value: any;
        }[];
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        path: Array<string>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    inhibateOptions: (state: RunState) => {
        ignoreOptions: boolean;
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        options: Array<{
            name: string;
            value: any;
        }>;
        path: Array<string>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    useHelp: (state: RunState, segment: string, command: number) => {
        options: {
            name: string;
            value: string;
        }[];
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        errorMessage: string | null;
        ignoreOptions: boolean;
        path: Array<string>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    setError: (state: RunState, segment: string, errorMessage: string) => {
        errorMessage: string;
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        ignoreOptions: boolean;
        options: Array<{
            name: string;
            value: any;
        }>;
        path: Array<string>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
        selectedIndex: number | null;
    };
    setOptionArityError: (state: RunState, segment: string) => {
        errorMessage: string;
        candidateUsage: string | null;
        requiredOptions: Array<Array<string>>;
        ignoreOptions: boolean;
        options: Array<{
            name: string;
            value: any;
        }>;
        path: Array<string>;
        positionals: Array<{
            value: string;
            extra: boolean | typeof NoLimits;
        }>;
        remainder: string | null;
        selectedIndex: number | null;
    };
};
export declare const NoLimits: unique symbol;
export declare type ArityDefinition = {
    leading: Array<string>;
    extra: Array<string> | typeof NoLimits;
    trailing: Array<string>;
    proxy: boolean;
};
export declare type OptDefinition = {
    names: Array<string>;
    description?: string;
    arity: number;
    hidden: boolean;
    required: boolean;
    allowBinding: boolean;
};
export declare class CommandBuilder<Context> {
    readonly cliIndex: number;
    readonly cliOpts: Readonly<CliOptions>;
    readonly allOptionNames: Array<string>;
    readonly arity: ArityDefinition;
    readonly options: Array<OptDefinition>;
    readonly paths: Array<Array<string>>;
    private context?;
    constructor(cliIndex: number, cliOpts: CliOptions);
    addPath(path: Array<string>): void;
    setArity({ leading, trailing, extra, proxy }: Partial<ArityDefinition>): void;
    addPositional({ name, required }?: {
        name?: string;
        required?: boolean;
    }): void;
    addRest({ name, required }?: {
        name?: string;
        required?: number;
    }): void;
    addProxy({ required }?: {
        name?: string;
        required?: number;
    }): void;
    addOption({ names, description, arity, hidden, required, allowBinding }: Partial<OptDefinition> & {
        names: Array<string>;
    }): void;
    setContext(context: Context): void;
    usage({ detailed, inlineOptions }?: {
        detailed?: boolean;
        inlineOptions?: boolean;
    }): {
        usage: string;
        options: {
            definition: string;
            description: string;
            required: boolean;
        }[];
    };
    compile(): {
        machine: StateMachine;
        context: Context;
    };
    private registerOptions;
}
export declare type CliOptions = {
    binaryName: string;
};
export declare type CliBuilderCallback<Context> = (command: CommandBuilder<Context>) => CommandBuilder<Context> | void;
export declare class CliBuilder<Context> {
    private readonly opts;
    private readonly builders;
    static build<Context>(cbs: Array<CliBuilderCallback<Context>>, opts?: Partial<CliOptions>): {
        machine: StateMachine;
        contexts: Context[];
        process: (input: string[]) => RunState;
        suggest: (input: string[], partial: boolean) => string[][];
    };
    constructor({ binaryName }?: Partial<CliOptions>);
    getBuilderByIndex(n: number): CommandBuilder<Context>;
    commands(cbs: Array<CliBuilderCallback<Context>>): this;
    command(): CommandBuilder<Context>;
    compile(): {
        machine: StateMachine;
        contexts: Context[];
        process: (input: Array<string>) => RunState;
        suggest: (input: Array<string>, partial: boolean) => string[][];
    };
}
export {};
