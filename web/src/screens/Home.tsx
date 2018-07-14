import * as React from 'react';
import Screen from '../ui/Screen';
import SearchBar from '../search/SearchBar';
import Favourites from '../relationship/Favourites';
import Recents from '../relationship/Recents';

export default () => (
  <Screen>
    <SearchBar />
    <Favourites />
    <Recents />
  </Screen>
);
