import http from 'node:http';
import Debug from 'debug';

const debug = Debug('gutenprog:load-content');

export function loadJSON(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (response) => {
            const {statusCode} = response;
            const contentType = response.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                debug('loadJSON()', url, statusCode);
                error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                debug('loadJSON()', url, contentType);
                error = new Error(`Invalid content-type.\nExpected application/json but received ${contentType}`);
            }
            if (error) {
                console.error(error.message);
                // Consume response data to free up memory
                response.resume();
                return reject(error);
            }

            response.setEncoding('utf8');
            let rawData = '';
            response.on('data', (chunk) => {
                rawData += chunk;
            });
            response.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    return resolve(parsedData);
                } catch (e) {
                    console.error(e.message);
                    return reject(e);
                }
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
            reject(e);
        });
    })
}

