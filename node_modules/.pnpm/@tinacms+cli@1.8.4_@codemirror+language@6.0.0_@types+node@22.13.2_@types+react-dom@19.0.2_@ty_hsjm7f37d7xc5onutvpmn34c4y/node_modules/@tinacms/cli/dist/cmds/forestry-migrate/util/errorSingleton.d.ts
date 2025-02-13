/**

*/
interface NameError {
    name: string;
    template: string;
    newName: string;
}
/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
export declare class ErrorSingleton {
    private static instance;
    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor();
    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    static getInstance(): ErrorSingleton;
    private collectionNameErrors;
    addErrorName(error: NameError): void;
    printCollectionNameErrors(): void;
}
export {};
