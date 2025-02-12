/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { createCancelableAsyncIterable, RunOnceScheduler } from '../../../base/common/async.js';
import { onUnexpectedError } from '../../../base/common/errors.js';
export class HoverOperation {
    constructor(computer, success, error, progress, hoverTime) {
        this._computer = computer;
        this._state = 0 /* IDLE */;
        this._hoverTime = hoverTime;
        this._firstWaitScheduler = new RunOnceScheduler(() => this._triggerAsyncComputation(), 0);
        this._secondWaitScheduler = new RunOnceScheduler(() => this._triggerSyncComputation(), 0);
        this._loadingMessageScheduler = new RunOnceScheduler(() => this._showLoadingMessage(), 0);
        this._asyncIterable = null;
        this._asyncIterableDone = false;
        this._completeCallback = success;
        this._errorCallback = error;
        this._progressCallback = progress;
    }
    setHoverTime(hoverTime) {
        this._hoverTime = hoverTime;
    }
    _firstWaitTime() {
        return this._hoverTime / 2;
    }
    _secondWaitTime() {
        return this._hoverTime / 2;
    }
    _loadingMessageTime() {
        return 3 * this._hoverTime;
    }
    _triggerAsyncComputation() {
        this._state = 2 /* SECOND_WAIT */;
        this._secondWaitScheduler.schedule(this._secondWaitTime());
        if (this._computer.computeAsync) {
            this._asyncIterableDone = false;
            this._asyncIterable = createCancelableAsyncIterable(token => this._computer.computeAsync(token));
            (() => __awaiter(this, void 0, void 0, function* () {
                var e_1, _a;
                try {
                    try {
                        for (var _b = __asyncValues(this._asyncIterable), _c; _c = yield _b.next(), !_c.done;) {
                            const item = _c.value;
                            if (item) {
                                this._computer.onResult([item], false);
                                this._onProgress();
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    this._asyncIterableDone = true;
                    this._withAsyncResult();
                }
                catch (e) {
                    this._onError(e);
                }
            }))();
        }
        else {
            this._asyncIterableDone = true;
        }
    }
    _triggerSyncComputation() {
        if (this._computer.computeSync) {
            this._computer.onResult(this._computer.computeSync(), true);
        }
        if (this._asyncIterableDone) {
            this._state = 0 /* IDLE */;
            this._onComplete();
        }
        else {
            this._state = 3 /* WAITING_FOR_ASYNC_COMPUTATION */;
            this._onProgress();
        }
    }
    _showLoadingMessage() {
        if (this._state === 3 /* WAITING_FOR_ASYNC_COMPUTATION */) {
            this._state = 4 /* WAITING_FOR_ASYNC_COMPUTATION_SHOWING_LOADING */;
            this._onProgress();
        }
    }
    _withAsyncResult() {
        if (this._state === 3 /* WAITING_FOR_ASYNC_COMPUTATION */ || this._state === 4 /* WAITING_FOR_ASYNC_COMPUTATION_SHOWING_LOADING */) {
            this._state = 0 /* IDLE */;
            this._onComplete();
        }
    }
    _onComplete() {
        this._completeCallback(this._computer.getResult());
    }
    _onError(error) {
        if (this._errorCallback) {
            this._errorCallback(error);
        }
        else {
            onUnexpectedError(error);
        }
    }
    _onProgress() {
        if (this._state === 4 /* WAITING_FOR_ASYNC_COMPUTATION_SHOWING_LOADING */) {
            this._progressCallback(this._computer.getResultWithLoadingMessage());
        }
        else {
            this._progressCallback(this._computer.getResult());
        }
    }
    start(mode) {
        if (mode === 0 /* Delayed */) {
            if (this._state === 0 /* IDLE */) {
                this._state = 1 /* FIRST_WAIT */;
                this._firstWaitScheduler.schedule(this._firstWaitTime());
                this._loadingMessageScheduler.schedule(this._loadingMessageTime());
            }
        }
        else {
            switch (this._state) {
                case 0 /* IDLE */:
                    this._triggerAsyncComputation();
                    this._secondWaitScheduler.cancel();
                    this._triggerSyncComputation();
                    break;
                case 2 /* SECOND_WAIT */:
                    this._secondWaitScheduler.cancel();
                    this._triggerSyncComputation();
                    break;
            }
        }
    }
    cancel() {
        this._firstWaitScheduler.cancel();
        this._secondWaitScheduler.cancel();
        this._loadingMessageScheduler.cancel();
        if (this._asyncIterable) {
            this._asyncIterable.cancel();
            this._asyncIterable = null;
        }
        this._state = 0 /* IDLE */;
    }
}
