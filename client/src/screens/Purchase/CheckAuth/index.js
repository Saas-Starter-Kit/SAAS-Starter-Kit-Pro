import React, { useEffect, useContext } from 'react';
import { Link, navigate } from 'gatsby';
import AuthContext from '../../../utils/authContext';
import { Steps } from 'antd';
import {
  SolutionOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CreditCardOutlined
} from '@ant-design/icons';

const { Step } = Steps;

const CheckAuth = () => {
  const { authState } = useContext(AuthContext);
  console.log(authState);

  useEffect(() => {
    if (authState.user) {
      if (authState.user.subscription_id) {
        navigate('/purchase/subcriptionexists');
      } else if (authState.isAuthenticated) {
        navigate('/purchase/plan');
      }
    }
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
      <h1>Please Sign-in or Sign-up to continue</h1>
      <h2>Already Have an account? login below</h2>
      <Link to="/auth/login" state={{ isPaymentFlow: true }}>
        Login
      </Link>
      <h2>Need to create an account? click below</h2>
      <Link to="/auth/signup">Signup</Link>
    </div>
  );
};

export default CheckAuth;
