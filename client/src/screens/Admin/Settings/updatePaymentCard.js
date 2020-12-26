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

const DangerButton = styled.button`
  background-color: red;
  color: white;
  padding: 0.4rem 0.8rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-left: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
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
