import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../../styles/theme';
import CheckedListItem from './checkedListItem';

const Wrapper1 = styled.div`
  margin-top: 2rem;
  background-color: ${colors.white};
  margin-bottom: 4rem;
  @media (min-width: ${breakpoints.small}) {
    margin-top: 3rem;
    margin-bottom: 5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    margin-bottom: 12rem;
  }
  position: relative;
  background-color: ${colors.gray50};
`;

const Background = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  height: 50%;
  background-color: ${colors.gray50};
`;

const IntroWrapper = styled.div`
  flex: 1 1 0%;
  background-color: ${colors.white};
  padding: 2rem 1.5rem;
  @media (min-width: ${breakpoints.large}) {
    padding: 3rem;
  }
`;

const Title = styled.h3`
  font-weight: 800;
  color: ${colors.gray900};
  font-size: 1.5rem;
  line-height: 2rem;
  @media (min-width: ${breakpoints.small}) {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }
`;

const SubTitle = styled.p`
  margin-top: 1.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: ${colors.gray500};
`;

const LabelContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
`;

const Label = styled.h4`
  flex-shrink: 0;
  padding-right: 1rem;
  background-color: ${colors.white};
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0.05em;
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.indigo600};
`;

const Line = styled.div`
  flex: 1 1 0%;
  border-top-width: 2px;
  border-color: ${colors.gray200};
`;

const List = styled.ul`
  margin-top: 2rem;
  margin-top: 32px;
  margin-bottom: 32px;
  @media (min-width: ${breakpoints.large}) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 2rem;
    row-gap: 1.25rem;
  }
`;

const CtaWrapper = styled.div`
  padding: 2rem 1.5rem;
  text-align: center;
  background-color: ${colors.gray50};
  @media (min-width: ${breakpoints.large}) {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem;
  }
`;

const PriceWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  line-height: 1;
  font-weight: 800;
  color: ${colors.gray900};
`;

const Currency = styled.span`
  margin-left: 0.75rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: ${colors.gray500};
`;

const Term = styled.p`
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: ${colors.gray900};
`;

const PolicyWrapper = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const Policy = styled.a`
  font-weight: 500;
  color: ${colors.gray500};
  text-decoration: underline;
`;

const ButtonWrapper = styled.div`
  border-radius: 0.375rem;
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
  margin-top: 1.5rem;
`;

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  border-color: transparent;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  border-radius: 0.375rem;
  color: ${colors.white};
  background-color: ${colors.gray800};
  &:hover {
    background-color: ${colors.gray900};
  }
`;

const SampleWrapper = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const Sample = styled.a`
  font-weight: 500;
  color: ${colors.gray900};
`;

const SampleSize = styled.span`
  font-weight: 400;
  color: ${colors.gray500};
`;

const Wrapper2 = styled.div`
  position: relative;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-rem: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-rem: 2rem;
  }
`;

const Card = styled.div`
  max-width: 32rem;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.5rem;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
  overflow: hidden;
  @media (min-width: ${breakpoints.large}) {
    display: flex;
    max-width: none;
  }
`;

const PricingCard = () => (
  <Wrapper1>
    <Background />
    <Wrapper2>
      <Card>
        <IntroWrapper>
          <Title>Lifetime Membership</Title>
          <SubTitle>
            Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis
            blanditiis repellendus etur quidem assumenda.
          </SubTitle>
          <LabelContainer>
            <Label>What's included</Label>
            <Line />
          </LabelContainer>
          <List>
            <CheckedListItem>Private forum access</CheckedListItem>
            <CheckedListItem>Member resources</CheckedListItem>
            <CheckedListItem>Entry to annual conference</CheckedListItem>
            <CheckedListItem>Official member t-shirt</CheckedListItem>
          </List>
        </IntroWrapper>
        <CtaWrapper>
          <Term>Pay once, own it forever</Term>
          <PriceWrapper>
            <span>$349</span>
            <Currency>USD</Currency>
          </PriceWrapper>
          <PolicyWrapper>
            <Policy href="#">Learn about our membership policy</Policy>
          </PolicyWrapper>
          <ButtonWrapper>
            <Button href="#">Get Access</Button>
          </ButtonWrapper>
          <SampleWrapper>
            <Sample href="#">
              Get a free sample
              <SampleSize>(20MB)</SampleSize>
            </Sample>
          </SampleWrapper>
        </CtaWrapper>
      </Card>
    </Wrapper2>
  </Wrapper1>
);

export default PricingCard;
