import * as React from 'react';
import SearchBar from '../ui/SearchBar';

interface State {
  query: string;
}

class SearchBarContainer extends React.Component<{}, State> {
  state: State = {
    query: ''
  };

  handleQueryChanged = (query: string) => {
    this.setState((state) => ({...state, query}));
  };

  handleSearchClicked = () => {
    const {query} = this.state;

    // TODO: Execute the query. Deal with redux directly. No props.
    alert('Search executed: '+query);
  }

  render() {
    const {query} = this.state;

    return (
      <SearchBar
        query={query}
        onQueryChange={this.handleQueryChanged}
        onSearchClick={this.handleSearchClicked} />
    );
  }
}

export default SearchBarContainer;
