import React from 'react';
import styled from 'styled-components';

const Plan = styled.div`
  border: 1px solid blue;
  padding: 2rem;
  cursor: pointer;
  &:hover {
    background-color: lightblue;
    opacity: 85%;
  }
`;

const PlanHeader = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
`;

const PlanPrice = styled.div`
  font-size: 0.9rem;
  font-weight: 900;
`;

const PlanItem = ({ planHandler, planType, planPrice }) => {
  return (
    <Plan onClick={planHandler}>
      <PlanHeader>{planType} Plan</PlanHeader>
      <PlanPrice>${planPrice}/month</PlanPrice>
    </Plan>
  );
};

export default PlanItem;
