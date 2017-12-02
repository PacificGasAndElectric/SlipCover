import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker'; // eslint-disable-line no-named-as-default

const store = createStore(reducer);
// Provider - a component at the root of your redux application that provides the redux store globally.
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
    registerServiceWorker();
