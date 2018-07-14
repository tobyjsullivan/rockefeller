import * as React from 'react';
import styled from 'styled-components';
import {Group, Text, Link} from './Els';
import { List } from 'immutable';

interface RelationshipLink {
  name: string;
}

class Props {
  relationships: List<RelationshipLink>
}

const NoFavouritesText = styled(Text)`
  font-style: italic;
  text-align: center;
`;

const FavouritesList: React.StatelessComponent<Props> = ({relationships}) => {
  let links = [];
  for (const {name} of relationships.toArray()) {
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

interface EntryProps {
  name: string;
}

const FavouritesListEntry: React.StatelessComponent<EntryProps> = ({name}) => (
  <Text>★ <Link to={`/relationship/${name}`}>{name}</Link></Text>
);

export default FavouritesList;
