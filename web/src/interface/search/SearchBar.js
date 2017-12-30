import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

const Wrapper = styled.div`
  display: flex;
`;
const InputWrapper = styled.div`
  flex-grow: 2;
`;

const SearchBar = ({onSearchClick}) => (
  <Wrapper>
    <InputWrapper>
      <SearchInput />
    </InputWrapper>
    <SearchButton onClick={onSearchClick} />
  </Wrapper>
);

SearchBar.propTypes = {
  onSearchClick: PropTypes.func
};

SearchBar.defaultProps = {
  onSearchClick: () => {}
};

export default SearchBar;
