import styled from 'styled-components';

const fontFamily = "'Arial'";
const fontColor = "#000";

export const Text = styled.p`
  font-family: ${fontFamily};
  color: ${fontColor};
  margin 0;
`;

export const Link = styled.a`
  text-decoration: underline;
  color: ${fontColor};
`;

export const Heading = styled.h1`
  font-family: ${fontFamily};
  margin 0;
`;

export const Group = styled.div``;
