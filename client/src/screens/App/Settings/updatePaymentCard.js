import React from 'react';

import styled from 'styled-components';
import { colors, breakpoints, fieldStyles } from '../../../styles/theme';
import ModalCardDelete from './deleteCardConfirmModal';

const Card = styled.div`
  background-color: ${colors.white};
  width: 100%;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.large}) {
    width: 75%;
  }
`;

const StyledCardDisplayWrapper = styled.div`
  border: 1px solid black;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
`;

const StyledCardDisplay = styled.div`
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  padding-top: 1.5rem;
`;

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

const DangerButton = styled(Button)`
  background-color: ${colors.red500};
  margin-left: 1rem;
  margin-bottom: 0.5rem;
`;

const UpdatePaymentCard = ({
  payCards,
  paymentRemoved,
  isModalCard,
  handleModalCardCancel,
  deletePaymentMethod,
  setDeletePaymentId,
  setModalCard
}) => {
  return (
    <Card>
      {/*{isLoading && <LoadingOverlay />}*/}
      {/*<Paragraph>{resPayMessage}</Paragraph>*/}

      <SectionTitle>Update Payment</SectionTitle>
      {!paymentRemoved ? (
        payCards.map((item) => (
          <StyledCardDisplayWrapper>
            <StyledCardDisplay key={item.id}>
              {item.card.brand} **** **** **** {item.card.last4} expires {item.card.exp_month}/
              {item.card.exp_year}
            </StyledCardDisplay>
            <DangerButton
              onClick={() => {
                setDeletePaymentId(item.id);
                setModalCard(true);
              }}
            >
              Remove Card
            </DangerButton>
          </StyledCardDisplayWrapper>
        ))
      ) : (
        //<SuccessResponse>Payment Removed Successfully</SuccessResponse>
        <p>Success </p>
      )}
      <ModalCardDelete
        isModalCard={isModalCard}
        handleModalCardCancel={handleModalCardCancel}
        deletePaymentMethod={deletePaymentMethod}
      />
    </Card>
  );
};

export default UpdatePaymentCard;
