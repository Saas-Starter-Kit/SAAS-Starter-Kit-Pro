import React, { useEffect, useContext } from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';

import AuthContext from '../../../utils/authContext';
import { breakpoints } from '../../../styles/theme';

import Card from '../../../components/Purchase/purchaseCard';

import { Steps } from 'antd';
import {
  SolutionOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CreditCardOutlined
} from '@ant-design/icons';

const { Step } = Steps;

const CardWrapper = styled.div`
  margin-top: 3rem;
  width: 38rem;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  @media (max-width: ${breakpoints.small}) {
    width: 90%;
  }
`;

const StyledHeader = styled.h1`
  padding-bottom: 2rem;
`;

const StyledSection = styled.div`
  margin-bottom: 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
`;

const CheckAuth = () => {
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    //if (authState.user) {
    //  if (authState.user.subscription_id) {
    //    navigate('/purchase/subcriptionexists');
    //  } else if (authState.isAuthenticated) {
    //    navigate('/purchase/plan');
    //  }
    //}
  }, [authState]);

  return (
    <div>
      <div style={{ width: '80%' }}>
        <Steps>
          <Step status="process" title="Login" icon={<LoadingOutlined />} />
          <Step status="wait" title="Plan" icon={<SolutionOutlined />} />
          <Step status="wait" title="Payment" icon={<CreditCardOutlined />} />
          <Step status="wait" title="Done" icon={<CheckCircleOutlined />} />
        </Steps>
      </div>
      <CardWrapper>
        <Card>
          <StyledHeader>Please Sign-in or Sign-up to continue</StyledHeader>
          <StyledSection>
            <div>Already Have an account? login below</div>
            <Link to="/auth/login" state={{ isPaymentFlow: true }}>
              Login
            </Link>
          </StyledSection>
          <StyledSection>
            <div>Need to create an account? click below</div>
            <Link to="/auth/signup">Signup</Link>
          </StyledSection>
        </Card>
      </CardWrapper>
    </div>
  );
};

export default CheckAuth;
