/**
 * @copyright Copyright (c) 2020 ryanspoone
 */

'use strict';

const http = require('http');
const dotenv = require('dotenv');
const { name, version } = require('./package.json');

dotenv.config();

const hostname = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello World from ${name}@${version}`);
});

server.listen(port, hostname, () => {
    process.stdout.write(`Server running at http://${hostname}:${port}/\n`);
});
