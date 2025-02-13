/**
 * PatchOperation has been derived from patch_obj in diff-match-patch by Neil Fraser
 * and the TypeScript of diffMatchPatch.ts in ng-diff-match-patch by Elliot Forbes.
 * See LICENSE.md for licensing details.
 *
 * Changes have been made to correct tslint errors and use the Diff and DiffOp types
 * by Richard Russell.
 *
 * ----------------------------------------------------------------------------------------
 * Diff Match and Patch
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Diff } from './diff.type';
/**
 * Class representing one patch operation.
 * @constructor
 */
export declare class PatchOperation {
    diffs: Diff[];
    start1: number;
    start2: number;
    length1: number;
    length2: number;
    /**
     * Emmulate GNU diff's format.
     * Header: @@ -382,8 +481,9 @@
     * Indicies are printed as 1-based, not 0-based.
     */
    toString(): string;
}
