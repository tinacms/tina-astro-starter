import * as React from 'react';
import { TinaCMSProviderProps } from './tina-cms-provider';
import { TinaUIProps } from './tina-ui';
export interface TinaProviderProps extends TinaCMSProviderProps, TinaUIProps {
}
export declare const TinaProvider: React.FC<TinaProviderProps>;
/**
 * @deprecated This has been renamed to `TinaProvider`.
 */
export declare const Tina: React.FC<TinaProviderProps>;
/**
 * @deprecated This has been renamed to `TinaProviderProps`.
 */
export type TinaProps = TinaProviderProps;
