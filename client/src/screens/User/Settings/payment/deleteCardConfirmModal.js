import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import { colors, breakpoints, fieldStyles } from '../../../../styles/theme';

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  border-radius: 0.375rem;
  color: ${colors.white};
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  &:hover {
    background-color: ${colors.indigo500};
  }
  &:active {
    background-color: ${colors.indigo600};
  }
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow,
    transform;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
`;

const CancelDangerButton = styled(Button)`
  background-color: white;
  color: black;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const DangerButton = styled(Button)`
  background-color: red;
  color: white;
  margin-left: 1rem;
  margin-bottom: 1rem;
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
