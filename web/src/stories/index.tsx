import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import HomeScreen from '../home/HomeScreen';
import SearchBar from '../search/SearchBar';

storiesOf('Home Screen', module)
  .add('default', () => (<HomeScreen />));

storiesOf('Search Bar', module)
  .add('default', () => (
    <SearchBar
      onQueryChanged={action('query-changed')}
      onSearchClicked={action('search-clicked')} />
  ))
  .add('with text', () => (
    <SearchBar
      query="Marty McFly"
      onQueryChanged={action('query-changed')}
      onSearchClicked={action('search-clicked')} />
  ));
