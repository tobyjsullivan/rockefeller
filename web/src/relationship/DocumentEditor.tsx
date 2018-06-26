import * as React from 'react';
import {Document} from './Document';
import {Editor, EditorState} from 'draft-js';

interface Props {
  document: Document;
}

class DocumentEditor extends React.Component<Props> {
  state = {
    editorState: DocumentEditor.documentToEditorState(this.props.document)
  }

  render() {
    const {editorState} = this.state;

    return (
      <Editor editorState={editorState} onChange={this.handleEditorChanged} />
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
