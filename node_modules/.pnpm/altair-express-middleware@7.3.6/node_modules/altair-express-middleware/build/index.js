'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.altairExpress = void 0;
const express = require("express");
const altair_static_1 = require("altair-static");
const altairExpress = (opts) => {
    const app = express();
    // Disable strict routing since we *need* to make sure the route does not end with a trailing slash
    app.disable('strict routing');
    app.get('/', (req, res) => {
        // Redirect all trailing slash
        const path = req.originalUrl.replace(/\?.*/, '');
        if (!path.endsWith('/')) {
            const query = req.originalUrl.slice(path.length);
            return res.redirect(301, path + '/' + query);
        }
        return res.send((0, altair_static_1.renderAltair)(opts));
    });
    app.get('/initial_options.js', (req, res) => {
        res.set('Content-Type', 'text/javascript');
        return res.send((0, altair_static_1.renderInitialOptions)(opts));
    });
    app.use(express.static((0, altair_static_1.getDistDirectory)()));
    /**
     * Catch-all route
     */
    app.get('*', (req, res) => {
        return res.send('404.');
    });
    return app;
};
exports.altairExpress = altairExpress;
//# sourceMappingURL=index.js.map