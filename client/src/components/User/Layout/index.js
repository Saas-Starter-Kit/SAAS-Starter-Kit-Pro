import React, { useState } from 'react';
import styled from 'styled-components';

import { colors, breakpoints } from '../../../styles/theme';
import SidebarMobile from '../Navigation/mobileSidebar';
import Header from '../Navigation/header';

const Wrapper = styled.div`
  background-color: ${colors.gray50};
  min-height: 100vh;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 2rem;

  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 3rem;
  }
  @media (min-width: ${breakpoints.large}) {
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 3rem;
  }
`;

const Layout = ({ children }) => {
  const [mobileMenu, toggleMobileMenu] = useState(false);
  const mobileMenuHandler = () => (mobileMenu ? toggleMobileMenu(false) : toggleMobileMenu(true));

  return (
    <div>
      {mobileMenu && <SidebarMobile toggleMobileMenu={toggleMobileMenu} />}
      <Header mobileMenuHandler={mobileMenuHandler} />
      <Wrapper>
        <div>{children}</div>
      </Wrapper>
    </div>
  );
};

export default Layout;
