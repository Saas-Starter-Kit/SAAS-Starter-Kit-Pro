import React from "react"
import styled, { keyframes } from "styled-components"
import { BiArrowFromLeft } from "react-icons/bi"
import SidebarItem from "./smallSidebarItem"
import Avatar from "../Avatar/avatarSidebarIcons"
import { colors, breakpoints } from "../../../styles/theme"
import Home from "../svgs/home"
import Persons from "../svgs/persons"
import Folder from "../svgs/folder"

const Wrapper = styled.div`
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    background-color: ${props => props.theme.primary};
  }
`

const shrinkSideBar = keyframes`
  from {
    width: 14rem;
  }
  to {
    width: 5.2rem;
  }
`

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  background-color: ${props => props.theme.primary};
  width: 5.2rem;
  overflow: hidden;
  padding-top: 1.25rem;
  padding-bottom: 1rem;
  overflow-y: auto;
  animation: ${shrinkSideBar} 0.3s ease-out forwards;
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`

const Logo = styled.img`
  height: 2rem;
  width: auto;
`

const Nav = styled.nav`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.primary};
`

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(1.5rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const StyledArrow = styled(BiArrowFromLeft)`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 2rem;
  left: 4.5rem;
  color: ${colors.white};
  background-color: ${props => props.theme.primary};
  border-radius: 0.5rem;
  cursor: pointer;
  animation: ${fadeInLeft} 0.7s ease-in forwards;
`

const SidebarIcons = ({ sidebarHandler }) => (
  <Wrapper>
    {/*<!-- Sidebar component, swap this element with another sidebar if you like -->*/}
    <SidebarWrapper>
      <LogoWrapper>
        <Logo src="/logo/small_logo.svg" alt="Workflow" />
      </LogoWrapper>
      <Nav>
        <Avatar />
        <SidebarItem
          id="Dashboard"
          title="Dashboard"
          link="/app"
          svg={<Home />}
        />
        <SidebarItem
          id="ReadUpdate"
          title="Read Update"
          link="/app/readupdate"
          svg={<Persons />}
        />
        <SidebarItem
          id="Create"
          title="Create"
          link="/app/create"
          svg={<Folder />}
        />
      </Nav>
    </SidebarWrapper>
    <div onClick={sidebarHandler}>
      <StyledArrow />
    </div>
  </Wrapper>
)

export default SidebarIcons
