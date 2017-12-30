import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/fontawesome-free-solid';

import IconButton from '../IconButton';

const AddDetailButton = ({onClick}) => (
  <IconButton onClick={onClick}>
    <FontAwesomeIcon icon={faPlusCircle} />
  </IconButton>
);

AddDetailButton.propTypes = {
  onClick: PropTypes.func
};

AddDetailButton.defaultProps = {
  onClick: () => {}
};

export default AddDetailButton;
