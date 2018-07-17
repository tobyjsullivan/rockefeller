import * as React from 'react';
import styled from 'styled-components';
import {Group, Input, Button} from './Els';

const Container = styled(Group)`
  display: grid;
  grid-template: auto / 1fr 2px auto;
`;

const QueryBox = styled(Input)`
  grid-column-start: 1;
  grid-column-end: 2;
`;

const AddButton = styled(Button)`
  grid-column-start: 3;
  grid-column-end: 4;
`;

interface Props {
  query?: string;
  onQueryChange: (text: string) => void;
  onAddClick: () => void;
}

const Omnibar: React.StatelessComponent<Props> = ({query, onQueryChange, onAddClick}) => (
  <Container>
    <QueryBox type="text" value={query} onChange={(e) => onQueryChange(e.target.value)} />
    <AddButton onClick={() => onAddClick()}>✚</AddButton>
  </Container>
);

export default Omnibar;
