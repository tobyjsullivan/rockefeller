import * as React from 'react';
import {Document} from './Document';
import {Editor, EditorState, DefaultDraftBlockRenderMap} from 'draft-js';
import { contentStateFromDocument } from './DraftAdapter';
import { Map } from 'immutable';
import Line from './Line';

interface Props {
  document: Document;
}

class DocumentEditor extends React.Component<Props> {
  state = {
    editorState: DocumentEditor.fromDoc(this.props.document)
  }

  render() {
    const {editorState} = this.state;

    return (
      <Editor
        editorState={editorState}
        onChange={this.handleEditorChanged} />
    );
  }

  private handleEditorChanged = (editorState: EditorState) => {
    console.log(editorState);
    this.setState({editorState});
  }

  private static fromDoc(document: Document): EditorState {
    const contentState = contentStateFromDocument(document);
    return EditorState.createWithContent(contentState);
  }
}

export default DocumentEditor;
