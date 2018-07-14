import * as React from 'react';
import styled from 'styled-components';

interface Props {
  content: string
  onContentChange?: (content: string) => void
}

export const Textarea = styled.textarea`
  width: 100%;
  height: 350px;
`;

const NoteField: React.StatelessComponent<Props> = ({content, onContentChange}) => {
  return (<Textarea onChange={(e) => onContentChange(e.target.value)} defaultValue={content} />)
};

NoteField.defaultProps = {
  onContentChange: () => {}
};

export default NoteField;
