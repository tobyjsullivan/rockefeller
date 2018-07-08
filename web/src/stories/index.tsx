import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FavouritesList from '../ui/FavouritesList';
import RelationshipCard from '../relationship/RelationshipCard';
import SearchBar from '../ui/SearchBar';
import NoteField from '../ui/NoteField';
import {Button, Text, Heading} from '../ui/Els';

storiesOf('Button', module)
  .add('default', () => (
    <Button onClick={action('button-clicked')}>Click Me!</Button>
  ));

storiesOf('Text', module)
  .add('default', () => (<Text>This is some simple text.</Text>));

storiesOf('Heading', module)
  .add('default', () => (<Heading>Heading</Heading>));

storiesOf('SearchBar', module)
  .add('default', () => (
    <SearchBar
      onQueryChange={action('query-changed')}
      onSearchClick={action('search-clicked')} />
  ))
  .add('with text', () => (
    <SearchBar
      query="Marty McFly"
      onQueryChange={action('query-changed')}
      onSearchClick={action('search-clicked')} />
  ));

storiesOf('FavouritesList', module)
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

storiesOf('RelationshipCard', module)
  .add('with simple content', () => {
    const notes = `2017-03-22 Had lunch at the farmhouse. Met her partner, Smidt Ivett.

2018-06-22 Stayed with them when we visited Venice.`;
    return (
      <RelationshipCard name="Ingrid A. Davis" tagline="Worked together at Megacorp" notes={notes} />
    );
  });

storiesOf('NoteField', module)
  .add('with simple content', () => {
    const content = `2017-03-22 Had lunch at the farmhouse. Met her partner, Smidt Ivett.

2018-06-22 Stayed with them when we visited Venice.`;

    return (
      <NoteField content={content} onContentChange={action('content-changed')} />
    );
  });
