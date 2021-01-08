import React from 'react';

import styled from 'styled-components';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';
import ModalSubscriptionCancel from './cancelSubscriptionModal';

const Card = styled.div`
  background-color: ${colors.white};
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.large}) {
    width: 75%;
  }
`;

const CancelSubscriptionButton = styled.button`
  background-color: red;
  color: white;
  padding: 0.6rem 1.2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
  cursor: pointer;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  padding-top: 1.5rem;
`;

const CancelSubscriptionCard = ({
  setModalSub,
  isModalSub,
  handleModalSubCancel,
  cancelSubscription
}) => {
  return (
    <Card>
      <SectionTitle>Manage Subscription</SectionTitle>
      <CancelSubscriptionButton onClick={() => setModalSub(true)}>
        Cancel Subscription
      </CancelSubscriptionButton>
      <ModalSubscriptionCancel
        isModalSub={isModalSub}
        handleModalSubCancel={handleModalSubCancel}
        cancelSubscription={cancelSubscription}
      />
    </Card>
  );
};

export default CancelSubscriptionCard;
