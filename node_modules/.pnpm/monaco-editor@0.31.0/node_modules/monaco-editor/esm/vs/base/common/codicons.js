/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Emitter } from './event.js';
class Registry {
    constructor() {
        this._icons = new Map();
        this._onDidRegister = new Emitter();
    }
    add(icon) {
        const existing = this._icons.get(icon.id);
        if (!existing) {
            this._icons.set(icon.id, icon);
            this._onDidRegister.fire(icon);
        }
        else if (icon.description) {
            existing.description = icon.description;
        }
        else {
            console.error(`Duplicate registration of codicon ${icon.id}`);
        }
    }
    get(id) {
        return this._icons.get(id);
    }
    get all() {
        return this._icons.values();
    }
    get onDidRegister() {
        return this._onDidRegister.event;
    }
}
const _registry = new Registry();
export const iconRegistry = _registry;
// Selects all codicon names encapsulated in the `$()` syntax and wraps the
// results with spaces so that screen readers can read the text better.
export function getCodiconAriaLabel(text) {
    if (!text) {
        return '';
    }
    return text.replace(/\$\((.*?)\)/g, (_match, codiconName) => ` ${codiconName} `).trim();
}
/**
 * The Codicon library is a set of default icons that are built-in in VS Code.
 *
 * In the product (outside of base) Codicons should only be used as defaults. In order to have all icons in VS Code
 * themeable, component should ise define new, component specific icons using `iconRegistry.registerIcon`.
 * In that call a Codicon can be names as default.
 */
