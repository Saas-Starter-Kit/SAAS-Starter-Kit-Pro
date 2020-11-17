import styled, { keyframes } from 'styled-components';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import useOutsideClick from '../../../hooks/useOutsideClick';
import Link from 'next/link';
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

const MenuButton = styled.button`
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

const StyledLink = styled.div`
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
    visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
    transition: all 0.3s ease-in-out;
    width: ${(props) => (props.active ? '100%' : '0')};
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

const Header = () => {
  const ref = useRef();
  const refMobile = useRef();
  const router = useRouter();
  const [menu, toggleMenu] = useState(false);
  const [mobileMenu, toggleMobileMenu] = useState(false);

  const mobileMenuHandler = () => (mobileMenu ? toggleMobileMenu(false) : toggleMobileMenu(true));

  const menuHandler = () => (menu ? toggleMenu(false) : toggleMenu(true));

  useOutsideClick(ref, () => toggleMenu(false));
  useOutsideClick(refMobile, () => toggleMobileMenu(false));
  return (
    <Container1>
      <div className='flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10'>
        <LogoWrapper>
          <Link href='/'>
            <Logo src='/logo/small_logo.svg' alt='Logo' />
          </Link>
        </LogoWrapper>
        <MenuWrapper ref={refMobile}>
          <MenuButton>
            <MenuImage src='/icons/menu.svg' alt='menu' />
          </MenuButton>
          {mobileMenu ? <MobileMenu mobileMenuHandler={mobileMenuHandler} /> : null}
        </MenuWrapper>
        <Nav>
          <SolutionsWrapper ref={ref}>
            <button
              onClick={menuHandler}
              type='button'
              className={`group text-gray-500 inline-flex items-center 
                        space-x-2 text-base leading-6 font-medium
                        hover:text-gray-900 focus:outline-none focus:text-gray-900 
                        transition ease-in-out duration-150`}
            >
              <span>Solutions</span>
              <img
                className={`text-gray-400 h-5 w-5 group-hover:text-gray-500
                            group-focus:text-gray-500 
                            transition ease-in-out duration-150`}
                src='/icons/chevron-down.svg'
                alt='down arrow'
              />
            </button>
            {menu ? (
              <FlyoutMenuWrapper>
                <FlyoutMenu />
              </FlyoutMenuWrapper>
            ) : null}
          </SolutionsWrapper>
          <Link href='/pricing'>
            <StyledLink active={router.pathname == '/pricing' ? true : false}>Pricing</StyledLink>
          </Link>
          <Link href='/app/dashboard'>
            <StyledLink active={router.pathname == '/app' ? true : false}>App</StyledLink>
          </Link>
        </Nav>
        <ButtonWrapper>
          <ButtonSpan>
            <Link href='/login'>
              <Button>Sign-In</Button>
            </Link>
          </ButtonSpan>
        </ButtonWrapper>
      </div>
    </Container1>
  );
};

export default Header;
