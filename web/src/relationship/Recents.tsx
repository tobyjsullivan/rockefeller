import * as React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import RelationshipList from '../ui/RelationshipList';
import RelationshipDB from './RelationshipDB';

interface State {
  relationships: ReadonlyArray<RelationshipLink>;
}

interface RelationshipLink {
  name: string;
}

class Recents extends React.Component<{}, State> {
  get recentLinks() {
    return RelationshipDB.relationships.filter(r => !r.favourite);
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
