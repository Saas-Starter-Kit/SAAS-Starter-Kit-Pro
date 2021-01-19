import React, { useState } from 'react';
import { Link } from 'gatsby';

const PlanSelect = () => {
  const premium_plan = process.env.GATSBY_STRIPE_PREMIUM_PLAN;
  const basic_plan = process.env.GATSBY_STRIPE_BASIC_PLAN;
  const free_plan = process.env.GATSBY_STRIPE_BASIC_PLAN;

  const premium_price = process.env.GATSBY_STRIPE_PREMIUM_PLAN_PRICE;
  const basic_price = process.env.GATSBY_STRIPE_BASIC_PLAN_PRICE;

  const [plan, setPlan] = useState(free_plan);

  return (
    <div>
      <div onClick={() => setPlan(free_plan)}>Free</div>
      <div onClick={() => setPlan(basic_plan)}>Basic</div>
      <div onClick={() => setPlan(premium_plan)}>Premium</div>
      <Link to="/purchase/payment" state={{ plan }}>
        Submit
      </Link>
    </div>
  );
};

export default PlanSelect;
