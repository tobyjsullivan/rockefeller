import * as React from 'react';
import styled from 'styled-components';
import {Group, Input, Button} from './Els';

const TextBox = styled(Input)`
  width: calc(100% - (55px + (4 * 2px)));
  margin: 2px;
`;

const SearchButton = styled(Button)`
  width: 55px;
  margin: 2px;
`;

interface Props {
  query?: string;
  onQueryChange: (text: string) => void;
  onSearchClick: () => void;
}

const SearchBar: React.StatelessComponent<Props> = ({query, onQueryChange, onSearchClick}) => (
  <Group>
    <TextBox type="text" value={query} onChange={(e) => onQueryChange(e.target.value)} />
    <SearchButton onClick={() => onSearchClick()}>Search</SearchButton>
  </Group>
);

export default SearchBar;
