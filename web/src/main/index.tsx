import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

export default () => {
  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>),
    document.getElementById('root')
  );
}
