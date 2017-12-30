import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SidebarButton from './menu/SidebarButton';
import SearchBar from './search/SearchBar';

const Wrapper = styled.div`
  display: flex;
`;

const SearchBarWrapper = styled.div`
  flex-grow: 2;
`;

const Header = ({onSidebarClick, onSearchClick}) => (
  <Wrapper>
    <SidebarButton onClick={onSidebarClick} />
    <SearchBarWrapper>
      <SearchBar onSearchClick={onSearchClick} />
    </SearchBarWrapper>
  </Wrapper>
);

Header.propTypes = {
  onSidebarClick: PropTypes.func,
  onSearchClick: PropTypes.func
};

Header.defaultProps = {
  onSidebarClick: () => {},
  onSearchClick: () => {}
};

export default Header;
