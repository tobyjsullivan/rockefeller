import React from 'react';
import styled from 'styled-components';

import Header from '../Header';
import PersonCardContainer from '../people/PersonCardContainer';

const AppWindow = styled.div``;

export default () => (
  <AppWindow>
    <Header />
    <PersonCardContainer />
  </AppWindow>
);
