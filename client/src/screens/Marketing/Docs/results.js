import React from 'react';
import styled from 'styled-components';
import { connectHits } from 'react-instantsearch-dom';
import { connectSearchBox } from 'react-instantsearch/connectors';

import SearchList from '../Docs/searchList';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { colors } from '../../../styles/theme';

const SearchListContainer = styled.div`
  padding: 16px 24px 0;
  border-bottom: 1px solid ${colors.gray200};
  &:hover {
    background-color: ${colors.gray100};
    cursor: pointer;
  }
`;

const NoHits = styled.div`
  height: calc(100% - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Hits = connectHits(({ hits }) => (
  <React.Fragment>
    {hits && hits.length > 0 ? (
      <React.Fragment>
        {hits.map((hit) => (
          <SearchListContainer>
            <SearchList key={hit.id} hit={hit} />
          </SearchListContainer>
        ))}
      </React.Fragment>
    ) : (
      <NoHits>
        <AiOutlineFileSearch size={50} color={colors.gray300} />
      </NoHits>
    )}
  </React.Fragment>
));

const Results = connectSearchBox(({ currentRefinement }) => (currentRefinement ? <Hits /> : null));

export default Results;
