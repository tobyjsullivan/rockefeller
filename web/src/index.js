import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import './index.css';
import App from './interface/App';
import registerServiceWorker from './registerServiceWorker';
import appReducer from './reducer';
import { loadState, saveState } from './localStorage';
import {
  getPasswordHash,
  isSaveFileLoadingStarted
} from './reducer';

const persistedState = loadState();
const store = createStore(appReducer, persistedState);

store.subscribe(() => {
  saveState({
    auth: store.getState().auth
  })
});

store.subscribe(() => {
  const state = store.getState();
  console.log('[fetch-data] State changed')
  const passwordHash = getPasswordHash(state);
  console.log('[fetch-data] passwordHash:', passwordHash);
  const loadingStarted = isSaveFileLoadingStarted(state);
  console.log('[fetch-data] loadingStarted:', loadingStarted);
  if (passwordHash !== '' && !loadingStarted) {
      console.log('[fetch-data] dispatching BEGIN_LOADING');
    store.dispatch({
      type: 'SAVE_FILE_BEGIN_LOADING',
      payload: {}
    });

    console.log('[fetch-data] firing axios request');
    axios.get('https://rockefeller.tobysullivan.net/data/'+passwordHash+'.json')
      .then(resp => {
        console.log(resp.data);
        resp.data.people.forEach(person => {
          store.dispatch({
            type: 'ENTITY_STORE_PERSON',
            payload: person
          })
        });
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      })
      .then(() => {
        console.log('[fetch-data] dispatching FINISH_LOADING');
        store.dispatch({type: 'SAVE_FILE_FINISH_LOADING'});
      });
  }
});

store.dispatch({type: 'INIT_APP', payload: {}});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
