import * as React from 'react';
import { decorate, computed } from 'mobx';
import { observer } from 'mobx-react';
import Synchronizer from '../data/Synchronizer';
import { store } from '../data/Store';
import Component from '../ui/RelationshipCard';
import { Text } from '../ui/Els';

interface Props {
  id: string;
}

interface State {
  id?: string
}

class RelationshipCard extends React.Component<Props, State> {
  state = {};

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

  handleNotesChanged = (content: string) => {
    const {id} = this.props;
    Synchronizer.updateRelationshipCardNotes(id, content);
  }

  render() {
    if (!this.relationshipCard) {
      return (<Text>Loading...</Text>);
    }

    const {name, notes, tagline} = this.relationshipCard;

    return (
      <Component
        name={name}
        notes={notes}
        tagline={tagline}
        onNotesChange={this.handleNotesChanged} />
    );
  }
}

decorate(RelationshipCard, {
  relationshipCard: computed,
});

export default observer(RelationshipCard);
