import { FC } from 'react';
import { ScreenPlugin } from '../screen-plugin';
export interface ScreenPluginModalProps {
    screen: ScreenPlugin;
    close(): void;
}
export declare const ScreenPluginModal: FC<ScreenPluginModalProps>;
