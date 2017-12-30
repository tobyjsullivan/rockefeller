import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';

import {HeaderHeightPx} from '../theme';
import IconButton from '../IconButton';

const Button = styled(IconButton)`
  width: ${HeaderHeightPx}px;
  height: ${HeaderHeightPx}px;
`;

const SearchButton = ({onClick}) => (
  <Button onClick={onClick}>
    <FontAwesomeIcon icon={faSearch} />
  </Button>
);

SearchButton.propTypes = {
  onClick: PropTypes.func
};

SearchButton.defaultProps = {
  onClick: () => {}
};

export default SearchButton;
