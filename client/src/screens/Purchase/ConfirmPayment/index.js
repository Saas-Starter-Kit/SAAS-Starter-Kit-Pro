import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { breakpoints, colors } from '../../../styles/theme';
import AuthContext from '../../../utils/authContext';

const Wrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
  background-color: ${colors.coolGray50};
  @media (min-width: ${breakpoints.small}) {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 28rem;
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 1rem;
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

const ConfirmButton = styled.button`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 500;
  width: 7rem;
  background-color: blue;
  color: white;
  cursor: pointer;
`;

const Text = styled.h2`
  padding-right: 2rem;
  padding-left: 2rem;
  margin-top: 1.5rem;
  text-align: center;
  font-weight: 400;
  font-size: 1.2rem;
`;

const ConfirmPayment = () => {
  const { LogOut } = useContext(AuthContext);

  useEffect(() => {
    LogOut();
  }, []);

  return (
    <Wrapper>
      <Card>
        <Title>Your Payment Has Been Confirmed!</Title>
      </Card>
    </Wrapper>
  );
};

export default ConfirmPayment;
