import { GetDefaultFieldNamesFn } from '@graphiql/toolkit';
import type { EditorConfiguration } from 'codemirror';
import type { SchemaReference } from 'codemirror-graphql/utils/SchemaReference';
import { CodeMirrorEditor } from './types';
export declare function useSynchronizeValue(editor: CodeMirrorEditor | null, value: string | undefined): void;
export declare function useSynchronizeOption<K extends keyof EditorConfiguration>(editor: CodeMirrorEditor | null, option: K, value: EditorConfiguration[K]): void;
export declare function useChangeHandler(editor: CodeMirrorEditor | null, callback: ((value: string) => void) | undefined, storageKey: string | null, tabProperty: 'variables' | 'headers', caller: Function): void;
export declare function useCompletion(editor: CodeMirrorEditor | null, callback: ((reference: SchemaReference) => void) | null, caller: Function): void;
declare type EmptyCallback = () => void;
export declare function useKeyMap(editor: CodeMirrorEditor | null, keys: string[], callback: EmptyCallback | undefined): void;
export declare type UseCopyQueryArgs = {
    /**
     * This is only meant to be used internally in `@graphiql/react`.
     */
    caller?: Function;
    /**
     * Invoked when the current contents of the query editor are copied to the
     * clipboard.
     * @param query The content that has been copied.
     */
    onCopyQuery?: (query: string) => void;
};
export declare function useCopyQuery({ caller, onCopyQuery }?: UseCopyQueryArgs): () => void;
declare type UseMergeQueryArgs = {
    /**
     * This is only meant to be used internally in `@graphiql/react`.
     */
    caller?: Function;
};
export declare function useMergeQuery({ caller }?: UseMergeQueryArgs): () => void;
declare type UsePrettifyEditorsArgs = {
    /**
     * This is only meant to be used internally in `@graphiql/react`.
     */
    caller?: Function;
};
export declare function usePrettifyEditors({ caller }?: UsePrettifyEditorsArgs): () => void;
export declare type UseAutoCompleteLeafsArgs = {
    /**
     * A function to determine which field leafs are automatically added when
     * trying to execute a query with missing selection sets. It will be called
     * with the `GraphQLType` for which fields need to be added.
     */
    getDefaultFieldNames?: GetDefaultFieldNamesFn;
    /**
     * This is only meant to be used internally in `@graphiql/react`.
     */
    caller?: Function;
};
export declare function useAutoCompleteLeafs({ getDefaultFieldNames, caller, }?: UseAutoCompleteLeafsArgs): () => string | undefined;
export {};
