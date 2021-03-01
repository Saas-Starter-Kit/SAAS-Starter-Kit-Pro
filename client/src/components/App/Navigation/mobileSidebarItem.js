import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import { THEMES } from '../AppLayout';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.25rem;
  color: ${({ theme }) => (theme === THEMES.DARK ? colors.silver : colors.doveGray)};
  padding: 0 16px 0 24px;
  margin: 4px 0 8px;
  height: 40px;
  &:hover {
    color: ${colors.dodgerBlue};
  }
  &:focus {
    color: ${colors.dodgerBlue};
    background-color: ${colors.lilyWhite};
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
`;

const SvgWrapper = styled.div`
  margin-right: 10px;
`;

const TitleWrapper = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

const MobileSidebarItem = ({ link, toggleMenu, svg, title, theme }) => (
  <Link to={link}>
    <Wrapper onClick={toggleMenu} theme={theme}>
      <SvgWrapper>{svg}</SvgWrapper>
      <TitleWrapper>{title}</TitleWrapper>
    </Wrapper>
  </Link>
);

export default MobileSidebarItem;
