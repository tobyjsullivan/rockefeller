import * as React from 'react';
import SearchBarContainer from './search/SearchBarContainer';
import FavouritesListContainer from './favourites/FavouritesListContainer';
import {Group} from '../ui/Els';

export default () => (
  <Group>
    <SearchBarContainer />
    <FavouritesListContainer />
  </Group>
);
