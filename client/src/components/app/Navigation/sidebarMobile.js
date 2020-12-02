import { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { colors, breakpoints } from '../../../styles/theme';
import MobileSidebarItem from './mobileSidebarItem';
import Cross from '../../svgs/cross';
import Home from '../../svgs/home';
import Persons from '../../svgs/persons';
import Folder from '../../svgs/folder';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 40;
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
`;

const FixedDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const AbsoluteDiv = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${colors.gray600};
  opacity: 0.75;
  transition-property: opacity;
  transition-duration: 300ms;
  transition-timing-function: linear;
`;

const showMobileSidebar = keyframes`
  from {
    transform: scaleX(0);
    transform-origin: left center;
  }
  to {
    transform: scaleX(100%);
    transform-origin: left center;
  }
`;

const Wrapper3 = styled.div`
  animation: ${showMobileSidebar} 0.5s ease-in-out;
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  max-width: 20rem;
  width: 100%;
  background-color: ${(props) => props.theme.primary};
`;

const Sidebar = styled.div`
  flex: 1 1 0%;
  height: 0;
  padding-top: 1.25rem;
  padding-bottom: 1rem;
  overflow-y: auto;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-right: -3.5rem;
  padding: 0.25rem;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  &:hover {
    background-color: ${colors.gray600};
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const LogoWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Logo = styled.img`
  height: 2rem;
  width: auto;
`;

const Nav = styled.nav`
  margin-top: 1.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const ShrinkDiv = styled.div`
  flex-shrink: 0;
`;

const SidebarMobile = ({ toggleMobileMenu }) => {
  const ref = useRef();
  useOutsideClick(ref, () => toggleMobileMenu(false));

  return (
    <Wrapper>
      <FixedDiv>
        <AbsoluteDiv />
      </FixedDiv>
      <Wrapper3 ref={ref}>
        <ButtonWrapper>
          <Button onClick={() => toggleMobileMenu(false)} aria-label='Close sidebar'>
            <Cross />
          </Button>
        </ButtonWrapper>
        <Sidebar>
          <LogoWrapper>
            <Logo src='/logo/large_logo.svg' alt='Workflow' />
          </LogoWrapper>
          <Nav>
            <MobileSidebarItem
              link='/app'
              toggleMenu={() => toggleMobileMenu(false)}
              svg={<Home />}
              title='Dashboard'
            />
            <MobileSidebarItem
              link='/app/readupdate'
              toggleMenu={() => toggleMobileMenu(false)}
              svg={<Persons />}
              title='Read Update'
            />
            <MobileSidebarItem
              link='/app/create'
              toggleMenu={() => toggleMobileMenu(false)}
              svg={<Folder />}
              title='Create'
            />
          </Nav>
        </Sidebar>
      </Wrapper3>
      {/*<!-- Force sidebar to shrink to fit close icon -->*/}
      <ShrinkDiv />
    </Wrapper>
  );
};

export default SidebarMobile;
