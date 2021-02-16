import React from 'react';
import { Modal } from 'antd';

import DangerButton from '../../../../components/Common/buttons/DangerButton';
import CancelButton from '../../../../components/Common/buttons/CancelButton';

const ModalSubscriptionCancel = ({ isModalSub, handleModalSubCancel, cancelSubscription }) => {
  return (
    <Modal
      visible={isModalSub}
      title="Ending Subscription"
      onCancel={handleModalSubCancel}
      footer={[
        <DangerButton onClick={cancelSubscription}>End Subscription?</DangerButton>,
        <CancelButton onClick={handleModalSubCancel}>Cancel</CancelButton>
      ]}
    >
      Are You sure you want to Cancel Subscription?
    </Modal>
  );
};

export default ModalSubscriptionCancel;
