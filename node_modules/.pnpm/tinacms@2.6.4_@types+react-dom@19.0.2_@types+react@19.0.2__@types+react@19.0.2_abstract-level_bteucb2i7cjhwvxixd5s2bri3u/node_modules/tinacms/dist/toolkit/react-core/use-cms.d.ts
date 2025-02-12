import * as React from 'react';
import { TinaAction, TinaState } from '../tina-state';
import { TinaCMS } from '../tina-cms';
export declare const ERROR_MISSING_CMS = "useCMS could not find an instance of CMS";
export declare const CMSContext: React.Context<{
    cms: TinaCMS;
    dispatch: React.Dispatch<TinaAction>;
    state: TinaState;
}>;
export declare function useCMS(): TinaCMS;
