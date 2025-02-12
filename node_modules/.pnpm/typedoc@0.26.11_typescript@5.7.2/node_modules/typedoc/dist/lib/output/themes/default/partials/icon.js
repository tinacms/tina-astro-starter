"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.icons = void 0;
exports.buildRefIcons = buildRefIcons;
const assert_1 = __importDefault(require("assert"));
const models_1 = require("../../../../models");
const utils_1 = require("../../../../utils");
const kindIcon = (letterPath, color, circular = false) => (utils_1.JSX.createElement("svg", { class: "tsd-kind-icon", viewBox: "0 0 24 24" },
    utils_1.JSX.createElement("rect", { fill: "var(--color-icon-background)", stroke: color, "stroke-width": "1.5", x: "1", y: "1", width: "22", height: "22", rx: circular ? "12" : "6" }),
    letterPath));
const textIcon = (letter, color, circular = false) => kindIcon(utils_1.JSX.createElement("text", { fill: "var(--color-icon-text)", x: "50%", y: "50%", "dominant-baseline": "central", "text-anchor": "middle" }, letter), color, circular);
function buildRefIcons(icons, context) {
    const refs = {};
    for (const [name, builder] of Object.entries(icons)) {
        const jsx = builder.call(icons);
        (0, assert_1.default)(jsx.tag === "svg", "TypeDoc's frontend assumes that icons are written as svg elements");
        // This one cannot be cached because the CSS selector depends on targeting SVG elements
        // within it. Ick. Surely there's a nicer way?
        if (name === "checkbox") {
            refs[name] = () => jsx;
            continue;
        }
        const ref = (utils_1.JSX.createElement("svg", { ...jsx.props, id: undefined },
            utils_1.JSX.createElement("use", { href: `${context.relativeURL("assets/icons.svg")}#icon-${name}` })));
        refs[name] = () => ref;
    }
    return refs;
}
exports.icons = {
    [models_1.ReflectionKind.Accessor]: () => textIcon("A", "var(--color-ts-accessor)", true),
    [models_1.ReflectionKind.CallSignature]() {
        return this[models_1.ReflectionKind.Function]();
    },
    [models_1.ReflectionKind.Class]: () => textIcon("C", "var(--color-ts-class)"),
    [models_1.ReflectionKind.Constructor]: () => textIcon("C", "var(--color-ts-constructor)", true),
    [models_1.ReflectionKind.ConstructorSignature]() {
        return this[models_1.ReflectionKind.Constructor]();
    },
    [models_1.ReflectionKind.Enum]: () => textIcon("E", "var(--color-ts-enum)"),
    [models_1.ReflectionKind.EnumMember]() {
        return this[models_1.ReflectionKind.Property]();
    },
    [models_1.ReflectionKind.Function]: () => textIcon("F", "var(--color-ts-function)"),
    [models_1.ReflectionKind.GetSignature]() {
        return this[models_1.ReflectionKind.Accessor]();
    },
    [models_1.ReflectionKind.IndexSignature]() {
        return this[models_1.ReflectionKind.Property]();
    },
    [models_1.ReflectionKind.Interface]: () => textIcon("I", "var(--color-ts-interface)"),
    [models_1.ReflectionKind.Method]: () => textIcon("M", "var(--color-ts-method)", true),
    [models_1.ReflectionKind.Module]: () => textIcon("M", "var(--color-ts-module)"),
    [models_1.ReflectionKind.Namespace]: () => textIcon("N", "var(--color-ts-namespace)"),
    [models_1.ReflectionKind.Parameter]() {
        return this[models_1.ReflectionKind.Property]();
    },
    [models_1.ReflectionKind.Project]() {
        return this[models_1.ReflectionKind.Module]();
    },
    [models_1.ReflectionKind.Property]: () => textIcon("P", "var(--color-ts-property)", true),
    [models_1.ReflectionKind.Reference]: () => textIcon("R", "var(--color-ts-reference)", true),
    [models_1.ReflectionKind.SetSignature]() {
        return this[models_1.ReflectionKind.Accessor]();
    },
    [models_1.ReflectionKind.TypeAlias]: () => textIcon("T", "var(--color-ts-type-alias)"),
    [models_1.ReflectionKind.TypeLiteral]() {
        return this[models_1.ReflectionKind.TypeAlias]();
    },
    [models_1.ReflectionKind.TypeParameter]() {
        return this[models_1.ReflectionKind.TypeAlias]();
    },
    [models_1.ReflectionKind.Variable]: () => textIcon("V", "var(--color-ts-variable)"),
    [models_1.ReflectionKind.Document]: () => kindIcon(utils_1.JSX.createElement("g", { stroke: "var(--color-icon-text)", fill: "none", "stroke-width": "1.5" },
        utils_1.JSX.createElement("polygon", { points: "6,5 6,19 18,19, 18,10 13,5" }),
        utils_1.JSX.createElement("line", { x1: "9", y1: "9", x2: "13", y2: "9" }),
        utils_1.JSX.createElement("line", { x1: "9", y1: "12", x2: "15", y2: "12" }),
        utils_1.JSX.createElement("line", { x1: "9", y1: "15", x2: "15", y2: "15" })), "var(--color-document)"),
    folder: () => kindIcon(utils_1.JSX.createElement("g", { stroke: "var(--color-icon-text)", fill: "none", "stroke-width": "1.5" },
        utils_1.JSX.createElement("polygon", { points: "5,5 10,5 12,8 19,8 19,18 5,18" })), "var(--color-document)"),
    chevronDown: () => (utils_1.JSX.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none" },
        utils_1.JSX.createElement("path", { d: "M4.93896 8.531L12 15.591L19.061 8.531L16.939 6.409L12 11.349L7.06098 6.409L4.93896 8.531Z", fill: "var(--color-icon-text)" }))),
    chevronSmall: () => (utils_1.JSX.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" },
        utils_1.JSX.createElement("path", { d: "M1.5 5.50969L8 11.6609L14.5 5.50969L12.5466 3.66086L8 7.96494L3.45341 3.66086L1.5 5.50969Z", fill: "var(--color-icon-text)" }))),
    checkbox: () => (utils_1.JSX.createElement("svg", { width: "32", height: "32", viewBox: "0 0 32 32", "aria-hidden": "true" },
        utils_1.JSX.createElement("rect", { class: "tsd-checkbox-background", width: "30", height: "30", x: "1", y: "1", rx: "6", fill: "none" }),
        utils_1.JSX.createElement("path", { class: "tsd-checkbox-checkmark", d: "M8.35422 16.8214L13.2143 21.75L24.6458 10.25", stroke: "none", "stroke-width": "3.5", "stroke-linejoin": "round", fill: "none" }))),
    menu: () => (utils_1.JSX.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" }, ["3", "7", "11"].map((y) => (utils_1.JSX.createElement("rect", { x: "1", y: y, width: "14", height: "2", fill: "var(--color-icon-text)" }))))),
    search: () => (utils_1.JSX.createElement("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none" },
        utils_1.JSX.createElement("path", { d: "M15.7824 13.833L12.6666 10.7177C12.5259 10.5771 12.3353 10.499 12.1353 10.499H11.6259C12.4884 9.39596 13.001 8.00859 13.001 6.49937C13.001 2.90909 10.0914 0 6.50048 0C2.90959 0 0 2.90909 0 6.49937C0 10.0896 2.90959 12.9987 6.50048 12.9987C8.00996 12.9987 9.39756 12.4863 10.5008 11.6239V12.1332C10.5008 12.3332 10.5789 12.5238 10.7195 12.6644L13.8354 15.7797C14.1292 16.0734 14.6042 16.0734 14.8948 15.7797L15.7793 14.8954C16.0731 14.6017 16.0731 14.1267 15.7824 13.833ZM6.50048 10.499C4.29094 10.499 2.50018 8.71165 2.50018 6.49937C2.50018 4.29021 4.28781 2.49976 6.50048 2.49976C8.71001 2.49976 10.5008 4.28708 10.5008 6.49937C10.5008 8.70852 8.71314 10.499 6.50048 10.499Z", fill: "var(--color-icon-text)" }))),
    anchor: () => (utils_1.JSX.createElement("svg", { viewBox: "0 0 24 24" },
        utils_1.JSX.createElement("g", { "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" },
            utils_1.JSX.createElement("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            utils_1.JSX.createElement("path", { d: "M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" }),
            utils_1.JSX.createElement("path", { d: "M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" })))),
};
