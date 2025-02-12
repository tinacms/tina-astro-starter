/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RunOnceScheduler } from '../../../base/common/async.js';
import { Codicon } from '../../../base/common/codicons.js';
import { Disposable } from '../../../base/common/lifecycle.js';
import { InvisibleCharacters } from '../../../base/common/strings.js';
import './unicodeHighlighter.css';
import { EditorAction, registerEditorAction, registerEditorContribution } from '../../browser/editorExtensions.js';
import { inUntrustedWorkspace, unicodeHighlightConfigKeys } from '../../common/config/editorOptions.js';
import { MinimapPosition, OverviewRulerLane } from '../../common/model.js';
import { ModelDecorationOptions } from '../../common/model/textModel.js';
import { UnicodeTextModelHighlighter } from '../../common/modes/unicodeTextModelHighlighter.js';
import { IEditorWorkerService } from '../../common/services/editorWorkerService.js';
import { IModeService } from '../../common/services/modeService.js';
import { isModelDecorationVisible } from '../../common/viewModel/viewModelDecorations.js';
import { MarkdownHover, renderMarkdownHovers } from '../hover/markdownHoverParticipant.js';
import { BannerController } from './bannerController.js';
import * as nls from '../../../nls.js';
import { IConfigurationService } from '../../../platform/configuration/common/configuration.js';
import { IInstantiationService } from '../../../platform/instantiation/common/instantiation.js';
import { IOpenerService } from '../../../platform/opener/common/opener.js';
import { IQuickInputService } from '../../../platform/quickinput/common/quickInput.js';
import { minimapFindMatch, minimapUnicodeHighlight, overviewRulerFindMatchForeground, overviewRulerUnicodeHighlightForeground } from '../../../platform/theme/common/colorRegistry.js';
import { registerIcon } from '../../../platform/theme/common/iconRegistry.js';
import { themeColorFromId } from '../../../platform/theme/common/themeService.js';
import { IWorkspaceTrustManagementService } from '../../../platform/workspace/common/workspaceTrust.js';
export const warningIcon = registerIcon('extensions-warning-message', Codicon.warning, nls.localize('warningIcon', 'Icon shown with a warning message in the extensions editor.'));
let UnicodeHighlighter = class UnicodeHighlighter extends Disposable {
    constructor(_editor, _editorWorkerService, _workspaceTrustService, instantiationService) {
        super();
        this._editor = _editor;
        this._editorWorkerService = _editorWorkerService;
        this._workspaceTrustService = _workspaceTrustService;
        this._highlighter = null;
        this._bannerClosed = false;
        this._updateState = (state) => {
            if (state && state.hasMore) {
                if (this._bannerClosed) {
                    return;
                }
                // This document contains many non-basic ASCII characters.
                const max = Math.max(state.ambiguousCharacterCount, state.nonBasicAsciiCharacterCount, state.invisibleCharacterCount);
                let data;
                if (state.nonBasicAsciiCharacterCount >= max) {
                    data = {
                        message: nls.localize('unicodeHighlighting.thisDocumentHasManyNonBasicAsciiUnicodeCharacters', 'This document contains many non-basic ASCII unicode characters'),
                        command: new DisableHighlightingOfNonBasicAsciiCharactersAction(),
                    };
                }
                else if (state.ambiguousCharacterCount >= max) {
                    data = {
                        message: nls.localize('unicodeHighlighting.thisDocumentHasManyAmbiguousUnicodeCharacters', 'This document contains many ambiguous unicode characters'),
                        command: new DisableHighlightingOfAmbiguousCharactersAction(),
                    };
                }
                else if (state.invisibleCharacterCount >= max) {
                    data = {
                        message: nls.localize('unicodeHighlighting.thisDocumentHasManyInvisibleUnicodeCharacters', 'This document contains many invisible unicode characters'),
                        command: new DisableHighlightingOfInvisibleCharactersAction(),
                    };
                }
                else {
                    throw new Error('Unreachable');
                }
                this._bannerController.show({
                    id: 'unicodeHighlightBanner',
                    message: data.message,
                    icon: warningIcon,
                    actions: [
                        {
                            label: data.command.shortLabel,
                            href: `command:${data.command.id}`
                        }
                    ],
                    onClose: () => {
                        this._bannerClosed = true;
                    },
                });
            }
            else {
                this._bannerController.hide();
            }
        };
        this._bannerController = this._register(instantiationService.createInstance(BannerController, _editor));
        this._register(this._editor.onDidChangeModel(() => {
            this._bannerClosed = false;
            this._updateHighlighter();
        }));
        this._options = _editor.getOption(112 /* unicodeHighlighting */);
        this._register(_workspaceTrustService.onDidChangeTrust(e => {
            this._updateHighlighter();
        }));
        this._register(_editor.onDidChangeConfiguration(e => {
            if (e.hasChanged(112 /* unicodeHighlighting */)) {
                this._options = _editor.getOption(112 /* unicodeHighlighting */);
                this._updateHighlighter();
            }
        }));
        this._updateHighlighter();
    }
    dispose() {
        if (this._highlighter) {
            this._highlighter.dispose();
            this._highlighter = null;
        }
        super.dispose();
    }
    _updateHighlighter() {
        this._updateState(null);
        if (this._highlighter) {
            this._highlighter.dispose();
            this._highlighter = null;
        }
        if (!this._editor.hasModel()) {
            return;
        }
        const options = resolveOptions(this._workspaceTrustService.isWorkspaceTrusted(), this._options);
        if ([
            options.nonBasicASCII,
            options.ambiguousCharacters,
            options.invisibleCharacters,
        ].every((option) => option === false)) {
            // Don't do anything if the feature is fully disabled
            return;
        }
        const highlightOptions = {
            nonBasicASCII: options.nonBasicASCII,
            ambiguousCharacters: options.ambiguousCharacters,
            invisibleCharacters: options.invisibleCharacters,
            includeComments: options.includeComments,
            allowedCodePoints: Object.keys(options.allowedCharacters).map(c => c.codePointAt(0)),
        };
        if (this._editorWorkerService.canComputeUnicodeHighlights(this._editor.getModel().uri)) {
            this._highlighter = new DocumentUnicodeHighlighter(this._editor, highlightOptions, this._updateState, this._editorWorkerService);
        }
        else {
            this._highlighter = new ViewportUnicodeHighlighter(this._editor, highlightOptions, this._updateState);
        }
    }
    getDecorationInfo(decorationId) {
        if (this._highlighter) {
            return this._highlighter.getDecorationInfo(decorationId);
        }
        return null;
    }
};
UnicodeHighlighter.ID = 'editor.contrib.unicodeHighlighter';
UnicodeHighlighter = __decorate([
    __param(1, IEditorWorkerService),
    __param(2, IWorkspaceTrustManagementService),
    __param(3, IInstantiationService)
], UnicodeHighlighter);
export { UnicodeHighlighter };
function resolveOptions(trusted, options) {
    var _a;
    return {
        nonBasicASCII: options.nonBasicASCII === inUntrustedWorkspace ? !trusted : options.nonBasicASCII,
        ambiguousCharacters: options.ambiguousCharacters,
        invisibleCharacters: options.invisibleCharacters,
        includeComments: options.includeComments === inUntrustedWorkspace ? !trusted : options.includeComments,
        allowedCharacters: (_a = options.allowedCharacters) !== null && _a !== void 0 ? _a : {},
    };
}
let DocumentUnicodeHighlighter = class DocumentUnicodeHighlighter extends Disposable {
    constructor(_editor, _options, _updateState, _editorWorkerService) {
        super();
        this._editor = _editor;
        this._options = _options;
        this._updateState = _updateState;
        this._editorWorkerService = _editorWorkerService;
        this._model = this._editor.getModel();
        this._decorationIds = new Set();
        this._updateSoon = this._register(new RunOnceScheduler(() => this._update(), 250));
        this._register(this._editor.onDidChangeModelContent(() => {
            this._updateSoon.schedule();
        }));
        this._updateSoon.schedule();
    }
    dispose() {
        this._decorationIds = new Set(this._model.deltaDecorations(Array.from(this._decorationIds), []));
        super.dispose();
    }
    _update() {
        if (!this._model.mightContainNonBasicASCII()) {
            this._decorationIds = new Set(this._editor.deltaDecorations(Array.from(this._decorationIds), []));
            return;
        }
        const modelVersionId = this._model.getVersionId();
        this._editorWorkerService
            .computedUnicodeHighlights(this._model.uri, this._options)
            .then((info) => {
            if (this._model.getVersionId() !== modelVersionId) {
                // model changed in the meantime
                return;
            }
            this._updateState(info);
            const decorations = [];
            if (!info.hasMore) {
                // Don't show decoration if there are too many.
                // In this case, a banner is shown.
                for (const range of info.ranges) {
                    decorations.push({ range: range, options: this._options.includeComments ? DECORATION : DECORATION_HIDE_IN_COMMENTS });
                }
            }
            this._decorationIds = new Set(this._editor.deltaDecorations(Array.from(this._decorationIds), decorations));
        });
    }
    getDecorationInfo(decorationId) {
        if (!this._decorationIds.has(decorationId)) {
            return null;
        }
        const model = this._editor.getModel();
        const range = model.getDecorationRange(decorationId);
        if (!isModelDecorationVisible(model, {
            range: range,
            options: this._options.includeComments
                ? DECORATION
                : DECORATION_HIDE_IN_COMMENTS,
            id: decorationId,
            ownerId: 0,
        })) {
            return null;
        }
        const text = model.getValueInRange(range);
        return {
            reason: computeReason(text, this._options),
        };
    }
};
DocumentUnicodeHighlighter = __decorate([
    __param(3, IEditorWorkerService)
], DocumentUnicodeHighlighter);
class ViewportUnicodeHighlighter extends Disposable {
    constructor(_editor, _options, _updateState) {
        super();
        this._editor = _editor;
        this._options = _options;
        this._updateState = _updateState;
        this._model = this._editor.getModel();
        this._decorationIds = new Set();
        this._updateSoon = this._register(new RunOnceScheduler(() => this._update(), 250));
        this._register(this._editor.onDidLayoutChange(() => {
            this._updateSoon.schedule();
        }));
        this._register(this._editor.onDidScrollChange(() => {
            this._updateSoon.schedule();
        }));
        this._register(this._editor.onDidChangeHiddenAreas(() => {
            this._updateSoon.schedule();
        }));
        this._register(this._editor.onDidChangeModelContent(() => {
            this._updateSoon.schedule();
        }));
        this._updateSoon.schedule();
    }
    dispose() {
        this._decorationIds = new Set(this._model.deltaDecorations(Array.from(this._decorationIds), []));
        super.dispose();
    }
    _update() {
        if (!this._model.mightContainNonBasicASCII()) {
            this._decorationIds = new Set(this._editor.deltaDecorations(Array.from(this._decorationIds), []));
            return;
        }
        const ranges = this._editor.getVisibleRanges();
        const decorations = [];
        const totalResult = {
            ranges: [],
            ambiguousCharacterCount: 0,
            invisibleCharacterCount: 0,
            nonBasicAsciiCharacterCount: 0,
            hasMore: false,
        };
        for (const range of ranges) {
            const result = UnicodeTextModelHighlighter.computeUnicodeHighlights(this._model, this._options, range);
            for (const r of result.ranges) {
                totalResult.ranges.push(r);
            }
            totalResult.ambiguousCharacterCount += totalResult.ambiguousCharacterCount;
            totalResult.invisibleCharacterCount += totalResult.invisibleCharacterCount;
            totalResult.nonBasicAsciiCharacterCount += totalResult.nonBasicAsciiCharacterCount;
            totalResult.hasMore = totalResult.hasMore || result.hasMore;
        }
        if (!totalResult.hasMore) {
            // Don't show decorations if there are too many.
            // A banner will be shown instead.
            for (const range of totalResult.ranges) {
                decorations.push({ range, options: this._options.includeComments ? DECORATION : DECORATION_HIDE_IN_COMMENTS });
            }
        }
        this._updateState(totalResult);
        this._decorationIds = new Set(this._editor.deltaDecorations(Array.from(this._decorationIds), decorations));
    }
    getDecorationInfo(decorationId) {
        if (!this._decorationIds.has(decorationId)) {
            return null;
        }
        const model = this._editor.getModel();
        const range = model.getDecorationRange(decorationId);
        const text = model.getValueInRange(range);
        if (!isModelDecorationVisible(model, {
            range: range,
            options: this._options.includeComments
                ? DECORATION
                : DECORATION_HIDE_IN_COMMENTS,
            id: decorationId,
            ownerId: 0,
        })) {
            return null;
        }
        return {
            reason: computeReason(text, this._options),
        };
    }
}
let UnicodeHighlighterHoverParticipant = class UnicodeHighlighterHoverParticipant {
    constructor(_editor, _hover, _modeService, _openerService) {
        this._editor = _editor;
        this._hover = _hover;
        this._modeService = _modeService;
        this._openerService = _openerService;
    }
    computeSync(anchor, lineDecorations) {
        if (!this._editor.hasModel() || anchor.type !== 1 /* Range */) {
            return [];
        }
        const model = this._editor.getModel();
        const unicodeHighlighter = this._editor.getContribution(UnicodeHighlighter.ID);
        const result = [];
        let index = 300;
        for (const d of lineDecorations) {
            const highlightInfo = unicodeHighlighter.getDecorationInfo(d.id);
            if (!highlightInfo) {
                continue;
            }
            const char = model.getValueInRange(d.range);
            // text refers to a single character.
            const codePoint = char.codePointAt(0);
            function formatCodePoint(codePoint) {
                let value = `\`U+${codePoint.toString(16).padStart(4, '0')}\``;
                if (!InvisibleCharacters.isInvisibleCharacter(codePoint)) {
                    // Don't render any control characters or any invisible characters, as they cannot be seen anyways.
                    value += ` "${`${renderCodePointAsInlineCode(codePoint)}`}"`;
                }
                return value;
            }
            const codePointStr = formatCodePoint(codePoint);
            let reason;
            switch (highlightInfo.reason.kind) {
                case 0 /* Ambiguous */:
                    reason = nls.localize('unicodeHighlight.characterIsAmbiguous', 'The character {0} could be confused with the character {1}, which is more common in source code.', codePointStr, formatCodePoint(highlightInfo.reason.confusableWith.codePointAt(0)));
                    break;
                case 1 /* Invisible */:
                    reason = nls.localize('unicodeHighlight.characterIsInvisible', 'The character {0} is invisible.', codePointStr);
                    break;
                case 2 /* NonBasicAscii */:
                    reason = nls.localize('unicodeHighlight.characterIsNonBasicAscii', 'The character {0} is not a basic ASCII character.', codePointStr);
                    break;
            }
            const adjustSettingsArgs = {
                codePoint: codePoint,
                reason: highlightInfo.reason.kind,
            };
            const adjustSettings = nls.localize('unicodeHighlight.adjustSettings', 'Adjust settings');
            const contents = [{
                    value: `${reason} [${adjustSettings}](command:${ShowExcludeOptions.ID}?${encodeURIComponent(JSON.stringify(adjustSettingsArgs))})`,
                    isTrusted: true,
                }];
            result.push(new MarkdownHover(this, d.range, contents, index++));
        }
        return result;
    }
    renderHoverParts(hoverParts, fragment, statusBar) {
        return renderMarkdownHovers(hoverParts, fragment, this._editor, this._hover, this._modeService, this._openerService);
    }
};
UnicodeHighlighterHoverParticipant = __decorate([
    __param(2, IModeService),
    __param(3, IOpenerService)
], UnicodeHighlighterHoverParticipant);
export { UnicodeHighlighterHoverParticipant };
function renderCodePointAsInlineCode(codePoint) {
    if (codePoint === 96 /* BackTick */) {
        return '`` ` ``';
    }
    return '`' + String.fromCodePoint(codePoint) + '`';
}
function computeReason(char, options) {
    return UnicodeTextModelHighlighter.computeUnicodeHighlightReason(char, options);
}
const DECORATION_HIDE_IN_COMMENTS = ModelDecorationOptions.register({
    description: 'unicode-highlight',
    stickiness: 1 /* NeverGrowsWhenTypingAtEdges */,
    className: 'unicode-highlight',
    showIfCollapsed: true,
    overviewRuler: {
        color: themeColorFromId(overviewRulerUnicodeHighlightForeground),
        position: OverviewRulerLane.Center
    },
    minimap: {
        color: themeColorFromId(minimapUnicodeHighlight),
        position: MinimapPosition.Inline
    },
    hideInCommentTokens: true
});
const DECORATION = ModelDecorationOptions.register({
    description: 'unicode-highlight',
    stickiness: 1 /* NeverGrowsWhenTypingAtEdges */,
    className: 'unicode-highlight',
    showIfCollapsed: true,
    overviewRuler: {
        color: themeColorFromId(overviewRulerFindMatchForeground),
        position: OverviewRulerLane.Center
    },
    minimap: {
        color: themeColorFromId(minimapFindMatch),
        position: MinimapPosition.Inline
    }
});
export class DisableHighlightingOfAmbiguousCharactersAction extends EditorAction {
    constructor() {
        super({
            id: DisableHighlightingOfAmbiguousCharactersAction.ID,
            label: nls.localize('action.unicodeHighlight.disableHighlightingOfAmbiguousCharacters', 'Disable highlighting of ambiguous characters'),
            alias: 'Disable highlighting of ambiguous characters',
            precondition: undefined
        });
        this.shortLabel = nls.localize('unicodeHighlight.disableHighlightingOfAmbiguousCharacters.shortLabel', 'Disable Ambiguous Highlight');
    }
    run(accessor, editor, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let configurationService = accessor === null || accessor === void 0 ? void 0 : accessor.get(IConfigurationService);
            if (configurationService) {
                this.runAction(configurationService);
            }
        });
    }
    runAction(configurationService) {
        return __awaiter(this, void 0, void 0, function* () {
            yield configurationService.updateValue(unicodeHighlightConfigKeys.ambiguousCharacters, false, 1 /* USER */);
        });
    }
}
DisableHighlightingOfAmbiguousCharactersAction.ID = 'editor.action.unicodeHighlight.disableHighlightingOfAmbiguousCharacters';
export class DisableHighlightingOfInvisibleCharactersAction extends EditorAction {
    constructor() {
        super({
            id: DisableHighlightingOfInvisibleCharactersAction.ID,
            label: nls.localize('action.unicodeHighlight.disableHighlightingOfInvisibleCharacters', 'Disable highlighting of invisible characters'),
            alias: 'Disable highlighting of invisible characters',
            precondition: undefined
        });
        this.shortLabel = nls.localize('unicodeHighlight.disableHighlightingOfInvisibleCharacters.shortLabel', 'Disable Invisible Highlight');
    }
    run(accessor, editor, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let configurationService = accessor === null || accessor === void 0 ? void 0 : accessor.get(IConfigurationService);
            if (configurationService) {
                this.runAction(configurationService);
            }
        });
    }
    runAction(configurationService) {
        return __awaiter(this, void 0, void 0, function* () {
            yield configurationService.updateValue(unicodeHighlightConfigKeys.invisibleCharacters, false, 1 /* USER */);
        });
    }
}
DisableHighlightingOfInvisibleCharactersAction.ID = 'editor.action.unicodeHighlight.disableHighlightingOfInvisibleCharacters';
export class DisableHighlightingOfNonBasicAsciiCharactersAction extends EditorAction {
    constructor() {
        super({
            id: DisableHighlightingOfNonBasicAsciiCharactersAction.ID,
            label: nls.localize('action.unicodeHighlight.disableHighlightingOfNonBasicAsciiCharacters', 'Disable highlighting of non basic ASCII characters'),
            alias: 'Disable highlighting of non basic ASCII characters',
            precondition: undefined
        });
        this.shortLabel = nls.localize('unicodeHighlight.disableHighlightingOfNonBasicAsciiCharacters.shortLabel', 'Disable Non ASCII Highlight');
    }
    run(accessor, editor, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let configurationService = accessor === null || accessor === void 0 ? void 0 : accessor.get(IConfigurationService);
            if (configurationService) {
                this.runAction(configurationService);
            }
        });
    }
    runAction(configurationService) {
        return __awaiter(this, void 0, void 0, function* () {
            yield configurationService.updateValue(unicodeHighlightConfigKeys.nonBasicASCII, false, 1 /* USER */);
        });
    }
}
DisableHighlightingOfNonBasicAsciiCharactersAction.ID = 'editor.action.unicodeHighlight.disableHighlightingOfNonBasicAsciiCharacters';
export class ShowExcludeOptions extends EditorAction {
    constructor() {
        super({
            id: ShowExcludeOptions.ID,
            label: nls.localize('action.unicodeHighlight.showExcludeOptions', "Show Exclude Options"),
            alias: 'Show Exclude Options',
            precondition: undefined
        });
    }
    run(accessor, editor, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codePoint, reason } = args;
            const char = String.fromCodePoint(codePoint);
            const quickPickService = accessor.get(IQuickInputService);
            const configurationService = accessor.get(IConfigurationService);
            function getExcludeCharFromBeingHighlightedLabel(codePoint) {
                if (InvisibleCharacters.isInvisibleCharacter(codePoint)) {
                    return nls.localize('unicodeHighlight.excludeInvisibleCharFromBeingHighlighted', 'Exclude {0} (invisible character) from being highlighted', `U+${codePoint.toString(16)}`);
                }
                return nls.localize('unicodeHighlight.excludeCharFromBeingHighlighted', 'Exclude {0} from being highlighted', `U+${codePoint.toString(16)} "${char}"`);
            }
            const options = [
                {
                    label: getExcludeCharFromBeingHighlightedLabel(codePoint),
                    run: () => excludeCharFromBeingHighlighted(configurationService, [codePoint])
                },
            ];
            if (reason === 0 /* Ambiguous */) {
                const action = new DisableHighlightingOfAmbiguousCharactersAction();
                options.push({ label: action.label, run: () => __awaiter(this, void 0, void 0, function* () { return action.runAction(configurationService); }) });
            }
            else if (reason === 1 /* Invisible */) {
                const action = new DisableHighlightingOfInvisibleCharactersAction();
                options.push({ label: action.label, run: () => __awaiter(this, void 0, void 0, function* () { return action.runAction(configurationService); }) });
            }
            else if (reason === 2 /* NonBasicAscii */) {
                const action = new DisableHighlightingOfNonBasicAsciiCharactersAction();
                options.push({ label: action.label, run: () => __awaiter(this, void 0, void 0, function* () { return action.runAction(configurationService); }) });
            }
            else {
                expectNever(reason);
            }
            const result = yield quickPickService.pick(options, { title: nls.localize('unicodeHighlight.configureUnicodeHighlightOptions', 'Configure Unicode Highlight Options') });
            if (result) {
                yield result.run();
            }
        });
    }
}
ShowExcludeOptions.ID = 'editor.action.unicodeHighlight.showExcludeOptions';
function excludeCharFromBeingHighlighted(configurationService, charCodes) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingValue = configurationService.getValue(unicodeHighlightConfigKeys.allowedCharacters);
        let value;
        if ((typeof existingValue === 'object') && existingValue) {
            value = existingValue;
        }
        else {
            value = {};
        }
        for (const charCode of charCodes) {
            value[String.fromCodePoint(charCode)] = true;
        }
        yield configurationService.updateValue(unicodeHighlightConfigKeys.allowedCharacters, value, 1 /* USER */);
    });
}
function expectNever(value) {
    throw new Error(`Unexpected value: ${value}`);
}
registerEditorAction(DisableHighlightingOfAmbiguousCharactersAction);
registerEditorAction(DisableHighlightingOfInvisibleCharactersAction);
registerEditorAction(DisableHighlightingOfNonBasicAsciiCharactersAction);
registerEditorAction(ShowExcludeOptions);
registerEditorContribution(UnicodeHighlighter.ID, UnicodeHighlighter);
