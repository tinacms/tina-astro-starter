/*
  @license
	Rollup.js v4.34.6
	Fri, 07 Feb 2025 16:31:35 GMT - commit 4b8745922d37d8325197d5a6613ffbf231163c7d

	https://github.com/rollup/rollup

	Released under the MIT License.
*/
export { version as VERSION, defineConfig, rollup, watch } from './shared/node-entry.js';
import './shared/parseAst.js';
import '../native.js';
import 'node:path';
import 'path';
import 'node:process';
import 'node:perf_hooks';
import 'node:fs/promises';
