import * as React from 'react';
import styled from 'styled-components';
import {Group, Text} from '../../ui/Elements';
import FavouritesListEntry from './FavouritesListEntry';

interface RelationshipLink {
  name: string;
}

class Props {
  relationships: ReadonlyArray<RelationshipLink>
}

const NoFavouritesText = styled(Text)`
  font-style: italic;
  text-align: center;
`;

const FavouritesList: React.StatelessComponent<Props> = ({relationships}) => {
  let links = [];
  for (const {name} of relationships) {
    links.push((<FavouritesListEntry key={name} name={name} />));
  }

  if(links.length === 0) {
    return (
      <NoFavouritesText>No favourites yet.</NoFavouritesText>
    );
  }

  return (
    <Group>
      {links}
    </Group>
  );
};

export default FavouritesList;
