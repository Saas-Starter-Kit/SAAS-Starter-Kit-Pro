import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints, fieldStyles } from '../../styles/theme';

const Card = styled.div`
  background-color: ${colors.white};
  padding: 2rem 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  @media (min-width: ${breakpoints.small}) {
    border-radius: 0.5rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
`;

export const PurchaseCard = ({ children }) => {
  return <Card>{children}</Card>;
};

export default PurchaseCard;
