import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import { Link } from 'gatsby';

const Background = styled.div`
  background-color: ${colors.indigo600};
`;

const Wrapper = styled.div`
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 4rem 1rem;
  @media (min-width: ${breakpoints.small}) {
    padding: 5rem 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Header = styled.h2`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 800;
  color: ${colors.white};
  @media (min-width: ${breakpoints.small}) {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
`;

const Span = styled.span`
  display: block;
`;

const Paragraph = styled.p`
  margin-top: 1rem;
  font-size: 1.125rem;
  line-height: 1.5rem;
  color: ${colors.indigo200};
`;

const StyledLink = styled(Link)`
  margin-top: 2rem;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  border-width: 1px;
  border-color: transparent;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  border-radius: 0.375rem;
  color: ${colors.indigo600};
  background-color: ${colors.white};
  &:hover {
    color: ${colors.indigo500};
    background-color: ${colors.indigo50};
  }

  @media (min-width: ${breakpoints.small}) {
    width: auto;
  }
`;

const CTASection = () => (
  <Background>
    <Wrapper>
      <Header>
        <Span>Main Benefit of Product</Span>
        <Span>Call to Action </Span>
      </Header>
      <Paragraph>
        Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing
        sagittis vel nulla nec.
      </Paragraph>
      <StyledLink href="/auth/signup">Sign up for free</StyledLink>
    </Wrapper>
  </Background>
);

export default CTASection;
