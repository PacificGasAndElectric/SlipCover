import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';
import logger from 'redux-logger';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import registerServiceWorker from './registerServiceWorker'; // eslint-disable-line no-named-as-default

const store = createStore(
    reducer, 
    applyMiddleware(thunk, promise, logger)
);
// Provider - a component at the root of your redux application that provides the redux store globally.
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
    registerServiceWorker();
