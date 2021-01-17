import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../../styles/theme';
import SmallScreenComparisonTable from './smallScreenComparisonTable';
import LargeScreenComparisonTable from './largeScreenComparisonTable';

const Wrapper = styled.div`
  background-color: ${colors.white};
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-top: 4rem;
  padding-bottom: 4rem;
  @media (min-width: ${breakpoints.small}) {
    padding: 6rem 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2 rem;
  }
`;

const ComparisonTable = () => (
  <Wrapper>
    <SmallScreenComparisonTable />
    <LargeScreenComparisonTable />
  </Wrapper>
);

export default ComparisonTable;
