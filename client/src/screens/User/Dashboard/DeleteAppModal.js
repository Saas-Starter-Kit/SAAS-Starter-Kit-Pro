import React from 'react';
import { Modal } from 'antd';

import CancelButton from '../../../components/Common/buttons/CancelButton';
import DangerButton from '../../../components/Common/buttons/DangerButton';

const DeleteAppModal = ({ isModal, handleModalCancel, deleteApp }) => {
  return (
    <Modal
      visible={isModal}
      title="Deleting App"
      onCancel={handleModalCancel}
      footer={[
        <DangerButton onClick={deleteApp}>Delete App</DangerButton>,
        <CancelButton onClick={handleModalCancel}>Cancel</CancelButton>
      ]}
    >
      Are You sure you want to Delete App?
    </Modal>
  );
};

export default DeleteAppModal;
