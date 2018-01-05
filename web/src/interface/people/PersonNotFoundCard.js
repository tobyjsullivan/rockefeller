import React from 'react';
import styled from 'styled-components';

import Card from '../Card';

const ErrorMessage = styled.p`
  font-style: italic;
  color: #ccc;
`;

export default () => (
  <Card>
    <ErrorMessage>This person does not exist.</ErrorMessage>
  </Card>
);
