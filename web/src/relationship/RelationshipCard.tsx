import * as React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';
import Synchronizer from '../data/Synchronizer';
import { store } from '../data/Store';
import Component from '../ui/RelationshipCard';
import { Text } from '../ui/Els';

interface Props {
  id: string;
}

interface State {
  id?: string;
  redirectHome: boolean;
}

class RelationshipCard extends React.Component<Props, State> {
  state = {
    redirectHome: false,
  };

  static getDerivedStateFromProps(props: Props, state: any) {
    if (!props || !props.id) {
      return state || {};
    }

    if (state && state.id && props.id === state.id) {
      return state;
    }

    console.log('[RelationshipCard::getDerivedStateFromProps] executed');
    Synchronizer.requireRelationshipCard(props.id);

    return {...state, id: props.id};
  }

  get relationshipCard() {
    const {id} = this.props;

    return store.getRelationshipCard(id);
  }

  handleNameChanged = (name: string) => {
    const {id} = this.props;
    Synchronizer.updateRelationshipCardName(id, name);
  }

  handleNotesChanged = (notes: string) => {
    const {id} = this.props;
    Synchronizer.updateRelationshipCardNotes(id, notes);
  }

  handleDeleteClicked = () => {
    const {id} = this.props;
    if (window.confirm('Delete this card?')) {
      Synchronizer.deleteRelationshipCard(id);
      this.setState({redirectHome: true});
    }
  }

  render() {
    const {redirectHome} = this.state;
    if (redirectHome) {
      return (<Redirect to="/" />);
    }

    if (!this.relationshipCard) {
      return (<Text>Loading...</Text>);
    }

    const {name, notes, tagline} = this.relationshipCard;

    return (
      <Component
        name={name}
        notes={notes}
        tagline={tagline}
        onNameChange={this.handleNameChanged}
        onNotesChange={this.handleNotesChanged}
        onDeleteClick={this.handleDeleteClicked} />
    );
  }
}

decorate(RelationshipCard, {
  relationshipCard: computed,
});

export default observer(RelationshipCard);
