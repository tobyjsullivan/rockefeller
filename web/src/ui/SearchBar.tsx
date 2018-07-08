import * as React from 'react';
import styled from 'styled-components';
import {Group, Input, Button} from './Els';

const Container = styled(Group)`
  display: grid;
  grid-template: auto / 1fr 2px auto;
  max-width: 450px;
`;

const QueryBox = styled(Input)`
  grid-column-start: 1;
  grid-column-end: 2;
`;

const SearchButton = styled(Button)`
  grid-column-start: 3;
  grid-column-end: 4;
  width: 55px;
`;

interface Props {
  query?: string;
  onQueryChange: (text: string) => void;
  onSearchClick: () => void;
}

const SearchBar: React.StatelessComponent<Props> = ({query, onQueryChange, onSearchClick}) => (
  <Container>
    <QueryBox type="text" value={query} onChange={(e) => onQueryChange(e.target.value)} />
    <SearchButton onClick={() => onSearchClick()}>Search</SearchButton>
  </Container>
);

export default SearchBar;
