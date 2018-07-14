import * as React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import FavouritesList from '../ui/FavouritesList';
import RelationshipDB from './RelationshipDB';

interface State {
  relationships: ReadonlyArray<RelationshipLink>;
}

interface RelationshipLink {
  name: string;
}

class FavouritesListContainer extends React.Component<{}, State> {
  get favouriteLinks() {
    return RelationshipDB.relationships;
  }

  render() {
    const relationships = this.favouriteLinks;

    return (
      <div>
        <FavouritesList relationships={relationships} />
      </div>
    );
  }
}

decorate(FavouritesListContainer, {
  favouriteLinks: computed,
});

export default observer(FavouritesListContainer);
