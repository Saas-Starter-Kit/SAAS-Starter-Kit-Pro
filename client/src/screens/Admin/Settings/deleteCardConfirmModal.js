import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

const CancelDangerButton = styled.button`
  background-color: white;
  color: black;
  padding: 0.4rem 0.8rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-left: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const DangerButton = styled.button`
  background-color: red;
  color: white;
  padding: 0.4rem 0.8rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-left: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const ModalCardDelete = ({ isModalCard, handleModalCardCancel, deletePaymentMethod }) => {
  return (
    <Modal
      visible={isModalCard}
      title="Removing Card"
      onCancel={handleModalCardCancel}
      footer={[
        <DangerButton onClick={deletePaymentMethod}>Remove?</DangerButton>,
        <CancelDangerButton onClick={handleModalCardCancel}>Cancel</CancelDangerButton>
      ]}
    >
      Are You sure you want to remove Card?
    </Modal>
  );
};

export default ModalCardDelete;
