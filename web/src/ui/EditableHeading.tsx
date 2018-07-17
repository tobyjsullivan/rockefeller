import * as React from 'react';
import styled from 'styled-components';
import Theme from './Theme';

const Display = styled.h1`
  font-family: ${Theme.fontFamily};
  font-size: ${Theme.fontSizeHeading};
  margin 0;
`;

const Editing = styled.input`
  font-family: ${Theme.fontFamily};
  font-size: ${Theme.fontSizeHeading};
  margin 0;
`;

interface Props {
  content: string;
  onContentChange?: (content: string) => any
}

interface State {
  editing: boolean;
  content: string;
}

class EditableHeading extends React.Component<Props, State> {
  state = {
    editing: false,
    content: this.props.content,
  }

  handleDisplayClicked = () => {
    this.setState({editing: true});
  }

  handleInputChanged = (content: string) => {
    const {onContentChange} = this.props;

    this.setState({content});
    if (onContentChange) {
      onContentChange(content);
    }
  }

  handleInputBlurred = () => {
    this.setState({editing: false});
  }

  render() {
    const {content, editing} = this.state;

    if (editing) {
      return (
        <Editing
          autoFocus={true}
          onFocus={(e) => e.target.select()}
          defaultValue={content}
          onBlur={() => this.handleInputBlurred()}
          onChange={(e) => this.handleInputChanged(e.target.value)} />
      );
    } else {
      return (
        <Display onClick={() => this.handleDisplayClicked()}>{content}</Display>
      );
    }
  }
}

export default EditableHeading;
