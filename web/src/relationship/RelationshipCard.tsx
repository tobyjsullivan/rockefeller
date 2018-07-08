import * as React from 'react';
import styled from 'styled-components';
import {Group, Heading, Text} from '../ui/Els';
import NoteField from '../ui/NoteField';

interface Props {
  name: string;
  tagline: string;
  notes: string;
}

const Tagline = styled(Text)`
  font-style: italic;
  margin-bottom: 1em;
`;

const RelationshipCard: React.StatelessComponent<Props> = ({name, tagline, notes}) => (
  <Group>
    <Heading>{name}</Heading>
    <Tagline>{tagline}</Tagline>
    <NoteField content={notes} />
  </Group>
);

export default RelationshipCard;
