/**
 * This package contains the [[CMS]] class which is the core
 * piece of any content management system.
 *
 * @packageDocumentation
 */
import { Plugin, PluginTypeManager } from './plugins';
import { EventBus } from './event';
import { MediaManager, MediaStore } from './media';
import { Flags } from './flags';
/**
 * A [[CMS]] is the core object of any content management system.
 *
 * The responsibility of the [[CMS]] keeps track of two broad types of objects:
 *
 * - [[Plugin|Plugins]] which extend or change the behaviour of the content management system..
 * - [[api|APIs]] which allow the CMS to integrate with third party services.
 * - [[EventBus|events]] which provide a way to communicate information about events happening
 *   between decoupled parts of the CMS.
 *
 * The name [[CMS]] is a bit misleading. This object knows nothing of the user
 * interface or the data storage layer. The purpose of a [[CMS]] instance is to
 * provide a common connection point for the various aspects of a content
 * management system. The [[CMS]] object effectively a vehicle for dependency injection.
 *
 * #### Creating a CMS
 *
 * ```ts
 * import { CMS } from "@tinacms/core"
 *
 * const cms = new CMS()
 * ```
 *
 * #### Extending the CMS
 *
 * The [[CMS]] class provides low-level interfaces for interacting with APIs and Plugins.
 * Creating a subclass is great way to facilitate these interactions:
 *
 * ```ts
 * import { CMS } from "@tinacms/core"
 *
 * class MyCMS extends CMS {
 *   get colors() {
 *     return this.plugins.findOrCreateMap("color")
 *   }
 * }
 *
 * const cms = new MyCMS()
 *
 * cms.colors.all()
 * ```
 */
export interface CMSConfig {
    enabled?: boolean;
    plugins?: Array<Plugin>;
    apis?: {
        [key: string]: any;
    };
    media?: MediaStore;
    /**
     * Might potentially make more sense to consolidate both media.store and mediaOptions.pageSize
     * under the 'media' config namespace, but that's a breaking change.
     */
    mediaOptions?: {
        pageSize?: number;
    };
}
export declare class CMS {
    static ENABLED: {
        type: string;
    };
    static DISABLED: {
        type: string;
    };
    private _enabled;
    /**
     * An object for managing CMSs plugins.
     *
     * [[Plugin|Plugins]] are used to extend or modify the CMSs feature set.
     *
     */
    plugins: PluginTypeManager;
    /**
     * The set of APIs registered with the CMS.
     *
     * API objects are the preferred way to interact with external APIs over a network.
     *
     * The preferred way to register new APIs is through the [[registerApi]] method.
     *
     * #### Example: Fetching Data Through an API
     *
     * ```ts
     * import { CMS } from "@tinacms/core"
     * import { CoolApi } from "cool-api"
     *
     * const cms = new CMS()
     *
     * cms.registerApi("coolApi", new CoolApi())
     *
     * cms.api.coolApi.fetchCoolThings().then(coolThings => {
     *   console.log(coolThings)
     * })
     * ```
     *
     */
    api: {
        [key: string]: any;
    };
    private unsubscribeHooks;
    events: EventBus;
    media: MediaManager;
    flags: Flags;
    /**
     * @hidden
     */
    constructor(config?: CMSConfig);
    /**
     * Registers a new external API with the CMS.
     *
     * #### Example
     *
     * ```ts
     * import { CoolApi } from "cool-api"
     *
     * cms.registerApi("coolApi", new CoolApi())
     * ```
     *
     * @param name The name used to lookup the external API.
     * @param api An object for interacting with an external API.
     *
     * ### Additional Resources
     *
     * * https://github.com/tinacms/rfcs/blob/master/0010-api-events.md
     */
    registerApi(name: string, api: any): void;
    /**
     * When `true` the CMS is enabled and content can be edited.
     */
    get enabled(): boolean;
    /**
     * When `true` the CMS is disabled and content cannot be edited.
     */
    get disabled(): boolean;
    /**
     * Enable the CMS so content can be edited.
     */
    enable: () => void;
    /**
     * Disable the CMS so content can no longer be edited.
     */
    disable: () => void;
    /**
     * Toggles the enabled/disabled state of the CMS .
     */
    toggle: () => void;
}
