import * as React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import RelationshipList from '../ui/RelationshipList';
import Synchronizer from '../data/Synchronizer';
import { store } from '../data/Store';
import { CardSummary } from '../data/DataTypes';
import { Iterable } from 'immutable';

interface State {
  relationships: ReadonlyArray<RelationshipLink>;
}

interface RelationshipLink {
  id: string;
  name: string;
}

class Favourites extends React.Component<{}, State> {
  componentDidMount() {
    Synchronizer.requireCardSummaries();
  }

  get favouriteLinks(): Iterable<any, CardSummary> {
    const filter = store.searchQuery;
    let relationships = store.cardSummaries.filter(r => r.favourite);
    if (filter !== '') {
      relationships = relationships.filter(r => new RegExp(filter, 'i').test(r.name));
    }
    return relationships;
  }

  render() {
    let relationships = this.favouriteLinks;

    return (
      <RelationshipList favourites={true} showEmptyText={false} relationships={relationships} />
    );
  }
}

decorate(Favourites, {
  favouriteLinks: computed,
});

export default observer(Favourites);
