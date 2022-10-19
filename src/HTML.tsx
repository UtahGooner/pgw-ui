import {HelmetData} from "react-helmet";
import {ManifestFiles, Preload} from "./types";
import {Provider} from "react-redux";
import store from "./app/configureStore";
import AppRouter from "./app/AppRouter";
import React from "react";

const HTML = ({helmet, state, manifest}: {
                  helmet: HelmetData;
                  state: Preload;
                  manifest: ManifestFiles;
              }
) => {
    return (
        <html lang="en-us" dir="ltr">
        <head>
            <meta charSet="utf-8"/>
            <title>Petroglyph Watch</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" type="image/png" href="/images/logo.png"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <link rel="stylesheet" href="/css/main.css"/>
            {helmet.title.toComponent()}
            <script>
                window.__PRELOADED_STATE = {JSON.stringify(state)};
            </script>
        </head>
        <body>
        <div id="app">
            <Provider store={store}>
                <AppRouter/>
            </Provider>
        </div>
        <script src={manifest["vendors.js"]}/>
        <script src={manifest["main.js"]}/>
        </body>
        </html>
    )
}

export default HTML;
