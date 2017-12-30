import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {HeaderHeightPx} from '../theme';
import MenuIcon from '../icons/MenuIcon';
import IconButton from '../IconButton';

const MenuButton = styled(IconButton)`
  width: ${HeaderHeightPx}px;
  height: ${HeaderHeightPx}px;
`;

const SidebarButton = ({onClick}) => (
  <MenuButton onClick={onClick}>
    <MenuIcon />
  </MenuButton>
);

SidebarButton.propTypes = {
  onClick: PropTypes.func
};

SidebarButton.defaultProps = {
  onClick: () => {}
};

export default SidebarButton;
