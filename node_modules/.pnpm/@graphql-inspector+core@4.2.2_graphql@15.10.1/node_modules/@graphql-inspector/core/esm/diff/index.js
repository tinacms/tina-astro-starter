import { __awaiter } from "tslib";
import * as rules from './rules/index.js';
import { diffSchema } from './schema.js';
export * from './rules/types.js';
export const DiffRule = rules;
export * from './onComplete/types.js';
export function diff(oldSchema, newSchema, rules = [], config) {
    const changes = diffSchema(oldSchema, newSchema);
    return rules.reduce((prev, rule) => __awaiter(this, void 0, void 0, function* () {
        const prevChanges = yield prev;
        return rule({
            changes: prevChanges,
            oldSchema,
            newSchema,
            config,
        });
    }), Promise.resolve(changes));
}
