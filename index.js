/**
 * @file Main application server entry point
 * @copyright Copyright (c) 2020 Ryan Spoone
 */

'use strict';

const http = require('http');
const dotenv = require('dotenv');
const { name, version } = require('./package.json');

// Load environment variables
const result = dotenv.config();
if (result.error) {
    process.stderr.write(`Warning: Unable to load .env file: ${result.error.message}\n`);
}

// Validate required environment variables
const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Validate port number
if (isNaN(port) || port < 1 || port > 65535) {
    process.stderr.write(`Error: Invalid PORT value. Must be a number between 1 and 65535.\n`);
    process.exit(1);
}

/**
 * Creates an HTTP server that responds with a hello world message
 * @param {http.IncomingMessage} req - The HTTP request object
 * @param {http.ServerResponse} res - The HTTP response object
 * @returns {void}
 */
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello World from ${name}@${version}`);
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        process.stderr.write(`Error: Port ${port} is already in use.\n`);
    } else if (err.code === 'EACCES') {
        process.stderr.write(`Error: Permission denied to bind to port ${port}.\n`);
    } else {
        process.stderr.write(`Server error: ${err.message}\n`);
    }
    process.exit(1);
});

server.listen(port, hostname, () => {
    process.stdout.write(`Server running at http://${hostname}:${port}/\n`);
});
