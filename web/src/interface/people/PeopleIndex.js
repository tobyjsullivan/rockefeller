import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Index = styled.ul``;

const Person = styled.li``;

const PeopleIndex = ({people}) => (
  <Index>
    {people.map(({personId, name}) => (<Person key={personId}><Link to={`/people/${personId}`}>{name}</Link></Person>))}
  </Index>
);

PeopleIndex.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({
    personId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
};

export default PeopleIndex;
