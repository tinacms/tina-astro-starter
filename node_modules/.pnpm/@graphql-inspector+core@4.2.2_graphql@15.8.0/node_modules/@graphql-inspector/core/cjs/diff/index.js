"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diff = exports.DiffRule = void 0;
const tslib_1 = require("tslib");
const rules = tslib_1.__importStar(require("./rules/index.js"));
const schema_js_1 = require("./schema.js");
tslib_1.__exportStar(require("./rules/types.js"), exports);
exports.DiffRule = rules;
tslib_1.__exportStar(require("./onComplete/types.js"), exports);
function diff(oldSchema, newSchema, rules = [], config) {
    const changes = (0, schema_js_1.diffSchema)(oldSchema, newSchema);
    return rules.reduce((prev, rule) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const prevChanges = yield prev;
        return rule({
            changes: prevChanges,
            oldSchema,
            newSchema,
            config,
        });
    }), Promise.resolve(changes));
}
exports.diff = diff;
