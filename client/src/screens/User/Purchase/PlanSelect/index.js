import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Steps } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  CheckCircleOutlined,
  CreditCardOutlined
} from '@ant-design/icons';

const { Step } = Steps;

const PlanSelect = () => {
  const premium_plan = process.env.GATSBY_STRIPE_PREMIUM_PLAN;
  const basic_plan = process.env.GATSBY_STRIPE_BASIC_PLAN;

  const premium_price = process.env.GATSBY_STRIPE_PREMIUM_PLAN_PRICE;
  const basic_price = process.env.GATSBY_STRIPE_BASIC_PLAN_PRICE;

  const [plan, setPlan] = useState(basic_plan);

  return (
    <div>
      <div style={{ width: '80%' }}>
        <Steps>
          <Step status="finish" title="Login" icon={<UserOutlined />} />
          <Step status="process" title="Plan" icon={<LoadingOutlined />} />
          <Step status="wait" title="Payment" icon={<CreditCardOutlined />} />
          <Step status="wait" title="Done" icon={<CheckCircleOutlined />} />
        </Steps>
      </div>
      <div onClick={() => setPlan(basic_plan)}>Basic</div>
      <div onClick={() => setPlan(premium_plan)}>Premium</div>
      <Link to="/purchase/payment" state={{ plan }}>
        Submit
      </Link>
    </div>
  );
};

export default PlanSelect;
