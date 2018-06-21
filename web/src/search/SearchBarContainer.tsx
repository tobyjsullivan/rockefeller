import * as React from 'react';
import SearchBar from './SearchBar';

interface Props {
  onQueryChanged?: (query: string) => void;
}

interface State {
  query: string;
}

class SearchBarContainer extends React.Component<Props, State> {
  state: State = {
    query: ""
  };

  handleQueryChanged = (query: string) => {
    this.setState((state) => ({...state, query}), () => {
      if (this.props.onQueryChanged) {
        this.props.onQueryChanged(this.state.query);
      }
    });
  };

  render() {
    const {query} = this.state;

    return (<SearchBar onQueryChanged={this.handleQueryChanged} query={query} />);
  }
}

export default SearchBarContainer;
