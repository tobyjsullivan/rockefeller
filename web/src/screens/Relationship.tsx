import * as React from 'react';
import RelationshipCard from '../ui/RelationshipCard';
import Screen from '../ui/Screen';
import HomeLink from '../ui/HomeLink';

const Relationship: React.StatelessComponent = () => {
  const relationshipCard = {
    name: 'Ingrid A. Davis',
    tagline: 'Worked together at Megacorp',
    notes: 'Notes...',
  }
  return (
    <Screen>
      <HomeLink />
      <RelationshipCard
        name={relationshipCard.name}
        tagline={relationshipCard.tagline}
        notes={relationshipCard.notes} />
    </Screen>
  );
};

export default Relationship;
