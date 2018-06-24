import * as React from 'react';
import FavouritesList from './FavouritesList';

interface State {
  relationships: ReadonlyArray<RelationshipLink>;
}

interface RelationshipLink {
  name: string;
}

class FavouritesListContainer extends React.Component<{}, State> {
  state = {
    relationships: [
      {name: "Fatinah Zahrah Baba"},
      {name: "Leonardo Lima"}
    ]
  };

  render() {
    const {relationships} = this.state;

    return (<FavouritesList relationships={relationships} />)
  }
}

export default FavouritesListContainer;
