import * as React from 'react';
import RelationshipCard from '../ui/RelationshipCard';
import { Group, Link } from '../ui/Els';
import HomeLink from '../ui/HomeLink';

const RelationshipCardScreen: React.StatelessComponent = () => (
  <Group>
    <HomeLink />
    <RelationshipCard name="Ingrid A. Davis" tagline="Worked together at Megacorp" notes="Notes..." />
  </Group>
);

export default RelationshipCardScreen;
