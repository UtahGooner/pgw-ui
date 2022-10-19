import 'dotenv/config';
import express from 'express';
import Debug from 'debug';
import compression from 'compression';
import helmet from "helmet";
import {promises as fsPromises} from "node:fs";
import favicon from 'serve-favicon';

const debug = Debug('gutenprog:local-server');
const app = express();
app.set('trust proxy', 'loopback');
app.use(compression());
app.use(helmet());
if (process.env.NODE_ENV === 'production') {
    app.use(favicon('/var/www/petroglyphwatch.com/images/logo.png'));
}
// app.use(contentSecurityPolicy({
//     useDefaults: false,
//     directives: `default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests`,
// }))
app.use('/css', express.static('./public/css'));
app.use('/js', express.static('./public/js'));
app.use((req, res, next) => {
    debug(`${req.ip} ${req.method} ${req.url} ; fresh=${JSON.stringify(req.fresh)}`);
    next();
})
app.get('*', async (req, res) => {
    try {
        const manifestFile = await fsPromises.readFile('./public/js/manifest.json');
        /**
         *
         * @type {ManifestFiles}
         */
        const manifestJSON = JSON.parse(Buffer.from(manifestFile).toString());
        // debug('manifestJSON', manifestJSON);
        // const state = await loadJSON(`http://localhost:${process.env.API_PORT}/api/preload/state`);
        const _html = await fsPromises.readFile('./public/index.html');
        const html = Buffer.from(_html).toString()
            .replace('/js/main.js', manifestJSON["main.js"])
            .replace('/js/vendors.js', manifestJSON['vendors.js']);
        res.send(html);
    } catch (err) {
        if (err instanceof Error) {
            debug("()", err.message);
            return res.json({error: err.message, name: err.name});
        }
        debug('app.get(*()', err);
        res.json({error: 'unknown error'});
    }
})
app.listen(process.env.PORT);
debug('Server started on port:', process.env.PORT);
debug('API port:', process.env.API_PORT);
