import 'dotenv/config';
import express from 'express';
import Debug from 'debug';
import compression from 'compression';
import helmet from "helmet";
import {promises as fsPromises} from "node:fs";
import {loadJSON} from './load-content.js'


const debug = Debug('gutenprog:local-server');
const app = express();
app.use(compression());
app.use(helmet());
app.use((req, res, next) => {
    debug(req.ip, req.method, req.url);
    next();
})
app.use('/css', express.static('./public/css'));
app.use('/js', express.static('./public/js'));
app.get('*', async (req, res) => {
    try {
        const manifestFile = await fsPromises.readFile('./public/js/manifest.json');
        /**
         *
         * @type {ManifestFiles}
         */
        const manifestJSON = JSON.parse(Buffer.from(manifestFile).toString());
        debug('manifestJSON', manifestJSON);
        // const state = await loadJSON(`http://localhost:${process.env.API_PORT}/api/preload/state`);
        const _html = await fsPromises.readFile('./public/index.html');
        const html = Buffer.from(_html).toString()
            .replace('/js/main.js', manifestJSON["main.js"])
            .replace('/js/vendors.js', manifestJSON['vendors.js']);
        res.send(html);
    } catch(err) {
        if (err instanceof Error) {
            debug("()", err.message);
            return res.json({error: err.message, name: err.name});
        }
        res.json({error: 'unknown error in '});
    }
})
app.listen(process.env.PORT);
debug('Server started on port:', process.env.PORT);
debug('API port:', process.env.API_PORT);
