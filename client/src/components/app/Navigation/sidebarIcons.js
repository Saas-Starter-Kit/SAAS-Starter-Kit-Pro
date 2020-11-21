import styled, { keyframes } from 'styled-components';
import { BiArrowFromLeft } from 'react-icons/bi';
import SidebarItem from './smallSidebarItem';
import Avatar from '../Avatar/avatarSidebarIcons';
import { colors, breakpoints } from '../../../styles/theme';
import Home from '../../svgs/home';
import Persons from '../../svgs/persons';
import Folder from '../../svgs/folder';

const Wrapper1 = styled.div`
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: flex;
    flex-shrink: 0;
  }
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const shrinkSideBar = keyframes`
  from {
    width: 14rem;
  }
  to {
    width: 5.2rem;
  }
`;

const SidebarWrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  background-color: var(--primary-color);
  width: 5.2rem;
  overflow: hidden;
  animation: ${shrinkSideBar} 0.3s ease-out forwards;
`;

const SideBarWrapper2 = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  padding-top: 1.25rem;
  padding-bottom: 1rem;
  overflow-y: auto;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Logo = styled.img`
  height: 2rem;
  width: auto;
`;

const Nav = styled.nav`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.indigo600};
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(1.5rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StyledArrow = styled(BiArrowFromLeft)`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 2rem;
  left: 4.5rem;
  color: ${colors.white};
  background-color: var(--primary-color);
  border-radius: 0.5rem;
  cursor: pointer;
  animation: ${fadeInLeft} 0.7s ease-in forwards;
`;

const SidebarIcons = ({ sidebarHandler }) => (
  <Wrapper1>
    <Wrapper2>
      {/*<!-- Sidebar component, swap this element with another sidebar if you like -->*/}
      <SidebarWrapper1>
        <SideBarWrapper2>
          <LogoWrapper>
            <Logo src='/logo/small_logo.svg' alt='Workflow' />
          </LogoWrapper>
          <Nav>
            <Avatar />
            <SidebarItem id='Dashboard' title='Dashboard' link='/app' svg={<Home />} />
            <SidebarItem
              id='ReadUpdate'
              title='Read Update'
              link='/app/readupdate'
              svg={<Persons />}
            />
            <SidebarItem id='Create' title='Create' link='/app/create' svg={<Folder />} />
          </Nav>
        </SideBarWrapper2>
      </SidebarWrapper1>
      <div onClick={sidebarHandler}>
        <StyledArrow />
      </div>
    </Wrapper2>
  </Wrapper1>
);

export default SidebarIcons;
