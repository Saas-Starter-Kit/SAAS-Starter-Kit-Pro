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

const CancelSubscriptionCard = ({ setModalSub, isModalSub, handleModal, cancelSubscription }) => {
  return (
    <Card>
      <SectionTitle>Manage Subscription</SectionTitle>
      <CancelSubscriptionButton onClick={() => setModalSub(true)}>
        Cancel Subscription
      </CancelSubscriptionButton>
      <ModalSubscriptionCancel
        isModalSub={isModalSub}
        handleModal={handleModal}
        cancelSubscription={cancelSubscription}
      />
    </Card>
  );
};

export default CancelSubscriptionCard;
