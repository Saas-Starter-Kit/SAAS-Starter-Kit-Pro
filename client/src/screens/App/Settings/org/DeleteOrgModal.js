import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

import CancelButton from '../../../../components/Common/buttons/CancelButton';
import DangerButton from '../../../../components/Common/buttons/DangerButton';

const StyledDangerButton = styled(DangerButton)`
  margin-right: 2rem;
`;

const DeleteOrgModal = ({ isModal, handleModal, deleteOrg }) => {
  return (
    <Modal
      visible={isModal}
      title="Deleting Organization"
      onCancel={handleModal}
      footer={[
        <StyledDangerButton onClick={deleteOrg}>Delete</StyledDangerButton>,
        <CancelButton onClick={handleModal}>Cancel</CancelButton>
      ]}
    >
      Are You sure you want to Delete Organization?
    </Modal>
  );
};

export default DeleteOrgModal;
