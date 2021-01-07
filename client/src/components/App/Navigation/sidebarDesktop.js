import React from "react"
import styled, { keyframes } from "styled-components"
import { BiArrowFromRight } from "react-icons/bi"
import Avatar from "../Avatar/avatarSidebarFull"
import { colors, breakpoints } from "../../../styles/theme"
import SidebarItem from "./sidebarItem"
import Home from "../svgs/home"
import Persons from "../svgs/persons"
import Folder from "../svgs/folder"

const Wrapper1 = styled.div`
  display: none;
  @media (min-width: ${breakpoints.medium}) {
    display: flex;
    flex-shrink: 0;
  }
`

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
`

const growSideBar = keyframes`
from {
  width: 5.2rem;
}
to {
  width: 14rem;
}`

const SidebarWrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  background-color: ${props => props.theme.primary};
  width: 14rem;
  overflow: hidden;
  animation: ${growSideBar} 0.3s ease-out forwards;
`

const SidebarWrapper2 = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  padding-top: 1.25rem;
  padding-bottom: 1rem;
  overflow-y: auto;
`

const LogoWrapper = styled.div`
  display: flex;
  padding-left: 1.5rem;
`

const Logo = styled.img`
  height: 2rem;
  width: auto;
`

const Nav = styled.nav`
  margin-top: 2rem;
  flex: 1 1 0%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  background-color: ${props => props.theme.primary};
`

const fadeInRight = keyframes`
from {
  opacity: 0;
  transform: translateX(-1.5rem);
}
to {
  opacity: 1;
  transform: translateX(0);
}`

const StyledArrow = styled(BiArrowFromRight)`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 2rem;
  left: 13rem;
  color: ${colors.white};
  background-color: ${props => props.theme.primary};
  border-radius: 0.5rem;
  cursor: pointer;
  animation: ${fadeInRight} 0.7s ease-in forwards;
`

const SidebarDesktop = ({ sidebarHandler }) => (
  <Wrapper1>
    <Wrapper2>
      <SidebarWrapper1>
        <SidebarWrapper2>
          <LogoWrapper>
            <Logo src="/logo/large_logo.svg" alt="Workflow" />
          </LogoWrapper>
          <Avatar />
          <Nav>
            <SidebarItem link="/app" title="Dashboard" svg={<Home />} />
            <SidebarItem
              link="/app/readupdate"
              title="Read Update"
              svg={<Persons />}
            />
            <SidebarItem link="/app/create" title="Create" svg={<Folder />} />
          </Nav>
        </SidebarWrapper2>
      </SidebarWrapper1>
      <div onClick={sidebarHandler}>
        <StyledArrow />
      </div>
    </Wrapper2>
  </Wrapper1>
)

export default SidebarDesktop
