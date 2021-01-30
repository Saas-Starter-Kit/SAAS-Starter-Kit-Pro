import React, { useState, useEffect, useRef } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { connectSearchBox } from 'react-instantsearch/connectors';
import { Drawer } from 'antd';
import styled from 'styled-components';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import searchClient from '../../../services/algolia';
import LargeLogo from '../../../components/Common/svgs/LargeLogo';
import { colors } from '../../../styles/theme';
import Results from './results';

const Container = styled.div`
  background-color: white;
  padding: 0 1rem 1rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLargeLogo = styled(LargeLogo)`
  width: 120px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    color: ${colors.dodgerBlue};
  }
`;

const StyledFiSearch = styled(FiSearch)`
  cursor: pointer;
`;

const StyledDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding: 0px;
  }
`;

const StyledFiArrowRight = styled(FiArrowRight)`
  margin-top: 6px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 24px 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.gray200};
`;

const Input = styled.input`
  &:focus {
    outline: none;
  }
  border: none;
  padding-left: 10px;
`;

const SearchBox = ({ currentRefinement, refine }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const input = useRef();
  useEffect(() => {
    if (input && input.current) {
      setTimeout(() => {
        input.current.focus();
      }, 1);
    }
  }, [showDrawer]);
  return (
    <Container>
      <LogoContainer>
        <StyledLargeLogo textColor={colors.indigo400} />
        <IconContainer>
          <StyledFiSearch size={20} onClick={() => setShowDrawer(!showDrawer)} />
        </IconContainer>
      </LogoContainer>
      {showDrawer && (
        <StyledDrawer
          placement="right"
          onClose={() => setShowDrawer(false)}
          visible={showDrawer}
          closeIcon={<StyledFiArrowRight size={18} />}
        >
          <form noValidate action="" role="search">
            <SearchContainer>
              <FiSearch size={18} color={colors.gray600} />
              <Input
                ref={input}
                type="search"
                placeholder="Search..."
                value={currentRefinement}
                onChange={(event) => refine(event.currentTarget.value)}
              />
            </SearchContainer>
          </form>
          <Results />
        </StyledDrawer>
      )}
    </Container>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);

const Search = () => (
  <InstantSearch indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME} searchClient={searchClient}>
    <CustomSearchBox />
  </InstantSearch>
);

export default Search;
