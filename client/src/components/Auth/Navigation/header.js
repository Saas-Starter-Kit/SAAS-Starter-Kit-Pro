import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.7rem;
  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 28rem;
  }
`;

const Image = styled.img`
  height: 3rem;
  width: auto;
`;

const Header = () => {
  return (
    <Wrapper>
      <Image src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg" alt="Workflow" />
    </Wrapper>
  );
};

export default Header;
