import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Menu, Layout, Avatar, Popover, Badge, List, Button, Space } from 'antd';
import {
  RightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { IoNotificationsOutline } from 'react-icons/io5';

import AuthContext from '../../../utils/authContext';
import { breakpoints, colors } from '../../../styles/theme';
import { THEMES } from '../AppLayout';

const { SubMenu } = Menu;

const LayoutHeader = styled(Layout.Header)`
  @media (max-width: ${breakpoints.medium}) {
    width: 100% !important;
  }
  padding: 0;
  box-shadow: 4px 4px 40px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  height: 72px;
  z-index: 9;
  align-items: center;
  background-color: ${colors.white};
  transition: width 0.2s;

  .ant-menu-submenu-title {
    height: 72px;
  }

  .ant-menu-horizontal {
    line-height: 72px;

    & > .ant-menu-submenu:hover {
      color: ${colors.dodgerBlue};
      background-color: ${({ theme }) => (theme === THEMES.DARK ? colors.firefly : colors.whisper)};
    }
  }

  .ant-menu {
    border-bottom: none;
    height: 72px;
  }

  .ant-menu-horizontal > .ant-menu-submenu {
    top: 0;
    margin-top: 0;
  }

  .ant-menu-horizontal > .ant-menu-item,
  .ant-menu-horizontal > .ant-menu-submenu {
    border-bottom: none;
  }

  .ant-menu-horizontal > .ant-menu-item-active,
  .ant-menu-horizontal > .ant-menu-item-open,
  .ant-menu-horizontal > .ant-menu-item-selected,
  .ant-menu-horizontal > .ant-menu-item:hover,
  .ant-menu-horizontal > .ant-menu-submenu-active,
  .ant-menu-horizontal > .ant-menu-submenu-open,
  .ant-menu-horizontal > .ant-menu-submenu-selected,
  .ant-menu-horizontal > .ant-menu-submenu:hover {
    border-bottom: none;
  }
  ${({ theme }) =>
    theme === THEMES.DARK &&
    css`
      background-color: ${colors.midnight};
    `}
`;

const CollapseButton = styled.div`
  width: 72px;
  height: 72px;
  line-height: 72px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  color: ${({ theme }) => (theme === THEMES.DARK ? colors.white : colors.doveGray)};

  &:hover {
    color: ${colors.dodgerBlue};
    background-color: ${({ theme }) => (theme === THEMES.DARK ? colors.firefly : colors.whisper)};
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledPopover = styled(Popover)`
  .ant-popover-arrow {
    display: none;
  }
  .ant-list-item-content {
    flex: 0;
    margin-left: 16px;
  }
`;

const StyledAvatar = styled(Avatar)`
  margin-left: 1rem;
  margin-bottom: 0.5rem;
`;

const AvatarWrapper = styled.div`
  margin-right: 1rem;
`;

const Notification = styled.div`
  padding: 1rem;
  width: 320px;
`;

const ClearButton = styled.div`
  text-align: center;
  height: 48px;
  line-height: 48px;
  cursor: pointer;
  color: ${({ theme }) => (theme === THEMES.DARK ? colors.silver : colors.doveGray)};
  &:hover {
    background-color: ${({ theme }) => (theme === THEMES.DARK ? colors.firefly : colors.whisper)};
  }
`;

const NotificationItem = styled(List.Item)`
  transition: all 0.3s;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => (theme === THEMES.DARK ? colors.firefly : colors.whisper)};
  }
`;

const StyledRightOutlined = styled(RightOutlined)`
  font-size: 10px;
  color: ${colors.silver};
`;

const IconButton = styled(Button)`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  cursor: pointer;
  margin-right: 0.5rem;
  & + .iconButton {
    margin-left: 8px;
  }
`;

const IconFont = styled(IoNotificationsOutline)`
  color: ${colors.cadetBlue};
  font-size: 24px;
  &:hover {
    color: ${colors.dodgerBlue};
  }
`;

const ListItemMeta = styled(List.Item.Meta)`
  h4 {
    color: ${({ theme }) => (theme === THEMES.DARK ? colors.silver : colors.doveGray)};
  }
  div.ant-list-item-meta-description {
    color: ${({ theme }) => (theme === THEMES.DARK ? colors.whisper : colors.doveGray)};
  }
`;

const AppHeader = ({
  avatar,
  username,
  collapsed,
  notifications,
  onCollapseChange,
  onAllNotificationsRead,
  theme
}) => {
  const router = useRouter();
  const { LogOut } = useContext(AuthContext);

  const logout = () => {
    LogOut();
    router.push('/auth/login');
  };

  return (
    <div>
      <LayoutHeader id="layoutHeader" theme={theme}>
        <CollapseButton onClick={onCollapseChange} theme={theme}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </CollapseButton>
        <RightContainer>   
          <StyledPopover
            placement="bottomRight"
            trigger="click"
            key="notifications"
            getPopupContainer={() => document.querySelector('#primaryLayout')}
            content={
              <Notification>
                <List
                  itemLayout="horizontal"
                  dataSource={notifications}
                  locale={{
                    emptyText: 'You have viewed all notifications.'
                  }}
                  renderItem={(item) => (
                    <NotificationItem theme={theme}>
                      <ListItemMeta
                        title={item.title}
                        description={moment(item.date).fromNow()}
                        theme={theme}
                      />
                      <StyledRightOutlined />
                    </NotificationItem>
                  )}
                />
                {notifications.length ? (
                  <ClearButton onClick={onAllNotificationsRead} theme={theme}>
                    Clear notifications
                  </ClearButton>
                ) : null}
              </Notification>
            }
          >
            <IconButton count={notifications.length} offset={[-10, 10]}>
              <IconFont />
            </IconButton>
          </StyledPopover>
          <Menu key="user" mode="horizontal" theme={theme} 
            items={[
                {
                  label: (
                    <AvatarWrapper>
                  {avatar ? (
                    <StyledAvatar src={avatar} />
                  ) : (
                    <StyledAvatar icon={<UserOutlined />} />
                  )}
                </AvatarWrapper>
                  ),
                  key: "submenu",
                  children: [
                    {
                      label: (
                        <a>
                          Logged in as {username}
                        </a>
                      ),
                      disabled: true,
                      key: "Loggedin",
                    },
                    {
                      label: (
                        <a href="/user/dashboard">
                          User Dashboard
                        </a>
                      ),
                      icon: <UserOutlined/>,
                      key: "user",
                    },
                    {
                      label: (
                        <a href="/user/teamapps">
                          Team App
                        </a>
                      ),
                      icon: <UsergroupAddOutlined/>,
                      key: "teamapps",
                    }, 
                    {
                      label: (
                        <a href="/user/settings/account">
                          Settings
                        </a>
                      ),
                      icon: <SettingOutlined/>,
                      key: "setting",
                    },
                    {
                      label: (
                        <a onClick={logout}>
                          Sign Out
                        </a>
                      ),
                      icon: <LogoutOutlined/>,
                      key: "SignOut",
                    },
                  ]
                },
              ]}
          >
          </Menu>
        </RightContainer>
      </LayoutHeader>
    </div>
  );
};

export default AppHeader;