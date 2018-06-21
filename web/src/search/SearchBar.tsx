import * as React from 'react';

interface Props {
  query?: string;
  onQueryChanged: (text: string) => void;
}

const SearchBar: React.StatelessComponent<Props> = ({query, onQueryChanged}) => (
  <input type="text" value={query} onChange={(e) => onQueryChanged(e.target.value)} />
);

export default SearchBar;
