import React from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../../styles/theme';
import Title from '../../../components/Auth/title';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -7rem;
  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 28rem;
  }
`;

const ResetFormHeader = () => (
  <Wrapper>
    <Title>Enter In Email to reset Password</Title>
  </Wrapper>
);

export default ResetFormHeader;
