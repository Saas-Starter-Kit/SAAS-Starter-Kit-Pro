import React, { useState, useRef, useContext } from 'react';
import { Link } from 'gatsby';
import { MdAccountCircle } from 'react-icons/md';
import styled from 'styled-components';
import moment from 'moment';
import { Popover, Badge, List } from 'antd';

import { colors, breakpoints } from '../../../styles/theme';
import useOutsideClick from '../../../hooks/useOutsideClick';
import AvatarDropDown from './avatarDropDown';
import AuthContext from '../../../utils/authContext';
import Burger from '../svgs/burger';
import SmallLogo from '../../../assets/images/logo/small_logo.svg';
import { RightOutlined } from '@ant-design/icons';
import { IoNotificationsOutline } from 'react-icons/io5';

const notifications = [
  { date: moment.now(), title: 'Hey there' },
  { date: moment.now(), title: 'Welcome!' }
];

const onAllNotificationsRead = () => {};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: black;
`;

const Button = styled.div`
  padding-top: 0.5rem;
  padding-left: 0.5rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  cursor: pointer;
  color: ${colors.white};
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const LinksWrapper = styled.div`
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: flex;
    justify-content: flex-start;
    padding: 1rem;

    width: 80%;
  }
`;

const LinkItem = styled.div`
  padding: 0.3rem;
  padding-right: 1rem;
`;

const Logo = styled.img`
  cursor: pointer;
  height: 2rem;
  width: auto;
`;

const LogoWrapper = styled.div`
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
`;

const AvatarWrapper = styled.div`
  padding: 0.8rem;
  cursor: pointer;
`;

const Image = styled.img`
  width: 3rem;
  height: 3rem;
  background-color: ${colors.gray300};
  border-radius: 9999px;
  flex-shrink: 0;
`;

const StyledMdAccountCircle = styled(MdAccountCircle)`
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${colors.gray300};
  border-radius: 9999px;
  flex-shrink: 0;
`;

const IconButton = styled(Badge)`
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    cursor: pointer;
    margin-top: 0.8rem;
    margin-right: 0.5rem;
    & + .iconButton {
      margin-left: 8px;
    }
  }
`;

const IconFont = styled(IoNotificationsOutline)`
  color: ${colors.cadetBlue};
  font-size: 24px;
  &:hover {
    color: ${colors.dodgerBlue};
  }
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

const Notification = styled.div`
  padding: 1rem;
  width: 320px;
`;

const ClearButton = styled.div`
  text-align: center;
  height: 48px;
  line-height: 48px;
  cursor: pointer;
`;

const NotificationItem = styled(List.Item)`
  transition: all 0.3s;
  padding: 1rem;
  cursor: pointer;
`;

const StyledRightOutlined = styled(RightOutlined)`
  font-size: 10px;
  color: ${colors.silver};
`;

const ListItemMeta = styled(List.Item.Meta)`
  h4 {
    color: ${colors.doveGray};
  }
  div.ant-list-item-meta-description {
    color: ${colors.doveGray};
  }
`;

const MobileHeader = ({ mobileMenuHandler }) => {
  const { authState } = useContext(AuthContext);
  const photo = authState.user ? authState.user.photo : null;
  const [avatarMenu, toggleAvatarMenu] = useState(false);
  const avatarMenuHandler = () => (avatarMenu ? toggleAvatarMenu(false) : toggleAvatarMenu(true));

  const ref = useRef();
  useOutsideClick(ref, () => toggleAvatarMenu(false));

  return (
    <Wrapper id="primaryLayout">
      <Button onClick={mobileMenuHandler} aria-label="Open sidebar">
        <Burger />
      </Button>
      <LogoWrapper>
        <Link to="/user/dashboard">
          <Logo src={SmallLogo} alt="Logo" />
        </Link>
      </LogoWrapper>
      <LinksWrapper>
        <LinkItem>
          <Link
            className="header_link_user"
            activeClassName="header_link_user_active"
            to="/user/teamapps"
          >
            Team Apps
          </Link>
        </LinkItem>
        <LinkItem>
          <Link
            className="header_link_user"
            activeClassName="header_link_user_active"
            to="/user/settings/account"
          >
            Settings
          </Link>
        </LinkItem>
      </LinksWrapper>
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
                <NotificationItem>
                  <ListItemMeta title={item.title} description={moment(item.date).fromNow()} />
                  <StyledRightOutlined />
                </NotificationItem>
              )}
            />
            {notifications.length ? (
              <ClearButton onClick={onAllNotificationsRead}>Clear notifications</ClearButton>
            ) : null}
          </Notification>
        }
      >
        <IconButton count={notifications.length} offset={[-10, 10]}>
          <IconFont />
        </IconButton>
      </StyledPopover>
      <AvatarWrapper ref={ref}>
        {photo ? (
          <Image onClick={avatarMenuHandler} src={photo} alt="" />
        ) : (
          <StyledMdAccountCircle onClick={avatarMenuHandler} />
        )}
      </AvatarWrapper>
      {avatarMenu && <AvatarDropDown avatarMenuHandler={avatarMenuHandler} />}
    </Wrapper>
  );
};

export default MobileHeader;
