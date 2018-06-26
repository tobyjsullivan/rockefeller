import * as React from 'react';
import styled from 'styled-components';
import {Group, Input, Button} from '../../ui/Els';

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
  onQueryChanged: (text: string) => void;
  onSearchClicked: () => void;
}

const SearchBar: React.StatelessComponent<Props> = ({query, onQueryChanged, onSearchClicked}) => (
  <Group>
    <TextBox type="text" value={query} onChange={(e) => onQueryChanged(e.target.value)} />
    <SearchButton onClick={() => onSearchClicked()}>Search</SearchButton>
  </Group>
);

export default SearchBar;
