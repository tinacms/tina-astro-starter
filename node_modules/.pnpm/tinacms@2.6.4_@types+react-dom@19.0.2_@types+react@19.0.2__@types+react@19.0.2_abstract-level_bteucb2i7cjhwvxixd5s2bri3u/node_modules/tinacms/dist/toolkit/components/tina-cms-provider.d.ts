import * as React from 'react';
import { TinaCMS } from '../tina-cms';
export interface TinaCMSProviderProps {
    cms: TinaCMS;
    children?: React.ReactNode;
}
export declare const INVALID_CMS_ERROR = "The `cms` prop must be an instance of `TinaCMS`.";
export declare const TinaCMSProvider: React.FC<TinaCMSProviderProps>;
