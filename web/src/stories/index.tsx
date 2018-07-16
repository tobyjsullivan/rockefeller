import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from './StoryRouter';
import RelationshipList from '../ui/RelationshipList';
import RelationshipCard from '../ui/RelationshipCard';
import Omnibar from '../ui/Omnibar';
import NoteField from '../ui/NoteField';
import {Button, Text, Heading} from '../ui/Els';
import { List } from 'immutable';

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
    <Omnibar
      onQueryChange={action('query-changed')}
      onAddClick={action('search-clicked')} />
  ))
  .add('with text', () => (
    <Omnibar
      query="Marty McFly"
      onQueryChange={action('query-changed')}
      onAddClick={action('search-clicked')} />
  ));

storiesOf('RelationshipList', module)
  .addDecorator(StoryRouter)
  .add('Normal', () => (
    <RelationshipList
      favourites={false}
      relationships={List([
        {id: '1', name: "Fatinah Zahrah Baba"},
        {id: '2', name: "Leonardo Lima"}
      ])} />
  ))
  .add('Empty normal', () => (
    <RelationshipList favourites={false} relationships={List()} />
  ))
  .add('Favourites', () => (
    <RelationshipList
      favourites={true}
      relationships={List([
        {id: '1', name: "Fatinah Zahrah Baba"},
        {id: '2', name: "Leonardo Lima"}
      ])} />
  ))
  .add('Empty no text', () => (
    <RelationshipList favourites={false} showEmptyText={false} relationships={List()} />
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
