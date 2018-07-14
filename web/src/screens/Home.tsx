import * as React from 'react';
import SearchBar from '../search/SearchBar';
import FavouritesList from '../relationship/FavouritesList';
import Screen from '../ui/Screen';

export default () => (
  <Screen>
    <SearchBar />
    <FavouritesList />
  </Screen>
);
