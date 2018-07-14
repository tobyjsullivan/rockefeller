import * as React from 'react';
import styled from 'styled-components';
import {Group, Text, Link} from './Els';
import { Iterable } from 'immutable';

interface RelationshipLink {
  id: string;
  name: string;
}

interface Props {
  favourites: boolean;
  relationships: Iterable<any, RelationshipLink>;
  showEmptyText?: boolean;
}

const NoEntriesText = styled(Text)`
  font-style: italic;
  text-align: center;
`;

const RelationshipList: React.StatelessComponent<Props> = ({favourites, relationships, showEmptyText}) => {
  let links = [];
  for (const {id, name} of relationships.toArray()) {
    links.push((<RelationshipListEntry key={id} id={id} name={name} favourite={favourites} />));
  }

  if(links.length === 0) {
    if (!showEmptyText) {
      return null;
    }

    return (
      <NoEntriesText>No relationships yet.</NoEntriesText>
    );
  }

  return (
    <Group>
      {links}
    </Group>
  );
};

RelationshipList.defaultProps = {
  showEmptyText: true,
};

interface EntryProps {
  id: string;
  name: string;
  favourite: boolean;
}

const RelationshipListEntry: React.StatelessComponent<EntryProps> = ({id, name, favourite}) => {
  const fav = favourite ? '★' : null;
  return (
    <Text>{fav} <Link to={`/relationship/${id}`}>{name}</Link></Text>
  );
};

export default RelationshipList;
