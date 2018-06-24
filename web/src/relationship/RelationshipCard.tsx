import * as React from 'react';
import styled from 'styled-components';
import {Group, Heading, Text} from '../ui/Els';

interface Props {
  name: string;
  tagline: string;
  notes: string;
}

const Tagline = styled(Text)`
  font-style: italic;
`;

const Notes = styled(Text)`
  margin-top: 8px;
`;

const RelationshipCard: React.StatelessComponent<Props> = ({name, tagline, notes}) => (
  <Group>
    <Heading>{name}</Heading>
    <Tagline>{tagline}</Tagline>
    <Notes>{notes}</Notes>
  </Group>
);

export default RelationshipCard;
