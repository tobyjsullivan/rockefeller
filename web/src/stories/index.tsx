import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SearchBar from '../home/search/SearchBar';
import FavouritesList from '../home/favourites/FavouritesList';
import RelationshipCard from '../relationship/RelationshipCard';

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

storiesOf('Favourites List', module)
  .add('with two cards', () => (
    <FavouritesList
      relationships={[
        {name: "Fatinah Zahrah Baba"},
        {name: "Leonardo Lima"}
      ]} />
  ))
  .add('with no cards', () => (
    <FavouritesList relationships={[]} />
  ));

storiesOf('Relationship Card', module)
  .add('with simple content', () => {
    // const notes = "2017-03-22 Had lunch at the farmhouse. Met her partner, Smidt Ivett.\n\n2018-06-22 Stayed with them when we visited Venice."
    const notes = "2017-03-22 Had lunch at the farmhouse. Met her partner, Smidt Ivett."
    return (
      <RelationshipCard name="Ingrid A. Davis" tagline="Worked together at Megacorp" notes={notes} />
    );
  });
