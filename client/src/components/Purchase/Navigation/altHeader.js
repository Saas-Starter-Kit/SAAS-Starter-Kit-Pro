import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import { useRouter } from 'next/router';
import SmallLogo from '../../Common/svgs/SmallLogo';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.7rem;
  background-color: ${colors.coolGray50};
  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Header = () => {
  const router = useRouter();
  return (
    <Wrapper>
      <SmallLogo height={50} width={59} onClick={() => router.push('/')} />
    </Wrapper>
  );
};

export default Header;
