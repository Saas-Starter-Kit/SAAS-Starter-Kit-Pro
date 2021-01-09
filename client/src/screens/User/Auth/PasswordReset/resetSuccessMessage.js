import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../../styles/theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 28rem;
  }
`;

const Title = styled.h2`
  padding-right: 2rem;
  padding-left: 2rem;
  margin-top: 1.5rem;
  color: green;
  text-align: center;
  font-weight: 400;
  font-size: 1.5rem;
`;

const ResetSuccess = () => (
  <Wrapper>
    <Title>A Reset Link Has been Sent to your Email</Title>
  </Wrapper>
);

export default ResetSuccess;
