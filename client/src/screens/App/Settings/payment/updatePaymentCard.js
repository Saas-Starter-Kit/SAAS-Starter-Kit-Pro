import React from 'react';

import styled from 'styled-components';
import ModalCardDelete from './deleteCardConfirmModal';
import { FaRegCreditCard } from 'react-icons/fa';

import Card from '../../../../components/Common/Card';
import DangerButton from '../../../../components/Common/buttons/DangerButton';

const StyledCardDisplayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-bottom: 1rem;
`;

const StyledCardDisplay = styled.div`
  font-size: 1.075rem;
  border-radius: 1rem;
  padding: 0.5rem;
  background-color: darkblue;
  color: white;
  font-weight: 500;
  width: 14rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  padding-top: 1.5rem;
`;

const SuccessResponse = styled.div`
  color: green;
  font-weight: 300;
  margin-top: 1rem;
`;

const SecondCardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 0.5rem;
`;

const CardNumber = styled.div`
  font-size: 1.3rem;
  padding-left: 0.5rem;
`;

const Expires = styled.div`
  padding-left: 0.5rem;
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
  const setIcons = (brand) => {
    switch (brand) {
      case 'visa':
        return <img src="/credit card icons/visa.png" alt="Visa logo" width={48} height={48} />;
      case 'amex':
        return (
          <img
            src="/credit card icons/american_express.png"
            alt="American Express logo"
            width={48}
            height={48}
          />
        );
      case 'discover':
        return (
          <img src="/credit card icons/discover.png" alt="Discover logo" width={48} height={48} />
        );
      case 'mastercard':
        return (
          <img
            src="/credit card icons/mastercard.png"
            alt="Mastercard logo"
            width={48}
            height={48}
          />
        );
      default:
        return <FaRegCreditCard />;
    }
  };

  return (
    <Card>
      <SectionTitle>Update Payment</SectionTitle>
      {!paymentRemoved ? (
        payCards.map((item) => (
          <StyledCardDisplayWrapper key={item.id}>
            <StyledCardDisplay>
              <CardNumber>**** **** **** {item.card.last4}</CardNumber>
              <SecondCardRow>
                <Expires>
                  {item.card.exp_month}/{item.card.exp_year.toString().slice(-2)}
                </Expires>
                {setIcons(item.card.brand)}
              </SecondCardRow>
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
        <SuccessResponse>Payment method Removed Successfully</SuccessResponse>
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
