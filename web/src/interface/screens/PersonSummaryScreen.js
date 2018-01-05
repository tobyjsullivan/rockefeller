import React from 'react';
import styled from 'styled-components';

import Header from '../Header';
import PersonCardContainer from '../people/PersonCardContainer';

const AppWindow = styled.div``;

export default ({match}) => {
  const {params: {personId}} = match;

  return (
    <AppWindow>
      <Header />
      <PersonCardContainer personId={personId} />
    </AppWindow>
  );
};
