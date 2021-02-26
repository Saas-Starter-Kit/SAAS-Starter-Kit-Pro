import React from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';

import DangerButton from '../../../../components/Common/buttons/DangerButton';
import CancelButton from '../../../../components/Common/buttons/CancelButton';

const StyledDangerButton = styled(DangerButton)`
  width: max-content;
`;

const ModalSubscriptionCancel = ({ isModalSub, handleModalSubCancel, cancelSubscription }) => {
  return (
    <Modal
      visible={isModalSub}
      title="Ending Subscription"
      onCancel={handleModalSubCancel}
      footer={[
        <StyledDangerButton onClick={cancelSubscription}>Delete Subscription</StyledDangerButton>,
        <CancelButton onClick={handleModalSubCancel}>Cancel</CancelButton>
      ]}
    >
      Are You sure you want to Cancel Subscription?
    </Modal>
  );
};

export default ModalSubscriptionCancel;
