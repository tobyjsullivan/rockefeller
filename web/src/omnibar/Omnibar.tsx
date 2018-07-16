import * as React from 'react';
import { Redirect } from 'react-router';
import Synchronizer from '../data/Synchronizer';
import Omnibar from '../ui/Omnibar';
import { buildUrl } from '../relationship/UrlBuilder';

interface State {
  query: string;
  redirectToCard?: string;
}

class OmnibarContainer extends React.Component<{}, State> {
  state: State = {
    query: ''
  };

  handleQueryChanged = (query: string) => {
    this.setState((state) => ({...state, query}));
  };

  handleAddClicked = async () => {
    const {query} = this.state;

    if (query === '') {
      return;
    }

    const id = await Synchronizer.createRelationshipCard(query);
    console.log('[Omnibar] created card: %s', id);
    this.setState({query: '', redirectToCard: id});
  }

  render() {
    const {query, redirectToCard} = this.state;

    if (redirectToCard) {
      const url = buildUrl(redirectToCard);
      console.log('[Omnibar] redirecting to %s', url);
      return (<Redirect to={url} />);
    }

    return (
      <Omnibar
        query={query}
        onQueryChange={this.handleQueryChanged}
        onAddClick={this.handleAddClicked} />
    );
  }
}

export default OmnibarContainer;
