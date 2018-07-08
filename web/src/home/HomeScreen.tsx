import * as React from 'react';
import SearchBar from './SearchBar';
import FavouritesList from './FavouritesList';
import {Group} from '../ui/Els';

export default () => (
  <Group>
    <SearchBar />
    <FavouritesList />
  </Group>
);
