/**

*/
export declare class TinaGQLClient {
    private _usedFrags;
    private _frags;
    private _selections;
    private get _queryAST();
    private get _DocumentAST();
    get query(): string;
    /**
     * getAuthorDocument
     */
    getAuthorDocument(args: {
        relativePath: string;
    }): this;
    gePostsDocument(args: {
        relativePath: string;
    }): this;
}
