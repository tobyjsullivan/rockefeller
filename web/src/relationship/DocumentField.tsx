import * as React from 'react';
import styled from 'styled-components';
import {Group, Text} from '../ui/Els';
import {Document} from './Document';
import DocumentEditor from './DocumentEditor';

interface Props {
  document: Document;
  editing?: boolean;
}

const Paragraph = styled(Text)`
  margin-bottom: 0.7em;
`;

const DocumentField: React.StatelessComponent<Props> = ({document, editing = false}) => {
  if (editing) {
    return (<DocumentEditor document={document} />);
  }

  // const paragraphs = [];
  // // for (let block of document) {
  // //   paragraphs.push((<Paragraph key={block.content}>{block.content}</Paragraph>));
  // // }

  // return (
  //   <Group>
  //     {paragraphs}
  //   </Group>
  // );
  return (<Group />)
};

export default DocumentField;
