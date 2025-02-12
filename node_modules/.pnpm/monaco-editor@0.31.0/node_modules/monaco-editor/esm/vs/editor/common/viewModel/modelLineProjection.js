/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { LineTokens } from '../core/lineTokens.js';
import { Position } from '../core/position.js';
import { LineInjectedText } from '../model/textModelEvents.js';
import { SingleLineInlineDecoration, ViewLineData } from './viewModel.js';
export function createModelLineProjection(lineBreakData, isVisible) {
    if (lineBreakData === null) {
        // No mapping needed
        if (isVisible) {
            return IdentityModelLineProjection.INSTANCE;
        }
        return HiddenModelLineProjection.INSTANCE;
    }
    else {
        return new ModelLineProjection(lineBreakData, isVisible);
    }
}
/**
 * This projection is used to
 * * wrap model lines
 * * inject text
 */
class ModelLineProjection {
    constructor(lineBreakData, isVisible) {
        this._lineBreakData = lineBreakData;
        this._isVisible = isVisible;
    }
    isVisible() {
        return this._isVisible;
    }
    setVisible(isVisible) {
        this._isVisible = isVisible;
        return this;
    }
    getLineBreakData() {
        return this._lineBreakData;
    }
    getViewLineCount() {
        if (!this._isVisible) {
            return 0;
        }
        return this._lineBreakData.getOutputLineCount();
    }
    getInputStartOffsetOfOutputLineIndex(outputLineIndex) {
        return this._lineBreakData.translateToInputOffset(outputLineIndex, 0);
    }
    getInputEndOffsetOfOutputLineIndex(outputLineIndex) {
        return this._lineBreakData.translateToInputOffset(outputLineIndex, this._lineBreakData.getMaxOutputOffset(outputLineIndex));
    }
    getViewLineContent(model, modelLineNumber, outputLineIndex) {
        this.assertVisible();
        // These offsets refer to model text with injected text.
        const startOffset = outputLineIndex > 0 ? this._lineBreakData.breakOffsets[outputLineIndex - 1] : 0;
        const endOffset = outputLineIndex < this._lineBreakData.breakOffsets.length
            ? this._lineBreakData.breakOffsets[outputLineIndex]
            // This case might not be possible anyway, but we clamp the value to be on the safe side.
            : this._lineBreakData.breakOffsets[this._lineBreakData.breakOffsets.length - 1];
        let r;
        if (this._lineBreakData.injectionOffsets !== null) {
            const injectedTexts = this._lineBreakData.injectionOffsets.map((offset, idx) => new LineInjectedText(0, 0, offset + 1, this._lineBreakData.injectionOptions[idx], 0));
            r = LineInjectedText.applyInjectedText(model.getLineContent(modelLineNumber), injectedTexts).substring(startOffset, endOffset);
        }
        else {
            r = model.getValueInRange({
                startLineNumber: modelLineNumber,
                startColumn: startOffset + 1,
                endLineNumber: modelLineNumber,
                endColumn: endOffset + 1
            });
        }
        if (outputLineIndex > 0) {
            r = spaces(this._lineBreakData.wrappedTextIndentLength) + r;
        }
        return r;
    }
    getViewLineLength(model, modelLineNumber, outputLineIndex) {
        this.assertVisible();
        return this._lineBreakData.getLineLength(outputLineIndex);
    }
    getViewLineMinColumn(_model, _modelLineNumber, outputLineIndex) {
        this.assertVisible();
        return this._lineBreakData.getMinOutputOffset(outputLineIndex) + 1;
    }
    getViewLineMaxColumn(model, modelLineNumber, outputLineIndex) {
        this.assertVisible();
        return this._lineBreakData.getMaxOutputOffset(outputLineIndex) + 1;
    }
    getViewLineData(model, modelLineNumber, outputLineIndex) {
        this.assertVisible();
        const lineBreakData = this._lineBreakData;
        const deltaStartIndex = (outputLineIndex > 0 ? lineBreakData.wrappedTextIndentLength : 0);
        const injectionOffsets = lineBreakData.injectionOffsets;
        const injectionOptions = lineBreakData.injectionOptions;
        let tokens;
        let inlineDecorations;
        if (injectionOffsets) {
            const lineTokens = model.getLineTokens(modelLineNumber).withInserted(injectionOffsets.map((offset, idx) => ({
                offset,
                text: injectionOptions[idx].content,
                tokenMetadata: LineTokens.defaultTokenMetadata
            })));
            const lineStartOffsetInInputWithInjections = outputLineIndex > 0 ? lineBreakData.breakOffsets[outputLineIndex - 1] : 0;
            const lineEndOffsetInInputWithInjections = lineBreakData.breakOffsets[outputLineIndex];
            tokens = lineTokens.sliceAndInflate(lineStartOffsetInInputWithInjections, lineEndOffsetInInputWithInjections, deltaStartIndex);
            inlineDecorations = new Array();
            let totalInjectedTextLengthBefore = 0;
            for (let i = 0; i < injectionOffsets.length; i++) {
                const length = injectionOptions[i].content.length;
                const injectedTextStartOffsetInInputWithInjections = injectionOffsets[i] + totalInjectedTextLengthBefore;
                const injectedTextEndOffsetInInputWithInjections = injectionOffsets[i] + totalInjectedTextLengthBefore + length;
                if (injectedTextStartOffsetInInputWithInjections > lineEndOffsetInInputWithInjections) {
                    // Injected text only starts in later wrapped lines.
                    break;
                }
                if (lineStartOffsetInInputWithInjections < injectedTextEndOffsetInInputWithInjections) {
                    // Injected text ends after or in this line (but also starts in or before this line).
                    const options = injectionOptions[i];
                    if (options.inlineClassName) {
                        const offset = (outputLineIndex > 0 ? lineBreakData.wrappedTextIndentLength : 0);
                        const start = offset + Math.max(injectedTextStartOffsetInInputWithInjections - lineStartOffsetInInputWithInjections, 0);
                        const end = offset + Math.min(injectedTextEndOffsetInInputWithInjections - lineStartOffsetInInputWithInjections, lineEndOffsetInInputWithInjections);
                        if (start !== end) {
                            inlineDecorations.push(new SingleLineInlineDecoration(start, end, options.inlineClassName, options.inlineClassNameAffectsLetterSpacing));
                        }
                    }
                }
                totalInjectedTextLengthBefore += length;
            }
        }
        else {
            const startOffset = this.getInputStartOffsetOfOutputLineIndex(outputLineIndex);
            const endOffset = this.getInputEndOffsetOfOutputLineIndex(outputLineIndex);
            const lineTokens = model.getLineTokens(modelLineNumber);
            tokens = lineTokens.sliceAndInflate(startOffset, endOffset, deltaStartIndex);
            inlineDecorations = null;
        }
        let lineContent = tokens.getLineContent();
        if (outputLineIndex > 0) {
            lineContent = spaces(lineBreakData.wrappedTextIndentLength) + lineContent;
        }
        const minColumn = this._lineBreakData.getMinOutputOffset(outputLineIndex) + 1;
        const maxColumn = lineContent.length + 1;
        const continuesWithWrappedLine = (outputLineIndex + 1 < this.getViewLineCount());
        const startVisibleColumn = (outputLineIndex === 0 ? 0 : lineBreakData.breakOffsetsVisibleColumn[outputLineIndex - 1]);
        return new ViewLineData(lineContent, continuesWithWrappedLine, minColumn, maxColumn, startVisibleColumn, tokens, inlineDecorations);
    }
    getViewLinesData(model, modelLineNumber, fromOutputLineIndex, toOutputLineIndex, globalStartIndex, needed, result) {
        this.assertVisible();
        for (let outputLineIndex = fromOutputLineIndex; outputLineIndex < toOutputLineIndex; outputLineIndex++) {
            let globalIndex = globalStartIndex + outputLineIndex - fromOutputLineIndex;
            if (!needed[globalIndex]) {
                result[globalIndex] = null;
                continue;
            }
            result[globalIndex] = this.getViewLineData(model, modelLineNumber, outputLineIndex);
        }
    }
    getModelColumnOfViewPosition(outputLineIndex, outputColumn) {
        this.assertVisible();
        return this._lineBreakData.translateToInputOffset(outputLineIndex, outputColumn - 1) + 1;
    }
    getViewPositionOfModelPosition(deltaLineNumber, inputColumn, affinity = 2 /* None */) {
        this.assertVisible();
        let r = this._lineBreakData.translateToOutputPosition(inputColumn - 1, affinity);
        return r.toPosition(deltaLineNumber);
    }
    getViewLineNumberOfModelPosition(deltaLineNumber, inputColumn) {
        this.assertVisible();
        const r = this._lineBreakData.translateToOutputPosition(inputColumn - 1);
        return deltaLineNumber + r.outputLineIndex;
    }
    normalizePosition(outputLineIndex, outputPosition, affinity) {
        const baseViewLineNumber = outputPosition.lineNumber - outputLineIndex;
        const normalizedOutputPosition = this._lineBreakData.normalizeOutputPosition(outputLineIndex, outputPosition.column - 1, affinity);
        const result = normalizedOutputPosition.toPosition(baseViewLineNumber);
        return result;
    }
    getInjectedTextAt(outputLineIndex, outputColumn) {
        return this._lineBreakData.getInjectedText(outputLineIndex, outputColumn - 1);
    }
    assertVisible() {
        if (!this._isVisible) {
            throw new Error('Not supported');
        }
    }
}
/**
 * This projection does not change the model line.
*/
class IdentityModelLineProjection {
    constructor() { }
    isVisible() {
        return true;
    }
    setVisible(isVisible) {
        if (isVisible) {
            return this;
        }
        return HiddenModelLineProjection.INSTANCE;
    }
    getLineBreakData() {
        return null;
    }
    getViewLineCount() {
        return 1;
    }
    getViewLineContent(model, modelLineNumber, _outputLineIndex) {
        return model.getLineContent(modelLineNumber);
    }
    getViewLineLength(model, modelLineNumber, _outputLineIndex) {
        return model.getLineLength(modelLineNumber);
    }
    getViewLineMinColumn(model, modelLineNumber, _outputLineIndex) {
        return model.getLineMinColumn(modelLineNumber);
    }
    getViewLineMaxColumn(model, modelLineNumber, _outputLineIndex) {
        return model.getLineMaxColumn(modelLineNumber);
    }
    getViewLineData(model, modelLineNumber, _outputLineIndex) {
        let lineTokens = model.getLineTokens(modelLineNumber);
        let lineContent = lineTokens.getLineContent();
        return new ViewLineData(lineContent, false, 1, lineContent.length + 1, 0, lineTokens.inflate(), null);
    }
    getViewLinesData(model, modelLineNumber, _fromOuputLineIndex, _toOutputLineIndex, globalStartIndex, needed, result) {
        if (!needed[globalStartIndex]) {
            result[globalStartIndex] = null;
            return;
        }
        result[globalStartIndex] = this.getViewLineData(model, modelLineNumber, 0);
    }
    getModelColumnOfViewPosition(_outputLineIndex, outputColumn) {
        return outputColumn;
    }
    getViewPositionOfModelPosition(deltaLineNumber, inputColumn) {
        return new Position(deltaLineNumber, inputColumn);
    }
    getViewLineNumberOfModelPosition(deltaLineNumber, _inputColumn) {
        return deltaLineNumber;
    }
    normalizePosition(outputLineIndex, outputPosition, affinity) {
        return outputPosition;
    }
    getInjectedTextAt(_outputLineIndex, _outputColumn) {
        return null;
    }
}
IdentityModelLineProjection.INSTANCE = new IdentityModelLineProjection();
/**
 * This projection hides the model line.
 */
