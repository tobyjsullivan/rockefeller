import * as React from 'react';
import { Switch, Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import HomeScreen from '../screens/Home';
import RelationshipScreen from '../screens/Relationship';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/relationship/:id" component={RelationshipScreen} />
        <Route component={HomeScreen} />
      </Switch>
    </HashRouter>
  );
};

export default App;
