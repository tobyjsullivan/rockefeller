import * as React from 'react';
import { Switch, Route } from 'react-router';
import HomeScreen from '../screens/Home';
import RelationshipScreen from '../screens/Relationship';


const App = () => {
  return (
    <Switch>
      <Route path="/relationship/:id" component={RelationshipScreen} />
      <Route component={HomeScreen} />
    </Switch>
  );
};

export default App;
