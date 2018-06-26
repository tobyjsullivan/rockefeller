import * as React from 'react';
import styled from 'styled-components';
import {Document} from './Document';
import {Editor, EditorState} from 'draft-js';
import { Group } from '../ui/Els';

interface Props {
  document: Document;
}

const Border = styled(Group)`
  border: 1px solid #000;
  padding: 7px;
`;

class DocumentEditor extends React.Component<Props> {
  state = {
    editorState: DocumentEditor.documentToEditorState(this.props.document)
  }

  render() {
    const {editorState} = this.state;

    return (
      <Border>
        <Editor editorState={editorState} onChange={this.handleEditorChanged} />
      </Border>
    );
  }

  private handleEditorChanged = (editorState: EditorState) => {
    console.log(editorState);
    this.setState({editorState});
  }

  private static documentToEditorState(document: Document): EditorState {
    // TODO: Implement
    return EditorState.createEmpty();
  }
}

export default DocumentEditor;
