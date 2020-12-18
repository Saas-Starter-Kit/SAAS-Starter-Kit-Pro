import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useState, useRef } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { Link } from 'gatsby';
import { colors, breakpoints } from '../../../styles/theme';
import FlyoutMenu from './flyoutMenu';
import MobileMenu from './mobileMenu';

const Container1 = styled.div`
  position: relative;
  background-color: ${colors.white};
`;

const LogoWrapper = styled.div`
  @media (min-width: ${breakpoints.large}) {
    width: 0;
    flex: 1 1 0%;
  }
`;

const Logo = styled.img`
  cursor: pointer;
  height: 2rem;
  width: auto;
  @media (min-width: ${breakpoints.small}) {
    height: 2.5rem;
  }
`;

const MenuWrapper = styled.div`
  margin-right: -0.5rem;
  margin-top: -0.5rem;
  margin-bottom: -0.5rem;
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const MenuButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: ${colors.gray400};
  &:hover {
    color: ${colors.gray500};
    background-color: ${colors.gray100};
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    color: ${colors.gray500};
    background-color: ${colors.gray100};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const MenuImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const Nav = styled.nav`
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: flex;
  }
`;

const SolutionsWrapper = styled.div`
  position: relative;
`;

const fadeInUp = keyframes`
from {
  opacity: 0;
  transform: translateY(0.25rem);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

const FlyoutMenuWrapper = styled.div`
  animation: ${fadeInUp} 0.3s ease-in forwards;
`;

const StyledLink = css`
  margin-left: 2.5rem;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  font-size: 1.1rem;
  font-weight: 800;

  &:before {
    content: '';
    margin-bottom: -5px;
    position: absolute;
    width: 0;
    height: 6px;
    bottom: 0;
    left: 0;
    background-color: red;
    visibility: ;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    &:before {
      visibility: visible;
      width: 100%;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: flex;
    flex: 1 1 0%;
  }
  @media (min-width: ${breakpoints.large}) {
    width: 0;
  }
  align-items: center;
  justify-content: flex-end;
  margin-left: 2rem;
`;

const ButtonSpan = styled.span`
  display: inline-flex;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const Button = styled.div`
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-width: 1px;
  border-color: transparent;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 0.375rem;
  line-height: 1.5rem;
  color: ${colors.white};
  background-color: ${colors.indigo600};
  &:hover {
    background-color: ${colors.indigo500};
  }
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-color: ${colors.indigo700};
    box-shadow: 0 0 0 3px rgba(180, 198, 252, 0.45);
  }
  &:active {
    background-color: ${colors.indigo700};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`;

const SolutionsButton = styled.button`
  color: ${colors.gray500};
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  justify-content: space-between;
  font-size: 1rem;
  line-height: 1.5rem;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  &:hover {
    color: ${colors.gray900};
  }
  &:focus {
    color: ${colors.gray900};
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const Chevron = styled.img`
  margin-left: 8px;
  color: ${colors.gray500};
  height: 1.25rem;
  width: 1.25rem;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  &:hover ${SolutionsButton} {
    color: ${colors.gray500};
  }
  &:focus ${SolutionsButton} {
    color: ${colors.gray500};
  }
`;

const Container2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1rem;
  @media (min-width: ${breakpoints.small}) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: ${breakpoints.medium}) {
    justify-content: flex-start;
  }
  * {
    margin-right: 10px;
  }
`;

const Header = () => {
  const ref = useRef();
  const refMobile = useRef();
  const [menu, toggleMenu] = useState(false);
  const [mobileMenu, toggleMobileMenu] = useState(false);

  const mobileMenuHandler = () => (mobileMenu ? toggleMobileMenu(false) : toggleMobileMenu(true));

  const menuHandler = () => (menu ? toggleMenu(false) : toggleMenu(true));

  useOutsideClick(ref, () => toggleMenu(false));
  useOutsideClick(refMobile, () => toggleMobileMenu(false));
  return (
    <Container1>
      <Container2>
        <LogoWrapper>
          <Link to="/">
            <Logo src="/logo/small_logo.svg" alt="Logo" />
          </Link>
        </LogoWrapper>
        <MenuWrapper ref={refMobile}>
          <MenuButton onClick={mobileMenuHandler}>
            <MenuImage src="/icons/menu.svg" alt="menu" />
          </MenuButton>
          {mobileMenu ? <MobileMenu mobileMenuHandler={mobileMenuHandler} /> : null}
        </MenuWrapper>
        <Nav>
          {/* Uncomment for Flyout Menu
            <SolutionsWrapper ref={ref}>
            <SolutionsButton onClick={menuHandler} type='button'>
              <span>Solutions</span>
              <Chevron src='/icons/chevron-down.svg' alt='down arrow' />
            </SolutionsButton>
            {menu ? (
              <FlyoutMenuWrapper>
                <FlyoutMenu />
              </FlyoutMenuWrapper>
            ) : null}
          </SolutionsWrapper>*/}

          <Link className="header_link" activeClassName="header_active_link" to="/pricing">
            Pricing
          </Link>

          <Link className="header_link" activeClassName="header_active_link" to="/app/dashboard">
            App
          </Link>
        </Nav>
        <ButtonWrapper>
          <ButtonSpan>
            <Link to="/login">
              <Button>Sign-In</Button>
            </Link>
          </ButtonSpan>
        </ButtonWrapper>
      </Container2>
    </Container1>
  );
};

export default Header;
