import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import { navigate } from 'gatsby';

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

const Image = styled.img`
  height: 3rem;
  width: calc(3rem * 164 / 150);
  cursor: pointer;
`;

const Header = () => {
  return (
    <Wrapper>
      <Image
        onClick={() => navigate('/')}
        src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg"
        alt="Workflow"
      />
    </Wrapper>
  );
};

export default Header;
