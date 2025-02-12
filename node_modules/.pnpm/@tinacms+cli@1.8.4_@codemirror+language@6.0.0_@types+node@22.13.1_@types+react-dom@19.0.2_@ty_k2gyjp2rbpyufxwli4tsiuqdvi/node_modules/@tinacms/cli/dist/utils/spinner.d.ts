/**

*/
export declare function spin<T>({ waitFor, text, }: {
    waitFor: () => Promise<T>;
    text: string;
}): Promise<any>;
