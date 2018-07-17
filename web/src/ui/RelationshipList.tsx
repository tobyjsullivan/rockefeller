import * as React from 'react';
import styled from 'styled-components';
import {Group, Text, Link} from './Els';
import { Iterable } from 'immutable';
import { buildUrl } from '../relationship/UrlBuilder';

interface RelationshipLink {
  id: string;
  name: string;
}

interface Props {
  favourites: boolean;
  relationships: Iterable<any, RelationshipLink>;
  showEmptyText?: boolean;
}

const NoRelationshipsText = styled(Text)`
  text-align: center;
`;

const RelationshipList: React.StatelessComponent<Props> = ({favourites, relationships, showEmptyText}) => {
  let links = [];
  const sorted = relationships.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });

  for (const {id, name} of sorted.toArray()) {
    links.push((<RelationshipListEntry key={id} id={id} name={name} favourite={favourites} />));
  }

  if(links.length === 0) {
    if (!showEmptyText) {
      return null;
    }

    return (
      <NoRelationshipsText>☕</NoRelationshipsText>
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
    <Text>{fav} <Link to={buildUrl(id)}>{name}</Link></Text>
  );
};

export default RelationshipList;
