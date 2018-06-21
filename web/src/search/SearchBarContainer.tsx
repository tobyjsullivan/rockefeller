import * as React from 'react';
import SearchBar from './SearchBar';

interface Props {
  onSearchExecuted?: (query: string) => void;
}

interface State {
  query: string;
}

class SearchBarContainer extends React.Component<Props, State> {
  state: State = {
    query: ""
  };

  handleQueryChanged = (query: string) => {
    this.setState((state) => ({...state, query}));
  };

  handleSearchClicked = () => {
    const {onSearchExecuted} = this.props;
    const {query} = this.state;

    if (onSearchExecuted) {
      onSearchExecuted(query);
    }
  }

  render() {
    const {query} = this.state;

    return (
      <SearchBar
        query={query}
        onQueryChanged={this.handleQueryChanged}
        onSearchClicked={this.handleSearchClicked} />
    );
  }
}

export default SearchBarContainer;
