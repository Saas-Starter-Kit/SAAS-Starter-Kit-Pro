import React from 'react';
import styled from 'styled-components';
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Layout, Menu, Switch } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import { Link } from 'gatsby';

import LargeLogo from '../../Common/svgs/LargeLogo';
import SmallLogo from '../../Common/svgs/SmallLogo';
import { THEMES } from '../AppLayout';
import { colors, breakpoints } from '../../../styles/theme';
import {
  FcBarChart,
  FcCollect,
  FcConferenceCall,
  FcGenealogy,
  FcTimeline,
  FcUpload,
  FcPrivacy
} from 'react-icons/fc';

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

const StyledBar = styled(FcBarChart)`
  height: 1.3rem;
  width: 1.3rem;
`;

const StyledRead = styled(FcCollect)`
  height: 1.3rem;
  width: 1.3rem;
`;

const StyledCollab = styled(FcConferenceCall)`
  height: 1.3rem;
  width: 1.3rem;
`;

const StyledCreate = styled(FcUpload)`
  height: 1.3rem;
  width: 1.3rem;
`;

const StyledPermissions = styled(FcPrivacy)`
  height: 1.3rem;
  width: 1.3rem;
`;

const StyledOnboarding = styled(FcTimeline)`
  height: 1.3rem;
  width: 1.3rem;
`;

const StyledML = styled(FcGenealogy)`
  height: 1.3rem;
  width: 1.3rem;
`;

const getMenus = (app_id) => [
  {
    id: '1',
    name: 'Dashboard',
    route: `/app/${app_id}/dashboard`,
    icon: <StyledBar />
  },
  {
    id: '2',
    name: 'Read Update',
    route: `/app/${app_id}/readupdate`,
    icon: <StyledRead />
  },
  {
    id: '3',
    name: 'Create',
    route: `/app/${app_id}/create`,
    icon: <StyledCreate />
  },
  {
    id: '4',
    name: 'Permissions',
    route: `/app/${app_id}/permissions`,
    icon: <StyledPermissions />
  },
  {
    id: '5',
    name: 'Users',
    route: `/app/${app_id}/users`,
    icon: <StyledCollab />
  },
  {
    id: '6',
    name: 'Onboarding',
    route: `/app/${app_id}/onboarding`,
    icon: <StyledOnboarding />
  },
  {
    id: '7',
    name: 'Machine Learning',
    route: `/app/${app_id}/machinelearning`,
    icon: <StyledML />
  }
];

const StyledSider = styled(Layout.Sider)`
  display: none;

  @media (min-width: ${breakpoints.medium}) {
    display: initial;
  }
  box-shadow: fade(${colors.doveGray}, 10%) 0 0 28px 0;
  z-index: 10;
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  height: 72px;
  box-shadow: 0 1px 9px -3px rgba(0, 0, 0, 0.2);
`;

const StyledLargeLogo = styled(LargeLogo)`
  width: 150px;
`;

const StyledSmallLogo = styled(SmallLogo)`
  width: 36px;
`;

const SidebarItems = styled.div`
  height: 'calc(100vh - 120px)';
  overflow-x: hidden;
  flex: 1;
  padding: 24px 0;

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }

  .ant-menu-inline {
    border-right: none;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
`;

const ItemWrapper = styled.div`
  font-size: 15px;
  font-weight: 500;
`;

const Footer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  overflow: hidden;
  transition: all 0.3s;

  span {
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
  }

  .anticon {
    min-width: 14px;
    margin-right: 4px;
    font-size: 14px;
  }
`;

const Bulb = styled(BulbOutlined)`
  color: ${colors.doveGray};
`;

const Span = styled.span`
  color: ${colors.doveGray};
`;

const SidebarDesktop = ({ theme, toggleTheme, app_id, location, collapsed }) => {
  const menus = getMenus(app_id);
  const selectedKey = menus.find((menu) => menu.route === location.pathname);
  return (
    <StyledSider
      width={200}
      theme={theme}
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <LogoWrapper>
        {collapsed ? (
          <StyledSmallLogo />
        ) : (
          <StyledLargeLogo textColor={theme === THEMES.DARK ? colors.white : colors.indigo400} />
        )}
      </LogoWrapper>
      <SidebarItems>
        <ScrollBar options={{ suppressScrollX: true }}>
          <Menu mode="inline" theme={theme} selectedKeys={[selectedKey && selectedKey.id]}>
            {menus.map(({ id, route, icon, name }) => (
              <Menu.Item key={id} title={name}>
                <StyledLink to={route || '#'}>
                  <StyledIcon>{icon}</StyledIcon>
                  {!collapsed && <ItemWrapper>{name}</ItemWrapper>}
                </StyledLink>
              </Menu.Item>
            ))}
          </Menu>
        </ScrollBar>
      </SidebarItems>
      {!collapsed && (
        <Footer>
          <span>
            <Bulb />
            <Span theme={theme}>Switch Theme</Span>
          </span>
          <Switch
            onChange={toggleTheme}
            defaultChecked={theme === THEMES.DARK}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </Footer>
      )}
    </StyledSider>
  );
};

export default SidebarDesktop;
