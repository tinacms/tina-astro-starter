const NODE_INITIAL = 0;
const NODE_SUCCESS = 1;
const NODE_ERRORED = 2;
const START_OF_INPUT = `\u0001`;
const END_OF_INPUT = `\u0000`;
const HELP_COMMAND_INDEX = -1;
const HELP_REGEX = /^(-h|--help)(?:=([0-9]+))?$/;
const OPTION_REGEX = /^(--[a-z]+(?:-[a-z]+)*|-[a-zA-Z]+)$/;
const BATCH_REGEX = /^-[a-zA-Z]{2,}$/;
const BINDING_REGEX = /^([^=]+)=([\s\S]*)$/;
const DEBUG = process.env.DEBUG_CLI === `1`;

export { BATCH_REGEX, BINDING_REGEX, DEBUG, END_OF_INPUT, HELP_COMMAND_INDEX, HELP_REGEX, NODE_ERRORED, NODE_INITIAL, NODE_SUCCESS, OPTION_REGEX, START_OF_INPUT };
