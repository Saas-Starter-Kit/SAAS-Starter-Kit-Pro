import React from 'react';
import styled from 'styled-components';

import ModalSubscriptionCancel from './cancelSubscriptionModal';
import Card from '../../../../components/Common/Card';
import DangerButton from '../../../../components/Common/buttons/DangerButton';

const CancelSubscriptionButton = styled(DangerButton)`
  width: max-content;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
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
