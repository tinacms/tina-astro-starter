var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { AbstractCodeEditorService } from './abstractCodeEditorService.js';
import { IThemeService } from '../../../platform/theme/common/themeService.js';
export class GlobalStyleSheet {
    constructor(styleSheet) {
        this._styleSheet = styleSheet;
    }
}
let CodeEditorServiceImpl = class CodeEditorServiceImpl extends AbstractCodeEditorService {
    constructor(styleSheet, themeService) {
        super();
        this._decorationOptionProviders = new Map();
        this._globalStyleSheet = styleSheet ? styleSheet : null;
        this._themeService = themeService;
    }
    removeDecorationType(key) {
        const provider = this._decorationOptionProviders.get(key);
        if (provider) {
            provider.refCount--;
            if (provider.refCount <= 0) {
                this._decorationOptionProviders.delete(key);
                provider.dispose();
                this.listCodeEditors().forEach((ed) => ed.removeDecorations(key));
            }
        }
    }
};
CodeEditorServiceImpl = __decorate([
    __param(1, IThemeService)
], CodeEditorServiceImpl);
export { CodeEditorServiceImpl };
