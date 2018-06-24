import * as React from 'react';
import styled from 'styled-components';
import {Group} from '../../ui/Elements';

const TextBox = styled.input`
  width: calc(100% - (55px + (4 * 2px)));
  height: 22px;
  margin: 2px;
  padding: 2px 7px;
  border 1px solid #000;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 55px;
  height: 22px;
  margin: 2px;
  padding: 2px 7px;
  border: 1px solid #000;
  background-color: #fff;
  box-sizing: border-box;
`;

interface Props {
  query?: string;
  onQueryChanged: (text: string) => void;
  onSearchClicked: () => void;
}

const SearchBar: React.StatelessComponent<Props> = ({query, onQueryChanged, onSearchClicked}) => (
  <Group>
    <TextBox type="text" value={query} onChange={(e) => onQueryChanged(e.target.value)} />
    <Button onClick={() => onSearchClicked()}>Search</Button>
  </Group>
);

export default SearchBar;
