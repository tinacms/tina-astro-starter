'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('./constants.js');
var errors = require('./errors.js');

// ------------------------------------------------------------------------
function debug(str) {
    if (constants.DEBUG) {
        console.log(str);
    }
}
const basicHelpState = {
    candidateUsage: null,
    requiredOptions: [],
    errorMessage: null,
    ignoreOptions: false,
    path: [],
    positionals: [],
    options: [],
    remainder: null,
    selectedIndex: constants.HELP_COMMAND_INDEX,
};
function makeStateMachine() {
    return {
        nodes: [makeNode(), makeNode(), makeNode()],
    };
}
function makeAnyOfMachine(inputs) {
    const output = makeStateMachine();
    const heads = [];
    let offset = output.nodes.length;
    for (const input of inputs) {
        heads.push(offset);
        for (let t = 0; t < input.nodes.length; ++t)
            if (!isTerminalNode(t))
                output.nodes.push(cloneNode(input.nodes[t], offset));
        offset += input.nodes.length - 2;
    }
    for (const head of heads)
        registerShortcut(output, constants.NODE_INITIAL, head);
    return output;
}
function injectNode(machine, node) {
    machine.nodes.push(node);
    return machine.nodes.length - 1;
}
function simplifyMachine(input) {
    const visited = new Set();
    const process = (node) => {
        if (visited.has(node))
            return;
        visited.add(node);
        const nodeDef = input.nodes[node];
        for (const transitions of Object.values(nodeDef.statics))
            for (const { to } of transitions)
                process(to);
        for (const [, { to }] of nodeDef.dynamics)
            process(to);
        for (const { to } of nodeDef.shortcuts)
            process(to);
        const shortcuts = new Set(nodeDef.shortcuts.map(({ to }) => to));
        while (nodeDef.shortcuts.length > 0) {
            const { to } = nodeDef.shortcuts.shift();
            const toDef = input.nodes[to];
            for (const [segment, transitions] of Object.entries(toDef.statics)) {
                const store = !Object.prototype.hasOwnProperty.call(nodeDef.statics, segment)
                    ? nodeDef.statics[segment] = []
                    : nodeDef.statics[segment];
                for (const transition of transitions) {
                    if (!store.some(({ to }) => transition.to === to)) {
                        store.push(transition);
                    }
                }
            }
            for (const [test, transition] of toDef.dynamics)
                if (!nodeDef.dynamics.some(([otherTest, { to }]) => test === otherTest && transition.to === to))
                    nodeDef.dynamics.push([test, transition]);
            for (const transition of toDef.shortcuts) {
                if (!shortcuts.has(transition.to)) {
                    nodeDef.shortcuts.push(transition);
                    shortcuts.add(transition.to);
                }
            }
        }
    };
    process(constants.NODE_INITIAL);
}
function debugMachine(machine, { prefix = `` } = {}) {
    // Don't iterate unless it's needed
    if (constants.DEBUG) {
        debug(`${prefix}Nodes are:`);
        for (let t = 0; t < machine.nodes.length; ++t) {
            debug(`${prefix}  ${t}: ${JSON.stringify(machine.nodes[t])}`);
        }
    }
}
function runMachineInternal(machine, input, partial = false) {
    debug(`Running a vm on ${JSON.stringify(input)}`);
    let branches = [{ node: constants.NODE_INITIAL, state: {
                candidateUsage: null,
                requiredOptions: [],
                errorMessage: null,
                ignoreOptions: false,
                options: [],
                path: [],
                positionals: [],
                remainder: null,
                selectedIndex: null,
            } }];
    debugMachine(machine, { prefix: `  ` });
    const tokens = [constants.START_OF_INPUT, ...input];
    for (let t = 0; t < tokens.length; ++t) {
        const segment = tokens[t];
        debug(`  Processing ${JSON.stringify(segment)}`);
        const nextBranches = [];
        for (const { node, state } of branches) {
            debug(`    Current node is ${node}`);
            const nodeDef = machine.nodes[node];
            if (node === constants.NODE_ERRORED) {
                nextBranches.push({ node, state });
                continue;
            }
            console.assert(nodeDef.shortcuts.length === 0, `Shortcuts should have been eliminated by now`);
            const hasExactMatch = Object.prototype.hasOwnProperty.call(nodeDef.statics, segment);
            if (!partial || t < tokens.length - 1 || hasExactMatch) {
                if (hasExactMatch) {
                    const transitions = nodeDef.statics[segment];
                    for (const { to, reducer } of transitions) {
                        nextBranches.push({ node: to, state: typeof reducer !== `undefined` ? execute(reducers, reducer, state, segment) : state });
                        debug(`      Static transition to ${to} found`);
                    }
                }
                else {
                    debug(`      No static transition found`);
                }
            }
            else {
                let hasMatches = false;
                for (const candidate of Object.keys(nodeDef.statics)) {
                    if (!candidate.startsWith(segment))
                        continue;
                    if (segment === candidate) {
                        for (const { to, reducer } of nodeDef.statics[candidate]) {
                            nextBranches.push({ node: to, state: typeof reducer !== `undefined` ? execute(reducers, reducer, state, segment) : state });
                            debug(`      Static transition to ${to} found`);
                        }
                    }
                    else {
                        for (const { to } of nodeDef.statics[candidate]) {
                            nextBranches.push({ node: to, state: { ...state, remainder: candidate.slice(segment.length) } });
                            debug(`      Static transition to ${to} found (partial match)`);
                        }
                    }
                    hasMatches = true;
                }
                if (!hasMatches) {
                    debug(`      No partial static transition found`);
                }
            }
            if (segment !== constants.END_OF_INPUT) {
                for (const [test, { to, reducer }] of nodeDef.dynamics) {
                    if (execute(tests, test, state, segment)) {
                        nextBranches.push({ node: to, state: typeof reducer !== `undefined` ? execute(reducers, reducer, state, segment) : state });
                        debug(`      Dynamic transition to ${to} found (via ${test})`);
                    }
                }
            }
        }
        if (nextBranches.length === 0 && segment === constants.END_OF_INPUT && input.length === 1) {
            return [{
                    node: constants.NODE_INITIAL,
                    state: basicHelpState,
                }];
        }
        if (nextBranches.length === 0) {
            throw new errors.UnknownSyntaxError(input, branches.filter(({ node }) => {
                return node !== constants.NODE_ERRORED;
            }).map(({ state }) => {
                return { usage: state.candidateUsage, reason: null };
            }));
        }
        if (nextBranches.every(({ node }) => node === constants.NODE_ERRORED)) {
            throw new errors.UnknownSyntaxError(input, nextBranches.map(({ state }) => {
                return { usage: state.candidateUsage, reason: state.errorMessage };
            }));
        }
        branches = trimSmallerBranches(nextBranches);
    }
    if (branches.length > 0) {
        debug(`  Results:`);
        for (const branch of branches) {
            debug(`    - ${branch.node} -> ${JSON.stringify(branch.state)}`);
        }
    }
    else {
        debug(`  No results`);
    }
    return branches;
}
function checkIfNodeIsFinished(node, state) {
    if (state.selectedIndex !== null)
        return true;
    if (Object.prototype.hasOwnProperty.call(node.statics, constants.END_OF_INPUT))
        for (const { to } of node.statics[constants.END_OF_INPUT])
            if (to === constants.NODE_SUCCESS)
                return true;
    return false;
}
function suggestMachine(machine, input, partial) {
    // If we're accepting partial matches, then exact matches need to be
    // prefixed with an extra space.
    const prefix = partial && input.length > 0 ? [``] : [];
    const branches = runMachineInternal(machine, input, partial);
    const suggestions = [];
    const suggestionsJson = new Set();
    const traverseSuggestion = (suggestion, node, skipFirst = true) => {
        let nextNodes = [node];
        while (nextNodes.length > 0) {
            const currentNodes = nextNodes;
            nextNodes = [];
            for (const node of currentNodes) {
                const nodeDef = machine.nodes[node];
                const keys = Object.keys(nodeDef.statics);
                // The fact that `key` is unused is likely a bug, but no one has investigated it yet.
                // TODO: Investigate it.
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                for (const key of Object.keys(nodeDef.statics)) {
                    const segment = keys[0];
                    for (const { to, reducer } of nodeDef.statics[segment]) {
                        if (reducer !== `pushPath`)
                            continue;
                        if (!skipFirst)
                            suggestion.push(segment);
                        nextNodes.push(to);
                    }
                }
            }
            skipFirst = false;
        }
        const json = JSON.stringify(suggestion);
        if (suggestionsJson.has(json))
            return;
        suggestions.push(suggestion);
        suggestionsJson.add(json);
    };
    for (const { node, state } of branches) {
        if (state.remainder !== null) {
            traverseSuggestion([state.remainder], node);
            continue;
        }
        const nodeDef = machine.nodes[node];
        const isFinished = checkIfNodeIsFinished(nodeDef, state);
        for (const [candidate, transitions] of Object.entries(nodeDef.statics))
            if ((isFinished && candidate !== constants.END_OF_INPUT) || (!candidate.startsWith(`-`) && transitions.some(({ reducer }) => reducer === `pushPath`)))
                traverseSuggestion([...prefix, candidate], node);
        if (!isFinished)
            continue;
        for (const [test, { to }] of nodeDef.dynamics) {
            if (to === constants.NODE_ERRORED)
                continue;
            const tokens = suggest(test, state);
            if (tokens === null)
                continue;
            for (const token of tokens) {
                traverseSuggestion([...prefix, token], node);
            }
        }
    }
    return [...suggestions].sort();
}
function runMachine(machine, input) {
    const branches = runMachineInternal(machine, [...input, constants.END_OF_INPUT]);
    return selectBestState(input, branches.map(({ state }) => {
        return state;
    }));
}
function trimSmallerBranches(branches) {
    let maxPathSize = 0;
    for (const { state } of branches)
        if (state.path.length > maxPathSize)
            maxPathSize = state.path.length;
    return branches.filter(({ state }) => {
        return state.path.length === maxPathSize;
    });
}
function selectBestState(input, states) {
    const terminalStates = states.filter(state => {
        return state.selectedIndex !== null;
    });
    if (terminalStates.length === 0)
        throw new Error();
    const requiredOptionsSetStates = terminalStates.filter(state => state.selectedIndex === constants.HELP_COMMAND_INDEX || state.requiredOptions.every(names => names.some(name => state.options.find(opt => opt.name === name))));
    if (requiredOptionsSetStates.length === 0) {
        throw new errors.UnknownSyntaxError(input, terminalStates.map(state => ({
            usage: state.candidateUsage,
            reason: null,
        })));
    }
    let maxPathSize = 0;
    for (const state of requiredOptionsSetStates)
        if (state.path.length > maxPathSize)
            maxPathSize = state.path.length;
    const bestPathBranches = requiredOptionsSetStates.filter(state => {
        return state.path.length === maxPathSize;
    });
    const getPositionalCount = (state) => state.positionals.filter(({ extra }) => {
        return !extra;
    }).length + state.options.length;
    const statesWithPositionalCount = bestPathBranches.map(state => {
        return { state, positionalCount: getPositionalCount(state) };
    });
    let maxPositionalCount = 0;
    for (const { positionalCount } of statesWithPositionalCount)
        if (positionalCount > maxPositionalCount)
            maxPositionalCount = positionalCount;
    const bestPositionalStates = statesWithPositionalCount.filter(({ positionalCount }) => {
        return positionalCount === maxPositionalCount;
    }).map(({ state }) => {
        return state;
    });
    const fixedStates = aggregateHelpStates(bestPositionalStates);
    if (fixedStates.length > 1)
        throw new errors.AmbiguousSyntaxError(input, fixedStates.map(state => state.candidateUsage));
    return fixedStates[0];
}
function aggregateHelpStates(states) {
    const notHelps = [];
    const helps = [];
    for (const state of states) {
        if (state.selectedIndex === constants.HELP_COMMAND_INDEX) {
            helps.push(state);
        }
        else {
            notHelps.push(state);
        }
    }
    if (helps.length > 0) {
        notHelps.push({
            ...basicHelpState,
            path: findCommonPrefix(...helps.map(state => state.path)),
            options: helps.reduce((options, state) => options.concat(state.options), []),
        });
    }
    return notHelps;
}
function findCommonPrefix(firstPath, secondPath, ...rest) {
    if (secondPath === undefined)
        return Array.from(firstPath);
    return findCommonPrefix(firstPath.filter((segment, i) => segment === secondPath[i]), ...rest);
}
function makeNode() {
    return {
        dynamics: [],
        shortcuts: [],
        statics: {},
    };
}
function isTerminalNode(node) {
    return node === constants.NODE_SUCCESS || node === constants.NODE_ERRORED;
}
function cloneTransition(input, offset = 0) {
    return {
        to: !isTerminalNode(input.to) ? input.to > 2 ? input.to + offset - 2 : input.to + offset : input.to,
        reducer: input.reducer,
    };
}
function cloneNode(input, offset = 0) {
    const output = makeNode();
    for (const [test, transition] of input.dynamics)
        output.dynamics.push([test, cloneTransition(transition, offset)]);
    for (const transition of input.shortcuts)
        output.shortcuts.push(cloneTransition(transition, offset));
    for (const [segment, transitions] of Object.entries(input.statics))
        output.statics[segment] = transitions.map(transition => cloneTransition(transition, offset));
    return output;
}
function registerDynamic(machine, from, test, to, reducer) {
    machine.nodes[from].dynamics.push([
        test,
        { to, reducer: reducer },
    ]);
}
function registerShortcut(machine, from, to, reducer) {
    machine.nodes[from].shortcuts.push({ to, reducer: reducer });
}
function registerStatic(machine, from, test, to, reducer) {
    const store = !Object.prototype.hasOwnProperty.call(machine.nodes[from].statics, test)
        ? machine.nodes[from].statics[test] = []
        : machine.nodes[from].statics[test];
    store.push({ to, reducer: reducer });
}
function execute(store, callback, state, segment) {
    // TypeScript's control flow can't properly narrow
    // generic conditionals for some mysterious reason
    if (Array.isArray(callback)) {
        const [name, ...args] = callback;
        return store[name](state, segment, ...args);
    }
    else {
        return store[callback](state, segment);
    }
}
function suggest(callback, state) {
    const fn = Array.isArray(callback)
        ? tests[callback[0]]
        : tests[callback];
    // @ts-ignore
    if (typeof fn.suggest === `undefined`)
        return null;
    const args = Array.isArray(callback)
        ? callback.slice(1)
        : [];
    // @ts-ignore
    return fn.suggest(state, ...args);
}
const tests = {
    always: () => {
        return true;
    },
    isOptionLike: (state, segment) => {
        return !state.ignoreOptions && (segment !== `-` && segment.startsWith(`-`));
    },
    isNotOptionLike: (state, segment) => {
        return state.ignoreOptions || segment === `-` || !segment.startsWith(`-`);
    },
    isOption: (state, segment, name, hidden) => {
        return !state.ignoreOptions && segment === name;
    },
    isBatchOption: (state, segment, names) => {
        return !state.ignoreOptions && constants.BATCH_REGEX.test(segment) && [...segment.slice(1)].every(name => names.includes(`-${name}`));
    },
    isBoundOption: (state, segment, names, options) => {
        const optionParsing = segment.match(constants.BINDING_REGEX);
        return !state.ignoreOptions && !!optionParsing && constants.OPTION_REGEX.test(optionParsing[1]) && names.includes(optionParsing[1])
            // Disallow bound options with no arguments (i.e. booleans)
            && options.filter(opt => opt.names.includes(optionParsing[1])).every(opt => opt.allowBinding);
    },
    isNegatedOption: (state, segment, name) => {
        return !state.ignoreOptions && segment === `--no-${name.slice(2)}`;
    },
    isHelp: (state, segment) => {
        return !state.ignoreOptions && constants.HELP_REGEX.test(segment);
    },
    isUnsupportedOption: (state, segment, names) => {
        return !state.ignoreOptions && segment.startsWith(`-`) && constants.OPTION_REGEX.test(segment) && !names.includes(segment);
    },
    isInvalidOption: (state, segment) => {
        return !state.ignoreOptions && segment.startsWith(`-`) && !constants.OPTION_REGEX.test(segment);
    },
};
// @ts-ignore
tests.isOption.suggest = (state, name, hidden = true) => {
    return !hidden ? [name] : null;
};
const reducers = {
    setCandidateState: (state, segment, candidateState) => {
        return { ...state, ...candidateState };
    },
    setSelectedIndex: (state, segment, index) => {
        return { ...state, selectedIndex: index };
    },
    pushBatch: (state, segment) => {
        return { ...state, options: state.options.concat([...segment.slice(1)].map(name => ({ name: `-${name}`, value: true }))) };
    },
    pushBound: (state, segment) => {
        const [, name, value] = segment.match(constants.BINDING_REGEX);
        return { ...state, options: state.options.concat({ name, value }) };
    },
    pushPath: (state, segment) => {
        return { ...state, path: state.path.concat(segment) };
    },
    pushPositional: (state, segment) => {
        return { ...state, positionals: state.positionals.concat({ value: segment, extra: false }) };
    },
    pushExtra: (state, segment) => {
        return { ...state, positionals: state.positionals.concat({ value: segment, extra: true }) };
    },
    pushExtraNoLimits: (state, segment) => {
        return { ...state, positionals: state.positionals.concat({ value: segment, extra: NoLimits }) };
    },
    pushTrue: (state, segment, name = segment) => {
        return { ...state, options: state.options.concat({ name: segment, value: true }) };
    },
    pushFalse: (state, segment, name = segment) => {
        return { ...state, options: state.options.concat({ name, value: false }) };
    },
    pushUndefined: (state, segment) => {
        return { ...state, options: state.options.concat({ name: segment, value: undefined }) };
    },
    pushStringValue: (state, segment) => {
        var _a;
        const copy = { ...state, options: [...state.options] };
        const lastOption = state.options[state.options.length - 1];
        lastOption.value = ((_a = lastOption.value) !== null && _a !== void 0 ? _a : []).concat([segment]);
        return copy;
    },
    setStringValue: (state, segment) => {
        const copy = { ...state, options: [...state.options] };
        const lastOption = state.options[state.options.length - 1];
        lastOption.value = segment;
        return copy;
    },
    inhibateOptions: (state) => {
        return { ...state, ignoreOptions: true };
    },
    useHelp: (state, segment, command) => {
        const [, /* name */ , index] = segment.match(constants.HELP_REGEX);
        if (typeof index !== `undefined`) {
            return { ...state, options: [{ name: `-c`, value: String(command) }, { name: `-i`, value: index }] };
        }
        else {
            return { ...state, options: [{ name: `-c`, value: String(command) }] };
        }
    },
    setError: (state, segment, errorMessage) => {
        if (segment === constants.END_OF_INPUT) {
            return { ...state, errorMessage: `${errorMessage}.` };
        }
        else {
            return { ...state, errorMessage: `${errorMessage} ("${segment}").` };
        }
    },
    setOptionArityError: (state, segment) => {
        const lastOption = state.options[state.options.length - 1];
        return { ...state, errorMessage: `Not enough arguments to option ${lastOption.name}.` };
    },
};
// ------------------------------------------------------------------------
const NoLimits = Symbol();
class CommandBuilder {
    constructor(cliIndex, cliOpts) {
        this.allOptionNames = [];
        this.arity = { leading: [], trailing: [], extra: [], proxy: false };
        this.options = [];
        this.paths = [];
        this.cliIndex = cliIndex;
        this.cliOpts = cliOpts;
    }
    addPath(path) {
        this.paths.push(path);
    }
    setArity({ leading = this.arity.leading, trailing = this.arity.trailing, extra = this.arity.extra, proxy = this.arity.proxy }) {
        Object.assign(this.arity, { leading, trailing, extra, proxy });
    }
    addPositional({ name = `arg`, required = true } = {}) {
        if (!required && this.arity.extra === NoLimits)
            throw new Error(`Optional parameters cannot be declared when using .rest() or .proxy()`);
        if (!required && this.arity.trailing.length > 0)
            throw new Error(`Optional parameters cannot be declared after the required trailing positional arguments`);
        if (!required && this.arity.extra !== NoLimits) {
            this.arity.extra.push(name);
        }
        else if (this.arity.extra !== NoLimits && this.arity.extra.length === 0) {
            this.arity.leading.push(name);
        }
        else {
            this.arity.trailing.push(name);
        }
    }
    addRest({ name = `arg`, required = 0 } = {}) {
        if (this.arity.extra === NoLimits)
            throw new Error(`Infinite lists cannot be declared multiple times in the same command`);
        if (this.arity.trailing.length > 0)
            throw new Error(`Infinite lists cannot be declared after the required trailing positional arguments`);
        for (let t = 0; t < required; ++t)
            this.addPositional({ name });
        this.arity.extra = NoLimits;
    }
    addProxy({ required = 0 } = {}) {
        this.addRest({ required });
        this.arity.proxy = true;
    }
    addOption({ names, description, arity = 0, hidden = false, required = false, allowBinding = true }) {
        if (!allowBinding && arity > 1)
            throw new Error(`The arity cannot be higher than 1 when the option only supports the --arg=value syntax`);
        if (!Number.isInteger(arity))
            throw new Error(`The arity must be an integer, got ${arity}`);
        if (arity < 0)
            throw new Error(`The arity must be positive, got ${arity}`);
        this.allOptionNames.push(...names);
        this.options.push({ names, description, arity, hidden, required, allowBinding });
    }
    setContext(context) {
        this.context = context;
    }
    usage({ detailed = true, inlineOptions = true } = {}) {
        const segments = [this.cliOpts.binaryName];
        const detailedOptionList = [];
        if (this.paths.length > 0)
            segments.push(...this.paths[0]);
        if (detailed) {
            for (const { names, arity, hidden, description, required } of this.options) {
                if (hidden)
                    continue;
                const args = [];
                for (let t = 0; t < arity; ++t)
                    args.push(` #${t}`);
                const definition = `${names.join(`,`)}${args.join(``)}`;
                if (!inlineOptions && description) {
                    detailedOptionList.push({ definition, description, required });
                }
                else {
                    segments.push(required ? `<${definition}>` : `[${definition}]`);
                }
            }
            segments.push(...this.arity.leading.map(name => `<${name}>`));
            if (this.arity.extra === NoLimits)
                segments.push(`...`);
            else
                segments.push(...this.arity.extra.map(name => `[${name}]`));
            segments.push(...this.arity.trailing.map(name => `<${name}>`));
        }
        const usage = segments.join(` `);
        return { usage, options: detailedOptionList };
    }
    compile() {
        if (typeof this.context === `undefined`)
            throw new Error(`Assertion failed: No context attached`);
        const machine = makeStateMachine();
        let firstNode = constants.NODE_INITIAL;
        const candidateUsage = this.usage().usage;
        const requiredOptions = this.options
            .filter(opt => opt.required)
            .map(opt => opt.names);
        firstNode = injectNode(machine, makeNode());
        registerStatic(machine, constants.NODE_INITIAL, constants.START_OF_INPUT, firstNode, [`setCandidateState`, { candidateUsage, requiredOptions }]);
        const positionalArgument = this.arity.proxy
            ? `always`
            : `isNotOptionLike`;
        const paths = this.paths.length > 0
            ? this.paths
            : [[]];
        for (const path of paths) {
            let lastPathNode = firstNode;
            // We allow options to be specified before the path. Note that we
            // only do this when there is a path, otherwise there would be
            // some redundancy with the options attached later.
            if (path.length > 0) {
                const optionPathNode = injectNode(machine, makeNode());
                registerShortcut(machine, lastPathNode, optionPathNode);
                this.registerOptions(machine, optionPathNode);
                lastPathNode = optionPathNode;
            }
            for (let t = 0; t < path.length; ++t) {
                const nextPathNode = injectNode(machine, makeNode());
                registerStatic(machine, lastPathNode, path[t], nextPathNode, `pushPath`);
                lastPathNode = nextPathNode;
            }
            if (this.arity.leading.length > 0 || !this.arity.proxy) {
                const helpNode = injectNode(machine, makeNode());
                registerDynamic(machine, lastPathNode, `isHelp`, helpNode, [`useHelp`, this.cliIndex]);
                registerDynamic(machine, helpNode, `always`, helpNode, `pushExtra`);
                registerStatic(machine, helpNode, constants.END_OF_INPUT, constants.NODE_SUCCESS, [`setSelectedIndex`, constants.HELP_COMMAND_INDEX]);
                this.registerOptions(machine, lastPathNode);
            }
            if (this.arity.leading.length > 0)
                registerStatic(machine, lastPathNode, constants.END_OF_INPUT, constants.NODE_ERRORED, [`setError`, `Not enough positional arguments`]);
            let lastLeadingNode = lastPathNode;
            for (let t = 0; t < this.arity.leading.length; ++t) {
                const nextLeadingNode = injectNode(machine, makeNode());
                if (!this.arity.proxy || t + 1 !== this.arity.leading.length)
                    this.registerOptions(machine, nextLeadingNode);
                if (this.arity.trailing.length > 0 || t + 1 !== this.arity.leading.length)
                    registerStatic(machine, nextLeadingNode, constants.END_OF_INPUT, constants.NODE_ERRORED, [`setError`, `Not enough positional arguments`]);
                registerDynamic(machine, lastLeadingNode, `isNotOptionLike`, nextLeadingNode, `pushPositional`);
                lastLeadingNode = nextLeadingNode;
            }
            let lastExtraNode = lastLeadingNode;
            if (this.arity.extra === NoLimits || this.arity.extra.length > 0) {
                const extraShortcutNode = injectNode(machine, makeNode());
                registerShortcut(machine, lastLeadingNode, extraShortcutNode);
                if (this.arity.extra === NoLimits) {
                    const extraNode = injectNode(machine, makeNode());
                    if (!this.arity.proxy)
                        this.registerOptions(machine, extraNode);
                    registerDynamic(machine, lastLeadingNode, positionalArgument, extraNode, `pushExtraNoLimits`);
                    registerDynamic(machine, extraNode, positionalArgument, extraNode, `pushExtraNoLimits`);
                    registerShortcut(machine, extraNode, extraShortcutNode);
                }
                else {
                    for (let t = 0; t < this.arity.extra.length; ++t) {
                        const nextExtraNode = injectNode(machine, makeNode());
                        if (!this.arity.proxy || t > 0)
                            this.registerOptions(machine, nextExtraNode);
                        registerDynamic(machine, lastExtraNode, positionalArgument, nextExtraNode, `pushExtra`);
                        registerShortcut(machine, nextExtraNode, extraShortcutNode);
                        lastExtraNode = nextExtraNode;
                    }
                }
                lastExtraNode = extraShortcutNode;
            }
            if (this.arity.trailing.length > 0)
                registerStatic(machine, lastExtraNode, constants.END_OF_INPUT, constants.NODE_ERRORED, [`setError`, `Not enough positional arguments`]);
            let lastTrailingNode = lastExtraNode;
            for (let t = 0; t < this.arity.trailing.length; ++t) {
                const nextTrailingNode = injectNode(machine, makeNode());
                if (!this.arity.proxy)
                    this.registerOptions(machine, nextTrailingNode);
                if (t + 1 < this.arity.trailing.length)
                    registerStatic(machine, nextTrailingNode, constants.END_OF_INPUT, constants.NODE_ERRORED, [`setError`, `Not enough positional arguments`]);
                registerDynamic(machine, lastTrailingNode, `isNotOptionLike`, nextTrailingNode, `pushPositional`);
                lastTrailingNode = nextTrailingNode;
            }
            registerDynamic(machine, lastTrailingNode, positionalArgument, constants.NODE_ERRORED, [`setError`, `Extraneous positional argument`]);
            registerStatic(machine, lastTrailingNode, constants.END_OF_INPUT, constants.NODE_SUCCESS, [`setSelectedIndex`, this.cliIndex]);
        }
        return {
            machine,
            context: this.context,
        };
    }
    registerOptions(machine, node) {
        registerDynamic(machine, node, [`isOption`, `--`], node, `inhibateOptions`);
        registerDynamic(machine, node, [`isBatchOption`, this.allOptionNames], node, `pushBatch`);
        registerDynamic(machine, node, [`isBoundOption`, this.allOptionNames, this.options], node, `pushBound`);
        registerDynamic(machine, node, [`isUnsupportedOption`, this.allOptionNames], constants.NODE_ERRORED, [`setError`, `Unsupported option name`]);
        registerDynamic(machine, node, [`isInvalidOption`], constants.NODE_ERRORED, [`setError`, `Invalid option name`]);
        for (const option of this.options) {
            const longestName = option.names.reduce((longestName, name) => {
                return name.length > longestName.length ? name : longestName;
            }, ``);
            if (option.arity === 0) {
                for (const name of option.names) {
                    registerDynamic(machine, node, [`isOption`, name, option.hidden || name !== longestName], node, `pushTrue`);
                    if (name.startsWith(`--`) && !name.startsWith(`--no-`)) {
                        registerDynamic(machine, node, [`isNegatedOption`, name], node, [`pushFalse`, name]);
                    }
                }
            }
            else {
                // We inject a new node at the end of the state machine
                let lastNode = injectNode(machine, makeNode());
                // We register transitions from the starting node to this new node
                for (const name of option.names)
                    registerDynamic(machine, node, [`isOption`, name, option.hidden || name !== longestName], lastNode, `pushUndefined`);
                // For each argument, we inject a new node at the end and we
                // register a transition from the current node to this new node
                for (let t = 0; t < option.arity; ++t) {
                    const nextNode = injectNode(machine, makeNode());
                    // We can provide better errors when another option or END_OF_INPUT is encountered
                    registerStatic(machine, lastNode, constants.END_OF_INPUT, constants.NODE_ERRORED, `setOptionArityError`);
                    registerDynamic(machine, lastNode, `isOptionLike`, constants.NODE_ERRORED, `setOptionArityError`);
                    // If the option has a single argument, no need to store it in an array
                    const action = option.arity === 1
                        ? `setStringValue`
                        : `pushStringValue`;
                    registerDynamic(machine, lastNode, `isNotOptionLike`, nextNode, action);
                    lastNode = nextNode;
                }
                // In the end, we register a shortcut from
                // the last node back to the starting node
                registerShortcut(machine, lastNode, node);
            }
        }
    }
}
class CliBuilder {
    constructor({ binaryName = `...` } = {}) {
        this.builders = [];
        this.opts = { binaryName };
    }
    static build(cbs, opts = {}) {
        return new CliBuilder(opts).commands(cbs).compile();
    }
    getBuilderByIndex(n) {
        if (!(n >= 0 && n < this.builders.length))
            throw new Error(`Assertion failed: Out-of-bound command index (${n})`);
        return this.builders[n];
    }
    commands(cbs) {
        for (const cb of cbs)
            cb(this.command());
        return this;
    }
    command() {
        const builder = new CommandBuilder(this.builders.length, this.opts);
        this.builders.push(builder);
        return builder;
    }
    compile() {
        const machines = [];
        const contexts = [];
        for (const builder of this.builders) {
            const { machine, context } = builder.compile();
            machines.push(machine);
            contexts.push(context);
        }
        const machine = makeAnyOfMachine(machines);
        simplifyMachine(machine);
        return {
            machine,
            contexts,
            process: (input) => {
                return runMachine(machine, input);
            },
            suggest: (input, partial) => {
                return suggestMachine(machine, input, partial);
            },
        };
    }
}

exports.CliBuilder = CliBuilder;
exports.CommandBuilder = CommandBuilder;
exports.NoLimits = NoLimits;
exports.aggregateHelpStates = aggregateHelpStates;
exports.cloneNode = cloneNode;
exports.cloneTransition = cloneTransition;
exports.debug = debug;
exports.debugMachine = debugMachine;
exports.execute = execute;
exports.injectNode = injectNode;
exports.isTerminalNode = isTerminalNode;
exports.makeAnyOfMachine = makeAnyOfMachine;
exports.makeNode = makeNode;
exports.makeStateMachine = makeStateMachine;
exports.reducers = reducers;
exports.registerDynamic = registerDynamic;
exports.registerShortcut = registerShortcut;
exports.registerStatic = registerStatic;
exports.runMachineInternal = runMachineInternal;
exports.selectBestState = selectBestState;
exports.simplifyMachine = simplifyMachine;
exports.suggest = suggest;
exports.tests = tests;
exports.trimSmallerBranches = trimSmallerBranches;
