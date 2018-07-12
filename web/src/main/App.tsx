import * as React from 'react';
import { Switch, Route } from 'react-router';
import HomeScreen from '../home/HomeScreen';
import RelationshipCardScreen from '../relationship/RelationshipCardScreen';


const App = () => {
  return (
    <Switch>
      <Route path="/relationship/:id" component={RelationshipCardScreen} />
      <Route component={HomeScreen} />
    </Switch>
  );
};

export default App;
