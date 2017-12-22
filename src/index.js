import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

/* eslint no-underscore-dangle: [2, { "allow": ["__REDUX_DEVTOOLS_EXTENSION__"] }] */
const store = createStore(
  reducer,
  global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__(),
);
// Provider - a component at the root of your redux application that provides the redux store globally.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
