import React, { useState } from 'react';
import styled from 'styled-components';
import SidebarDesktop from '../Navigation/sidebarDesktop';
import SidebarMobile from '../Navigation/sidebarMobile';
import SidebarIcons from '../Navigation/sidebarIcons';
import MobileHeader from '../Navigation/mobileHeader';
import { colors } from '../../../styles/theme';

const Wrapper = styled.div`
  background-color: ${colors.gray100};
  overflow: hidden;
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 0;
  flex: 1 1 0%;
  overflow: hidden;
`;

const Main = styled.main`
  flex: 1 1 0%;
  z-index: 0;
  overflow-y: auto;
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  margin-left: 3.5rem;
  margin-right: 3.5rem;
`;

const Layout = ({ children, location }) => {
  const [isSidebar, toggleSidebar] = useState(true);
  const sidebarHandler = () => (isSidebar ? toggleSidebar(false) : toggleSidebar(true));

  console.log(location);
  let splitPath = location.pathname.split('/');
  const app_id = splitPath[2];

  const [mobileMenu, toggleMobileMenu] = useState(false);
  const mobileMenuHandler = () => (mobileMenu ? toggleMobileMenu(false) : toggleMobileMenu(true));

  return (
    <Wrapper>
      {isSidebar ? (
        <SidebarDesktop app_id={app_id} sidebarHandler={sidebarHandler} />
      ) : (
        <SidebarIcons app_id={app_id} sidebarHandler={sidebarHandler} />
      )}
      <Content>
        <MobileHeader mobileMenuHandler={mobileMenuHandler} />
        {mobileMenu && <SidebarMobile app_id={app_id} toggleMobileMenu={toggleMobileMenu} />}
        <Main tabindex="0">
          {/*App Screens Here*/}
          <ContentWrapper>{children}</ContentWrapper>
        </Main>
      </Content>
    </Wrapper>
  );
};

export default Layout;
