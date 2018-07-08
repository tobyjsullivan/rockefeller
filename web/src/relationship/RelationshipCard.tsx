import * as React from 'react';
import styled from 'styled-components';
import {Group, Heading, Text} from '../ui/Els';
import {Document} from '../document/Document';
import DocumentField from '../document/DocumentField';

interface Props {
  name: string;
  tagline: string;
  notes: Document;
}

const Tagline = styled(Text)`
  font-style: italic;
  margin-bottom: 1em;
`;

const RelationshipCard: React.StatelessComponent<Props> = ({name, tagline, notes}) => (
  <Group>
    <Heading>{name}</Heading>
    <Tagline>{tagline}</Tagline>
    <DocumentField document={notes} />
  </Group>
);

export default RelationshipCard;
