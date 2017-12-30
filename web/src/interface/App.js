import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ProvingGround from './ProvingGround';
import PersonSummaryScreen from './screens/PersonSummaryScreen';
import HomeScreen from './screens/HomeScreen';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/proving" component={ProvingGround} />
        <Route path="/people/:personId" component={PersonSummaryScreen} />
        <Route path="/" component={HomeScreen} />
      </Switch>
    );
  }
}

export default App;
