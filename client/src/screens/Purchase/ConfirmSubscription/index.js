import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { colors, breakpoints } from '../../../styles/theme';
import AuthContext from '../../../utils/authContext';
import { Link, navigate } from 'gatsby';
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
  color: green;
  text-align: center;
  font-weight: 400;
  font-size: 1.2rem;
`;

const ConfirmSub = () => {
  const { LogOut } = useContext(AuthContext);

  const LogoutUser = () => {
    setTimeout(() => LogOut(), 3800);
    setTimeout(() => navigate('/auth/login'), 4200);
  };

  useEffect(() => {
    LogoutUser();
  }, []);

  return (
    <Wrapper>
      <Steps>
        <Step status="finish" title="Login" icon={<UserOutlined />} />
        <Step status="finish" title="Plan" icon={<SolutionOutlined />} />
        <Step status="finish" title="Payment" icon={<CreditCardOutlined />} />
        <Step status="finish" title="Done" icon={<CheckCircleOutlined />} />
      </Steps>
      <Title>Your Subscription Has Been Confirmed!</Title>
      <Text>
        <h1>Please sign in again to complete the process</h1>
        <div>
          Click below to navigate to the login screen or wait 4 seconds for automatic redirect
        </div>
        <button onClick={LogoutUser}>Click Here</button>
      </Text>
    </Wrapper>
  );
};

export default ConfirmSub;
