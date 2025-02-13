"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlugins = loadPlugins;
const path_1 = require("path");
const url_1 = require("url");
const paths_1 = require("./paths");
async function loadPlugins(app, plugins) {
    for (const plugin of plugins) {
        const pluginDisplay = getPluginDisplayName(plugin);
        try {
            let instance;
            // Try importing first to avoid warnings about requiring ESM being experimental.
            // If that fails due to importing a directory, fall back to require.
            try {
                // On Windows, we need to ensure this path is a file path.
                // Or we'll get ERR_UNSUPPORTED_ESM_URL_SCHEME
                const esmPath = (0, path_1.isAbsolute)(plugin)
                    ? (0, url_1.pathToFileURL)(plugin).toString()
                    : plugin;
                instance = await import(esmPath);
            }
            catch (error) {
                if (error.code === "ERR_UNSUPPORTED_DIR_IMPORT") {
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    instance = require(plugin);
                }
                else {
                    throw error;
                }
            }
            const initFunction = instance.load;
            if (typeof initFunction === "function") {
                await initFunction(app);
                app.logger.info(app.i18n.loaded_plugin_0(pluginDisplay));
            }
            else {
                app.logger.error(app.i18n.invalid_plugin_0_missing_load_function(pluginDisplay));
            }
        }
        catch (error) {
            app.logger.error(app.i18n.plugin_0_could_not_be_loaded(pluginDisplay));
            if (error instanceof Error && error.stack) {
                app.logger.error(error.stack);
            }
        }
    }
}
function getPluginDisplayName(plugin) {
    const path = (0, paths_1.nicePath)(plugin);
    if (path.startsWith("./node_modules/")) {
        return path.substring("./node_modules/".length);
    }
    return plugin;
}
