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

const DeleteAppModal = ({ isModal, handleModalCancel, deleteApp }) => {
  return (
    <Modal
      visible={isModal}
      title="Deleting App"
      onCancel={handleModalCancel}
      footer={[
        <DangerButton onClick={deleteApp}>Delete App?</DangerButton>,
        <CancelDangerButton onClick={handleModalCancel}>Cancel</CancelDangerButton>
      ]}
    >
      Are You sure you want to Delete App?
    </Modal>
  );
};

export default DeleteAppModal;
