import React, { useState } from 'react';
import { Link } from 'gatsby';
import { Steps } from 'antd';
const { Step } = Steps;
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';

const PlanSelect = () => {
  const premium_plan = process.env.GATSBY_STRIPE_PREMIUM_PLAN;
  const basic_plan = process.env.GATSBY_STRIPE_BASIC_PLAN;
  const free_plan = process.env.GATSBY_STRIPE_BASIC_PLAN;

  const premium_price = process.env.GATSBY_STRIPE_PREMIUM_PLAN_PRICE;
  const basic_price = process.env.GATSBY_STRIPE_BASIC_PLAN_PRICE;

  const [plan, setPlan] = useState(free_plan);

  return (
    <div>
      <div style={{ width: '80%' }}>
        <Steps>
          <Step status="finish" title="Login" icon={<UserOutlined />} />
          <Step status="finish" title="Verification" icon={<SolutionOutlined />} />
          <Step status="process" title="Pay" icon={<LoadingOutlined />} />
          <Step status="wait" title="Done" icon={<SmileOutlined />} />
        </Steps>
      </div>
      <div onClick={() => setPlan(free_plan)}>Free</div>
      <div onClick={() => setPlan(basic_plan)}>Basic</div>
      <div onClick={() => setPlan(premium_plan)}>Premium</div>
      <Link to={plan == free_plan ? '/purchase/confirm' : '/purchase/payment'} state={{ plan }}>
        Submit
      </Link>
    </div>
  );
};

export default PlanSelect;
