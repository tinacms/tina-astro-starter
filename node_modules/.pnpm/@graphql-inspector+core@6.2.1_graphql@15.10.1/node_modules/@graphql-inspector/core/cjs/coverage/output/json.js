"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputJSON = outputJSON;
function outputJSON(coverage) {
    return JSON.stringify(coverage, null, 2);
}
