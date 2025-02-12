import { defineConfig, getViteConfig } from "./index.js";
import { envField } from "../env/config.js";
function sharpImageService(config = {}) {
  return {
    entrypoint: "astro/assets/services/sharp",
    config
  };
}
function passthroughImageService() {
  return {
    entrypoint: "astro/assets/services/noop",
    config: {}
  };
}
export {
  defineConfig,
  envField,
  getViteConfig,
  passthroughImageService,
  sharpImageService
};
