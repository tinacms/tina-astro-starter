'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.BATCH_REGEX = BATCH_REGEX;
exports.BINDING_REGEX = BINDING_REGEX;
exports.DEBUG = DEBUG;
exports.END_OF_INPUT = END_OF_INPUT;
exports.HELP_COMMAND_INDEX = HELP_COMMAND_INDEX;
exports.HELP_REGEX = HELP_REGEX;
exports.NODE_ERRORED = NODE_ERRORED;
exports.NODE_INITIAL = NODE_INITIAL;
exports.NODE_SUCCESS = NODE_SUCCESS;
exports.OPTION_REGEX = OPTION_REGEX;
exports.START_OF_INPUT = START_OF_INPUT;
