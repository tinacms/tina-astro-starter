import type { AstroClientDirectives } from './elements.js';
import type { BaseIntegrationHooks } from './integrations.js';
declare global {
    namespace App {
        /**
         * Used by middlewares to store information, that can be read by the user via the global `Astro.locals`
         */
        interface Locals {
        }
    }
    namespace Astro {
        interface IntegrationHooks extends BaseIntegrationHooks {
        }
        interface ClientDirectives extends AstroClientDirectives {
        }
    }
}
export {};
