import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

const StyledLink = styled.a`
  padding: 0.3rem;
  padding-bottom: 0.5rem;
  margin: 0.3rem;
  font-weight: 900;
  color: black;
  ${({ isActive }) =>
    isActive &&
    css`
      border-bottom: 3px blue solid;
    `}
  &:hover {
    border-bottom: 3px blue solid;
    color: black;
  }
`;

const HeaderLink = ({ path, text }) => {
  const location = useRouter();
  const isActive = location.asPath === path;
  return (
    <Link href={path} passHref>
      <StyledLink isActive={isActive}>{text}</StyledLink>
    </Link>
  );
};

export default HeaderLink;