export class Codicon {
    constructor(id, definition, description) {
        this.id = id;
        this.definition = definition;
        this.description = description;
        _registry.add(this);
    }
    get classNames() { return 'codicon codicon-' + this.id; }
    // classNamesArray is useful for migrating to ES6 classlist
    get classNamesArray() { return ['codicon', 'codicon-' + this.id]; }
    get cssSelector() { return '.codicon.codicon-' + this.id; }
}
// built-in icons, with image name
Codicon.add = new Codicon('add', { fontCharacter: '\\ea60' });
Codicon.lightBulb = new Codicon('light-bulb', { fontCharacter: '\\ea61' });
Codicon.warning = new Codicon('warning', { fontCharacter: '\\ea6c' });
Codicon.info = new Codicon('info', { fontCharacter: '\\ea74' });
Codicon.close = new Codicon('close', { fontCharacter: '\\ea76' });
Codicon.symbolFolder = new Codicon('symbol-folder', { fontCharacter: '\\ea83' });
Codicon.symbolEvent = new Codicon('symbol-event', { fontCharacter: '\\ea86' });
Codicon.error = new Codicon('error', { fontCharacter: '\\ea87' });
Codicon.symbolVariable = new Codicon('symbol-variable', { fontCharacter: '\\ea88' });
Codicon.symbolArray = new Codicon('symbol-array', { fontCharacter: '\\ea8a' });
Codicon.symbolModule = new Codicon('symbol-module', { fontCharacter: '\\ea8b' });
Codicon.symbolPackage = new Codicon('symbol-package', { fontCharacter: '\\ea8b' });
Codicon.symbolNamespace = new Codicon('symbol-namespace', { fontCharacter: '\\ea8b' });
Codicon.symbolObject = new Codicon('symbol-object', { fontCharacter: '\\ea8b' });
Codicon.symbolMethod = new Codicon('symbol-method', { fontCharacter: '\\ea8c' });
Codicon.symbolFunction = new Codicon('symbol-function', { fontCharacter: '\\ea8c' });
Codicon.symbolConstructor = new Codicon('symbol-constructor', { fontCharacter: '\\ea8c' });
Codicon.symbolBoolean = new Codicon('symbol-boolean', { fontCharacter: '\\ea8f' });
Codicon.symbolNull = new Codicon('symbol-null', { fontCharacter: '\\ea8f' });
Codicon.symbolNumber = new Codicon('symbol-number', { fontCharacter: '\\ea90' });
Codicon.symbolStruct = new Codicon('symbol-struct', { fontCharacter: '\\ea91' });
Codicon.symbolTypeParameter = new Codicon('symbol-type-parameter', { fontCharacter: '\\ea92' });
Codicon.symbolKey = new Codicon('symbol-key', { fontCharacter: '\\ea93' });
Codicon.symbolText = new Codicon('symbol-text', { fontCharacter: '\\ea93' });
Codicon.symbolReference = new Codicon('symbol-reference', { fontCharacter: '\\ea94' });
Codicon.symbolEnum = new Codicon('symbol-enum', { fontCharacter: '\\ea95' });
Codicon.symbolValue = new Codicon('symbol-value', { fontCharacter: '\\ea95' });
Codicon.symbolUnit = new Codicon('symbol-unit', { fontCharacter: '\\ea96' });
Codicon.arrowDown = new Codicon('arrow-down', { fontCharacter: '\\ea9a' });
Codicon.arrowLeft = new Codicon('arrow-left', { fontCharacter: '\\ea9b' });
Codicon.arrowUp = new Codicon('arrow-up', { fontCharacter: '\\eaa1' });
Codicon.caseSensitive = new Codicon('case-sensitive', { fontCharacter: '\\eab1' });
Codicon.check = new Codicon('check', { fontCharacter: '\\eab2' });
Codicon.chevronDown = new Codicon('chevron-down', { fontCharacter: '\\eab4' });
Codicon.chevronRight = new Codicon('chevron-right', { fontCharacter: '\\eab6' });
Codicon.chevronUp = new Codicon('chevron-up', { fontCharacter: '\\eab7' });
Codicon.lightbulbAutofix = new Codicon('lightbulb-autofix', { fontCharacter: '\\eb13' });
Codicon.loading = new Codicon('loading', { fontCharacter: '\\eb19' });
Codicon.preserveCase = new Codicon('preserve-case', { fontCharacter: '\\eb2e' });
Codicon.regex = new Codicon('regex', { fontCharacter: '\\eb38' });
Codicon.remove = new Codicon('remove', { fontCharacter: '\\eb3b' });
Codicon.replaceAll = new Codicon('replace-all', { fontCharacter: '\\eb3c' });
Codicon.replace = new Codicon('replace', { fontCharacter: '\\eb3d' });
Codicon.splitHorizontal = new Codicon('split-horizontal', { fontCharacter: '\\eb56' });
Codicon.splitVertical = new Codicon('split-vertical', { fontCharacter: '\\eb57' });
Codicon.symbolClass = new Codicon('symbol-class', { fontCharacter: '\\eb5b' });
Codicon.symbolColor = new Codicon('symbol-color', { fontCharacter: '\\eb5c' });
Codicon.symbolConstant = new Codicon('symbol-constant', { fontCharacter: '\\eb5d' });
Codicon.symbolEnumMember = new Codicon('symbol-enum-member', { fontCharacter: '\\eb5e' });
Codicon.symbolField = new Codicon('symbol-field', { fontCharacter: '\\eb5f' });
Codicon.symbolFile = new Codicon('symbol-file', { fontCharacter: '\\eb60' });
Codicon.symbolInterface = new Codicon('symbol-interface', { fontCharacter: '\\eb61' });
Codicon.symbolKeyword = new Codicon('symbol-keyword', { fontCharacter: '\\eb62' });
Codicon.symbolOperator = new Codicon('symbol-operator', { fontCharacter: '\\eb64' });
Codicon.symbolProperty = new Codicon('symbol-property', { fontCharacter: '\\eb65' });
Codicon.symbolSnippet = new Codicon('symbol-snippet', { fontCharacter: '\\eb66' });
Codicon.triangleDown = new Codicon('triangle-down', { fontCharacter: '\\eb6e' });
Codicon.triangleLeft = new Codicon('triangle-left', { fontCharacter: '\\eb6f' });
Codicon.triangleRight = new Codicon('triangle-right', { fontCharacter: '\\eb70' });
Codicon.triangleUp = new Codicon('triangle-up', { fontCharacter: '\\eb71' });
Codicon.wholeWord = new Codicon('whole-word', { fontCharacter: '\\eb7e' });
Codicon.listFilter = new Codicon('list-filter', { fontCharacter: '\\eb83' });
Codicon.listSelection = new Codicon('list-selection', { fontCharacter: '\\eb85' });
Codicon.selection = new Codicon('selection', { fontCharacter: '\\eb85' });
Codicon.symbolString = new Codicon('symbol-string', { fontCharacter: '\\eb8d' });
Codicon.treeItemExpanded = new Codicon('tree-item-expanded', Codicon.chevronDown.definition); // collapsed is done with rotation
Codicon.treeFilterOnTypeOn = new Codicon('tree-filter-on-type-on', Codicon.listFilter.definition);
Codicon.treeFilterOnTypeOff = new Codicon('tree-filter-on-type-off', Codicon.listSelection.definition);
Codicon.treeFilterClear = new Codicon('tree-filter-clear', Codicon.close.definition);
Codicon.treeItemLoading = new Codicon('tree-item-loading', Codicon.loading.definition);
Codicon.menuSelection = new Codicon('menu-selection', Codicon.check.definition);
Codicon.menuSubmenu = new Codicon('menu-submenu', Codicon.chevronRight.definition);
Codicon.scrollbarButtonLeft = new Codicon('scrollbar-button-left', Codicon.triangleLeft.definition);
Codicon.scrollbarButtonRight = new Codicon('scrollbar-button-right', Codicon.triangleRight.definition);
Codicon.scrollbarButtonUp = new Codicon('scrollbar-button-up', Codicon.triangleUp.definition);
Codicon.scrollbarButtonDown = new Codicon('scrollbar-button-down', Codicon.triangleDown.definition);
Codicon.quickInputBack = new Codicon('quick-input-back', Codicon.arrowLeft.definition);
export var CSSIcon;
(function (CSSIcon) {
    CSSIcon.iconNameSegment = '[A-Za-z0-9]+';
    CSSIcon.iconNameExpression = '[A-Za-z0-9-]+';
    CSSIcon.iconModifierExpression = '~[A-Za-z]+';
    CSSIcon.iconNameCharacter = '[A-Za-z0-9~-]';
    const cssIconIdRegex = new RegExp(`^(${CSSIcon.iconNameExpression})(${CSSIcon.iconModifierExpression})?$`);
    function asClassNameArray(icon) {
        if (icon instanceof Codicon) {
            return ['codicon', 'codicon-' + icon.id];
        }
        const match = cssIconIdRegex.exec(icon.id);
        if (!match) {
            return asClassNameArray(Codicon.error);
        }
        let [, id, modifier] = match;
        const classNames = ['codicon', 'codicon-' + id];
        if (modifier) {
            classNames.push('codicon-modifier-' + modifier.substr(1));
        }
        return classNames;
    }
    CSSIcon.asClassNameArray = asClassNameArray;
    function asClassName(icon) {
        return asClassNameArray(icon).join(' ');
    }
    CSSIcon.asClassName = asClassName;
    function asCSSSelector(icon) {
        return '.' + asClassNameArray(icon).join('.');
    }
    CSSIcon.asCSSSelector = asCSSSelector;
})(CSSIcon || (CSSIcon = {}));
