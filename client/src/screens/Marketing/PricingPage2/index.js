import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import PricingCard from './pricingCard';
import ComparisonTable from './comparisonTable';

const Container = styled.div`
  background-color: ${colors.gray50};
`;

const Heading = styled.div`
  text-align: center;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 3rem;
  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 4rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.875rem;
  line-height: 2.25rem;
  @media (min-width: ${breakpoints.small}) {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    font-size: 3rem;
    line-height: 1;
  }
  font-weight: 800;
  color: ${colors.gray900};
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  color: ${colors.gray600};
`;

const Pricing = () => (
  <React.Fragment>
    <Container>
      <Heading>
        <Title>Simple no-tricks pricing</Title>
        <Description>
          If you're not satisfied, contact us within the first 14 days and we'll send you a full
          refund.
        </Description>
      </Heading>
      <PricingCard />
    </Container>
    <ComparisonTable />
  </React.Fragment>
);

export default Pricing;
