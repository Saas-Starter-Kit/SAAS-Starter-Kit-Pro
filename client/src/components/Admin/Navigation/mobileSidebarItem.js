import React from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import { colors } from "../../../styles/theme"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  padding: 1rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${colors.indigo300};
  line-height: 1.25rem;
  &:hover {
    color: ${colors.white};
    background-color: ${colors.indigo700};
  }
  &:focus {
    color: ${colors.white};
    background-color: ${colors.indigo700};
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  transition-property: background-color, border-color, color, fill, stroke,
    opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
`

const SvgWrapper = styled.div`
  margin-right: 0.75rem;
`

const MobileSidebarItem = ({ link, toggleMenu, svg, title }) => (
  <Link to={link}>
    <Wrapper onClick={toggleMenu}>
      <SvgWrapper>{svg}</SvgWrapper>
      {title}
    </Wrapper>
  </Link>
)

export default MobileSidebarItem
