import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {getAllPeopleIds, findPersonById} from '../../reducer';
import PeopleIndex from './PeopleIndex';

const mapStateToProps = (state) => ({
  getAllPeopleIds: () => getAllPeopleIds(state),
  findPersonById: (personId) => findPersonById(state, personId)
});

const PeopleIndexContainer = ({getAllPeopleIds, findPersonById}) => {
  const peopleIds = getAllPeopleIds();
  const people = peopleIds.map(id => {
    const person = findPersonById(id);

    return {
      personId: person.id,
      name: person.name
    };
  }).toArray();

  return (
    <PeopleIndex
      people={people} />
  );
};

PeopleIndexContainer.propTypes = {
  getAllPeopleIds: PropTypes.func.isRequired,
  findPersonById: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(PeopleIndexContainer);
