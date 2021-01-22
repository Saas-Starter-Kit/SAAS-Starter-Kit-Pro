import React from 'react';
import styled from 'styled-components';
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Layout, Menu, Switch } from 'antd';
import { HomeOutlined, UserOutlined, FolderOutlined, BulbOutlined } from '@ant-design/icons';
import { Link } from 'gatsby';
import LargeLogo from '../../Common/LargeLogo';
import { THEMES } from '../AppLayout';
import { colors, breakpoints } from '../../../styles/theme';

const getMenus = (app_id) => [
  {
    id: '1',
    name: 'Dashboard',
    route: `/app/${app_id}/dashboard`,
    icon: <HomeOutlined />
  },
  {
    id: '2',
    name: 'Read Update',
    route: `/app/${app_id}/readupdate`,
    icon: <UserOutlined />
  },
  {
    id: '3',
    name: 'Create',
    route: `/app/${app_id}/create`,
    icon: <FolderOutlined />
  },
  {
    id: '4',
    name: 'Permissions',
    route: `/app/${app_id}/permissions`,
    icon: <FolderOutlined />
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

const Logo = styled(LargeLogo)`
  width: 150px;
`;

const SidebarItems = styled.div`
  height: ~'calc(100vh - 120px)';
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
  font-size: 13px;
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

const SidebarDesktop = ({ theme, toggleTheme, app_id, location }) => {
  const menus = getMenus(app_id);
  const selectedKey = menus.find((menu) => menu.route === location.pathname);
  return (
    <StyledSider
      width={256}
      theme={theme}
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={false}
    >
      <LogoWrapper>
        <Logo textColor={theme === THEMES.LIGHT ? colors.indigo400 : colors.white} />
      </LogoWrapper>
      <SidebarItems>
        <ScrollBar
          options={{
            // Disabled horizontal scrolling, https://github.com/utatti/perfect-scrollbar#options
            suppressScrollX: true
          }}
        >
          <Menu mode="inline" theme={theme} selectedKeys={[selectedKey && selectedKey.id]}>
            {menus.map(({ id, route, icon, name }) => (
              <Menu.Item key={id}>
                <StyledLink to={route || '#'}>
                  <div>{icon}</div>
                  <ItemWrapper>{name}</ItemWrapper>
                </StyledLink>
              </Menu.Item>
            ))}
          </Menu>
        </ScrollBar>
      </SidebarItems>
      <Footer>
        <span>
          <Bulb />
          <Span theme={theme}>Switch Theme</Span>
        </span>
        <Switch
          onChange={toggleTheme}
          defaultChecked={theme === THEMES.DARK}
          checkedChildren={'Dark'}
          unCheckedChildren={'Light'}
        />
      </Footer>
    </StyledSider>
  );
};

export default SidebarDesktop;
