import * as ReactDOM from 'react-dom';
import App from './app';
import React from 'react';
import { LogEntriesContextProvider } from '../../shared/context/log-entries.context';


function render() {
    ReactDOM.render(
        <React.StrictMode>
<LogEntriesContextProvider>
                <App />
                </LogEntriesContextProvider>
        </React.StrictMode>
        , document.body);
}

render();