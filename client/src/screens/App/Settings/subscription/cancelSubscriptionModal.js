import React from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';

import DangerButton from '../../../../components/Common/buttons/DangerButton';
import CancelButton from '../../../../components/Common/buttons/CancelButton';

const StyledDangerButton = styled(DangerButton)`
  width: max-content;
  margin-right: 2rem;
`;

const ModalSubscriptionCancel = ({ isModalSub, handleModal, cancelSubscription }) => {
  return (
    <Modal
      visible={isModalSub}
      title="Ending Subscription"
      onCancel={handleModal}
      footer={[
        <StyledDangerButton onClick={cancelSubscription}>Delete Subscription</StyledDangerButton>,
        <CancelButton onClick={handleModal}>Cancel</CancelButton>
      ]}
    >
      Are You sure you want to Cancel Subscription?
    </Modal>
  );
};

export default ModalSubscriptionCancel;
