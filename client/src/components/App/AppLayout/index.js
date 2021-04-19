import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useRouter } from 'next/router';

import AuthContext from '../../../utils/authContext';
import CaslContext from '../../../utils/caslContext';
import ApiContext from '../../../utils/apiContext';
import OrgContext from '../../../utils/orgContext';
import getOrgId from '../../../utils/orgId';
import { updateRole } from '../../../utils/caslAbility';
import { colors, breakpoints } from '../../../styles/theme';
import useWindowSize from '../../../hooks/useWindowSize';
import SEO from '../../Marketing/Layout/seo';
import axios from '../../../services/axios';

import SidebarDesktop from '../Navigation/sidebarDesktop';
import SidebarMobile from '../Navigation/sidebarMobile';
import AppHeader from '../Navigation/appHeader';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

const Wrapper = styled.div`
  background-color: ${colors.gray100};
  overflow: hidden;
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  /*width: 0;*/
  flex: 1 1 0%;
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
  padding-top: 1.5rem;
  margin-bottom: 1.5rem;
  margin-left: 3.5rem;
  margin-right: 3.5rem;
  .ant-popover-inner-content {
    padding: 0px;
    background-color: ${({ theme }) => (theme === THEMES.DARK ? colors.midnight : colors.white)};
  }
`;

const Layout = ({ children }) => {
  const location = useRouter();
  const org_id = getOrgId();

  const ability = useContext(CaslContext);
  const { authState } = useContext(AuthContext);
  const { SetOrg } = useContext(OrgContext);
  const { fetchFailure } = useContext(ApiContext);

  //handle antd sidebar rerender issue
  const windowSize = useWindowSize();
  const breakpoint = breakpoints.medium.substring(0, breakpoints.medium.length - 2);
  const isMobile = windowSize.width <= breakpoint;

  const [showMobileMenu, toggleShowMobileMenu] = useState(false);
  const [username, setUsername] = useState('');
  const [theme, setTheme] = useState(THEMES.LIGHT);
  const [isDesktopMenuCollapsed, toggleIsDesktopMenuCollapsed] = useState(false);

  useEffect(() => {
    if (authState.user.id) setUsername(authState.user.username);
  }, [authState]);

  useEffect(() => {
    if (!location.isReady) return;
    if (authState.user.id) getRole(org_id);
  }, [location.isReady, authState]);

  const getRole = async (org_id) => {
    let user_id = authState.user.id;

    let params = {
      user_id,
      org_id
    };

    const result = await axios.get(`/api/get/role`, { params }).catch((err) => {
      fetchFailure(err);
    });

    if (result.data.length === 0) {
      location.push('/403');
    }

    let id = result.data[0].id;
    let org_name = result.data[0].org_name;
    let primary_email = result.data[0].primary_email;
    let role = result.data[0].role;
    let stripe_customer_id;
    let subscription_id;

    //save payment info to global state if role is admin
    if (role === 'admin') {
      stripe_customer_id = result.data[0].stripe_customer_id;
      subscription_id = result.data[0].subscription_id;
    }

    let org = {
      id,
      org_name,
      primary_email,
      role,
      stripe_customer_id,
      subscription_id
    };

    SetOrg(org);

    updateRole(ability, role);
  };

  const mobileMenuHandler = () =>
    showMobileMenu ? toggleShowMobileMenu(false) : toggleShowMobileMenu(true);

  const desktopMenuHandler = () =>
    isDesktopMenuCollapsed
      ? toggleIsDesktopMenuCollapsed(false)
      : toggleIsDesktopMenuCollapsed(true);

  const handleCollapseChange = isMobile ? mobileMenuHandler : desktopMenuHandler;

  const themeHandler = () =>
    theme === THEMES.LIGHT ? setTheme(THEMES.DARK) : setTheme(THEMES.LIGHT);

  const seoData = {
    title: 'Saas Starter Kit Pro App',
    description: 'Saas Starter Kit Pro App'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <Wrapper>
        {!isMobile && (
          <SidebarDesktop
            org_id={org_id}
            theme={theme}
            toggleTheme={themeHandler}
            location={location}
            collapsed={isDesktopMenuCollapsed}
          />
        )}
        <Content>
          <AppHeader
            collapsed={isDesktopMenuCollapsed}
            username={username}
            notifications={[
              { date: moment.now(), title: 'Hey there' },
              { date: moment.now(), title: 'Welcome!' }
            ]}
            onCollapseChange={handleCollapseChange}
            theme={theme}
          />
          {showMobileMenu && (
            <SidebarMobile
              org_id={org_id}
              toggleMobileMenu={toggleShowMobileMenu}
              theme={theme}
              toggleTheme={themeHandler}
            />
          )}
          <Main tabindex="0">
            {/*App Screens Here*/}
            <ContentWrapper theme={theme} id="primaryLayout">
              {children}
            </ContentWrapper>
          </Main>
        </Content>
      </Wrapper>
    </React.Fragment>
  );
};

export default Layout;
