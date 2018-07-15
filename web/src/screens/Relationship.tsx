import * as React from 'react';
import RelationshipCard from '../relationship/RelationshipCard';
import Screen from '../ui/Screen';
import HomeLink from '../ui/HomeLink';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
}

const Relationship: React.StatelessComponent<Props> = ({match: {params: { id }}}) => {
  return (
    <Screen>
      <HomeLink />
      <RelationshipCard id={id} />
    </Screen>
  );
};

export default Relationship;
