import * as React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import RelationshipList from '../ui/RelationshipList';
import RelationshipDB from './RelationshipDB';

interface State {
  relationships: ReadonlyArray<RelationshipLink>;
}

interface RelationshipLink {
  id: string;
  name: string;
}

class Favourites extends React.Component<{}, State> {
  get favouriteLinks() {
    return RelationshipDB.relationships.filter(r => r.favourite);
  }

  render() {
    const relationships = this.favouriteLinks;

    return (
      <RelationshipList favourites={true} showEmptyText={false} relationships={relationships} />
    );
  }
}

decorate(Favourites, {
  favouriteLinks: computed,
});

export default observer(Favourites);
