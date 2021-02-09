import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../../styles/theme';
import AuthContext from '../../../utils/authContext';
import { navigate } from 'gatsby';

const Wrapper = styled.div`
  margin-top: 2rem;
  text-align: center;
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

const ConfirmSub = () => {
  const { LogOut } = useContext(AuthContext);

  useEffect(() => {
    LogOut();
  }, []);

  return (
    <Wrapper>
      <Card>
        <Title>Your Subscription Has Been Confirmed!</Title>
        <Text>Please sign in again to complete the process</Text>
        <Text>Click below to navigate to the login screen</Text>
        <ConfirmButton onClick={() => navigate('/auth/login')}>Click Here</ConfirmButton>
      </Card>
    </Wrapper>
  );
};

export default ConfirmSub;
