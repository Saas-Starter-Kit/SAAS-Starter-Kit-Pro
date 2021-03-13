import React from 'react';
import { Modal } from 'antd';

import CancelButton from '../../../components/Common/buttons/CancelButton';
import DangerButton from '../../../components/Common/buttons/DangerButton';

const DeleteOrgModal = ({ isModal, handleModalCancel, deleteOrg }) => {
  return (
    <Modal
      visible={isModal}
      title="Deleting Organization"
      onCancel={handleModalCancel}
      footer={[
        <DangerButton onClick={deleteOrg}>Delete</DangerButton>,
        <CancelButton onClick={handleModalCancel}>Cancel</CancelButton>
      ]}
    >
      Are You sure you want to Delete Organization?
    </Modal>
  );
};

export default DeleteOrgModal;
