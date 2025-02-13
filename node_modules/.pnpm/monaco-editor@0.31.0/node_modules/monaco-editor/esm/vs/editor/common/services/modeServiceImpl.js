/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Emitter } from '../../../base/common/event.js';
import { Disposable } from '../../../base/common/lifecycle.js';
import { NULL_MODE_ID } from '../modes/nullMode.js';
import { LanguagesRegistry } from './languagesRegistry.js';
import { firstOrDefault } from '../../../base/common/arrays.js';
class LanguageSelection {
    constructor(onLanguagesMaybeChanged, selector) {
        this._selector = selector;
        this.languageId = this._selector();
        let listener;
        this._onDidChange = new Emitter({
            onFirstListenerAdd: () => {
                listener = onLanguagesMaybeChanged(() => this._evaluate());
            },
            onLastListenerRemove: () => {
                listener.dispose();
            }
        });
        this.onDidChange = this._onDidChange.event;
    }
    _evaluate() {
        const languageId = this._selector();
        if (languageId === this.languageId) {
            // no change
            return;
        }
        this.languageId = languageId;
        this._onDidChange.fire(this.languageId);
    }
}
export class ModeServiceImpl extends Disposable {
    constructor(warnOnOverwrite = false) {
        super();
        this._onDidEncounterLanguage = this._register(new Emitter());
        this.onDidEncounterLanguage = this._onDidEncounterLanguage.event;
        this._onLanguagesMaybeChanged = this._register(new Emitter({ leakWarningThreshold: 200 /* https://github.com/microsoft/vscode/issues/119968 */ }));
        this.onLanguagesMaybeChanged = this._onLanguagesMaybeChanged.event;
        ModeServiceImpl.instanceCount++;
        this._encounteredLanguages = new Set();
        this._registry = this._register(new LanguagesRegistry(true, warnOnOverwrite));
        this.languageIdCodec = this._registry.languageIdCodec;
        this._register(this._registry.onDidChange(() => this._onLanguagesMaybeChanged.fire()));
    }
    dispose() {
        ModeServiceImpl.instanceCount--;
        super.dispose();
    }
    isRegisteredMode(mimetypeOrModeId) {
        return this._registry.isRegisteredMode(mimetypeOrModeId);
    }
    getModeIdForLanguageName(alias) {
        return this._registry.getModeIdForLanguageNameLowercase(alias);
    }
    getModeIdByFilepathOrFirstLine(resource, firstLine) {
        const modeIds = this._registry.getModeIdsFromFilepathOrFirstLine(resource, firstLine);
        return firstOrDefault(modeIds, null);
    }
    getModeId(commaSeparatedMimetypesOrCommaSeparatedIds) {
        const modeIds = this._registry.extractModeIds(commaSeparatedMimetypesOrCommaSeparatedIds);
        return firstOrDefault(modeIds, null);
    }
    validateLanguageId(languageId) {
        return this._registry.validateLanguageId(languageId);
    }
    // --- instantiation
    create(commaSeparatedMimetypesOrCommaSeparatedIds) {
        return new LanguageSelection(this.onLanguagesMaybeChanged, () => {
            const languageId = this.getModeId(commaSeparatedMimetypesOrCommaSeparatedIds);
            return this._createModeAndGetLanguageIdentifier(languageId);
        });
    }
    createByFilepathOrFirstLine(resource, firstLine) {
        return new LanguageSelection(this.onLanguagesMaybeChanged, () => {
            const languageId = this.getModeIdByFilepathOrFirstLine(resource, firstLine);
            return this._createModeAndGetLanguageIdentifier(languageId);
        });
    }
    _createModeAndGetLanguageIdentifier(languageId) {
        // Fall back to plain text if no mode was found
        const validLanguageId = this.validateLanguageId(languageId || 'plaintext') || NULL_MODE_ID;
        this._getOrCreateMode(validLanguageId);
        return validLanguageId;
    }
    triggerMode(commaSeparatedMimetypesOrCommaSeparatedIds) {
        const languageId = this.getModeId(commaSeparatedMimetypesOrCommaSeparatedIds);
        // Fall back to plain text if no mode was found
        this._getOrCreateMode(languageId || 'plaintext');
    }
    _getOrCreateMode(languageId) {
        if (!this._encounteredLanguages.has(languageId)) {
            this._encounteredLanguages.add(languageId);
            const validLanguageId = this.validateLanguageId(languageId) || NULL_MODE_ID;
            this._onDidEncounterLanguage.fire(validLanguageId);
        }
    }
}
ModeServiceImpl.instanceCount = 0;
