import type { Alerts as AlertsCollection } from '../alerts';
import React from 'react';
export interface AlertsProps {
    alerts: AlertsCollection;
}
export declare function Alerts({ alerts }: AlertsProps): React.JSX.Element;
