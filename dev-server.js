import 'dotenv/config';
import express from 'express';
import http from 'node:http';
import Debug from 'debug';
import httpProxy from 'http-proxy';

const debug = Debug('gutenprog:local-server');

const app = express();
app.use((req, res, next) => {
    debug(req.method, req.url);
    next();
})
const proxy = httpProxy.createProxyServer({
    secure: false,
    changeOrigin: true,
})

proxy
    .on('error', err => {
        debug('onError()', err.message);
    })
    .on('proxyReq', (proxyReq) => {
        proxyReq.setHeader('X-Special-Proxy-Header', 'gt-proxy-request');
    });
app.use('/api', (req, res) => {
    proxy.web(req, res, {target: 'https://petroglyphwatch.com/'})
})
app.use('/images', (req, res) => {
    proxy.web(req, res, {target: 'https://petroglyphwatch.com/'})
});

const server = http.createServer(app);
server.listen(8082, 'localhost');
debug('listening on localhost:' + 8082);
