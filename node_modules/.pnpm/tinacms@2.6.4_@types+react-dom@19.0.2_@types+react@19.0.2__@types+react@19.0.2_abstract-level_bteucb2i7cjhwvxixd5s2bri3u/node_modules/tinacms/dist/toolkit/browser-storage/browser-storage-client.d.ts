export declare class BrowserStorageClient {
    data: any;
    timeout: number | null;
    namespace: string;
    storage: Storage;
    constructor(storage: Storage, namespace?: string | null);
    save(id: string, content: any): void;
    load(id: string): any;
    clear(id: string): void;
    private debouncePersist;
    private persist;
}
