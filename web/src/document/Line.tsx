import * as React from 'react';
import styled from 'styled-components';
import {Text} from '../ui/Els';

export default styled(Text)`
  margin-bottom: 0.5em;

  :last-of-type {
    margin-bottom: 0;
  }
`;
