import * as React from 'react';
import styled from 'styled-components';
import {Group, Text} from '../ui/Els';
import {Document} from './Document';
import DocumentEditor from './DocumentEditor';
import Theme from '../ui/Theme';
import DocumentDisplay from './DocumentDisplay';

interface Props {
  document: Document;
  editing?: boolean;
}

const Border = styled(Group)`
  border: 1px solid ${Theme.fgColor};
  padding: 7px;
  font-family: ${Theme.fontFamily};
  color: ${Theme.fgColor};
  font-size: ${Theme.fontSize};
`;

const DocumentField: React.StatelessComponent<Props> = ({document, editing = false}) => {
  let field = (<DocumentDisplay document={document} />);

  if (editing) {
    field = (<DocumentEditor document={document} />);
  }

  return (
    <Border>
      {field}
    </Border>
  );
};

export default DocumentField;
