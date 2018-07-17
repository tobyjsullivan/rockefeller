import * as React from 'react';
import styled from 'styled-components';
import {Group, Heading, Text, Button} from './Els';
import NoteField from './NoteField';

interface Props {
  name: string;
  tagline: string;
  notes: string;
  onNotesChange?: (content: string) => any;
  onDeleteClick?: () => any;
}

const Tagline = styled(Text)`
  font-style: italic;
  margin-bottom: 1em;
`;

const RelationshipCard: React.StatelessComponent<Props> =
  ({name, tagline, notes, onNotesChange, onDeleteClick}) => (
  <Group>
    <Heading>{name}</Heading>
    <Tagline>{tagline}</Tagline>
    <NoteField content={notes} onContentChange={onNotesChange} />
    <Button onClick={onDeleteClick}>♲</Button>
  </Group>
);

export default RelationshipCard;
