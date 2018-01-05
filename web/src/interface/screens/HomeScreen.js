import React from 'react';
import styled from 'styled-components';

import Header from '../Header';
import PeopleIndexContainer from '../people/PeopleIndexContainer';

const AppWindow = styled.div``;

export default () => (
  <AppWindow>
    <Header />
    <PeopleIndexContainer />
  </AppWindow>
);
