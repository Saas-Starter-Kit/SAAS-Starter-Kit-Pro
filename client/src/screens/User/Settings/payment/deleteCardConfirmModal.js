import React from 'react';
import { Modal } from 'antd';

import DangerButton from '../../../../components/Common/buttons/DangerButton';
import CancelButton from '../../../../components/Common/buttons/CancelButton';

const ModalCardDelete = ({ isModalCard, handleModalCardCancel, deletePaymentMethod }) => {
  return (
    <Modal
      visible={isModalCard}
      title="Removing Card"
      onCancel={handleModalCardCancel}
      footer={[
        <DangerButton onClick={deletePaymentMethod}>Remove?</DangerButton>,
        <CancelButton onClick={handleModalCardCancel}>Cancel</CancelButton>
      ]}
    >
      Are You sure you want to remove Card?
    </Modal>
  );
};

export default ModalCardDelete;
