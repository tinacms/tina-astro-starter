import { ManyLevelGuest } from 'many-level';
export declare class TinaLevelClient extends ManyLevelGuest<string, Record<string, any>> {
    private port;
    private _connected;
    constructor(port?: number);
    openConnection(): void;
}
