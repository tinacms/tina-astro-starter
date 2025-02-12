/**

*/
import { Events } from '../interfaces';
export declare class Telemetry {
    private projectIDRaw;
    private _disabled;
    constructor({ disabled }: {
        disabled: any;
    });
    private oneWayHash;
    private get projectId();
    private get isDisabled();
    submitRecord: ({ event }: {
        event: Events;
    }) => Promise<void>;
}
