import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import AuthContext from '../../../utils/authContext';
import { navigate } from 'gatsby';
import { Steps } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  CheckCircleOutlined,
  CreditCardOutlined
} from '@ant-design/icons';

const { Step } = Steps;

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
      <Title>Your Subscription Has Been Confirmed!</Title>
      <Text>Please sign in again to complete the process</Text>
      <Text>Click below to navigate to the login screen</Text>
      <button onClick={() => navigate('/auth/login')}>Click Here</button>
    </Wrapper>
  );
};

export default ConfirmSub;
