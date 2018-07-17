import * as React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';
import Synchronizer from '../data/Synchronizer';
import { store } from '../data/Store';
import Omnibar from '../ui/Omnibar';
import { buildUrl } from '../relationship/UrlBuilder';

interface State {
  redirectToCard?: string;
}

class OmnibarContainer extends React.Component<{}, State> {
  state: State = { };

  handleQueryChanged = (query: string) => {
    store.searchQuery = query;
  };

  handleAddClicked = async () => {
    const query = store.searchQuery;

    if (query === '') {
      return;
    }

    const id = await Synchronizer.createRelationshipCard(query);
    console.log('[Omnibar] created card: %s', id);
    store.searchQuery = '';
    this.setState({redirectToCard: id});
  }

  render() {
    const query = store.searchQuery;
    const {redirectToCard} = this.state;

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

export default observer(OmnibarContainer);
