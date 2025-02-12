export function isDeprecated(fieldOrEnumValue) {
    var _a, _b;
    if ('isDeprecated' in fieldOrEnumValue) {
        return !!fieldOrEnumValue['isDeprecated'];
    }
    if (fieldOrEnumValue.deprecationReason != null) {
        return true;
    }
    if ((_b = (_a = fieldOrEnumValue.astNode) === null || _a === void 0 ? void 0 : _a.directives) === null || _b === void 0 ? void 0 : _b.some(directive => directive.name.value === 'deprecated')) {
        return true;
    }
    return false;
}
