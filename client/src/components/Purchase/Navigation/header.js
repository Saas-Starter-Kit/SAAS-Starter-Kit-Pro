import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from '@reach/router';

import { Steps } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CreditCardOutlined
} from '@ant-design/icons';

const { Step } = Steps;

const Wrapper = styled.div`
  margin: 1rem;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const Header = () => {
  const location = useLocation();
  const pageName = location.pathname.split('/')[2];

  const [loginStatus, setLoginStatus] = useState('');
  const [planStatus, setPlanStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [confirmStatus, setConfirmStatus] = useState('');

  useEffect(() => {
    setSteps();
  });

  const setSteps = () => {
    switch (pageName) {
      case '':
        setLoginStatus('process');
        setPlanStatus('wait');
        setPaymentStatus('wait');
        setConfirmStatus('wait');
        break;
      case 'checkauth':
        setLoginStatus('process');
        setPlanStatus('wait');
        setPaymentStatus('wait');
        setConfirmStatus('wait');
        break;
      case 'plan':
        setLoginStatus('finish');
        setPlanStatus('process');
        setPaymentStatus('wait');
        setConfirmStatus('wait');
        break;
      case 'payment':
        setLoginStatus('finish');
        setPlanStatus('finish');
        setPaymentStatus('process');
        setConfirmStatus('wait');
        break;
      case 'confirm':
        setLoginStatus('finish');
        setPlanStatus('finish');
        setPaymentStatus('finish');
        setConfirmStatus('finish');
        break;
    }
  };

  return (
    <Wrapper>
      <Steps>
        <Step
          status={loginStatus}
          title="Login"
          icon={pageName == 'checkauth' || '' ? <LoadingOutlined /> : <UserOutlined />}
        />
        <Step
          status={planStatus}
          title="Plan"
          icon={pageName == 'plan' ? <LoadingOutlined /> : <SolutionOutlined />}
        />
        <Step
          status={paymentStatus}
          title="Payment"
          icon={pageName == 'payment' ? <LoadingOutlined /> : <CreditCardOutlined />}
        />
        <Step status={confirmStatus} title="Done" icon={<CheckCircleOutlined />} />
      </Steps>
    </Wrapper>
  );
};

export default Header;
