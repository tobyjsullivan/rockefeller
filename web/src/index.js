import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './interface/App';
import registerServiceWorker from './registerServiceWorker';
import appReducer from './reducer';
import {loadState, saveState} from './localStorage';

const persistedState = loadState();
const store = createStore(appReducer, persistedState);

store.subscribe(() => {
  saveState({
    auth: store.getState().auth
  })
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
