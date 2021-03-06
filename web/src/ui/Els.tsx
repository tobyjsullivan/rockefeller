import * as React from 'react';
import styled from 'styled-components';
import {Link as RLink} from 'react-router-dom';
import Theme from './Theme';

export const Text = styled.p`
  font-family: ${Theme.fontFamily};
  color: ${Theme.fgColor};
  font-size: ${Theme.fontSize};
  line-height: calc(${Theme.fontSize} + 6px);
  margin 0;
`;

export const Link = styled(RLink)`
  text-decoration: underline;
  color: ${Theme.fgColor};
`;

export const Heading = styled.h1`
  font-family: ${Theme.fontFamily};
  font-size: ${Theme.fontSizeHeading};
  margin 0;
`;

export const Group = styled.div``;

export const Input = styled.input`
  height: calc(${Theme.fontSize} + 11px);
  margin: 0;
  padding: 2px 7px;
  border 1px solid ${Theme.fgColor};
  font-family: ${Theme.fontFamily};
  font-size: ${Theme.fontSize};
  box-sizing: border-box;
`;

export const Button = styled.button`
  height: calc(${Theme.fontSize} + 11px);
  margin: 0;
  padding: 2px 7px;
  border: 1px solid ${Theme.fgColor};
  background-color: ${Theme.bgColor};
  font-family: ${Theme.fontFamily};
  font-size: ${Theme.fontSize};
  box-sizing: border-box;
`;
