import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  margin-top: 1rem;
`;

const StyledLink = styled.a`
  padding: 0.5rem;
  margin-right: 0.7rem;
  font-weight: 900;
  color: black;
  font-size: 1.05rem;
  &:hover {
    border-bottom: 3px blue solid;
    color: black;
  }
  ${({ isActive }) =>
    isActive &&
    css`
      border-bottom: 3px blue solid;
    `}
`;

const NavLink = ({ text, link }) => {
  const location = useRouter();
  const isActive = location.asPath === link;
  return (
    <Link href={link} passHref>
      <StyledLink isActive={isActive}>{text}</StyledLink>
    </Link>
  );
};

export default NavLink;
