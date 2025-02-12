/**

*/
import { Plugin } from '@tinacms/toolkit';
import type { CollectionResponse, DocumentSys } from '../types';
export declare class RouteMappingPlugin implements Plugin {
    __type: string;
    name: string;
    mapper: (collection: CollectionResponse, document: DocumentSys) => string | undefined;
    constructor(mapper: (collection: CollectionResponse, document: DocumentSys) => string | undefined);
}
