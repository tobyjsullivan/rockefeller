import * as React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import RelationshipList from '../ui/RelationshipList';
import Synchronizer from '../data/Synchronizer';
import { store } from '../data/Store';

interface State {
  relationships: ReadonlyArray<RelationshipLink>;
}

interface RelationshipLink {
  name: string;
}

class Recents extends React.Component<{}, State> {
  componentDidMount() {
    Synchronizer.requireCardSummaries();
  }

  get recentLinks() {
    const filter = store.searchQuery;
    let relationships = store.cardSummaries.filter(r => !r.favourite);
    if (filter !== '') {
      relationships = relationships.filter(r => r.name.search(filter) !== -1);
    }
    return relationships;
  }

  render() {
    const relationships = this.recentLinks;

    return (
      <RelationshipList
        favourites={false}
        relationships={relationships} />
    );
  }
}

decorate(Recents, {
  recentLinks: computed,
});

export default observer(Recents);
