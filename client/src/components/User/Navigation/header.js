import React, { useState, useRef, useContext } from 'react';
import { Link } from 'gatsby';
import { MdAccountCircle } from 'react-icons/md';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import useOutsideClick from '../../../hooks/useOutsideClick';
import AvatarDropDown from './avatarDropDown';
import AuthContext from '../../../utils/authContext';
import Burger from '../svgs/burger';
import SmallLogo from '../../../assets/images/logo/small_logo.svg';

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

const MobileHeader = ({ mobileMenuHandler }) => {
  const { authState } = useContext(AuthContext);
  const photo = authState.user ? authState.user.photo : null;
  const [avatarMenu, toggleAvatarMenu] = useState(false);
  const avatarMenuHandler = () => (avatarMenu ? toggleAvatarMenu(false) : toggleAvatarMenu(true));

  const ref = useRef();
  useOutsideClick(ref, () => toggleAvatarMenu(false));

  return (
    <Wrapper>
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
