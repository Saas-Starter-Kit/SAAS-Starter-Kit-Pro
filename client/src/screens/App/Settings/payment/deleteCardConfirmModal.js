import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

import DangerButton from '../../../../components/Common/buttons/DangerButton';
import CancelButton from '../../../../components/Common/buttons/CancelButton';

const ButtonWrapper = styled(DangerButton)`
  margin-right: 3rem;
`;

const ModalCardDelete = ({ isModalCard, handleModalCardCancel, deletePaymentMethod }) => {
  return (
    <Modal
      visible={isModalCard}
      title="Removing Card"
      onCancel={handleModalCardCancel}
      footer={[
        <ButtonWrapper onClick={deletePaymentMethod}>Remove</ButtonWrapper>,
        <CancelButton onClick={handleModalCardCancel}>Cancel</CancelButton>
      ]}
    >
      Are You sure you want to remove Card?
    </Modal>
  );
};

export default ModalCardDelete;
