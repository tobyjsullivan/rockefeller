import * as React from 'react';
import styled from 'styled-components';

const TextBox = styled.input`
  width: 100%;
`;

interface Props {
  query?: string;
  onQueryChanged: (text: string) => void;
}

const SearchBar: React.StatelessComponent<Props> = ({query, onQueryChanged}) => (
  <TextBox type="text" value={query} onChange={(e) => onQueryChanged(e.target.value)} />
);

export default SearchBar;
