import * as React from 'react';
import styled from 'styled-components';

const fontFamily = "'Arial'";
const fgColor = "#000";
const bgColor = "#fff";

export const Text = styled.p`
  font-family: ${fontFamily};
  color: ${fgColor};
  font-size: 11pt;
  margin 0;
`;

export const Link = styled.a`
  text-decoration: underline;
  color: ${fgColor};
`;

export const Heading = styled.h1`
  font-family: ${fontFamily};
  margin 0;
`;

export const Group = styled.div``;

export const Input = styled.input`
  height: 22px;
  margin: 0;
  padding: 2px 7px;
  border 1px solid ${fgColor};
  box-sizing: border-box;
`;

export const Button = styled.button`
  height: 22px;
  margin: 0;
  padding: 2px 7px;
  border: 1px solid ${fgColor};
  background-color: ${bgColor};
  box-sizing: border-box;
`;
