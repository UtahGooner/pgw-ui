import React from 'react';
import {Provider} from 'react-redux';
import store from './app/configureStore';
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./app/AppRouter";

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    </Provider>
);
