"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("../index");
const app = express();
const port = 3030;
app.use('/altair', (0, index_1.altairExpress)({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:5400/subscriptions`,
    initialQuery: `{ getData { id name surname } }`,
    // serveInitialOptionsInSeperateRequest: true,
    initialPreRequestScript: `console.log('Hello from pre request!')`,
    initialWindows: [
        {
            initialQuery: '{ myFirst }',
            endpointURL: '/test1',
            initialName: 'name me',
        },
        {
            initialQuery: '{ mySecond }',
            endpointURL: '/test2',
        },
    ],
    preserveState: false,
}));
app.get('/', (req, res) => res.send('Hello world'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=index.js.map