import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PersonCard from './PersonCard';
import PersonNotFoundCard from './PersonNotFoundCard';
import { findPersonById } from '../../reducer';

const mapStateToProps = (state) => ({
  findPersonById: (personId) => findPersonById(state, personId)
});

class PersonCardContainer extends Component {
  static propTypes = {
    personId: PropTypes.string.isRequired,
    findPersonById: PropTypes.func.isRequired
  }

  render() {
    const {personId, findPersonById} = this.props;

    const person = findPersonById(personId);

    if(!person) {
      return (<PersonNotFoundCard />);
    }

    return (
      <PersonCard
        fullName={person.name}
        facts={['Spouce: Bruce Springsteen', 'Stage Manager at NBC Studios']}
        conversations={[
          {
            date: '2017-12-30',
            summary: 'Tried pickles. Made a funny face.'
          },
          {
            date: '2017-12-13',
            summary: 'Said she had never tried pickles.'
          }
        ]}
        notes={['Doesn\'t like pickles']}
        onClickAddFact={() => alert('Add Fact clicked!')}
        onClickAddConversation={() => alert('Add Convo clicked!')}
        onClickAddNote={() => alert('Add Note clicked!')} />
    );
  }
}

export default connect(mapStateToProps)(PersonCardContainer);
