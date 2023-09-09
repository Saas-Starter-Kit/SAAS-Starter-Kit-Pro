import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { colors, breakpoints } from '../../../styles/theme';
import MobileSidebarItem from './mobileSidebarItem';
import Cross from '../svgs/cross';
import Link from 'next/link';
import Persons from '../svgs/persons';
import Folder from '../svgs/folder';
import LargeLogo from '../../../components/Common/svgs/LargeLogo';

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
  background-color: black;
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

const CloseButton = styled.div`
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
          <CloseButton onClick={() => toggleMobileMenu(false)} aria-label="Close sidebar">
            <Cross />
          </CloseButton>
        </ButtonWrapper>
        <Sidebar>
          <LogoWrapper>
            <Link href="/user/dashboard">
              <a>
                <LargeLogo textColor={colors.white} />
              </a>
            </Link>
          </LogoWrapper>
          <Nav>
            <MobileSidebarItem
              link={`/user/dashboard`}
              toggleMenu={() => toggleMobileMenu(false)}
              svg={<Persons />}
              title="Settings"
            />
            <MobileSidebarItem
              link={`/user/teamapps`}
              toggleMenu={() => toggleMobileMenu(false)}
              svg={<Persons />}
              title="Team Apps"
            />
            <MobileSidebarItem
              link={`/user/settings/account`}
              toggleMenu={() => toggleMobileMenu(false)}
              svg={<Folder />}
              title="Settings"
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
