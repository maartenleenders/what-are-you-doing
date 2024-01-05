import * as ReactDOM from 'react-dom';
import App from './elements/app';
import React from 'react';


function render() {
    ReactDOM.render(
        <React.StrictMode>
           
                <App />
        </React.StrictMode>
        , document.body);
}

render();