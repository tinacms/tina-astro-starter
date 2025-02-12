/**

*/
export * from './internalClient';
export * from './auth';
export * from './utils';
export * from './tina-cms';
export { useDocumentCreatorPlugin } from './hooks/use-content-creator';
export { TinaAdmin } from './admin';
export { RouteMappingPlugin } from './admin/plugins/route-mapping';
export { TinaAdminApi } from './admin/api';
export { ErrorDialog } from './admin/components/ErrorDialog';
export * from './toolkit';
export { Form } from './toolkit/forms/form';
export { MdxFieldPluginExtendible } from '@tinacms/toolkit';
import { TinaCMSProvider2, DocumentCreatorCallback } from './tina-cms';
import type { TinaCMSProviderDefaultProps } from './types/cms';
export type { TinaCMSProviderDefaultProps };
export default TinaCMSProvider2;
import { MediaStore, TinaCMS } from '@tinacms/toolkit';
import { formifyCallback } from './hooks/use-graphql-forms';
export { NAMER, resolveField } from '@tinacms/schema-tools';
export type { LoginScreenProps, LoginStrategy } from '@tinacms/schema-tools';
import { TinaSchema, TinaField, Config, Schema, Collection, Template } from '@tinacms/schema-tools';
export type { Config, Schema, Collection, Template, TinaField, TinaSchema };
/**
 * @deprecated use `TinaField` instead
 */
export type TinaFieldEnriched = TinaField;
/**
 * @deprecated use `TinaField` instead
 */
export type SchemaField = TinaField;
/**
 * @deprecated use `Template` instead
 */
export type TinaTemplate = Template;
/**
 * @deprecated use `Template` instead
 */
export type TinaCloudTemplatebase = Template;
/**
 * @deprecated use `Collection` instead
 */
export type TinaCloudCollectionCollection = Collection;
/**
 * @deprecated use `Collection` instead
 */
export type TinaCollection = Collection;
/**
 * @deprecated use `Schema` instead
 */
export type TinaCloudSchema = Schema;
export declare const defineSchema: (config: Schema) => Schema<false>;
export declare const defineLegacyConfig: (config: Omit<TinaCMSProviderDefaultProps, "children">) => Omit<TinaCMSProviderDefaultProps, "children">;
export interface MediaStoreClass {
    new (...args: any[]): MediaStore;
}
export declare const defineStaticConfig: (config: Config<(cms: TinaCMS) => TinaCMS, formifyCallback, DocumentCreatorCallback, MediaStoreClass>) => Config<(cms: TinaCMS) => TinaCMS, formifyCallback, import("./hooks/use-content-creator").DocumentCreatorArgs, MediaStoreClass, undefined>;
export declare const defineConfig: (config: Config<(cms: TinaCMS) => TinaCMS, formifyCallback, DocumentCreatorCallback, MediaStoreClass>) => Config<(cms: TinaCMS) => TinaCMS, formifyCallback, import("./hooks/use-content-creator").DocumentCreatorArgs, MediaStoreClass, undefined>;
export { tinaTableTemplate } from './table';