class HiddenModelLineProjection {
    constructor() { }
    isVisible() {
        return false;
    }
    setVisible(isVisible) {
        if (!isVisible) {
            return this;
        }
        return IdentityModelLineProjection.INSTANCE;
    }
    getLineBreakData() {
        return null;
    }
    getViewLineCount() {
        return 0;
    }
    getViewLineContent(_model, _modelLineNumber, _outputLineIndex) {
        throw new Error('Not supported');
    }
    getViewLineLength(_model, _modelLineNumber, _outputLineIndex) {
        throw new Error('Not supported');
    }
    getViewLineMinColumn(_model, _modelLineNumber, _outputLineIndex) {
        throw new Error('Not supported');
    }
    getViewLineMaxColumn(_model, _modelLineNumber, _outputLineIndex) {
        throw new Error('Not supported');
    }
    getViewLineData(_model, _modelLineNumber, _outputLineIndex) {
        throw new Error('Not supported');
    }
    getViewLinesData(_model, _modelLineNumber, _fromOuputLineIndex, _toOutputLineIndex, _globalStartIndex, _needed, _result) {
        throw new Error('Not supported');
    }
    getModelColumnOfViewPosition(_outputLineIndex, _outputColumn) {
        throw new Error('Not supported');
    }
    getViewPositionOfModelPosition(_deltaLineNumber, _inputColumn) {
        throw new Error('Not supported');
    }
    getViewLineNumberOfModelPosition(_deltaLineNumber, _inputColumn) {
        throw new Error('Not supported');
    }
    normalizePosition(outputLineIndex, outputPosition, affinity) {
        throw new Error('Not supported');
    }
    getInjectedTextAt(_outputLineIndex, _outputColumn) {
        throw new Error('Not supported');
    }
}
HiddenModelLineProjection.INSTANCE = new HiddenModelLineProjection();
let _spaces = [''];
function spaces(count) {
    if (count >= _spaces.length) {
        for (let i = 1; i <= count; i++) {
            _spaces[i] = _makeSpaces(i);
        }
    }
    return _spaces[count];
}
function _makeSpaces(count) {
    return new Array(count + 1).join(' ');
}
