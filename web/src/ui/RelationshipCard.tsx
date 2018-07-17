import * as React from 'react';
import styled from 'styled-components';
import {Group, Heading, Text, Button} from './Els';
import NoteField from './NoteField';
import EditableHeading from './EditableHeading';

interface Props {
  name: string;
  tagline: string;
  notes: string;
  onNameChange?: (name: string) => any;
  onNotesChange?: (notes: string) => any;
  onDeleteClick?: () => any;
}

const Tagline = styled(Text)`
  font-style: italic;
  margin-bottom: 1em;
`;

const RelationshipCard: React.StatelessComponent<Props> = ({
  name,
  tagline,
  notes,
  onNotesChange,
  onDeleteClick,
  onNameChange,
}) => (
  <Group>
    <EditableHeading content={name} onContentChange={onNameChange} />
    <Tagline>{tagline}</Tagline>
    <NoteField content={notes} onContentChange={onNotesChange} />
    <Button onClick={onDeleteClick}>♻</Button>
  </Group>
);

export default RelationshipCard;
