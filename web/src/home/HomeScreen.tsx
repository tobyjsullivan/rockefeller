import * as React from 'react';
import SearchBarContainer from '../search/SearchBarContainer';

export default () => (
  <SearchBarContainer onSearchExecuted={(query) => {alert('Searched: '+query)}} />
);
