import React from 'react';
import styled from 'styled-components';

import { colors, breakpoints, fieldStyles } from '../../../styles/theme';

import Header from '../Navigation/header';
import Footer from '../Navigation/footer';

const Wrapper = styled.div`
  background-color: ${colors.gray50};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <div>{children}</div>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
