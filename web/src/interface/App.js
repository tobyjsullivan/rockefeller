import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {getPasswordHash} from '../reducer';

import ProvingGround from './ProvingGround';
import PersonSummaryScreen from './screens/PersonSummaryScreen';
import HomeScreen from './screens/HomeScreen';
import LockScreen from './screens/LockScreen';

const mapStateToProps = state => ({
  passwordHash: getPasswordHash(state)
});

class App extends Component {
  render() {
    const {passwordHash} = this.props;

    if(passwordHash === '') {
      return (<LockScreen />);
    }

    return (
      <Switch>
        <Route path="/proving" component={ProvingGround} />
        <Route path="/people/:personId" component={PersonSummaryScreen} />
        <Route path="/" component={HomeScreen} />
      </Switch>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));
