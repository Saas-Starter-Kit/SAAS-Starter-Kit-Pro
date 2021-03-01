import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import AuthContext from '../../../utils/authContext';

const Wrapper = styled.div`
  text-align: center;
  background-color: ${colors.coolGray50};
  height: 100vh;
`;

const Title = styled.h2`
  padding-right: 2rem;
  padding-left: 2rem;
  padding-top: 2rem;
  color: green;
  text-align: center;
  font-weight: 400;
  font-size: 1.5rem;
`;

const ConfirmPayment = () => {
  const { LogOut } = useContext(AuthContext);

  /* eslint-disable */
  useEffect(() => {
    LogOut();
  }, []);
  /* eslint-disable */

  return (
    <Wrapper>
      <Title>Your Payment Has Been Confirmed!</Title>
    </Wrapper>
  );
};

export default ConfirmPayment;
